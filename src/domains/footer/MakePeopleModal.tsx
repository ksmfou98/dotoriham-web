import React from "react";
import ModalTemplate from "domains/common/ModalTemplate";
import ModalCloseButton from "domains/common/ModalCloseButton";
import styled from "styled-components";
import { palette } from "lib/styles/palette";
import { MakePeopleIMG } from "assets/images";
import { DOTORIHAM_MAKE_PEOPLE } from "./constants";

interface Props {
  isModal: boolean;
  onToggleModal: () => void;
}

function MakePeopleModal({ isModal, onToggleModal }: Props) {
  return (
    <ModalTemplate
      isModal={isModal}
      onToggleModal={onToggleModal}
      width={714}
      height={471}
    >
      <Inner>
        <ModalCloseButton onClick={onToggleModal} visible />
        <Title>만든 사람들</Title>

        <Content>
          <PeopleImage src={MakePeopleIMG} alt="만든 사람들" />
          <PeopleList>
            {DOTORIHAM_MAKE_PEOPLE.map(({ field, name, activity }) => (
              <PeopleItem key={name} disabled={!activity}>
                <PeopleField>{field}</PeopleField>
                <PeopleName>{name}</PeopleName>
              </PeopleItem>
            ))}
          </PeopleList>
        </Content>
      </Inner>
    </ModalTemplate>
  );
}

const Inner = styled.div`
  padding: 20px;
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  font-size: 22px;
  font-weight: 500;
  color: ${palette.black};
  text-align: center;
  margin-bottom: 14px;
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
`;

const PeopleImage = styled.img`
  width: 340px;
  height: 340px;
  margin-right: 46px;
`;

const PeopleList = styled.div`
  padding: 55px 0 33px 0;
  width: 154px;
`;

const PeopleItem = styled.div<{ disabled?: boolean }>`
  font-weight: 500;
  letter-spacing: -0.1px;
  line-height: 1.5;
  width: 77px;
  float: left;
  ${({ disabled }) => disabled && `opacity: 0.3;`}
`;

const PeopleField = styled.div`
  font-size: 12px;
  color: ${palette.primary};
  margin-bottom: 2px;
  width: 77px;
`;

const PeopleName = styled.div`
  width: 77px;
  font-size: 14px;
  margin-bottom: 42px;
  color: ${palette.grayDarkest};
`;

export default MakePeopleModal;
