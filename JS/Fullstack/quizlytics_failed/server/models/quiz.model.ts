import { Schema, model, models } from "mongoose";

const quizSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  access: {
    type: String,
    enum: ["public", "class"],
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  questions: [
    {
      type: Schema.Types.ObjectId,
      ref: "Question",
      required: true,
    },
  ],
  assignedClasses: [
    {
      type: Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },
  ],
  responses: [
    {
      type: Schema.Types.ObjectId,
      ref: "QuizResponse",
    },
  ],
});

const Quiz = models?.Quiz ?? model("Quiz", quizSchema);

export default Quiz;
