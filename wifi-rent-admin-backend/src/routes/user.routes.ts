import { Router } from 'express';
import User from '../models/User';

const router = Router();

// Crear usuario
router.post('/', async (req, res) => {
  try {
    const { negocio, nombre, telefono, mac, fecha, costo, proximoMes } = req.body;
    const nuevoUsuario = new User({ negocio, nombre, telefono, mac, fecha, costo, proximoMes });
    const guardado = await nuevoUsuario.save();
    res.status(201).json({ message: 'Usuario registrado', data: guardado });
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor' });
  }
});

// Obtener todos los usuarios
router.get('/', async (_req, res) => {
  try {
    const usuarios = await User.find();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ message: 'Error al cargar usuarios' });
  }
});

// Obtener usuario por ID
router.get('/:id', async (req, res) => {
  try {
    const usuario = await User.findById(req.params.id);
    if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor' });
  }
});

// Actualizar usuario
router.put('/:id', async (req, res) => {
  try {
    const { negocio, nombre, telefono, mac, fecha, costo, proximoMes } = req.body;
    const actualizado = await User.findByIdAndUpdate(
      req.params.id,
      { negocio, nombre, telefono, mac, fecha, costo, proximoMes },
      { new: true }
    );
    if (!actualizado) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.status(200).json({ message: 'Usuario actualizado', data: actualizado });
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor' });
  }
});

// Eliminar usuario
router.delete('/:id', async (req, res) => {
  try {
    const eliminado = await User.findByIdAndDelete(req.params.id);
    if (!eliminado) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.status(200).json({ message: 'Usuario eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor' });
  }
});

export default router;
