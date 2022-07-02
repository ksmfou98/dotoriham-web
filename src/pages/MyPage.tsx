import React from "react";
import MyPageConfiguration from "modules/mypage/MyPageConfiguration";
import MyPageProfile from "modules/mypage/MyPageProfile";
import MyPageTemplate from "modules/mypage/MyPageTemplate";
import MyPageAccountSetting from "modules/mypage/MyPageAccountSetting";

function MyPage() {
  return (
    <MyPageTemplate>
      <MyPageProfile />
      <MyPageConfiguration />
      <MyPageAccountSetting />
    </MyPageTemplate>
  );
}

export default MyPage;
