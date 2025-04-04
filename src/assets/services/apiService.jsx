import axios from "axios";

const api = axios.create({
    baseURL:'https://api.npoint.io',
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});

export const Login = async (credentials) => {
    const response = await api.post("/docs/c787d8c3faf1fa602423");
    console.log("Resposta completa da API:", response);
    return response.data;
};

