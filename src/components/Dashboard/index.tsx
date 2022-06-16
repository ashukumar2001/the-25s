import Header from "./Header";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  List,
  ListItem,
  ListItemButton,
  Paper,
  Stack,
  Typography,
  TypographyProps,
} from "@mui/material";
import styled from "@emotion/styled";
import BottomDrawer from "./Drawer";
import { useDispatch, useSelector } from "react-redux";
import { Game, Player, RootState, SingleRound } from "../../redux/reducers";
import { useEffect, useState } from "react";
import winnerTrophyIcon from "../../assets/icons/winner-trophy.png";
import { useNavigate } from "react-router-dom";
import { setGameHistory, setGameWon } from "../../redux/actions";

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

const DataRow = styled(Paper)`
  display: inline-block;
  width: calc(100% - 16px);
  border-radius: 0.5rem;
  padding: 0.15rem 0.5rem;
  margin: 0.25rem auto;
  background: rgba(0, 0, 0, 0.76);
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
  const { players, playerWon, isCompleted, rounds } = useSelector(
    (state: RootState): Game => state.Game.currentGame
  );

  const totalRoundsWithPoints = [...rounds].map((item) => item.points);

  useEffect(() => {
    if (players && players.length !== 3) {
      navigate("/players-registration", { replace: true });
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
      <Dialog
        open={isCompleted}
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Stack direction="column" alignItems="center" justifyContent="center">
          <img src={winnerTrophyIcon} alt="winner-torphy-icon" />
          <DialogTitle id="alert-dialog-title">
            {playerWon?.playerName} has won the game
          </DialogTitle>
        </Stack>

        <DialogActions>
          {/* <Button onClick={handleClose}>Disagree</Button> */}
          <Button onClick={() => dispatch(setGameHistory())} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <Header />
      <List sx={{ maxHeight: "75vh", overflowY: "auto" }}>
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
