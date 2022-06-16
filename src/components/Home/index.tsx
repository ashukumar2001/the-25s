import { Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Typography
        align="center"
        variant="h4"
        sx={{
          fontWeight: "600",
          padding: "1.75rem 0",
          color: "#ddd",
        }}
      >
        The 25s
      </Typography>

      <Container
        sx={{ display: "flex", justifyContent: "center", marginTop: "50vh" }}
      >
        <Button
          onClick={() => navigate("/players-registration")}
          variant="contained"
          color="primary"
        >
          Start Game
        </Button>
      </Container>
    </div>
  );
};

export default Home;
