import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        mode: "light",
        background: {
            default: "#fff",
        },
        primary: {
            main: '#059669',
        },
        secondary: {
            main: '#C0C0C0',
        },
    },
    components: {
        MuiFormLabel: {
            styleOverrides: {
                root: {
                    color: 'gray',
                    fontSize: '0.80rem',
                    fontWeight: '300',
                    letterSpacing: '2px',
                },
            },
        },
        MuiTypography: {
            styleOverrides: {
                root: {
                    color: '#059669',
                    fontSize: '1rem',
                    fontWeight: '300',
                    letterSpacing: '1px',
                    textTransform: 'capitalize',
                },
            },
        },
        MuiListItem: {
            styleOverrides: {
                root: {
                    color: '#059669',
                    fontSize: '1rem',
                    fontWeight: '300',
                    letterSpacing: '1px',
                },
            },
        },
        MuiButton: {
            variants: [
                {
                    props: { variant: "contained", color: "primary" },
                    style: {
                        background: "#059669",
                        color: "#fff",
                        width: "100%"
                    }
                },
                {
                    props: { variant: "outlined", color: "secondary" },
                    style: {
                        background: "green",
                        color: "#fff"
                    }
                }
            ]
        },
        MuiContainer: {
            styleOverrides: {
                root: {
                    backgroundColor: '#fff',
                    fontSize: '1rem',
                    fontWeight: '300',
                    letterSpacing: '1px',
                    textTransform: 'capitalize',

                },
            },
        },
        MuiIconButton:{
            styleOverrides:{
                root:{
                    color: 'red',
                    fontSize: '1rem',
                    fontWeight: '300',
                    letterSpacing: '1px',
                }
            }
        },
        MuiAccordion: {
            styleOverrides: {
                root: {
                    borderBottom: '1px solid #fff',

                }
            }
        },
        MuiAccordionSummary: {
            styleOverrides: {
                root: {
                    color: 'gray',
                    borderBottom: '1px solid #fff',
                }
            }
        }

    }

});

export default theme;
