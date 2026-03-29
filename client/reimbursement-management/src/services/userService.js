import api from "./api";

// ✅ Get all users
export const getUsers = async () => {
  try {
    const res = await api.get("/users");
    return res.data;
  } catch (err) {
    console.error("Error fetching users:", err);
    throw err;
  }
};

// ✅ Get single user
export const getUserById = async (id) => {
  try {
    const res = await api.get(`/users/${id}`);
    return res.data;
  } catch (err) {
    console.error("Error fetching user:", err);
    throw err;
  }
};

// ✅ Create user (Admin)
export const createUser = async (data) => {
  try {
    const res = await api.post("/users", data);
    return res.data;
  } catch (err) {
    console.error("Error creating user:", err);
    throw err;
  }
};

// ✅ Update user
export const updateUser = async (id, data) => {
  try {
    const res = await api.put(`/users/${id}`, data);
    return res.data;
  } catch (err) {
    console.error("Error updating user:", err);
    throw err;
  }
};

// ✅ Delete user
export const deleteUser = async (id) => {
  try {
    const res = await api.delete(`/users/${id}`);
    return res.data;
  } catch (err) {
    console.error("Error deleting user:", err);
    throw err;
  }
};