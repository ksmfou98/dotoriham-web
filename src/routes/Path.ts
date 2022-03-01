enum Path {
  HomePage = "/",
  DotoriPage = "/dotori",
  DotoriFolderPage = "/dotori/:folderId",
  TrashPage = "/trash",
  SearchPage = "/search",
  MyPage = "/my",
  ProfileEditPage = "/my/profile",

  // no Logged In
  LoginPage = "/login",
  RegisterPage = "/register",
}

export default Path;
