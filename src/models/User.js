import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.pre("save", async function () {
  console.log(this.password);
  this.password = await bcrypt.hash(this.password, 5);
  console.log(this.password);
});

const User = mongoose.model("User", userSchema);

export default User;
