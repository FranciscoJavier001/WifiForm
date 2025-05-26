import React, { useEffect, useState } from 'react';
import { getUsers, createUser, updateUser, deleteUser } from './services/api';

function App() {
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [form, setForm] = useState({
    negocio: '',
    nombre: '',
    telefono: '',
    mac: '',
    fecha: '',
    costo: '',
    proximoMes: ''
  });
  const [editandoId, setEditandoId] = useState<string | null>(null);

  const fetchUsuarios = async () => {
    const data = await getUsers();
    setUsuarios(data);
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;

    if (name === 'mac') {
      value = value.replace(/[^a-fA-F0-9]/g, '').slice(0, 12);
      value = value.match(/.{1,2}/g)?.join(':') || '';
    }

    setForm({ ...form, [name]: value });
  };

  const setFechaHoy = () => {
    const hoy = new Date().toISOString().split('T')[0];
    setForm({ ...form, fecha: hoy });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { negocio, nombre, telefono, mac, fecha, costo, proximoMes } = form;

    if (
      negocio.trim().length < 2 ||
      nombre.trim().length < 2 ||
      telefono.trim().length < 5 ||
      mac.trim().length < 11 ||
      fecha.trim().length < 4 ||
      costo.trim().length === 0 ||
      proximoMes.trim().length === 0
    ) {
      alert('Por favor llena todos los campos correctamente.');
      return;
    }

    if (editandoId) {
      await updateUser(editandoId, form);
      setEditandoId(null);
    } else {
      await createUser(form);
    }

    setForm({
      negocio: '',
      nombre: '',
      telefono: '',
      mac: '',
      fecha: '',
      costo: '',
      proximoMes: ''
    });
    fetchUsuarios();
  };

  const handleEdit = (u: any) => {
    setForm({
      negocio: u.negocio,
      nombre: u.nombre,
      telefono: u.telefono,
      mac: u.mac,
      fecha: u.fecha?.substring(0, 10) || '',
      costo: u.costo,
      proximoMes: u.proximoMes
    });
    setEditandoId(u._id);
  };

  const handleDelete = async (id: string) => {
    if (confirm('¿Eliminar este usuario?')) {
      await deleteUser(id);
      fetchUsuarios();
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{editandoId ? 'Editar Usuario' : 'Registrar Usuario'}</h1>

      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <input type="text" name="negocio" placeholder="Nombre del negocio" value={form.negocio} onChange={handleChange} className="w-full border p-2 rounded" />
        <input type="text" name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} className="w-full border p-2 rounded" />
        <input type="text" name="telefono" placeholder="Teléfono" value={form.telefono} onChange={handleChange} className="w-full border p-2 rounded" />
        <input type="text" name="mac" placeholder="MAC (formato AA:BB:CC...)" value={form.mac} onChange={handleChange} className="w-full border p-2 rounded" />
        <div className="flex gap-2">
          <input type="date" name="fecha" value={form.fecha} onChange={handleChange} className="w-full border p-2 rounded" />
          <button type="button" onClick={setFechaHoy} className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Usar fecha hoy
          </button>
        </div>
        <input type="number" name="costo" placeholder="Costo" value={form.costo} onChange={handleChange} className="w-full border p-2 rounded" />
        <input type="text" name="proximoMes" placeholder="Observaciones" value={form.proximoMes} onChange={handleChange} className="w-full border p-2 rounded" />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          {editandoId ? 'Guardar Cambios' : 'Registrar'}
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-2">Usuarios registrados</h2>
      <ul className="space-y-2">
        {usuarios.map((u) => (
          <li key={u._id} className="border p-3 rounded shadow">
            <p><strong>Negocio:</strong> {u.negocio}</p>
            <p><strong>Nombre:</strong> {u.nombre}</p>
            <p>
              <strong>Teléfono:</strong>{' '}
              <a href={`https://wa.me/+52${u.telefono}`} target="_blank" className="text-blue-600 underline">
                {u.telefono}
              </a>
            </p>
            <p><strong>MAC:</strong> {u.mac}</p>
            <p><strong>Fecha:</strong> {u.fecha?.substring(0, 10)}</p>
            <p><strong>Costo:</strong> ${u.costo}</p>
            <p><strong>Observaciones:</strong> {u.proximoMes}</p>
            <div className="flex gap-2 mt-2">
              <button onClick={() => handleEdit(u)} className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">
                Editar
              </button>
              <button onClick={() => handleDelete(u._id)} className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
