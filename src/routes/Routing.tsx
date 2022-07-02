import React from "react";
import DotoriPage from "pages/DotoriPage";
import LoginPage from "pages/LoginPage";
import MyPage from "pages/MyPage";
import NotFoundPage from "pages/NotFoundPage";
import SearchPage from "pages/SearchPage";
import TrashPage from "pages/TrashPage";
import { Routes, Route, Navigate } from "react-router-dom";
import Path from "./Path";
import SidebarRouteLayout from "components/SidebarRouteLayout";
import ProfileEditPage from "pages/ProfileEditPage";
import SignupPage from "pages/SignupPage";
import { useCheckLogin } from "hooks";
import SharePage from "pages/SharePage";

export function PublicRouting() {
  return (
    <Routes>
      <Route path={Path.SharePage} element={<SharePage />} />
      <Route path={Path.LoginPage} element={<LoginPage />} />
      <Route path={Path.SignupPage} element={<SignupPage />} />
      <Route path="*" element={<Navigate replace to={Path.LoginPage} />} />
    </Routes>
  );
}

export function PrivateRouting() {
  useCheckLogin();
  return (
    <Routes>
      <Route path={Path.SharePage} element={<SharePage />} />
      <Route
        path={Path.HomePage}
        element={<Navigate replace to={Path.DotoriPage} />}
      />
      <Route path={Path.MyPage} element={<MyPage />} />
      <Route path={Path.ProfileEditPage} element={<ProfileEditPage />} />

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
