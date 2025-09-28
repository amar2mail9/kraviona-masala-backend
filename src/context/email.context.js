import nodemailer from "nodemailer"
import dotenv from 'dotenv'
dotenv.config()
// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass:process.env.NODEMAILER_PASS
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error("Transporter Error:", error);
  } else {
    console.log("Server ready:", success);
  }
});



export const sendOTP = async (email,otp,fullname) => {
 try {
     const info = await transporter.sendMail({
    from: `"${fullname}" <${process.env.NODEMAILER_EMAIL}>`, 
    to: email,
    subject: "Verification OTP",
    text: otp, // plain‑text body
   html: `
  <div style="font-family: Arial, sans-serif; padding:20px; background:#f9f9f9; color:#333;">
    <div style="max-width:500px; margin:auto; background:white; border-radius:8px; padding:20px; box-shadow:0 2px 8px rgba(0,0,0,0.1);">
      
      <h2 style="color:#d35400; text-align:center; margin-bottom:20px;">
        🔐 Email Verification
      </h2>
      
      <p>Hello <b>${fullname}</b>,</p>
      <p>We received a request to verify your email address. Please use the OTP below to complete the process:</p>
      
      <div style="text-align:center; margin:25px 0;">
        <span style="font-size:24px; font-weight:bold; color:#2c3e50; background:#f4e6d4; padding:10px 20px; border-radius:6px; display:inline-block;">
          ${otp}
        </span>
      </div>
      
      <p style="font-size:14px; color:#555;">
        ⚠️ This OTP is valid for the next <b>10 minutes</b>. Do not share it with anyone.
      </p>
      
      <hr style="margin:25px 0; border:none; border-top:1px solid #eee;" />
      
      <p style="font-size:12px; color:#888; text-align:center;">
        If you didn’t request this, you can safely ignore this email.<br/>
        &copy; ${new Date().getFullYear()} Kraviona Masala. All rights reserved.
      </p>
    </div>
  </div>
`
 
// HTML body
  });
   console.log("Message sent:", info.messageId);

 } catch (error) {
    console.log(error.message);
    
 }

}