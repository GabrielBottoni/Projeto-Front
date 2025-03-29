import axios from "axios";

const api = axios.create({
    baseURL:'https://reqres.in/api',
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});

export const fetchUsers = async () => {
    try {
        const response = await api.get("/users/");
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar usuário:", error.message )
        throw error;
    }
};

export const updateUser = async () => {}; 

export const deleteUser = async () => {};

export const Login = async (credentials) => {
    try {
        const response = await api.post("/Login", credentials);
        return response.data;
    } catch (error) {
        console.error("Erro ao Logar:", error.message )
        throw error;
    }
};
