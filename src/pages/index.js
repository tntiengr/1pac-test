import React, { lazy } from "react";
import KeyPath from "constant/KeyPath"

const Situation = lazy(() => import("pages/situation"));
const Noticed = lazy(() => import("pages/noticedCountries"));

const Routes = [
  {
    path: KeyPath.Home + "/*",
    element: (
      <Situation />
    ),
  },
  {
    path: KeyPath.Noticed + "/*",
    element: (
      <Noticed />
    ),
  },
]

export default Routes;