import { useLocation } from "react-router-dom";
import { Route } from "react-router-dom";

export const HashRoute = ({ component: Component, path, ...routeProps }) => {
  const location = useLocation();

  return (
    location.hash === path && Component
  )
}