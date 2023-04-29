import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Avatar, Divider, Stack, styled, Typography } from "@mui/material";
import HeaderNavbar from "../Components/HeaderNavbar";
import SettingsUserReviews from "../Components/SettingsUserReviews";
import { useAppSelector } from "../Components/useReactRedux";

export default function SettingsReviews() {
  const { data } = useAppSelector((state) => state.login);

  return (
    <StackStyle0>
      <HeaderNavbar />
      <StackStyle
        flexDirection="row"
        alignItems="center"
        justifyContent="space-around"
      >
        <StackStyle2
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <AvatarStyle />
          <Typography variant="h3">{data.name}</Typography>
        </StackStyle2>

        <Stack alignItems="center">
          <TypographyStyle variant="h4"> 0 </TypographyStyle>
          <Stack flexDirection="row" alignItems="center">
            <StarBorderIcon fontSize="small" />
            <TypographyStyle2 variant="body2"> Reviews</TypographyStyle2>
          </Stack>
        </Stack>
      </StackStyle>
      <Divider />

      <SettingsUserReviews />
    </StackStyle0>
  );
}

const StackStyle = styled(Stack)({
  height: "200px",
  backgroundColor: "white",
});

const StackStyle2 = styled(Stack)({
  gap: "10px",
});

const TypographyStyle = styled(Typography)({
  fontWeight: "bold",
});

const TypographyStyle2 = styled(Typography)({
  color: "blue",
  fontWeight: "bold",
});

const AvatarStyle = styled(Avatar)({
  height: "100px",
  width: "100px",
});

const StackStyle0 = styled(Stack)({
  backgroundColor: "#FCFBF3",
});
