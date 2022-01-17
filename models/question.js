import mongoose from "mongoose";
const questionSchema = mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  question: {
    type: String,
  },
  answerA: {
    type: String,
  },
  answerB: {
    type: String,
  },
  answerC: {
    type: String,
  },
  answerD: {
    type: String,
  },
  rightAnswer: {
    type: String,
  },
});

export default mongoose.model("questions ", questionSchema);
