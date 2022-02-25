import React from "react";
import DotoriPage from "pages/DotoriPage";
import LoginPage from "pages/LoginPage";
import MyPage from "pages/MyPage";
import NotFoundPage from "pages/NotFoundPage";
import SearchPage from "pages/SearchPage";
import SignUpPage from "pages/SignUpPage";
import TrashPage from "pages/TrashPage";
import { Routes, Route, Navigate } from "react-router-dom";
import Path from "./Path";
import SidebarRouteLayout from "../components/common/SidebarRouteLayout";

function Routing() {
  return (
    <Routes>
      <Route path={Path.LoginPage} element={<LoginPage />} />
      <Route path={Path.SignUpPage} element={<SignUpPage />} />
      <Route
        path={Path.HomePage}
        element={<Navigate replace to={Path.DotoriPage} />}
      />
      <Route path={Path.MyPage} element={<MyPage />} />

      <Route path={Path.HomePage} element={<SidebarRouteLayout />}>
        <Route path={Path.DotoriPage} element={<DotoriPage />} />
        <Route path={Path.DotoriFolderPage} element={<DotoriPage />} />
        <Route path={Path.TrashPage} element={<TrashPage />} />
        <Route path={Path.SearchPage} element={<SearchPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default Routing;
