import axios from "axios";
import { useState } from "react";

export const useUpload = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);

  const uploadFile = async (file: File, url: string) => {
    setUploadProgress(0);
    setIsUploading(true);
    return axios
      .put(url, file, {
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded / (progressEvent.total || 1)) * 100
          );
          setUploadProgress(progress);
        },
      })
      .then((res) => {
        setData(res);
        setIsUploading(false);
        setError(null);
        return res;
      })
      .catch((err) => {
        console.log(err);
        setError(err);
        setIsUploading(false);
        setData(null);
        throw err;
      });
  };

  return { uploadProgress, uploadFile, isUploading, data, error };
};
