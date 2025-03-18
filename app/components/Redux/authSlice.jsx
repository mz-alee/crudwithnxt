import { createSlice } from "@reduxjs/toolkit";
import { getCookie, setCookie, deleteCookie } from "cookies-next";
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
    },
    loginData: (state, action) => {
      const { email, password } = action.payload;
      const findUsers = JSON.parse(getCookie("users")) || [];
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
    },
    logout: (state) => {
      
      setTimeout(() => {
        console.log('logout btn clicked');
        deleteCookie("loggedinUser");
        // state.loggedinUser = null;
      }, 500);
    },
  },
});
export const { registerUser, loginData, logout } = authSlice.actions;
export default authSlice.reducer;
