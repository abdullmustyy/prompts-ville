import { Schema, models, model } from "mongoose";

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: [true, "Email already exists!"],
      required: [true, "Please enter an email!"],
    },
    displayName: {
      type: String,
      required: [true, "Display name is required!"],
    },
    userName: {
      type: String,
      required: [true, "Username is required!"],
      // match: [
      //   /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      //   "Username invalid, it should contain 8-20 alphanumeric letters and be unique!",
      // ],
    },
    password: {
      type: String,
      required: [true, "Password is required!"],
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

export default models.User || model("User", UserSchema);
