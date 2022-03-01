enum Path {
  HomePage = "/",
  DotoriPage = "/dotori",
  DotoriFolderPage = "/dotori/:folderId",
  TrashPage = "/trash",
  SearchPage = "/search",
  MyPage = "/my",

  // no Logged In
  LoginPage = "/login",
  RegisterPage = "/register",
}

export default Path;
