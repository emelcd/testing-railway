import { Schema, model } from "mongoose";

enum QuestionType {
  multipleChoice = "multiple_choice",
  trueFalse = "true_false",
  fillInTheBlank = "fill_in_the_blank",
  shortAnswer = "short_answer",
  essay = "essay",
  matching = "matching",
  ordering = "ordering",
  image = "image",
  video = "video",
  audio = "audio",
}  


interface IQuestion {
  _id: Schema.Types.ObjectId;
  question: string;
  answer: string;
  resources?: string[];
  options?: string[];
  difficulty?: string;
  category?: string;
  type?: QuestionType;
  owner: Schema.Types.ObjectId;
}

const QuestionSchema = new Schema<IQuestion>(
  {
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    resources: {
      type: [String],
    },
    options: {
      type: [String],
    },
    difficulty: {
      type: String,
    },
    category: {
      type: String,
    },
    type: {
      enum: Object.values(QuestionType),
      type: String,
      default: QuestionType.multipleChoice,
    },
    owner: {
      ref: "User",
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const QuestionModel = model<IQuestion>("Question", QuestionSchema);

export { QuestionModel, IQuestion };
