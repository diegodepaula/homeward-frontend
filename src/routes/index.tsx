import {Registration} from "../pages/Registration";
import {Login} from "../pages/Login";

export const routes = [
  {path: '/login', Element: <Login/>},
  {path: '/', Element: <Login/>},
  {path: '*', Element: <>Oops... Page not found :(</>},
]

export const loggedRoute = {path: '/registration', Element: <Registration/>}