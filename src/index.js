import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { Router, Route, Switch, Redirect } from "react-router-dom";
import rootReducer from './reducers/reducers'

// core components
import Admin from "layouts/Admin.js";
import MainPage from "layouts/MainPage.js";

import "assets/css/material-dashboard-react.css?v=1.9.0";

const store = createStore(rootReducer)

const hist = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
  <Router history={hist}>
    <Switch>
      <Route path="/admin" component={Admin} />
      <Route path="/" component={MainPage} />
    </Switch>
  </Router>
  </Provider>,
  document.getElementById("root")
);
