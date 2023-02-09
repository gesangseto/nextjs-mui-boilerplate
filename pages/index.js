import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import * as React from "react";
import Content from "../src/Layouts/Content";
import Header from "../src/Layouts/Header";
import Sidebar from "../src/Layouts/Sidebar";
import LayoutStore from "../src/store/LayoutStore";
const mdTheme = createTheme();

const MyApp = () => {
  const store = new LayoutStore();
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Header LayoutStore={store} />
        <Sidebar LayoutStore={store} />
        <Content />
      </Box>
    </ThemeProvider>
  );
};
export default MyApp;
