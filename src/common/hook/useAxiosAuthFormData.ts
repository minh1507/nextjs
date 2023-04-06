"use client";
import { axiosFormData } from "../axios";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRefreshToken } from "./useRefreshToken";

const useAxiosFormData = () => {
  const { data: session } = useSession();
  const refreshToken = useRefreshToken();

  useEffect(() => {
    const requestIntercept = axiosFormData.interceptors.request.use(
      (config:any) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${session?.user?.accessToken}`;
        }
        return config;
      },
      (error:any) => Promise.reject(error)
    );

    const responseIntercept = axiosFormData.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;
          await refreshToken();
          prevRequest.headers["Authorization"] = `Bearer ${session?.user.accessToken}`;
          return axiosFormData(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
        axiosFormData.interceptors.request.eject(requestIntercept);
        axiosFormData.interceptors.response.eject(responseIntercept);
    };
  }, [session, refreshToken]);

  return axiosFormData;
};

export default useAxiosFormData;