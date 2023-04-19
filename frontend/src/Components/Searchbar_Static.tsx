import { SearchRounded } from "@mui/icons-material";
import { Stack, styled, Typography } from "@mui/material";
import { ExtraComponentProps } from "../types";
import CustomIconButton from "./CustomIconButton";

type IProps = {
  setSearchbarOpen: () => void;
};
export default function Searchbar_Static({ setSearchbarOpen }: IProps) {
  return (
    <StackStyle
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      onClick={setSearchbarOpen}
    >
      <Typography variant="body1" color="GrayText" sx={{ paddingLeft: "15px" }}>
        Search Professor & Schools here…
      </Typography>
      <CustomIconButton title="Search" sx={{ paddingRight: "15px" }}>
        <SearchRounded fontSize="medium" />
      </CustomIconButton>
    </StackStyle>
  );
}

const StackStyle = styled(Stack)<ExtraComponentProps>(({ theme }) => ({
  border: "0.5px solid gray",
  backgroundColor: theme.palette.background.default,
  width: "500px",
  height: "50px",
  borderRadius: 50,
}));
