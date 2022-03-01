import SmallBlackText from "components/common/SmallBlackText";
import SwitchButton from "components/common/SwitchButton";
import useToggle from "hooks/useToggle";
import { palette } from "lib/styles/palette";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { userSelector } from "stores/user";
import styled from "styled-components";
import { REMIND_CYCLE } from "./constants";
import MyPageHead from "./MyPageHead";
import RemindChipButton from "./RemindChipButton";

function MyPageConfiguration() {
  const { remindToggle, remindCycle } = useSelector(userSelector);
  const [isRemind, onToggleRemind] = useToggle(remindToggle);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedCycle, setSelectedCycle] = useState(remindCycle);

  return (
    <>
      <MyPageHead headText="환경 설정" />

      <ConfigurationBlock>
        <RemindToggleBox>
          <SmallBlackText width="297px" label="리마인드 알람 받기" />
          <div className="buttonBox">
            <SwitchButton isChecked={isRemind} onToggle={onToggleRemind} />
          </div>
        </RemindToggleBox>

        <RemindSettingBox>
          <SmallBlackText width="297px" label="리마인드 주기 설정하기" />

          <RemindSettingButtonGroup>
            {REMIND_CYCLE.map((cycle) => (
              <RemindChipButton
                label={`${cycle}일`}
                variant={cycle === selectedCycle ? "primary" : "secondary"}
                disabled={!isRemind}
                key={cycle}
              />
            ))}
          </RemindSettingButtonGroup>
        </RemindSettingBox>
      </ConfigurationBlock>
    </>
  );
}

const ConfigurationBlock = styled.div`
  padding: 16px 0 104px;
  width: 100%;
  color: ${palette.grayDarkest};
`;

const RemindToggleBox = styled.div`
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  height: 48px;
  .buttonBox {
    margin-top: 4px;
    margin-left: 4px;
  }
`;

const RemindSettingBox = styled.div`
  display: flex;
  align-items: center;
`;

const RemindSettingButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1;
`;

export default MyPageConfiguration;
