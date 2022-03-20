import Header from "./Header";
import {
  List,
  ListItem,
  ListItemButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import styled from "@emotion/styled";
import BottomDrawer from "./Drawer";
import { useSelector } from "react-redux";
import { RootState, SingleRound } from "../../redux/reducers";

const PointsText = styled(Typography)`
  height: 36px;
  width: 36px;
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

const Dashboard = () => {
  const rounds: Array<SingleRound> = useSelector(
    (state: RootState) => state.Game?.currentGame?.rounds
  );
  return (
    <>
      <Header />
      <List sx={{ maxHeight: "75vh", overflowY: "auto" }}>
        {rounds &&
          rounds.length > 0 &&
          rounds.map((value, index) => {
            const { points, id } = value;
            return (
              <ListItem
                onClick={() => console.log({ id, points })}
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
                          return (
                            <PointsText
                              key={`round-${index}-point-${pointIndex}`}
                              variant="h6"
                            >
                              {point}
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
