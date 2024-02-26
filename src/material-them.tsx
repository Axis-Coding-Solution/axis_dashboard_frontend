import { createTheme } from "@mui/material/styles";

const LightTheme = createTheme({
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
                body1: {
                    fontSize: '1rem',
                    fontWeight: '300',
                    letterSpacing: '1px',
                },
                body2: {
                    fontSize: '1rem',
                    fontWeight: '300',
                    letterSpacing: '1px',
                },
                h1: {
                    fontSize: '2rem',
                    fontWeight: '300',
                    letterSpacing: '1px',
                },
                h2: {
                    fontSize: '1.5rem',
                    fontWeight: '500',
                    letterSpacing: '1px',
                },
                h3: {
                    fontSize: '1.25rem',
                    fontWeight: '700',
                    letterSpacing: '1px',
                },
                h4: {
                    display:"flex",
                    fontSize: '1rem',
                    fontWeight: '600',
                    letterSpacing: '2px',
                },
                h5: {
                    display:"flex",
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    letterSpacing: '1px',
                    color:"gray"
                },
                subtitle1: {
                    fontSize: '0.75rem',
                    fontWeight: '300',
                    letterSpacing: '1px',
                    color:"gray"
                },
                subtitle2: {
                    fontSize: '1rem',
                    fontWeight: '300',
                    letterSpacing: '1px',

                }
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
                        background: "#599669",
                        color: "#fff",
                        width: "40%",
                        marginTop: "15px",
                        marginBottom: "15px",
                        letterSpacing: "1px",
                        fontWeight: "400",
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
        MuiIconButton: {
            styleOverrides: {
                root: {
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
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    // backgroundColor: '#059669',
                    backgroundColor: "#fff",
                    width: '100%',
                    color: '#000',
                    boxShadow: 'none',
                    padding: "25px 25px"
                },
            }
        },
        MuiStack: {
            styleOverrides: {
                root: {
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '100%',
                    // backgroundColor: 'red',
                }
            }
        },
        MuiAvatar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#fff',
                    color: 'rgba(55, 140, 159, 1)',
                }
            }
        },
        MuiLinearProgress: {
            styleOverrides: {
                root: {
                    backgroundColor: '#fff',
                    height: '3px',
                    borderRadius: '0px',
                    borderColor: '#fff',
                    color: 'rgba(55, 140, 159, 1)',
                }
            }
        },
        MuiTable: {
            styleOverrides: {
                root: {
                    backgroundColor: '#fff',
                    color: 'rgba(55, 140, 159, 1)',
                }
            }
        },
        MuiTableBody: {
            styleOverrides: {
                root: {
                    color: '#000',
                }
            }
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    color:"#000"
                }
            }
        }

    }

});

const DarkTheme = createTheme({
    palette: {
        mode: "light",
        background: {
            default: "#000",
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
                body1: {
                    fontSize: '1rem',
                    fontWeight: '300',
                    letterSpacing: '1px',
                },
                body2: {
                    fontSize: '1rem',
                    fontWeight: '300',
                    letterSpacing: '1px',
                },
                h1: {
                    fontSize: '2rem',
                    fontWeight: '300',
                    letterSpacing: '1px',
                },
                h2: {
                    fontSize: '1.5rem',
                    fontWeight: '500',
                    letterSpacing: '1px',
                    color: "red"
                },
                h3: {
                    fontSize: '1.25rem',
                    fontWeight: '700',
                    letterSpacing: '1px',
                    color: "white"
                },
                h4: {
                    display:"flex",
                    fontSize: '1rem',
                    fontWeight: '600',
                    letterSpacing: '2px',
                },
                h5: {
                    display:"flex",
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    letterSpacing: '1px',
                },
                subtitle1: {
                    fontSize: '1rem',
                    fontWeight: '300',
                    letterSpacing: '1px',
                },
                subtitle2: {
                    fontSize: '1rem',
                    fontWeight: '300',
                    letterSpacing: '1px',

                }
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
                    backgroundColor: '#000',
                    fontSize: '1rem',
                    fontWeight: '300',
                    letterSpacing: '1px',
                    textTransform: 'capitalize',

                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
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
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    // backgroundColor: '#059669',
                    // backgroundColor: "#000",
                    width: '100%',
                    color: '#fff',
                    boxShadow: 'none',
                    padding: "25px 25px"
                },
            }
        },
        MuiStack: {
            styleOverrides: {
                root: {
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '100%',
                    // backgroundColor: 'red',
                }
            }
        },
        MuiAvatar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#fff',
                    color: 'rgba(55, 140, 159, 1)',
                }
            }
        },
        MuiLinearProgress: {
            styleOverrides: {
                root: {
                    backgroundColor: '#fff',
                    height: '3px',
                    borderRadius: '0px',
                    borderColor: '#fff',
                    color: 'rgba(55, 140, 159, 1)',
                }
            }
        },
        MuiTable: {
            styleOverrides: {
                root: {
                    backgroundColor: '#059669',
                    color: 'rgba(55, 140, 159, 1)',
                }
            }
        },
        MuiTableBody: {
            styleOverrides: {
                root: {
                    color: '#fff',
                }
            }
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    color:"#fff"
                }
            }
        }

    }

});


export { LightTheme, DarkTheme };
