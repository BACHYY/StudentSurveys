import { Button, Stack, styled, Typography } from "@mui/material";
import logo from "../assets/logo.png";
import NavbarMenu from "./NavbarMenu";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "./useReactRedux";

export default function HeaderNavbar() {
  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate("/signin");
  };

  const navigateToSignup = () => {
    navigate("/signup");
  };

  const { data } = useAppSelector((state) => state.login);

  return (
    <StackStyle1
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
    >
      <Link to="/">
        <ImageStyle src={logo} alt="logo" />
      </Link>

      {data.name ? (
        <Stack flexDirection="row" justifyContent="flex-end" alignItems="center"> 
        <Typography sx={{ color: "white" }}> {data.name} </Typography>
        <NavbarMenu />
        </Stack>

      ) : (
        <StackStyle2
          flexDirection="row"
          alignItems="center"
          justifyContent="space-around"
        >
          <ButtonStyle1 variant="text" size="small" onClick={navigateToLogin}>
            Sign-in
          </ButtonStyle1>
          <ButtonStyle
            variant="contained"
            color="secondary"
            size="small"
            onClick={navigateToSignup}
          >
            Sign-Up
          </ButtonStyle>
        </StackStyle2>
      )}
      
    </StackStyle1>
  );
}

const StackStyle1 = styled(Stack)({
  height: "60px",
  padding: "0px 10px",
  backgroundColor: "black",
});

const StackStyle2 = styled(Stack)({
  gap: "25px",
});

const ButtonStyle = styled(Button)({
  borderRadius: "20px",
});

const ButtonStyle1 = styled(Button)({
  borderRadius: "20px",
  color: "white",
});

const ImageStyle = styled("img")({
  width: "200px",
  height: "58px",
});
