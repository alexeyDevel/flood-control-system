import { getFiles } from "src/api";
import { $files } from "./files";
import { pushNotification } from "../notification";

const fetchFileList = async () => {
  try {
    const files = await getFiles();
    $files.setKey("fileList", files);
  } catch {
    pushNotification({
      title: "Загрузка списка файлов не удалось",
      variant: "error",
    });
  }
};

export const filesActions = { fetchFileList };
