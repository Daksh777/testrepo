import axios, { AxiosRequestConfig } from "axios";
import { useAuthStore } from "@/stores/authStore";
import { BACKEND_URL } from "@/shared";

const api = axios.create({
  baseURL: BACKEND_URL || "https://api-dev.unmapt.io",
});

// Refresh token coordination
let isRefreshing = false;
let refreshPromise: Promise<string> | null = null;
let refreshSubscribers: Array<(token: string) => void> = [];

const subscribeTokenRefresh = (callback: (token: string) => void) => {
  refreshSubscribers.push(callback);
};

const onRefreshed = (token: string) => {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
};

const refreshAccessToken = async (
  refreshToken: string
): Promise<{
  access: string;
  refresh?: string;
}> => {
  const base =
    api.defaults.baseURL || BACKEND_URL || "https://api-dev.unmapt.io";
  // Common patterns: token/refresh/ or auth/token/refresh/
  // We default to the path used by other auth endpoints in this app.
  const url = `${base}/api/users/auth/token/refresh/`;
  const response = await axios.post(url, { refresh: refreshToken });
  return response.data;
};

api.interceptors.request.use(
  (config) => {
    const { user } = useAuthStore.getState();
    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalConfig:
      | (AxiosRequestConfig & { _retry?: boolean })
      | undefined = error?.config;
    const status = error?.response?.status;

    // Only handle 401 for requests we can retry and avoid infinite loops
    if (status === 401 && originalConfig && !originalConfig._retry) {
      originalConfig._retry = true;

      const { user, login, logout } = useAuthStore.getState();
      const refreshToken = user?.refreshToken;
      if (!refreshToken) {
        // No refresh token available
        logout();
        return Promise.reject(error);
      }

      // Start a single refresh request and queue all 401s until it resolves
      if (!isRefreshing) {
        isRefreshing = true;
        refreshPromise = refreshAccessToken(refreshToken)
          .then((data) => {
            const newAccess = (data as any).access;

            if (newAccess) {
              login({
                ...(user as any),
                token: newAccess,
              });
              api.defaults.headers.common.Authorization = `Bearer ${newAccess}`;
              onRefreshed(newAccess);
            }
            return newAccess;
          })
          .catch((refreshErr) => {
            logout();
            throw refreshErr;
          })
          .finally(() => {
            isRefreshing = false;
          });
      }

      // Wait for the refresh to complete, then retry the original request
      return new Promise((resolve, reject) => {
        subscribeTokenRefresh((newToken) => {
          if (originalConfig.headers) {
            (originalConfig.headers as Record<string, string>)[
              "Authorization"
            ] = `Bearer ${newToken}`;
          }
          api
            .request(originalConfig)
            .then((res) => resolve(res))
            .catch((err) => reject(err));
        });
        // Also handle the case where refresh itself fails
        if (refreshPromise) {
          refreshPromise.catch(reject);
        }
      });
    }

    return Promise.reject(error);
  }
);

export default api;
