import { IconButton, Tooltip } from "@mui/material";
import { ExtraComponentProps, IButtonBase } from "../types";

type IProps = {
  title: string;
  children: JSX.Element | JSX.Element[];
} & IButtonBase &
  ExtraComponentProps;
export default function CustomIconButton({ title, children, ...rest }: IProps) {
  return (
    <Tooltip data-testid="dajsdh" title={title} arrow>
      <span>
        <IconButton size="small" {...rest}>
          {children}
        </IconButton>
      </span>
    </Tooltip>
  );
}
