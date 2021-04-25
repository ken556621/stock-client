import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
    breakpoints: {
        values: {
            lg: 1440
        }
    },
    mixins: {
        toolbar: {
            "@media (min-width: 600px)": {
                minHeight: 60
            }
        }
    },
    palette: {
        primary: {
            light: "#779dce",
            main: "#5585c2",
            dark: "#3b5d87"
        },
        error: {
            light: "#fde2e8",
            main: "#f11d4c"
        }
    },
    spacing: 5,
    overrides: {
        MuiAppBar: {
            colorDefault: {
                backgroundColor: "white"
            }
        },
        MuiToolbar: {
            gutters: {
                "@media (min-width: 600px)": {
                    paddingLeft: 20,
                    paddingRight: 20
                }
            }
        },
        MuiButton: {
            root: {
                textTransform: "none",
                borderRadius: 6,
                minWidth: 145,
                lineHeight: 1.7,
                color: "#4a4a4a",
                fontWeight: "normal"
            },
            contained: {
                boxShadow: "none",
                "&.Mui-disabled": {
                    color: "#ffffff",
                    backgroundColor: "#c0c0c0"
                },
                "&:hover": {
                    boxShadow: "none"
                }
            },
            containedPrimary: {
                backgroundColor: "#285a99"
            },
            outlined: {
                color: "#285a99",
                border: "1px solid #285a99"
            }

        },
        MuiDrawer: {
            paperAnchorDockedLeft: {
                borderRightColor: "transparent"
            }
        },
        MuiTableCell: {
            root: {
                "&:first-child": {
                    paddingLeft: 30
                }
            }
        },
        MuiDialogTitle: {
            root: {
                textAlign: "center",
                "& .MuiTypography-h6": {
                    fontSize: "1rem"
                }
            },
        },
        MuiDialog: {
            paperWidthXs: {
                maxWidth: 450
            }
        },
        MuiDialogActions: {
            root: {
                justifyContent: "center"
            }
        },
        MuiPaper: {
            rounded: {
                borderRadius: 6
            },
            elevation1: {
                boxShadow: "0 0 14px 0 rgba(137, 174, 255, 0.2)"
            }
        }
    },
    typography: {
        fontFamily: "Lato, Helvetica, Arial, sans-serif, PingFang, Microsoft JhengHei",
        h1: {
            fontSize: "5.5rem",
            lineHeight: 1.25
        },
        h4: {
            fontSize: "2.25rem"
        }
    }
});

export default theme;