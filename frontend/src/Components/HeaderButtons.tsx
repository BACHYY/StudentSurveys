import { Button, styled } from "@mui/material";

export default function HeaderTabs() {
  return (
    <>
      <ButtonStyle variant="text">School</ButtonStyle>
      <ButtonStyle variant="text">Professor Reviews</ButtonStyle>
    </>
  );
}

const ButtonStyle = styled(Button)({
  color: "white",
});
