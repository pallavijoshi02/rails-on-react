import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const Primary = '#3F51B5';
const Secondary = '#4CAF50';
const BodyColor = '#333';
const BodyBG = '#fff';

const theme = createMuiTheme({

  overrides: {
    MuiFormControlLabel: {
      label: {
        '&.label-large': {
          fontSize: '1rem',
        },
      },
    },
    MuiTableRow: {
      root: {
        '&:nth-child(odd)': {
          backgroundColor: 'rgba(0, 0, 0, 0.03)',
        },
      },
    },
    MuiTableCell: {
      root: {
        padding: '4px 0px 4px 24px',
      },
    },
    MUIDataTableHeadCell: {
      toolButton: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      },
      sortAction: {
        height: 'auto',
      },
    },
    MUIDataTableBodyCell: {
      cellStacked: {
        '@media (max-width: 961px)': {
          width: '100% !important',
          height: '100% !important',
          borderBottomWidth: '0px !important',
          backgroundColor: 'transparent !important',
          paddingBottom: 0,
          color: '#999',
          fontSize: 12,
        }
      },
      responsiveStacked: {
        '@media (max-width: 961px)': {
          width: '100% !important',
          height: '100% !important',
          whiteSpace: 'normal !important',
          paddingTop: 0,
          borderBottomWidth: 0,
          '& .table-actions': {
            marginTop: -20,
          },
        },
      },
    },
    MUIDataTableFilter: {
      selectFormControl: {
        flex: '1 1 200px',
        marginRight: 0,
      },
    },    
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 601,
      md: 961,
      lg: 1441,
      xl: 1921,
    },
  },
  palette: {
    primary: {
      main: Primary,
      contrastText: '#fff'
    },
    secondary: {
      main: Secondary,
      contrastText: '#fff'
    },
    background: {
      default: BodyBG,
    },
    text: {
      primary: BodyColor,
      secondary: BodyColor,
    },
  },
  typography: {
    useNextVariants: true,
    fontFamily: '"Open Sans", "Helvetica", "Arial", sans-serif',
  },
  
})

class MuiTheme extends React.Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        {this.props.children}
      </MuiThemeProvider>
    )
  }

}

export default MuiTheme;