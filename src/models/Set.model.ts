import { Schema, model } from 'mongoose'

interface ISet {
  _id: Schema.Types.ObjectId;
  name: string;
  owner: Schema.Types.ObjectId;
  description: string;
  viewers: Schema.Types.ObjectId[];
  isPublic: boolean;
  tag: string[];
  superSet: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  questions: Schema.Types.ObjectId[];
}

const SetSchema = new Schema<ISet>(
  {
    name: {
      type: String,
      required: true
    },
    owner: {
      ref: 'User',
      type: Schema.Types.ObjectId,
      required: true
    },
    viewers: [
      {
        ref: 'User',
        type: Schema.Types.ObjectId
      }
    ],
    description: {
      type: String,
      required: true
    },
    isPublic: {
      type: Boolean,
      default: false
    },
    tag: [
      {
        type: String
      }
    ],
    superSet: {
      ref: 'SuperSet',
      type: Schema.Types.ObjectId
    },
    questions: [
      {
        ref: 'Question',
        type: Schema.Types.ObjectId
      }
    ]
  },
  { versionKey: false, timestamps: true }
)

const SetModel = model<ISet>('Set', SetSchema)

export { SetModel, ISet }
