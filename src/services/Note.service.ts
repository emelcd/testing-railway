import { INote, NoteModel } from '../models/Note.model'

export class NoteService {
  public static async getAll (owner: string): Promise<INote[]> {
    return NoteModel.find({ owner })
  }

  public static async getOne (id: string): Promise<INote | null> {
    return NoteModel.findById(id)
  }

  public static async create (text: string, owner: string): Promise<INote> {
    const note = new NoteModel({
      text,
      owner
    })
    return note.save()
  }

  public static async update (id: string, text: string): Promise<INote | null> {
    return NoteModel.findByIdAndUpdate(id, { text })
  }

  public static async delete (id: string): Promise<INote | null> {
    return NoteModel.findByIdAndDelete(id)
  }
}

export default NoteService
