import api from "@/lib/api";
import { BACKEND_URL } from "@/shared";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetCurrentSubscription = () => {
  return useQuery({
    queryKey: ["current-subscription"],
    queryFn: () =>
      api.get("/api/subscriptions/my-active-pass/").then((res) => res.data),
    retry: false,
  });
};

export const useGetAllAvailablePlans = () => {
  return useQuery({
    queryKey: ["all-available-plans"],
    queryFn: () =>
      axios
        .get(`${BACKEND_URL}/api/subscriptions/passes/`)
        .then((res) => res.data),
    retry: false,
  });
};

export const useCheckoutSessionForLoginUser = () => {
  return useMutation({
    mutationFn: (data: any) =>
      api
        .post(`/api/payments/create-checkout-session/`, data)
        .then((res) => res.data),
  });
};

export const useCheckoutSessionForUnknownUser = () => {
  return useMutation({
    mutationFn: (data: any) =>
      axios
        .post(`${BACKEND_URL}/api/payments/create-checkout-session/`, data)
        .then((res) => res.data),
  });
};
