import React from "react";
import DotoriPage from "pages/DotoriPage";
import LandingPage from "pages/LandingPage";
import LoginPage from "pages/LoginPage";
import MyPage from "pages/MyPage";
import NotFoundPage from "pages/NotFoundPage";
import SearchPage from "pages/SearchPage";
import SignUpPage from "pages/SignUpPage";
import TrashPage from "pages/TrashPage";
import { Routes, Route } from "react-router-dom";
import Path from "./path";

const routingComponents = [
  { path: "*", element: <NotFoundPage /> },
  { path: Path.HomePage, element: <LandingPage /> },
  { path: Path.DotoriPage, element: <DotoriPage /> },
  { path: Path.DotoriFolderPage, element: <DotoriPage /> },
  { path: Path.TrashPage, element: <TrashPage /> },
  { path: Path.SearchPage, element: <SearchPage /> },
  { path: Path.MyPage, element: <MyPage /> },
  { path: Path.LoginPage, element: <LoginPage /> },
  { path: Path.SignUpPage, element: <SignUpPage /> },
];

function Routing() {
  return (
    <Routes>
      {routingComponents.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
    </Routes>
  );
}

export default Routing;
