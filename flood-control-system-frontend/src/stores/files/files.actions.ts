import { getFiles } from "src/api";
import { $files } from "./files";

const fetchFileList = async () => {
  const files = await getFiles();
  $files.setKey("fileList", files);
};

export const filesActions = { fetchFileList };
