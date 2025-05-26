import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    negocio: { type: String, required: true },
    nombre: { type: String, required: true },
    telefono: { type: String, required: true },
    mac: { type: String, required: true },
    fecha: { type: Date, required: true },
    costo: { type: Number, required: true },
    proximoMes: { type: String, required: true }
  },
  { timestamps: true }
);

export default model('User', userSchema);
