import { Stack, styled } from "@mui/material";
import HeaderNavbar from "../Components/HeaderNavbar";
import ProfessorCards from "../Components/ProfessorCards";


export default function School() {
  return (
    <StackStyle>
      <HeaderNavbar />
      <StackStyle1>
        <ProfessorCards />
      </StackStyle1>
    </StackStyle>
  );
}

const StackStyle = styled(Stack)({
  height: "100vh",
  backgroundColor: "#FCFBF3",
});

const StackStyle1 = styled(Stack)({
  padding: "20px",
  height: "100%",
});
