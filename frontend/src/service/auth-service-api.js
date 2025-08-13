import api from "./api";

// Register the user
export const registerUser = async (username, password) => {
  return await api.post("/auth/register", {
    username,
    password,
  });
};

// Login the user
export const loginUser = async (username, password) => {
  return await api.post(
    "/auth/login",
    {
      username,
      password,
    },
    {
      withCredentials: true,
    }
  );
};

// Check the status of the user
export const authStatus = async () => {
  return await api.get("/auth/status", {
    withCredentials: true,
  });
};

// Logout the user
export const logoutUser = async () => {
  return await api.post(
    "/auth/logout",
    {},
    {
      withCredentials: true,
    }
  );
};

// Setup the 2FA
export const setup2FA = async () => {
  const res = await api.post(
    "/auth/2fa/setup",
    {},
    { withCredentials: true }
  );
  return res.data; 
};


// Verify the 2FA
export const verify2FA = async (token) => {
  return await api.post(
    "/auth/2fa/verify",
    { token },
    {
      withCredentials: true,
    }
  );
};

// Reset the 2FA
export const reset2FA = async () => {
  return await api.post(
    "/auth/2fa/reset",
    {},
    {
      withCredentials: true,
    }
  );
};
