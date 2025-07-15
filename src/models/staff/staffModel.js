import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const StaffSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    role: { type: String, default: "staff" },
    permissions: {
        view: { type: Boolean, default: false },
        create: { type: Boolean, default: false },
        edit: { type: Boolean, default: false },
        delete: { type: Boolean, default: false }
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Superadmin"
    }
  },
  { timestamps: true }
);

StaffSchema.pre("save", async function (next) {
  // Hash password if modified
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
  }

  // Convert fields to lowercase
  if (this.username) this.username = this.username.toLowerCase();

  next();
});

StaffSchema.methods.correctPassword = async function (
  candidatePassword,
  adminPassword
) {
  return await bcrypt.compare(candidatePassword, adminPassword);
};

export default mongoose.model("Staff", StaffSchema);
