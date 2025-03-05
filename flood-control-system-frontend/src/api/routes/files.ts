import { api } from "../config";

export const getFiles = async (): Promise<string[]> => {
  return await api.get("files").json();
};

export const downloadFile = async (fullName: string): Promise<string[]> => {
  return await api
    .get("files", {
      json: {
        fullName: fullName,
      },
    })
    .json();
};
