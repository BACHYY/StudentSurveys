import {
  ClickAwayListener,
  Stack,
  styled,
  SxProps,
  Theme,
} from "@mui/material";
import { useRef, useState } from "react";
import { TInputProps } from "../types";
import Searchbar_Slide from "./Searchbar_Slide";
import Searchbar_Static from "./Searchbar_Static";
// ----------------------------------------------------------------------
interface ExtraProps {
  relative: boolean;
}
type IProps = {
  relative?: boolean;
  sx?: SxProps<Theme>;
  setSearch?: React.Dispatch<React.SetStateAction<string>>;
} & TInputProps;

export default function Searchbar({
  relative = false,
  sx,
  setSearch,
  ...rest
}: IProps) {
  const [showSearchbar, setShowSearchbar] = useState(false);
  const containerRef = useRef(null);

  const setSearchbarClose = () => {
    setSearch?.("");
    setShowSearchbar(false);
  };
  const setSearchbarOpen = () => {
    setShowSearchbar(true);
  };
  const onClickAway = () => {
    if (rest.value) return;

    setSearchbarClose();
  };

  return (
    <ClickAwayListener onClickAway={onClickAway}>
      <StyledStackContainer
        data-testid="djkasdnsajkdn"
        ref={containerRef}
        relative={relative}
        sx={sx}
      >
        <Searchbar_Static setSearchbarOpen={setSearchbarOpen} />

        <Searchbar_Slide
          showSearchbar={showSearchbar}
          setSearchbarClose={setSearchbarClose}
          containerRef={containerRef}
          containerProps={{
            sx: {
              borderRadius: {
                xs: "50px",
              },
              overflow: {
                xs: "hidden",
              },
            },
          }}
          onChange={(e) => setSearch?.(e.target.value)}
          {...rest}
        />
      </StyledStackContainer>
    </ClickAwayListener>
  );
}

// ----------------------------------------------------------------------

const StyledStackContainer = styled(Stack, {
  shouldForwardProp: (prop) => prop !== "relative",
})<ExtraProps>(({ theme, relative }) => ({
  width: "100%",
  height: 50,
  overflow: "hidden",
  position: "relative",
  [theme.breakpoints.down("xs")]: {
    position: relative ? "relative" : "unset",
  },
}));
