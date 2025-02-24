import { Button as MuiButton } from "@mui/material";
import { TButton } from "./Button.type";

export const Button = (props: TButton) => {
  return <MuiButton {...props} />;
};
