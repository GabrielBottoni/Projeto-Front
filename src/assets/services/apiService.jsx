import axios from "axios";

const api = axios.create({
  baseURL: 'https://api.npoint.io', 
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const Login = async ({ email, password }) => {
  const response = await api.get('/c787d8c3faf1fa602423'); 
  const users = response.data.users;

  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    throw new Error("Credenciais inválidas");
  }

  console.log("Usuário autenticado:", user);
  return { token: user.token, role: user.role };
};
