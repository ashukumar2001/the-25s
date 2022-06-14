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
import { useSelector } from "react-redux";
import { RootState, SingleRound } from "../../redux/reducers";
import { useEffect, useState } from "react";

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
  const [isGameCompleted, setIsGameCompleted] = useState<boolean>(false);
  const rounds: Array<SingleRound> = useSelector(
    (state: RootState) => state.Game?.currentGame?.rounds
  );
  const totalRoundsWithPoints = [...rounds].map((item) => item.points);

  useEffect(() => {
    const allValues = [...totalRoundsWithPoints].reduce((prev, curr) => {
      return curr.map((item, index) => {
        return { ...item, point: item.point + prev[index].point };
      });
    });
    const playerWin = allValues.find((item) => item.point >= 25);
    if (playerWin && Object.keys(playerWin).length > 0) {
      setIsGameCompleted(true);
    }
  }, [totalRoundsWithPoints]);
  return (
    <>
      <Dialog
        open={isGameCompleted}
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Someone won the game</DialogTitle>
        {/* <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent> */}
        <DialogActions>
          {/* <Button onClick={handleClose}>Disagree</Button> */}
          <Button onClick={() => {}} autoFocus>
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
                            allPointsWithCurrentIndex.reduce(
                              (prev, current) => {
                                return prev + current.point;
                              },
                              0
                            );
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
