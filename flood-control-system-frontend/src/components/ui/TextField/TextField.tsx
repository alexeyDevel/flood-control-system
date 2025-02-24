import { TextField as MuiTextField } from "@mui/material";
import { TTextField } from "./TextField.type";

export const TextField = (props: TTextField) => {
  return <MuiTextField {...props} />;
};
