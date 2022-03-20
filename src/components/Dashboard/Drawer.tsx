import {
  Button,
  Slider,
  SliderProps,
  Stack,
  SwipeableDrawer,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Player, Point, RootState, SingleRound } from "../../redux/reducers";
import { useDispatch, useSelector } from "react-redux";
import { getNameInitials } from "../../utils/helpers";
import { addSingleRound } from "../../redux/actions";
const drawerBleeding = 30;

const StyledBox = styled(Box)`
  background-color: #ffffffe1;
  height: ${drawerBleeding}px;
`;

const Puller = styled(Box)`
  width: 120px;
  height: 6px;
  border-radius: 4px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #bbbbbb;
`;

const Drawer = styled(SwipeableDrawer)`
  .MuiDrawer-paper {
    height: ${`calc(50% - ${drawerBleeding}px)`};
    overflow: visible;
    background-color: #ffffffe1;
  }
`;

const valuetext = (value: number) => `${value}`;

const marks = [
  {
    value: 1,
    label: "1",
  },
  {
    value: 2,
    label: "2",
  },
  {
    value: 3,
    label: "3",
  },
  {
    value: 4,
    label: "4",
  },
  {
    value: 5,
    label: "5",
  },
  {
    value: 6,
    label: "6",
  },
  {
    value: 7,
    label: "7",
  },
  {
    value: 8,
    label: "8",
  },
  {
    value: 9,
    label: "9",
  },
  {
    value: 10,
    label: "10",
  },
];

type CustomSliderProps = SliderProps & { thumbtext: string };

const PrettoSlider = styled(Slider)((props: CustomSliderProps) => ({
  color: "rgba(0, 0, 0, 0.8)",
  height: 8,
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    // border: "2px solid currentColor",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow:
        "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)",
    },
    position: "relative",
    "&::before": {
      content: `"${props.thumbtext}"`,
      position: "absolute",
      top: "0",
      left: "0",
      fontSize: ".8rem",
      display: "flex",
      fontWeight: "500",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      height: "100%",
    },
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 12,
    background: "unset",
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: "50% 50% 50% 0",
    backgroundColor: "#272727b9",
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&:before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
  "& .MuiSlider-markLabel": {
    display: "none",
  },
}));

const BottomDrawer = () => {
  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false);
  const container =
    window !== undefined ? () => window.document.body : undefined;
  const toggleDrawer = (value: boolean) => setIsOpenDrawer(value);
  const players: Array<Player> = useSelector(
    (state: RootState) => state.Game?.currentGame?.players
  );
  // const [singleRound, setSingleRound] = useState<Array<SingleRound>>([]);
  const dispatch = useDispatch();
  const [points, setPoints] = useState<Array<Point>>([]);
  const [point, setPoint] = useState<Point>({
    playerId: "",
    point: 0,
    isSumOfFour: false,
  });
  const handleSliderValueChange = (
    value: number | Array<number>,
    playerId: string | undefined
  ) => {
    if (typeof value === "number") {
      setPoint({
        playerId: playerId || "",
        point: value,
        isSumOfFour: false,
      });
    }
  };

  useEffect(() => {
    if (Object.keys(point || {}).length > 0 && point.playerId) {
      let _points = [...points];
      let foundIndex = _points.findIndex(
        (element) => element.playerId === point?.playerId
      );

      if (foundIndex === -1) {
        _points.push(point || {});
      } else {
        _points[foundIndex] = point;
      }
      setPoints([..._points]);
    }
  }, [point]);
  return (
    <Drawer
      onClose={() => toggleDrawer(false)}
      onOpen={() => toggleDrawer(true)}
      open={isOpenDrawer}
      anchor="bottom"
      container={container}
      swipeAreaWidth={drawerBleeding}
      disableSwipeToOpen={false}
      ModalProps={{
        keepMounted: true,
      }}
    >
      <StyledBox
        sx={{
          position: "absolute",
          top: -drawerBleeding,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          visibility: "visible",
          right: 0,
          left: 0,
        }}
      >
        <Puller />
      </StyledBox>
      <div
        style={{
          width: "100%",
          height: "100%",
          paddingTop: "1rem",
        }}
      >
        <Stack
          direction="column"
          alignItems="center"
          justifyContent="space-between"
          sx={{ height: "90%", margin: "auto", width: "calc(90% - 32px)" }}
        >
          {players &&
            players.length > 0 &&
            players.map((player) => {
              const { playerId, playerName } = player;
              return (
                <PrettoSlider
                  valueLabelDisplay="auto"
                  aria-label="pretto slider"
                  value={
                    points?.find((element) => {
                      return element.playerId === playerId;
                    })?.point || 0
                  }
                  marks={marks}
                  getAriaValueText={valuetext}
                  step={1}
                  max={10}
                  min={0}
                  // name={playerId}
                  thumbtext={getNameInitials(playerName)}
                  key={playerId}
                  onChangeCommitted={(
                    event: React.SyntheticEvent | Event,
                    value: number | Array<number>
                  ) => handleSliderValueChange(value, playerId)}
                />
              );
            })}
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Button
              variant="outlined"
              color="inherit"
              onClick={() => toggleDrawer(false)}
            >
              Clear
            </Button>
            <Button
              variant="contained"
              color="inherit"
              onClick={() => {
                dispatch(addSingleRound(points));
                toggleDrawer(false);
                setPoints([]);
              }}
            >
              Save
            </Button>
          </div>
        </Stack>
      </div>
    </Drawer>
  );
};

export default BottomDrawer;
