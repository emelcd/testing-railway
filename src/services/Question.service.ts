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
    const setM = await SetModel.findById(set)
    if (!setM) throw new ApiError('Set not found', 404)
    const newQuestion = new QuestionModel({
      ...question,
      owner: user._id
    })
    setM.questions.push(newQuestion._id)
    await setM.save()
    return await newQuestion.save()
  }
}

export default QuestionService
