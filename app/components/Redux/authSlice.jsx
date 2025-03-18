import { createSlice } from "@reduxjs/toolkit";
import { getCookie ,setCookie,deleteCookie} from 'cookies-next';
const user = () => {
  const storedData = getCookie("users");
  return storedData ? JSON.parse(storedData) : [];
};
const loggedinData = () => {
  const storedData = getCookie("loggedinUser");
  return storedData ? JSON.parse(storedData) : null;
};
const initialState = {
  users: user(),
  loggedinUser: loggedinData(),
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registerUser: (state, action) => {
      console.log("action data", action);

      const userData = {
        username: action.payload.username,
        email: action.payload.email,
        password: action.payload.password,
        confirmPassword: action.payload.confirmPassword,
      };

      const userExist = state.users.some(
        (user) => user.email === userData.email
      );
      if (userExist) {
        console.log("already user exist");
      }

      state.users.push(userData);
      setCookie("users", JSON.stringify(state.users), { maxAge: 60 * 60 * 60 });
      const user = JSON.parse(getCookie("users"));
      console.log("userssss", user);
      localStorage.setItem("users", JSON.stringify(state.users));
    },
    loginData: (state, action) => {
      const { email, password } = action.payload;
      const findUsers = JSON.parse(localStorage.getItem("users")) || [];
      const filteredUsers = findUsers.find(
        (user) => user.email === email && user.password === password
      );

      if (!filteredUsers) {
        alert("user not found");
        return;
      }

      state.loggedinUser = filteredUsers;
      setCookie("loggedinUser", JSON.stringify(filteredUsers), {
        maxAge: 60 * 60 * 24,
      });
      localStorage.setItem("loggedinUser", JSON.stringify(filteredUsers));
    },
    logout: (state) => {
      setTimeout(() => {
        state.loggedinUser = null;

        localStorage.removeItem("loggedinUser");
      }, 500);
    },
  },
});
export const { registerUser, loginData, logout } = authSlice.actions;
export default authSlice.reducer;
