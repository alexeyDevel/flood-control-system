import { map } from "nanostores";
import { TFileList } from "src/api";

export const $files = map<{ fileList: TFileList[] }>({
  fileList: [],
});
