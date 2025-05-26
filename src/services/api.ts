const API_URL = 'http://localhost:3000/api/users';

export async function getUsers() {
  const res = await fetch(API_URL);
  return res.json();
}

export async function createUser(data: {
  nombre: string;
  telefono: string;
  ubicacion: string;
}) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateUser(id: string, data: {
  nombre: string;
  telefono: string;
  ubicacion: string;
}) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteUser(id: string) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  return res.json();
}
