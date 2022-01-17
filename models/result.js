import mongoose from "mongoose";

let resultSchema = mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  answearUsername: {
    type: String,
    required: true,
  },
  rightAnswers: [
    {
      type: Boolean,

      required: true,
    },
  ],
});
export default mongoose.model("Result", resultSchema);
