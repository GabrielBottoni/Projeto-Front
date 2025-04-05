import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Login as LoginService } from "../../services/apiService";

const tokenFromStorage = localStorage.getItem("token");
const roleFromStorage = localStorage.getItem("role");

export const loginAsync = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await LoginService({ email, password });
      console.log("Resposta da API:", response);

      
      return {
        token: response.token,
        role: response.role, 
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Usuário e/ou senha incorreto(s)");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: tokenFromStorage || null,
    role: roleFromStorage || null,
    status: "idle",
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.role = null;
      localStorage.removeItem("token");
      localStorage.removeItem("role");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        console.log("Payload recebido:", action.payload);

        state.status = "succeeded";
        state.token = action.payload?.token || null;
        state.role = action.payload?.role || null;

        if (state.token) {
          localStorage.setItem("token", state.token);
          localStorage.setItem("role", state.role);
          console.log("Token e Role salvos:", state.token, state.role);
        } else {
          state.error = "Token não recebido";
          console.log("Erro definido no Redux:", state.error);
        }
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
