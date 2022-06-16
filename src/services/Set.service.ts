import { ISet, SetModel } from '../models/Set.model'
import { ApiError } from '../utils/api.error'
import { UserModel } from '../models/User.model'

export class SetService {
  public static async getAll (owner: string): Promise<ISet[]> {
    const user = await UserModel.findOne({ email: owner })
    if (!user) {
      throw new ApiError('User not found', 404)
    }
    return SetModel.find({ owner: user._id }).populate('questions', 'question answer')
  }

  public static async create (set: ISet, owner: string): Promise<ISet> {
    const user = await UserModel.findOne({ email: owner })
    if (!user) {
      throw new ApiError('User not found', 404)
    }
    return SetModel.create({
      ...set,
      owner: user._id
    })
  }

  public static async delete (id: string, owner: string): Promise<ISet> {
    const user = await UserModel.findOne({ email: owner })
    if (!user) {
      throw new ApiError('User not found', 404)
    }
    const set = await SetModel.findOneAndDelete({ _id: id, owner: user._id })
    if (!set) {
      throw new ApiError('Set not found', 404)
    }
    return set
  }

  public static async update (
    id: string,
    set: ISet,
    owner: string
  ): Promise<ISet> {
    const user = await UserModel.findOne({ email: owner })
    if (!user) {
      throw new ApiError('User not found', 404)
    }
    const updatedSet = await SetModel.findOneAndUpdate(
      { _id: id, owner: user._id },
      set,
      { new: true }
    )
    if (!updatedSet) {
      throw new ApiError('Set not found', 404)
    }
    return updatedSet
  }

  public static async getPublicSets (): Promise<ISet[]> {
    return SetModel.find({ isPublic: true }).populate('owner', 'email avatar').populate('questions', 'question answer')
  }
}

export default SetService
