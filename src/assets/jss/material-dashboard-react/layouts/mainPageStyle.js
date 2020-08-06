import {
    drawerWidth,
    transition,
    container
  } from "assets/jss/material-dashboard-react.js";
  
  const appStyle = theme => ({
    wrapper: {
      position: "relative",
      top: "0",
      height: "100vh"
    },
    mainPanel: {
      [theme.breakpoints.up("md")]: {
        width: `100%`
      },
      overflow: "auto",
      position: "relative",
      float: "right",
      ...transition,
      maxHeight: "100%",
      width: "100%",
      overflowScrolling: "touch"
    },
    content: {
      marginTop: "70px",
      minHeight: "calc(100vh - 123px)"
    },
  });
  
  export default appStyle;
  