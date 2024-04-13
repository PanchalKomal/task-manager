import { ThemeProvider } from '@mui/material/styles';
import theme from './muiTheme.js';
import Header from './header.js';
import Content from './content.js';

function Layout() {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Content />
    </ThemeProvider>
  );
}

export default Layout;
