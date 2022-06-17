import { IQuestion, QuestionModel } from '../models/Question.model'
import { ApiError } from '../utils/api.error'
import { SetModel } from '../models/Set.model'
import { UserModel } from '../models/User.model'

class QuestionService {
  public static async create (
    question: IQuestion,
    set: string,
    owner: string
  ): Promise<IQuestion> {
    const user = await UserModel.findOne({ email: owner })
    if (!user) throw new ApiError('User not found', 404)
    const setM = await SetModel.findById({ _id: set, owner: user._id })
    if (!setM) throw new ApiError('Set not found', 404)
    const newQuestion = new QuestionModel({
      ...question,
      owner: user._id
    })
    setM.questions.push(newQuestion._id)
    await setM.save()
    return await newQuestion.save()
  }

  public static async update (
    question: IQuestion,
    set: string,
    owner: string
  ): Promise<IQuestion> {
    const user = await UserModel.findOne({ email: owner })
    if (!user) throw new ApiError('User not found', 404)
    const setM = await SetModel.find({ _id: set, owner: user._id })
    if (!setM) throw new ApiError('Set not found', 404)
    const questionM = await QuestionModel.findOneAndUpdate(
      {
        _id: question._id,
        owner: user._id
      },
      question,
      { new: true }
    )
    if (!questionM) throw new ApiError('Question not found', 404)
    return await questionM.save()
  }

  public static async delete (
    id: string,
    set: string,
    owner: string
  ): Promise<{
    msg: string;
  }> {
    const user = await UserModel.findOne({ email: owner })
    if (!user) throw new ApiError('User not found', 404)
    const setM = await SetModel.find({ _id: set, owner: user._id })
    if (!setM) throw new ApiError('Set not found', 404)
    const questionM = await QuestionModel.findOneAndDelete({
      _id: id,
      owner: user._id
    })
    if (!questionM) throw new ApiError('Question not found', 404)
    return {
      msg: 'Question deleted'
    }
  }
}

export default QuestionService
