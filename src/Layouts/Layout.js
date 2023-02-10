import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import * as React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import LayoutStore from "../store/LayoutStore";
const mdTheme = createTheme();

const Layout = ({ children }) => {
  const store = new LayoutStore();
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Header LayoutStore={store} />
        <Sidebar LayoutStore={store} />
        {children}
      </Box>
    </ThemeProvider>
  );
};
export default Layout;
