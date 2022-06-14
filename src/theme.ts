import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        disabled: ({ ownerState, theme }) => ({
          ...(ownerState.disabled && {
            backgroundColor: theme.palette.grey[900],
            color: "red",
          }),
        }),
      },
    },
  },
});

export default theme;
