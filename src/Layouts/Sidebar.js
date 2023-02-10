import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import { styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import * as React from "react";
import { useEffect } from "react";
import { SuperMenu } from "./SuperMenu";
import DashboardIcon from "@mui/icons-material/Dashboard";

import { observer } from "mobx-react-lite";
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  tooltipClasses,
} from "../../node_modules/@mui/material/index";
import {
  ChevronRight,
  ExpandMore,
} from "../../node_modules/@mui/icons-material/index";
const drawerWidth = 240;
const menus = [
  { label: "Dashboard", to: "/", children: [] },
  {
    label: "Master",
    to: null,
    children: [
      { label: "Product", to: "/Master/Product", children: [] },
      { label: "User", to: "/Master/User", children: [] },
    ],
  },
  { label: "Setting", to: "/", children: [] },
];
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 16,
  },
}));
const renderMenu = (item, index, useToolTip) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [childMenu, setChildeMenu] = React.useState([]);

  useEffect(() => {
    if (item.children && item.children.length > 0) {
      setChildeMenu([...item.children]);
    }
  }, [item]);

  return (
    <div key={index}>
      <ListItemButton
        href={item.to ? item.to : null}
        onClick={() => (childMenu.length > 0 ? setIsOpen(!isOpen) : null)}
      >
        <LightTooltip title={useToolTip ? item.label : null} placement="right">
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
        </LightTooltip>
        <ListItemText primary={item.label} />
        {childMenu.length > 0 ? (
          isOpen ? (
            <ExpandMore />
          ) : (
            <ChevronRight />
          )
        ) : null}
      </ListItemButton>
      {isOpen &&
        childMenu.length > 0 &&
        childMenu.map((it, i) => renderChildMenu(it, i))}
    </div>
  );
};

const renderChildMenu = (item, index) => {
  return (
    <ListItemButton
      sx={{ ml: 2 }}
      key={index}
      href={item.to ? item.to : null}
      onClick={() => console.log(item.to)}
    >
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary={item.label} />
    </ListItemButton>
  );
};

const Sidebar = ({ LayoutStore }) => {
  useEffect(() => {
    // console.log(LayoutStore.open);
  }, [LayoutStore.open]);

  return (
    <Drawer variant="permanent" open={LayoutStore.open}>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          px: [1],
        }}
      >
        <IconButton onClick={() => LayoutStore.changeOpen()}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List component="nav">
        <React.Fragment>
          {menus.map((item, i) => renderMenu(item, i, !LayoutStore.open))}
        </React.Fragment>
        <Divider sx={{ my: 1 }} />
        {SuperMenu}
      </List>
    </Drawer>
  );
};
export default observer(Sidebar);
