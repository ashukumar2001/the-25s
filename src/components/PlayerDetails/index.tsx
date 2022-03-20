import { useState, ChangeEventHandler, useEffect } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Stack, TextField } from "@mui/material";
import { Player } from "../../redux/reducers";
import { useNavigate } from "react-router-dom";
import { startGame } from "../../redux/actions";
import { useDispatch } from "react-redux";
const steps = [
  {
    label: "Player 1",
  },
  {
    label: "Player 2",
  },
  {
    label: "Player 3",
  },
];
const PlayersDetailsStepper = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [players, setPlayers] = useState<Array<Player>>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handlePlayerNameInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value, name } = e.currentTarget;
    let index: string | undefined = name ? name.split("-").pop() : "";
    let indexNumber: number = parseInt(`${index}`);
    const _players = [...players];
    _players[indexNumber] = {
      playerId: `${Date.now()}`,
      playerName: value,
    };
    setPlayers([..._players]);
  };
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStartGame = () => {
    dispatch(
      startGame({
        players,
        time: new Date(),
        rounds: [],
        isCompleted: false,
      })
    );
    navigate("/dashboard");
  };
  useEffect(() => {
    console.log({ players });
  }, [players]);
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{ width: "100%", height: "100%" }}
    >
      <Box sx={{ maxWidth: 400, margin: "auto" }}>
        <Paper
          square
          elevation={1}
          sx={{
            p: 3,
            background: "rgba(0,0,0,0.8)",
            borderRadius: 2,
            mragin: "auto",
            minWidth: "80%",
          }}
        >
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel
                  optional={
                    index === 2 ? (
                      <Typography variant="caption">Last step</Typography>
                    ) : null
                  }
                >
                  {step.label}
                </StepLabel>
                <StepContent>
                  <TextField
                    id={`palyer-name-${index}`}
                    label="Name"
                    variant="filled"
                    value={
                      (players &&
                        players.length > 0 &&
                        players[index] &&
                        players[index].playerName) ||
                      ""
                    }
                    name={`player-${index}`}
                    onChange={handlePlayerNameInput}
                  />
                  <Box sx={{ mb: 2 }}>
                    <div>
                      <Button
                        color="info"
                        variant="contained"
                        onClick={handleNext}
                        sx={{ mt: 1, mr: 1 }}
                        disabled={
                          !(
                            players &&
                            players.length > 0 &&
                            players[index] &&
                            players[index].playerName !== ""
                          )
                        }
                      >
                        {index === steps.length - 1 ? "Finish" : "Continue"}
                      </Button>
                      <Button
                        disabled={index === 0}
                        onClick={handleBack}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        Back
                      </Button>
                    </div>
                  </Box>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </Paper>
        {activeStep === steps.length && (
          <Paper square elevation={0} sx={{ p: 3 }}>
            <Typography>All steps completed - you&apos;re finished</Typography>
            <Button
              color="primary"
              variant="contained"
              onClick={handleStartGame}
              sx={{ mt: 1, mr: 1 }}
            >
              Start Game
            </Button>
          </Paper>
        )}
      </Box>
    </Stack>
  );
};

export default PlayersDetailsStepper;
