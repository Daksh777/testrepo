import api from "@/lib/api";
import { BACKEND_URL } from "@/shared";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetReportData = (id: string, token: string) => {
  return useQuery({
    queryKey: ["report", id],
    queryFn: () => getSampleReportData(id, token),
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !!id && !!token,
  });
};

const getSampleReportData: any = async (id: string, token: string) => {
  return api
    .post(
      `/api/data/neighborhood/overview/${id}/`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => res.data);
};

const getFullReportData = async (id: string, token: string) => {
  try {
    const response = await axios.get(
      `${BACKEND_URL}/api/reports/data/${id}/?token=${token}`
    );
    return [response.data, null];
  } catch (error) {
    return [null, error];
  }
};

const getFullReportDataEC2 = async (id: string, token: string) => {
  try {
    const response = await axios.post(
      `http://ec2-13-43-119-206.eu-west-2.compute.amazonaws.com/data/neighborhood/report_data/${id}/?overview=false`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return [response.data, null];
  } catch (error) {
    return [null, error];
  }
};

export const useGetFullReportDataEC2 = (id: string, token: string) => {
  return useQuery({
    queryKey: ["full-report-ec2", id, token],
    queryFn: () => getFullReportDataEC2(id, token),
    retry: false,
    refetchOnWindowFocus: false,
  });
};

export const useGetFullReportData = (id: string, token: string) => {
  return useQuery({
    queryKey: ["full-report", id, token],
    queryFn: () => getFullReportData(id, token),
    retry: false,
    refetchOnWindowFocus: false,
  });
};

export const usePostGenerateReport = () => {
  const baseUrl = `${BACKEND_URL}/api/reports/generate/`;

  return useMutation({
    mutationFn: (data: any) => api.post(baseUrl, data).then((res) => res.data),
  });
};

export const useGetDownloadReport = (id: string) => {
  const baseUrl = `${BACKEND_URL}/api/reports/${id}/regenerate-url/`;
  return useMutation({
    mutationFn: (data: any) => api.post(baseUrl, data).then((res) => res.data),
  });
};
