import { createTheme } from "@mui/material/styles";

// Create a theme instance.
const theme = createTheme({
    palette: {
        primary: {
            main: "#00a884",
        },
        secondary: {
            main: "#fff",
        },
        error: {
            main: "#ff2e74",
        },
    },
});

export default theme;
