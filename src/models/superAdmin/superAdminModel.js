import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const SuperadminSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    role: { type: String, default: "superadmin" },
  },
  { timestamps: true }
);

SuperadminSchema.pre("save", async function (next) {
  // Hash password if modified
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
  }

  // Convert fields to lowercase
  if (this.username) this.username = this.username.toLowerCase();

  next();
});

SuperadminSchema.methods.correctPassword = async function (
  candidatePassword,
  adminPassword
) {
  return await bcrypt.compare(candidatePassword, adminPassword);
};

export default mongoose.model("Superadmin", SuperadminSchema);
