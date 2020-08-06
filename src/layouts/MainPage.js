import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Navbar from "components/Navbars/Navbar.js";
import Footer from "components/Footer/Footer.js";

import routes from "routes.js";

import styles from "assets/jss/material-dashboard-react/layouts/mainPageStyle.js";

// import bgImage from "assets/img/back.jpeg";
// import logo from "assets/img/reactlogo.png";

const switchRoutes = (
  <Switch>
    {routes.map((prop, key) => {
      if (prop.layout === "/") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      }
      return null;
    })}
    {/* <Redirect from="/" to="/" /> */}
  </Switch>
);

const useStyles = makeStyles(styles);

export default function Admin({ ...rest }) {
  // styles
  const classes = useStyles();
  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = React.createRef();
  // states and functions
  // const [image, setImage] = React.useState(bgImage);
  // const [color, setColor] = React.useState("blue");
  // const [fixedClasses, setFixedClasses] = React.useState("dropdown show");
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };



  return (
    <div className={classes.wrapper}>
      <div className={classes.mainPanel} ref={mainPanel}>
        <Navbar
          routes={routes}
          handleDrawerToggle={handleDrawerToggle}
          {...rest}
        />
        
        <div className={classes.content}>
          {/* <div className={classes.container}> */}
          {switchRoutes}
          {/* </div> */}
        </div>

        <Footer />

      </div>
    </div>
  );
}
