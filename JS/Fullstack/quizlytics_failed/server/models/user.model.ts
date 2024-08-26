import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  joinedClasses: [
    {
      type: Schema.Types.ObjectId,
      ref: "Class",
    },
  ],
  createdClasses: [
    {
      type: Schema.Types.ObjectId,
      ref: "Class",
    },
  ],
  takenQuizzes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Quiz",
    },
  ],
  createdQuizzes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Quiz",
    },
  ],
  accountType: {
    type: String,
    enum: ["free", "premium"],
    default: "free",
  },
});

const User = models?.User ?? model("User", userSchema);

export default User;
