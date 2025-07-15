import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    grade: { type: String, required: true, select: false },
    contactInfo: { type: Number, required: true },
  },
  { timestamps: true }
);

StudentSchema.pre("save", async function (next) {
  if (this.username) this.username = this.username.toLowerCase();

  next();
});

export default mongoose.model("Student", StudentSchema);
