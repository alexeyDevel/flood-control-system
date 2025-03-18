import { api } from "../config";

export const getFiles = async (): Promise<string[]> => {
  return await api.get("files").json();
};

// export const downloadFile = async (fullName: string): Promise<string[]> => {
//   return await api
//     .post(`files/download`, { json: { fullName: fullName } })
//     .json();
// };

export const downloadFile = async (fullName: string): Promise<void> => {
  const response = await api.post(`files/download`, {
    json: { fullName: fullName },
  });
  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fullName;
  a.click();
  URL.revokeObjectURL(url);
};
