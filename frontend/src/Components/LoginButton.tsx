import * as React from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Paper, Stack, TextField, Typography, styled } from "@mui/material";
import ActivityIndicator from "./ActivityIndicator";
import { useAppDispatch, useAppSelector } from "./useReactRedux";
import { loginUser } from "../store/slices/login-slice";

export default function LoginButton() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dispatch = useAppDispatch();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");


  const onSubmit = () => {
    let payload = {
      name: name,
      email: email,
      password: password,
    };

    dispatch(loginUser(payload));
  };


  const { loading } = useAppSelector((state) => state.login);
  

  return (
    <div>
      <ButtonStyle onClick={handleOpen}>Login</ButtonStyle>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <PaperStyle variant="outlined" square>
        <ActivityIndicator loading={loading} />

          <TypographyStyle variant="h4" textAlign="center">
            {" "}
            Sign in{" "}
          </TypographyStyle>
          <StackStyle1>
          <TextField
              size="small"
              id="outlined-basic"
              label="Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              size="small"
              id="outlined-basic"
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              size="small"
              id="outlined-basic"
              label="Password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <ButtonStyle1 variant="contained" size="small" onClick={onSubmit}>
              Login
            </ButtonStyle1>
          </StackStyle1>
        </PaperStyle>
      </Modal>
    </div>
  );
}

const TypographyStyle = styled(Typography)({
  backgroundColor: "#9C2789",
  color: "white",
  borderRadius: "9px 9px 0px 0px ",
});

const PaperStyle = styled(Paper)({
  width: "400px",
  borderRadius: "10px",
  height: "265px",
  boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
  position: "absolute" as "absolute",
  top: "30%",
  left: "34%",
});

const StackStyle1 = styled(Stack)({
  padding: "30px 30px",
  gap: "30px",
});

const ButtonStyle1 = styled(Button)({
  margin: "8px 0px",
});

const ButtonStyle = styled(Button)({
  color: "white",
});
