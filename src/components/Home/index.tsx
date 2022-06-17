import { Add } from "@mui/icons-material";
import {
  Button,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  SpeedDialIcon,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Game, PlayerWon, RootState } from "../../redux/reducers";
import DataRow from "../Custom/DataRow";

const Home = () => {
  const gameHistory = useSelector((state: RootState) => state.Game.history);
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

      <List sx={{ maxHeight: "60vh", overflow: "auto" }}>
        {gameHistory &&
          gameHistory.length > 0 &&
          [...gameHistory].map((item: Game, index: number) => {
            const { playerWon, time } = item;
            const gameDate = (time && new Date(time)) || new Date();

            return (
              <ListItem
                onClick={() => {
                  // Do a list click`
                }}
                disablePadding
                key={`game-history-list-item-${index}`}
              >
                <ListItemButton disableGutters>
                  <DataRow
                    sx={{
                      margin: "0 auto",
                      padding: ".75rem .5rem !important",
                    }}
                  >
                    {playerWon?.playerName} &nbsp; {playerWon?.point} &nbsp;
                    {`${gameDate.getDate()}`}
                  </DataRow>
                </ListItemButton>
              </ListItem>
            );
          })}
      </List>
      <Button
        color="primary"
        variant="contained"
        onClick={() => navigate("/players-registration")}
        sx={{
          position: "absolute",
          bottom: "1.5rem",
          right: "1.5rem",
          height: "48px",
          minWidth: "48px",
          padding: "0",
          borderRadius: "50%",
        }}
      >
        <Add sx={{ fontSize: "2rem" }} />
      </Button>
    </div>
  );
};

export default Home;
