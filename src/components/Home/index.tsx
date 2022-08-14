import { Add } from "@mui/icons-material";
import {
  Button,
  Grid,
  List,
  ListItem,
  ListItemButton,
  Typography,
} from "@mui/material";
import moment from "moment";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Game, RootState } from "../../redux/reducers";
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
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={6}>
                        <Typography variant="subtitle1">
                          {playerWon?.playerName}
                        </Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <Typography variant="subtitle1">
                          {playerWon?.point}
                        </Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <Typography
                          variant="caption"
                          align="right"
                          sx={{
                            color: (theme) => theme.palette.grey[400],
                            marginLeft: "auto",
                          }}
                        >
                          {moment(time).format("DD MMM YY")}
                        </Typography>
                      </Grid>
                    </Grid>
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
