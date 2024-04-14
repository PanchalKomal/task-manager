import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
      background: {
        paper: '#fff',
      },
      text: {
        primary: '#173A5E',
        secondary: '#46505A',
      },    
    },
    typography: {
        fontSize:11,
        borderColor: '#aaaaaa',
        color: '#173A5E', 
        fontFamily: 'sans-serif'             
    },
    components: {
      MuiButton: {
        styleOverrides: {       
          root: {         
            fontSize: '0.8rem',
            borderColor: '#aaaaaa',
            color: '#173A5E',
            height:'30px',
            textTransform: 'none',
            lineHeight:'11px'
          },
        },
      },
      MuiSelect: {
        styleOverrides: {       
          root: {        
            fontSize: '0.8rem',
            borderColor: '#aaaaaa',
            color: '#173A5E',
            height:'30px'
          },
        },
      },
      MuiTextField: {
        styleOverrides: {        
          root: {   
            borderColor: '#aaaaaa',
            color: '#173A5E',    
            width: '80%',            
          },        
        },
        defaultProps: {
          inputProps:{
            style: {
            padding: '7px 10px',          
            fontSize: '0.8rem',         
            }
          }
        }
      },
      MuiInputLabel:{
        
        defaultProps: {       
            style: {
                fontSize: '0.8rem',
            }
        }
      },
      MuiTable:{
        styleOverrides: {        
          root: {   
            maxWidth: 700
          },        
        },
      }, 
      MuiTableCell:{
        styleOverrides: {        
          root: {   
            borderColor: '#aaaaaa',
            color: '#173A5E',    
            fontSize: '0.8rem',
            border:'none',
            padding:'0'        
          },        
        },
        MuiTableHead:{
          styleOverrides: {        
            root: {   
              borderBottom:'1px solid #aaaaaa'                  
            },        
          },          
        }
      }    
    }  
  });

  export default theme;