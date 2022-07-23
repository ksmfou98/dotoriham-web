import { CheckBox, DividerLine } from "components";
import { ellipsis, palette } from "lib/styles";
import { ReactNode, useState } from "react";
import styled from "styled-components";
import { DotoriDefaultImage } from "../DotoriDefaultImage";

interface Props {
  title?: string;
  description?: string;
  link: string;
  imageSrc?: string;
  profileImageSrc?: string;
  profileName?: string;
  bottomMenu?: ReactNode;
  checked?: boolean;
  isActiveSelectBox?: boolean;
  onToggleChecked?: () => void;
  onClickLink?: () => void;
}

function DotoriCard({
  link,
  description,
  imageSrc,
  profileImageSrc,
  profileName,
  title,
  bottomMenu,
  isActiveSelectBox,
  onToggleChecked,
  checked,
  onClickLink,
}: Props) {
  const [imageLoadError, setImageLoadError] = useState(false);
  const onImageloadError = () => setImageLoadError(true);

  return (
    <Container>
      <Inner>
        <ImageBox
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClickLink}
        >
          {imageSrc && !imageLoadError ? (
            <DotoriImage
              src={imageSrc}
              alt="og-image"
              onError={onImageloadError}
            />
          ) : (
            <DotoriDefaultImage width={60} height={60} />
          )}

          {isActiveSelectBox && (
            <SelectButton
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                onToggleChecked && onToggleChecked();
              }}
              variant="primary"
              isChecked={checked || false}
            />
          )}
        </ImageBox>

        <Content>
          <ContentLinked
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClickLink}
          >
            <Title>{title || "제목없음"}</Title>
            <Description>{description}</Description>
          </ContentLinked>

          <DividerLine color={palette.grayLightest} width="100%" />

          <DotoriBottomArea>
            <Author>
              {profileImageSrc && (
                <ProfileImg src={profileImageSrc} alt="프로필 이미지" />
              )}
              {profileName && <>{profileName}</>}
            </Author>

            {bottomMenu}
          </DotoriBottomArea>
        </Content>
        {checked && <SelectedStyled />}
      </Inner>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Inner = styled.div`
  flex: 1 auto;
  display: flex;
  min-height: 331px;
  flex-direction: column;
  border-radius: 8px;
  position: relative;
  transition: box-shadow 0.25s ease-in 0s, transform 0.25s ease-in 0s;
  box-shadow: 0 1px 4px 0 ${palette.shadow0};
  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 20px 0 ${palette.shadow3};
    z-index: 9999;
  }
`;

const ImageBox = styled.a`
  width: 273px;
  height: 152px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const DotoriImage = styled.img`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
  object-fit: cover;
  border-radius: 8px 8px 0 0;
`;

const SelectButton = styled(CheckBox)`
  position: absolute;
  top: 8px;
  left: 8px;
  z-index: 100;
`;

const Content = styled.div`
  padding: 14px 20px 15px;
  width: 273px;
  display: flex;
  flex-direction: column;
  flex: 1 auto;
`;

const ContentLinked = styled.a`
  flex: 1 auto;
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;
  width: 233px;
  color: ${palette.black};
  margin-bottom: 8px;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const Description = styled.div`
  font-size: 12px;
  font-weight: normal;
  line-height: 1.42;
  width: 233px;
  color: ${palette.grayDark};
  margin-bottom: 23.5px;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const DotoriBottomArea = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  margin-top: 13px;
`;

const Author = styled.div`
  width: 100px;
  font-size: 12px;
  line-height: 1.42;
  color: ${palette.grayDarker};
  ${ellipsis}
  display: flex;
  align-items: center;
`;

const ProfileImg = styled.img`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  margin-right: 6px;
  &:hover {
    cursor: pointer;
  }
`;

const SelectedStyled = styled.div`
  width: 100%;
  height: 100%;
  border: solid 1px ${palette.primary};
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${palette.shadow1};
  border-radius: 8px;
`;

export default DotoriCard;
