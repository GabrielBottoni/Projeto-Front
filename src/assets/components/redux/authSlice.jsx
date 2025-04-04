import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Login as LoginService } from "../../services/apiService";

const tokenFromStorage = localStorage.getItem('token');

export const loginAsync = createAsyncThunk(
    'auth/login',
    async ({email, password}, thunkAPI) => {
        try {
            const response = await LoginService({ email, password });
            console.log("Resposta da API:", response);
            return { token: response.token};
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || "Erro desconhecido")
        }
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: tokenFromStorage ? tokenFromStorage : null,
        status: 'idle',
        error: null,    
    },
    reducers: {
        logout: (state) => {
            state.token = null;
            localStorage.removeItem('token');
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(loginAsync.pending, (state) => {
            state.status = 'loading';
            state.error = null;
        })
        .addCase(loginAsync.fulfilled, (state, action) => {
            console.log("Payload recebido:", action.payload);

            state.status = 'succeded';
            state.token = action.payload?.token || null;

            if(state.token){
                localStorage.setItem('token', state.token);
                console.log("Token salvo", state.token);
            } else {
                state.error = "Token não recebido";
                console.log("Erro definido no Redux:", state.error);
            }
        })
        .addCase(loginAsync.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload
        });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;