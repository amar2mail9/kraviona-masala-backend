import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 32,
    },
    userID:{
        type:String,
        required:true,
        unique:true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Enter a valid Email"],
    },
    phone:{
      type:Number,
      required:true
    },
    avatar:{type:String},
    address:[
        {
            state:{
                type:String,

            },
            district:{
                 type:String,
            },
            pincode:{
                type:Number
            },
            city:{
                type:String
            },
            location:{
                type:String
            },
            isDefault:{
                type:Boolean,
                default:true
            }
        },
        
    ],
    otp:{
        type:Number,
        default:0
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    password:{
type:String,required:true
    },
    token:{type:String},
    role:{
        type:String,
        default:"user",
        enum:["user",'seller',"admin"]
    },
    isBlocked: {
      type: String,
      default: false
    }
  },
  {
    timestamps: true,
  }
);


export const userModel = model("User",userSchema)