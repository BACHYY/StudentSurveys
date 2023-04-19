import {
    CircularProgress,
    Fade,
    Stack,
    styled,
    Typography,
  } from "@mui/material";
  import { TStackProps } from "../types";
  
  type IProps = {
    loading: boolean;
  
    fixed?: true;
    size?: number;
    text?: string;
  } & TStackProps;
  function ActivityIndicator({ loading, fixed, size, text, ...rest }: IProps) {
    return (
      <Fade in={loading} timeout={300} unmountOnExit>
        <StyledContainer
          justifyContent="center"
          alignItems="center"
          fixed={fixed}
          {...rest}
        >
          <CircularProgress size={size} />
          {text && (
            <Typography variant="h6" color="primary.main">
              {text}
            </Typography>
          )}
        </StyledContainer>
      </Fade>
    );
  }
  
  export default ActivityIndicator;
  
  interface ExtraProps {
    fixed?: true;
  }
  const StyledContainer = styled(Stack, {
    shouldForwardProp: (prop) => prop !== "fixed",
  })<ExtraProps>(({ fixed }) => ({
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
  
    backdropFilter: "blur(1.5px)",
  
    backgroundColor: "rgba(255,255,255,0.01)",
  
    zIndex: 1200,
    position: fixed ? "fixed" : "absolute",
  }));
  