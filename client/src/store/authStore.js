// Redux or Zustand store for authentication
// Example using Zustand pattern

const authStore = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  setUser: (user) => {
    authStore.user = user;
    authStore.isAuthenticated = true;
  },

  logout: () => {
    authStore.user = null;
    authStore.isAuthenticated = false;
  },

  setLoading: (loading) => {
    authStore.isLoading = loading;
  },

  setError: (error) => {
    authStore.error = error;
  },
};

export default authStore;
