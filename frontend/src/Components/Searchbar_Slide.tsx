import { Cancel, Search } from "@mui/icons-material";
import {
  alpha,
  Box,
  Input,
  InputAdornment,
  Slide,
  styled,
} from "@mui/material";
import { TInputProps, TStackProps } from "../types";
import CustomIconButton from "./CustomIconButton";

type IProps = {
  showSearchbar: boolean;
  setSearchbarClose: () => void;
  containerRef?: React.RefObject<HTMLElement>;
  containerProps?: TStackProps;
} & TInputProps;

export default function Searchbar_Slide({
  showSearchbar,
  setSearchbarClose,
  containerRef,
  containerProps,
  ...rest
}: IProps) {
  return (
    <Slide
      data-testid="klfekl"
      direction="down"
      in={showSearchbar}
      container={containerRef?.current}
      mountOnEnter
      unmountOnExit
    >
      <SearchbarStyle data-testid="dedfe" {...containerProps}>
        <Input
          autoFocus
          fullWidth
          disableUnderline
          placeholder="Search here…"
          startAdornment={
            <InputAdornment position="start" sx={{paddingLeft:"10px"}}>
              <BoxStyle component={Search} />
            </InputAdornment>
          }
          {...rest}
        />
        <CustomIconButton
          data-testid="djweqhj"
          title="Close"
          onClick={setSearchbarClose}
          sx={{paddingRight: "10px"}}
        >
          <Cancel />
        </CustomIconButton>
      </SearchbarStyle>
    </Slide>
  );
}

const BoxStyle = styled(Box)({
  color: "text.disabled",
  width: 20,
  height: 30,
});

const SearchbarStyle = styled("div")(({ theme }) => ({
  zIndex: 99,
  width: "500px",
  height: "50px",
  display: "flex",
  alignItems: "center",
  position: "absolute",
  top: 0,
  left: 0,
  backdropFilter: "blur(6px)",
  WebkitBackdropFilter: "blur(6px)", // Fix on Mobile
  backgroundColor: alpha(theme.palette.background.default, 0.72),
}));
