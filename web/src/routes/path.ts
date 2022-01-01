enum Path {
  HomePage = "/",
  DotoriPage = "/dotori/:folderId",
  TrashPage = "/trash",
  SearchPage = "/search",
  MyPage = "/my",
  ProfileEditPage = "/my/profile",

  // no Logged In
  LoginPage = "/login",
  SignUpPage = "/signup",
}

export default Path;
