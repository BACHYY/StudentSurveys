import { Button, Stack, Typography, styled } from "@mui/material";
import React from "react";
import HeaderTabs from "./HeaderTabs";

export default function HeaderNavbar() {
  return (
    <StackStyle1
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
    >
      <TypographyStyle variant="h5">StudentSurveys</TypographyStyle>
      <StackStyle2
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <HeaderTabs />
        <ButtonStyle variant="contained" color="secondary" size="medium">
          Sign UP
        </ButtonStyle>
      </StackStyle2>
    </StackStyle1>
  );
}
const StackStyle1 = styled(Stack)({
  height: "60px",
  padding: "0px 10px",
  background: "gray",
});
const StackStyle2 = styled(Stack)({
  gap: "25px",
});
const ButtonStyle = styled(Button)({
  borderRadius: "20px",
});
const TypographyStyle = styled(Typography)({
  color: "white",
});
