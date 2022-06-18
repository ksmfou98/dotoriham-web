import {
  BellUnSelectedIcon,
  ProgressDisabled16Icon,
  ProgressFocused16Icon,
} from "assets/icons";
import Input from "components/common/Input";
import { palette } from "lib/styles/palette";
import TextareaAutosize from "react-textarea-autosize";
import React, { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import axios from "axios";
import { getMetaDataByUrl } from "lib/utils/getMetaData";
import { CRAWLING_SERVER_URL } from "lib/constants";
import { DotoriForm } from "./DotoriAddModal";
import _ from "lodash";

interface Props {
  dotoriForm: DotoriForm;
  onChangeForm: (form: DotoriForm) => void;
}

function DotoriAddForm({ dotoriForm, onChangeForm }: Props) {
  const { description, folderId, id, image, remind, title, url } = dotoriForm;
  const [isSuccessFetch, setIsSuccessFetch] = useState(false);
  const heightRef = useRef<HTMLTextAreaElement>(null);

  const onChangeNewForm = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    onChangeForm({
      ...dotoriForm,
      [e.target.name]: e.target.value,
    });
  };

  const getFetchBookmarkMetaData = async (value: string) => {
    console.log(value);
    try {
      const { data } = await axios.post(CRAWLING_SERVER_URL, {
        url: value,
      });
      const metaData = await getMetaDataByUrl(data.html, value);
      onChangeForm({
        ...dotoriForm,
        description: metaData.description,
        image: metaData.image,
        title: metaData.title,
        url: metaData.url,
      });
      setIsSuccessFetch(true);
    } catch (e) {
      console.log(e);
      setIsSuccessFetch(false);
      onChangeForm({
        ...dotoriForm,
        description: "",
        image: "",
        title: "",
        url: "",
      });
    }
  };

  const debounceFetchBookmarkMetaData = _.debounce(
    getFetchBookmarkMetaData,
    500
  );

  useEffect(() => {
    if (heightRef.current) {
      heightRef.current.style.height = "45px"; // textarea 라이브러리가 초기 값을 인라인 css로 강제로 설정해논걸 없애기 위해서 이 방식 썼음
    }
  }, []);

  return (
    <Container>
      <ProgressSection>
        <ProgressFocused16Icon />
        <ProgressColumnBar />
        <ProgressDisabled16Icon />
      </ProgressSection>

      <div>
        <Input
          width="100%"
          height="28px"
          className="url-input"
          placeholder="URL을 입력하세요"
          name="url"
          onChange={(e) => debounceFetchBookmarkMetaData(e.target.value)}
        />

        <OpenGraphBox isDisabled={!isSuccessFetch}>
          <ImageBox>
            {image ? (
              <Image src={image} alt="여기다가 og title 넣자" />
            ) : (
              <DefaultImage />
            )}
          </ImageBox>

          <InputBox>
            <Input
              width="200px"
              height="28px"
              placeholder="og:title"
              name="title"
              value={title}
              disabled={!isSuccessFetch}
              onChange={onChangeNewForm}
            />
            <DescriptionInput
              placeholder="og:description"
              ref={heightRef}
              name="description"
              value={description}
              disabled={!isSuccessFetch}
              onChange={onChangeNewForm}
            />
            <RemindBox>
              <div className="txt">리마인드 on/off</div>

              <div className="ico">
                <BellUnSelectedIcon />
                off
              </div>
            </RemindBox>
          </InputBox>
        </OpenGraphBox>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  .url-input {
    margin-bottom: 20px;
  }
`;

const ProgressSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 16px;
`;

const ProgressColumnBar = styled.div`
  width: 2px;
  height: 24px;
  border-radius: 2px;
  margin: 4px 0;
  background-color: ${palette.primary};
`;

const OpenGraphBox = styled.div<{ isDisabled: boolean }>`
  display: flex;
  margin-bottom: 24px;
  ${({ isDisabled }) =>
    isDisabled &&
    css`
      opacity: 0.3;
      cursor: not-allowed;
    `}
`;

const ImageBox = styled.div`
  width: 100%;
  height: 81px;
  margin-right: 12px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  object-fit: cover;
  border: none;
  background-color: ${palette.lightGreen};
`;

const InputBox = styled.div`
  input {
    margin-bottom: 8px;
  }
`;

const DefaultImage = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${palette.primaryLight};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
`;

const DescriptionInput = styled(TextareaAutosize)`
  margin-bottom: 6px;
  resize: none;
  outline: none;
  width: 100%;
  border-radius: 4px;
  border: solid 1px ${palette.grayLight};
  padding: 5px 12px 6px 8px;
  font-size: 12px;
  height: 45px !important;
`;

const RemindBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  .txt {
    font-size: 10px;
    font-weight: 400;
    color: ${palette.grayDarkest};
  }

  .ico {
    display: flex;
    align-items: center;
    color: ${palette.gray};
    font-weight: 500;
    svg {
      margin-right: 3px;
    }
  }
`;

export default DotoriAddForm;
