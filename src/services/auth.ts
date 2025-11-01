/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "sonner";
import api from "@/lib/api";
import { useAuthStore } from "@/stores/authStore";
import {
  AuthResponse,
  Credentials,
  GoogleLoginData,
  SignupData,
} from "@/types/authTypes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { BACKEND_URL } from "@/shared";

//  LOGIN
export const useLogin = () => {
  const loginToStore = useAuthStore((state) => state.login);

  return useMutation<AuthResponse, any, Credentials>({
    mutationFn: (data) =>
      api.post("/api/users/auth/login/", data).then((res) => res.data),
    onSuccess: (data) => {
      loginToStore({
        ...data?.user,
        token: data?.access,
        refreshToken: data?.refresh,
        provider: "credentials",
      });
      toast.success("Login successful");
    },
    onError: (err) => {
      toast.error(
        err.response?.data?.non_field_errors?.[0] ||
          "Login failed. Please try again."
      );
    },
  });
};

// ADMIN LOGIN
export const useAdminLogin = () => {
  return useMutation<AuthResponse, any, Credentials>({
    mutationFn: (data) =>
      axios
        .post(BACKEND_URL + "/api/users/auth/login/", data)
        .then((res) => res.data),
  });
};

// SIGN UP
export const useSignup = () => {
  const loginToStore = useAuthStore((state) => state.login);

  return useMutation<AuthResponse, any, SignupData>({
    mutationFn: (data) =>
      api.post("/api/users/auth/registration/", data).then((res) => res.data),
    onSuccess: (data) => {
      loginToStore({
        ...data?.user,
        token: data?.access,
        refreshToken: data?.refresh,
        provider: "credentials",
      });
      toast.success("Signup successful");
    },
    onError: (err) => {
      toast.error(
        err.response?.data?.detail || "Signup failed. Please try again."
      );
    },
  });
};

// LOGOUT
export const useLogout = () => {
  const logout = useAuthStore((state) => state.logout);

  return useMutation<AuthResponse, any>({
    mutationFn: (data) =>
      api.post("/api/users/auth/logout/", data).then((res) => res.data),
    onSuccess: () => {
      logout();
      toast.success("Logout successful");
    },
    onError: (err) => {
      toast.error(
        err.response?.data?.detail || "Logout failed. Please try again."
      );
    },
  });
};

export const useGoogleLogin = () => {
  const loginToStore = useAuthStore((state) => state.login);

  return useMutation<AuthResponse, any, GoogleLoginData>({
    mutationFn: (data) =>
      api.post("/api/users/auth/google/", data).then((res) => res.data),
    onSuccess: (data) => {
      loginToStore({
        ...data?.user,
        token: data?.access,
        refreshToken: data?.refresh,
        provider: "google",
      });
      toast.success("Google login successful");
    },
    onError: (err) => {
      toast.error(
        err.response?.data?.detail || "Google login failed. Please try again."
      );
    },
  });
};

export const useGetUser = () => {
  const token = useAuthStore((state) => state.user?.token);

  return useQuery<AuthResponse["user"], any>({
    queryKey: ["user", token],
    queryFn: () => api.get("/api/users/me/").then((res) => res.data),
    enabled: !!token,
    refetchOnWindowFocus: false,
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation<AuthResponse["user"], any, any>({
    mutationFn: (data) =>
      api.put("/api/users/me/", data).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Profile updated successfully");
    },
    onError: (err) => {
      toast.error(
        err.response?.data?.detail ||
          "Failed to update profile. Please try again."
      );
    },
  });
};

export const useForgotPassword = () => {
  return useMutation<AuthResponse, any, { email: string }>({
    mutationFn: (data) =>
      api.post("/api/users/auth/password/reset/", data).then((res) => res.data),
  });
};

export const useResetPassword = () => {
  return useMutation<
    AuthResponse,
    any,
    {
      uid: string;
      token: string;
      new_password1: string;
      new_password2: string;
    }
  >({
    mutationFn: (data) =>
      api.post("/api/users/auth/set-password/", data).then((res) => res.data),
  });
};
