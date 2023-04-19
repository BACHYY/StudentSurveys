import { AlertColor } from "@mui/material";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TState = {
    visible: boolean;
    message: string;
    severity: AlertColor;
    variant: "standard" | "outlined" | "filled";
};
type TPayloadType = {
    severity?: TState['severity'];
    variant?: TState['variant'];
}

const initialState: TState = {
    visible: false,
    message: '',
    severity: 'info',
    variant: 'standard',
};

export const snackbarSlice = createSlice({
    name: "snackbar",
    initialState,
    reducers: {
        setSnackbar: (state, action: PayloadAction<TState>): TState => action.payload,
        clearSnackbar: (state): TState => ({ ...state, visible: false })
    },
});

export default snackbarSlice.reducer;



export const { clearSnackbar } = snackbarSlice.actions
export const setSnackbar = (message: string, props?: TPayloadType) => {
    const { severity = 'info', variant = 'filled' } = props ?? {};
    return snackbarSlice.actions.setSnackbar({
        visible: true,
        message,
        severity,
        variant,
    });
}
