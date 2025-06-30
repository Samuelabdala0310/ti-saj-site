import mongoose from "mongoose";

const UsuarioSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    senha: {
      type: String,
      required: true,
    },
    telefone: {
      type: String,
    },
    role: {
      type: String,
      enum: ["cliente", "admin"],
      default: "cliente",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Usuario ||
  mongoose.model("Usuario", UsuarioSchema);