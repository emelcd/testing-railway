import { Schema, model } from 'mongoose'

interface ISuperSet {
  _id: Schema.Types.ObjectId;
  name: string;
  description: string;
  isApproved: boolean;
}

const SuperSetSchema = new Schema<ISuperSet>(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    isApproved: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  { versionKey: false, timestamps: true }
)

const SuperSetModel = model<ISuperSet>('SuperSet', SuperSetSchema)

export { SuperSetModel, ISuperSet }
