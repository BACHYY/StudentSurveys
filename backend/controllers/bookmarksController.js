import professorModel from "../models/professorModel.js";

export async function bookmarkProfessor(req, res) {
  try {
    const { _id } = req.params;
    const professor = await professorModel.findById(_id);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}
