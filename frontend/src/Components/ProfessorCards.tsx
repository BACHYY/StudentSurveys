import { Stack, styled } from "@mui/material";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "./useReactRedux";

const option = [
  { title: "Professor Name", subtitle: "School Name" },
  { title: "Professor Name", subtitle: "School Name" },
  { title: "Professor Name", subtitle: "School Name" },
  { title: "Professor Name", subtitle: "School Name" },
  { title: "Professor Name", subtitle: "School Name" },
  { title: "Professor Name", subtitle: "School Name" },
  { title: "Professor Name", subtitle: "School Name" },
  { title: "Professor Name", subtitle: "School Name" },
  { title: "Professor Name", subtitle: "School Name" },
];

export default function ProfessorCards() {
  const { data } = useAppSelector((state) => state.professor);

  const navigate = useNavigate();

  const navigateToProfessors = () => {
    navigate(`/professor/${data.school}`);
  };

  return (
    <StackStyle1
      alignItems="center"
      justifyContent="flex-start"
      flexDirection="row"
    >
      <>
        {/* {option.map((item) => ( */}
        <StackStyle>
          <CardContent>
            <TypographyStyle color="text.secondary" gutterBottom>
              {data.school}
            </TypographyStyle>
            <Typography variant="h5" component="div">
              {data.name}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={navigateToProfessors}>
              View Profile
            </Button>
          </CardActions>
        </StackStyle>
        {/* ))} */}
      </>
    </StackStyle1>
  );
}

const StackStyle = styled(Stack)({
  gap: "10px",
  width: 275,
  borderRadius: "10px",
  border: "0.5px solid gray",
  backgroundColor: "white",
});

const TypographyStyle = styled(Typography)({
  fontSize: 14,
});

const StackStyle1 = styled(Stack)({
  flexWrap: "wrap",
  gap: "40px",
});
