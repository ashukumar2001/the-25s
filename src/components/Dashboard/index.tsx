/* eslint-disable react-hooks/exhaustive-deps */
import Header from "./Header";
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Stack,
  Typography,
  TypographyProps,
} from "@mui/material";
import styled from "@emotion/styled";
import BottomDrawer from "./Drawer";
import { useDispatch, useSelector } from "react-redux";
import { Game, RootState } from "../../redux/reducers";
import { useEffect, useState } from "react";
import winnerTrophyIcon from "../../assets/icons/winner-trophy.png";
import { useNavigate } from "react-router-dom";
import { quitGame, setGameHistory, setGameWon } from "../../redux/actions";
import DataRow from "../Custom/DataRow";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";

const PointsText = styled(Typography)`
  height: 36px;
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  &.MuiTypography-h6 {
    color: #ffffff;
    font-weight: 500;
    font-size: 1.2rem;
    line-height: 10px;
  }
`;

type CustomPointsChangeTextProps = TypographyProps & {
  type: "green" | "none";
};
const PointsChangedText = styled(Typography)(
  (props: CustomPointsChangeTextProps) => ({
    fontSize: "0.8rem",
    ...(props.type === "green" && { color: "green" }),
  })
);

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isShowGameQuitDialog, setIsShowGameQuitDialog] = useState(false);
  const { players, playerWon, isCompleted, rounds } = useSelector(
    (state: RootState): Game => state.Game.currentGame
  );

  const totalRoundsWithPoints = [...rounds].map((item) => item.points);

  useEffect(() => {
    if (players && players.length !== 3) {
      navigate("/", { replace: true });
    }
  }, [players]);

  useEffect(() => {
    const allValues =
      totalRoundsWithPoints.length > 0
        ? [...totalRoundsWithPoints].reduce((prev, curr) => {
            return curr.map((item, index) => {
              return { ...item, point: item.point + prev[index].point };
            });
          })
        : [];
    const playerWon = allValues.find((item) => item.point >= 25);
    if (playerWon && Object.keys(playerWon).length > 0) {
      const playerProfile = players.find(
        (p) => p.playerId === playerWon.playerId
      );
      dispatch(
        setGameWon({
          playerWon: { ...playerWon, ...(playerProfile || {}) },
          isCompleted: true,
        })
      );
    }
  }, [rounds]);

  return (
    <>
      <Dialog open={isCompleted} aria-labelledby="winner-label">
        <Stack direction="column" alignItems="center" justifyContent="center">
          <img src={winnerTrophyIcon} alt="winner-torphy-icon" />
          <DialogTitle id="winner-label">
            {playerWon?.playerName} has won the game
          </DialogTitle>
        </Stack>

        <DialogActions>
          <Button onClick={() => dispatch(setGameHistory())} autoFocus>
            Okay!
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={isShowGameQuitDialog} aria-labelledby="quit-game-label">
        <DialogTitle id="quit-game-label">
          Are you sure you want to quit this game?
        </DialogTitle>

        <DialogActions>
          <Button onClick={() => setIsShowGameQuitDialog(false)} autoFocus>
            Cancel
          </Button>
          <Button
            onClick={() => {
              setIsShowGameQuitDialog(false);
              dispatch(quitGame());
            }}
          >
            Quit
          </Button>
        </DialogActions>
      </Dialog>
      <Container sx={{ padding: ".75rem 0" }} disableGutters>
        <IconButton onClick={() => setIsShowGameQuitDialog(true)}>
          <ArrowBackIosRoundedIcon sx={{ fontSize: "1.25rem" }} />
        </IconButton>
      </Container>
      <Header />
      <List sx={{ maxHeight: "75vh", overflowY: "auto", paddingTop: "0" }}>
        {rounds &&
          rounds.length > 0 &&
          rounds.map((value, index) => {
            const currentRoundsWithPoints = [...totalRoundsWithPoints].slice(
              0,
              index + 1
            );
            const { points, id } = value;
            return (
              <ListItem
                onClick={() => {
                  // Do a list click`
                }}
                disablePadding
                key={`listItem-${id}`}
              >
                <ListItemButton disableGutters>
                  <DataRow sx={{ margin: "0 auto" }}>
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      {points &&
                        points.length > 0 &&
                        points.map((element, pointIndex) => {
                          const { point } = element;
                          const allPointsWithCurrentIndex = [
                            ...currentRoundsWithPoints,
                          ].map((item) => item[pointIndex]);
                          const sumOfAllPoints =
                            allPointsWithCurrentIndex?.length > 0
                              ? allPointsWithCurrentIndex.reduce(
                                  (prev, current) => {
                                    return prev + current.point;
                                  },
                                  0
                                )
                              : [];
                          return (
                            <PointsText
                              key={`round-${index}-point-${pointIndex}`}
                              variant="h6"
                            >
                              {sumOfAllPoints}
                              <PointsChangedText
                                variant="caption"
                                type={point > 0 ? "green" : "none"}
                              >
                                &nbsp;{`(+${point})`}
                              </PointsChangedText>
                            </PointsText>
                          );
                        })}
                    </Stack>
                  </DataRow>
                </ListItemButton>
              </ListItem>
            );
          })}
      </List>
      <BottomDrawer />
    </>
  );
};

export default Dashboard;
