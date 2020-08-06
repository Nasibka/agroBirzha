// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import Registration from "views/Registration/Registration.js";
import UserProfile from "views/UserProfile/UserProfile";
import Main from "views/Main/Main.js";
import Entrance from "views/Entrance/Entrance.js";
import Manager from 'views/Manager/Manager.js'

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    // icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path:"/registration",
    name:'Register',
    component:Registration,
    layout:"/admin"
  },
  {
    path: "/userProfile",
    name: "User Profile",
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/",
    name: "Main Menu",
    component: Main,
    layout: "/"
  },
  {
    path: "/entrance",
    name: "Entrance",
    component: Entrance,
    layout: "/admin"
  },
  {
    path: "/manager",
    name: "Manager Page",
    component: Manager,
    layout: "/admin"
  },
];

export default dashboardRoutes;
