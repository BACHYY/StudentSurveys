import React from "react";
import "./App.css";
import { Button, Stack, Typography, styled } from "@mui/material";
import HeaderNavbar from "./Components/HeaderNavbar";

function App() {
  return (
    <StackStyle>
      <HeaderNavbar />
    </StackStyle>
  );
}

export default App;

const StackStyle = styled(Stack)({
  border: "1px solid red",
  height: "100vh",
});
