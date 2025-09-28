import { optGenerator } from "../context/data.js";
import { sendOTP } from "../context/email.context.js";
import { userModel } from "../models/user.models.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// register user

export const registerUser = async (req, res) => {
  try {
    const { fullname, email, phone, role, password } = req.body;

    if (!email)
      return res
        .status(400)
        .send({ success: false, message: "Email  is required" });

    if (!fullname)
      return res
        .status(400)
        .send({ success: false, message: "fullname  is required" });

    if (!phone)
      return res
        .status(400)
        .send({ success: false, message: "phone  is required" });

    if (!password)
      return res
        .status(400)
        .send({ success: false, message: "password  is required" });

    if (password.length < 6) {
      return res
        .status(400)
        .send({
          success: false,
          message: "password must be at least 6 characters long",
        });
    }

    const existUser = await userModel.findOne({ $or: [{ email }, { phone }] });

    if (existUser && existUser.phone === phone) {
      return res.status(409).send({
        success: false,
        message: "Phone is already registered",
      });
    }
    if (existUser?.email === email) {
      return res.status(409).send({
        success: false,
        message: "Email is already registered",
      });
    } else {
    }
    const newUser = userModel({
      fullname,
      email,
      phone,
      otp: optGenerator,
      role:role.toLowerCase(),
      password: await bcrypt.hash(password, 10),
      userID: `KRAV${Date.now()}`,
    });
    newUser.save();
    sendOTP(email, newUser.otp.toString(), fullname);
    console.log("sent OPT");

    return res.status(201).send({
      success: true,
      message: "OPT sended  ",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

// verify otp
export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email)
      return res
        .status(400)
        .send({ success: false, message: "Email  is required" });

    if (!otp)
      return res
        .status(400)
        .send({ success: false, message: "otp  is required" });

    const user = await userModel.findOne({ email });

    if (!user)
      return res.status(409).send({
        success: false,
        message: "Something went wrong",
      });

    if (user) {
      if (user.otp === parseInt(otp)) {
        user.isVerified = true;
        user.otp = null;
        user.token = await jwt.sign(
          { id: user._id, role: user.role, email: user.email },
          process.env.SECRET_KEY,
          { expiresIn: "7d" }
        );
        await user.save();
        const safeUser = user.toObject();
        delete safeUser.otp;
        delete safeUser.password;
        delete safeUser.__v;
        delete safeUser.createdAt;
        delete safeUser.updatedAt;

        return res.status(200).send({
          success: true,
          message: "OTP Verified",
          user: safeUser,
        });
      } else {
        return res.status(200).send({
          success: false,
          message: "Wrong OTP",
        });
      }
    }
  } catch (error) {
    return res.status(500).send({
      message: error.message,
      success: false,
    });
  }
};

// resend otp
export const resendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email)
      return res
        .status(400)
        .send({ success: false, message: "Email  is required" });

    const user = await userModel.findOne({ email });

    if (!user)
      return res.status(409).send({
        success: false,
        message: "Something went wrong",
      });

    if (user) {
      user.otp = optGenerator;
      await user.save();
      sendOTP(email, user.otp.toString(), user.fullname);
      return res.status(200).send({
        success: true,
        message: "OTP Resended",
      });
    }
  } catch (error) {
    return res.status(500).send({
      message: error.message,
      success: false,
    });
  }
};


// login user
export const loginUserPassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).send({
        success: false,
        message: "Email is required",
      });
    }

    if (!password) {
      return res.status(400).send({
        success: false,
        message: "Password is required",
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(409).send({
        success: false,
        message: "Email is not registered",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({
        success: false,
        message: "Invalid password",
      });
    }

    // generate token
    user.token = jwt.sign(
      { id: user._id, role: user.role, email: user.email },
      process.env.SECRET_KEY,
      { expiresIn: "7d" }
    );

    await user.save();

    // convert user to plain object & remove sensitive fields
    const safeUser = user.toObject();
    delete safeUser.password;
    delete safeUser.otp;
    delete safeUser.__v;
    delete safeUser.createdAt;
    delete safeUser.updatedAt;

    return res.status(200).send({
      success: true,
      message: "Login Successful",
      user: safeUser, // ✅ fixed here
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

// update user  
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullname, phone, address, avatar } = req.body;

    if (!id)
      return res
        .status(400)
        .send({ success: false, message: "User ID is required" });
        
    const user = await userModel.findById(id);
    if (!user)
      return res
        .status(404)
        .send({ success: false, message: "User not found" });
        
    if (fullname) user.fullname = fullname;
    if (phone) user.phone = phone;
    if (avatar) user.avatar = avatar;
    if (address) user.address = address;
      
    await user.save();
    
    const safeUser = user.toObject();
    delete safeUser.password;
    delete safeUser.otp;
    delete safeUser.__v;
    delete safeUser.createdAt;
    delete safeUser.updatedAt;



    return res.status(200).send({
      success: true,
      message: "User updated successfully",
      user: safeUser,
    });
  }


  catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

// forget password
export const forgetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email)
      return res
        .status(400)
        .send({ success: false, message: "Email  is required" });

    if (!otp)
      return res
        .status(400)
        .send({ success: false, message: "otp  is required" });

    if (!newPassword)
      return res
        .status(400)
        .send({ success: false, message: "newPassword  is required" });

    if (newPassword.length < 6) {
      return res
        .status(400)
        .send({
          success: false,
          message: "newPassword must be at least 6 characters long",
        });
    }

    const user = await userModel.findOne({ email });

    if (!user)
      return res.status(409).send({
        success: false,
        message: "Something went wrong",
      });

    if (user) {
      if (user.otp === parseInt(otp)) {
        user.password = await bcrypt.hash(newPassword, 10);
        user.otp = null;
        await user.save();
        return res.status(200).send({
          success: true,
          message: "Password changed successfully",
        });
      } else {
        return res.status(200).send({
          success: false,
          message: "Wrong OTP",
        });
      }
    }
  } catch (error) {
    return res.status(500).send({
      message: error.message,
      success: false,
    });
  }
};