import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { Alert, Slide, Snackbar } from "@mui/material";
import React from "react";
import { clearSnackbar } from "../store/slices/snackbar-slice";
import { useAppDispatch, useAppSelector } from "./useReactRedux";

export default function Snack() {
  const { visible, message, severity, variant } = useAppSelector(
    (state) => state.snackbar
  );
  const dispatch = useAppDispatch();

  const onClose = () => {
    dispatch(clearSnackbar());
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      open={visible}
      action={<HighlightOffIcon onClick={onClose} />}
      onClose={onClose}
      autoHideDuration={3000}
      TransitionComponent={Slide}
    >
      <Alert
        onClose={onClose}
        variant={variant}
        severity={severity}
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}