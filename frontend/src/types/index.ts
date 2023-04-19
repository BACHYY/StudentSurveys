import {
  ButtonBaseTypeMap,
  IconButtonTypeMap,
  InputBaseProps,
  Theme,
} from "@mui/material";
import { MUIStyledCommonProps } from "@mui/system";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

export type TStackProps = MUIStyledCommonProps<Theme> &
  React.HTMLAttributes<HTMLDivElement>;

export type TFieldError =
  | FieldError
  | Merge<FieldError, FieldErrorsImpl<any>>
  | undefined;

export type TInputProps = MUIStyledCommonProps<Theme> & InputBaseProps;

export type ExtraComponentProps = {
  component?: React.ElementType;
  to?: string;
};

export type IButtonBase = IconButtonTypeMap["props"] &
  ButtonBaseTypeMap["props"] &
  React.DOMAttributes<HTMLButtonElement>;
