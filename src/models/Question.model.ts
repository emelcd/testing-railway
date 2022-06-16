import { Schema, model } from 'mongoose'

interface IQuestion {
  _id: Schema.Types.ObjectId;
  question: string;
  answer: string;
  owner: Schema.Types.ObjectId;
}

const QuestionSchema = new Schema<IQuestion>(
  {
    question: {
      type: String,
      required: true
    },
    answer: {
      type: String,
      required: true
    },
    owner: {
      ref: 'User',
      type: Schema.Types.ObjectId,
      required: true
    }
  },
  { versionKey: false, timestamps: true }
)

const QuestionModel = model<IQuestion>('Question', QuestionSchema)

export { QuestionModel, IQuestion }
