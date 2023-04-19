import { Stack, styled } from "@mui/material";
import HeaderNavbar from "../Components/HeaderNavbar";
import MainPageImageComponent from "../Components/MainPageImageComponent";

export default function MainPage() {
  return (
    <StackStyle>
      <HeaderNavbar />
      <MainPageImageComponent />
    </StackStyle>
  );
}

const StackStyle = styled(Stack)({
  height: "100vh",
});
