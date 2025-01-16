import {Route, Routes} from 'react-router';
import {loggedRoute, routes} from "../routes";
import React from "react";
import {useAuth} from "../hooks/useAuth.ts";

export const PageRoutes = () => {
  const {token} = useAuth();

  if (token) {
    return <Routes>
      <Route path={loggedRoute.path} element={loggedRoute.Element}/>
    </Routes>
  }

  return (
    <Routes>
      {React.Children.toArray(
        routes.map(({path, Element}) =>
          <Route path={path} element={Element}/>
        )
      )}
    </Routes>
  );
};
