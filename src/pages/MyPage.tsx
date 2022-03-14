import React from "react";
import MyPageConfiguration from "components/mypage/MyPageConfiguration";
import MyPageProfile from "components/mypage/MyPageProfile";
import MyPageTemplate from "components/mypage/MyPageTemplate";
import MyPageAccountSetting from "components/mypage/MyPageAccountSetting";

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
