import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Path from "./Path";
import SidebarRouteLayout from "modules/sidebar/SidebarRouteLayout";
import { useCheckLogin } from "hooks";

const SharePage = lazy(() => import("modules/share/pages/SharePage"));
const ProfileEditPage = lazy(() => import("pages/ProfileEditPage"));
const SignupPage = lazy(() => import("pages/SignupPage"));
const LoginPage = lazy(() => import("pages/LoginPage"));
const MyPage = lazy(() => import("pages/MyPage"));
const NotFoundPage = lazy(() => import("pages/NotFoundPage"));
const TrashPage = lazy(() => import("pages/TrashPage"));
const SearchPage = lazy(() => import("pages/SearchPage"));
const DotoriPage = lazy(() => import("modules/dotori/pages/DotoriPage"));

export function PublicRouting() {
  return (
    <Suspense fallback={<div css="min-height: 100vh" />}>
      <Routes>
        <Route path={Path.SharePage} element={<SharePage />} />
        <Route path={Path.LoginPage} element={<LoginPage />} />
        <Route path={Path.SignupPage} element={<SignupPage />} />
        <Route path="*" element={<Navigate replace to={Path.LoginPage} />} />
      </Routes>
    </Suspense>
  );
}

export function PrivateRouting() {
  useCheckLogin();
  return (
    <Suspense fallback={<div css="min-height: 100vh" />}>
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
    </Suspense>
  );
}
