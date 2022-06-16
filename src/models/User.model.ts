import { Document, model, Model, Schema } from 'mongoose'

enum UserRoleEnum {
  Admin = 'Admin',
  User = 'User',
  Approver = 'Approver',
}

interface IUser extends Document {
  _id: Schema.Types.ObjectId;
  email: string;
  password: string;
  username: string;
  avatar: string;
  role: UserRoleEnum;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    username: {
      type: String,
      default: 'user-' + String(Math.random()).substring(2, 8)
    },
    avatar: {
      type: String,
      default: 'https://i.pravatar.cc/300'
    }
  },
  { versionKey: false, timestamps: true }
)

const UserModel: Model<IUser> = model<IUser>('User', UserSchema)

export { UserModel, IUser }
