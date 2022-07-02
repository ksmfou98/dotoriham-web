import React from "react";
import MyPageConfiguration from "domains/mypage/MyPageConfiguration";
import MyPageProfile from "domains/mypage/MyPageProfile";
import MyPageTemplate from "domains/mypage/MyPageTemplate";
import MyPageAccountSetting from "domains/mypage/MyPageAccountSetting";

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
