import { ICredentialsDto, fetchLoginUser } from "src/api";

const fetchFileList = async (credentials: ICredentialsDto) => {
  await fetchLoginUser(credentials);
};

export { fetchFileList };
