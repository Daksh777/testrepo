import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import axios from "axios";
import { BACKEND_URL } from "@/shared";
import { useAdminAuthStore } from "@/stores/adminAuthStore";

const adminApi = axios.create({
  baseURL: BACKEND_URL || "https://api-dev.unmapt.io",
});

adminApi.interceptors.request.use(
  (config) => {
    const { admin } = useAdminAuthStore.getState();
    if (admin?.token) {
      config.headers.Authorization = `Bearer ${admin.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

adminApi.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export const useAdminDashboardStats = () => {
  return useQuery({
    queryKey: ["admin-dashboard-stats"],
    queryFn: () => adminApi.get("/api/admin/insights/").then((res) => res.data),
  });
};

export const useGetAllUsers = (page: number, search: string) => {
  return useQuery({
    queryKey: ["admin-users", page, search],
    queryFn: () =>
      adminApi
        .get("/api/admin/users/", {
          params: { page, search },
        })
        .then((res) => res.data),
  });
};

export const useGetSingleUser = (id: string) => {
  return useQuery({
    queryKey: ["admin-users", id],
    queryFn: () =>
      adminApi.get(`/api/admin/users/${id}/`).then((res) => res.data),
  });
};

export const useGetAllReports = (
  page: number = 1,
  search: string = "",
  status: string = ""
) => {
  return useQuery({
    queryKey: ["admin-reports", page, search, status],
    queryFn: ({ signal }) =>
      adminApi
        .get("/api/admin/reports/", {
          params: {
            page,
            ...(search && { user: search }),
            ...(status && status !== "All Statuses" && { status }),
          },
          signal,
        })
        .then((res) => res.data),
  });
};

export const useGetSingleReport = () => {
  return useMutation({
    mutationFn: (data: { id: string }) =>
      adminApi.get(`/api/admin/reports/${data.id}/`).then((res) => res.data),
  });
};

export const useGetAllTransactions = (
  page: number = 1,
  user: string = "",
  status: string = ""
) => {
  return useQuery({
    queryKey: ["admin-transactions", page, user, status],
    queryFn: ({ signal }) =>
      adminApi
        .get("/api/admin/transactions/", {
          params: {
            page,
            ...(user && { user }),
            ...(status && status !== "All Statuses" && { status }),
          },
          signal,
        })
        .then((res) => res.data),
  });
};

export const useGetAllPasses = () => {
  return useQuery({
    queryKey: ["admin-passes"],
    queryFn: ({ signal }) =>
      adminApi
        .get("/api/subscriptions/admin/passes/", {
          signal,
        })
        .then((res) => res.data),
  });
};

export const useAddNewPass = () => {
  return useMutation({
    mutationFn: (data: any) =>
      adminApi
        .post("/api/subscriptions/admin/passes/", data)
        .then((res) => res.data),
  });
};

export const useEditPass = () => {
  return useMutation({
    mutationFn: (data: any) =>
      adminApi
        .put(`/api/subscriptions/admin/passes/${data.id}/`, data)
        .then((res) => res.data),
  });
};

export const useCreatePass = () => {
  return useMutation({
    mutationFn: (data: any) =>
      adminApi
        .post("/api/subscriptions/admin/passes/", data)
        .then((res) => res.data),
    onSuccess: () => {
      toast.success("Pass created successfully");
    },
    onError: (err: any) => {
      toast.error(
        err.response?.data?.detail || "Failed to create pass. Please try again."
      );
    },
  });
};

export const useUpdatePass = () => {
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) =>
      adminApi
        .put(`/api/subscriptions/admin/passes/${id}/`, data)
        .then((res) => res.data),
    onSuccess: () => {
      toast.success("Pass updated successfully");
    },
    onError: (err: any) => {
      toast.error(
        err.response?.data?.detail || "Failed to update pass. Please try again."
      );
    },
  });
};

export const useGetPassDetails = (id: number) => {
  return useQuery({
    queryKey: ["admin-pass-details", id],
    queryFn: () =>
      adminApi
        .get(`/api/subscriptions/admin/passes/${id}/`)
        .then((res) => res.data),
    enabled: !!id && id > 0,
  });
};

export const useDeletePass = () => {
  return useMutation({
    mutationFn: (id: number | string) =>
      adminApi
        .delete(`/api/subscriptions/admin/user-passes/${id}/`)
        .then((res) => res.data),
  });
};

export const useAssignPassToUser = () => {
  return useMutation({
    mutationFn: (data: { user: number; pass_type: number }) =>
      adminApi
        .post("/api/subscriptions/admin/user-passes/", data)
        .then((res) => res.data),
    onSuccess: () => {
      toast.success("Pass assigned successfully");
    },
    onError: (err: any) => {
      toast.error(
        err.response?.data?.detail || "Failed to assign pass. Please try again."
      );
    },
  });
};

export const useGetAllDatabase = () => {
  return useQuery({
    queryKey: ["admin-database"],
    queryFn: () => adminApi.get("/api/data/files/").then((res) => res.data),
    refetchOnWindowFocus: false,
  });
};

export const useGetUploadLink = () => {
  return useMutation({
    mutationFn: (filename: string) =>
      adminApi.get(`api/data/file/upload/${filename}`).then((res) => res.data),
  });
};

export const usePostLinkFile = () => {
  return useMutation({
    mutationFn: (data: { category: string; filename: string }) =>
      adminApi.post("/api/data/file/", data).then((res) => res.data),
  });
};

export const useImportDatabase = () => {
  return useMutation({
    mutationFn: (category: string) =>
      adminApi
        .post(`/api/data/import/?category=${category}`)
        .then((res) => res.data),
  });
};

export const useGetAllLogs = () => {
  return useQuery({
    queryKey: ["admin-logs"],
    queryFn: () =>
      adminApi.get("/api/data/import_tasks/").then((res) => res.data),
  });
};

export const useGetReportConfig = () => {
  return useQuery({
    queryKey: ["admin-report-config"],
    queryFn: () =>
      adminApi.get("/api/data/report_config/").then((res) => res.data),
  });
};

export const usePostReportConfig = () => {
  return useMutation({
    mutationFn: (data: any) =>
      adminApi.post("/api/data/report_config/", data).then((res) => res.data),
  });
};
