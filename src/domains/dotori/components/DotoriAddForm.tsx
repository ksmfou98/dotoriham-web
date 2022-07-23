import {
  BellSelectedIcon,
  BellUnSelectedIcon,
  ProgressDisabled16Icon,
  ProgressFinish16Icon,
  ProgressFocused16Icon,
} from "assets/icons";
import Input from "components/Input/Input";
import { palette } from "lib/styles/palette";
import TextareaAutosize from "react-textarea-autosize";
import React, { useEffect, useMemo, useRef, useState } from "react";
import styled, { css } from "styled-components";
import axios from "axios";
import { getMetaDataByUrl } from "lib/utils/getMetaData";
import { CRAWLING_SERVER_URL } from "lib/constants";
import { DotoriForm } from "types/dotori";
import { useQuery } from "react-query";
import { useInput } from "domains/@shared/hooks";
import useQueryDebounce from "domains/@shared/hooks/useQueryDebounce";
import LoadingIcon from "assets/images/loading.gif";
import { DotoriDefaultImage } from "domains/@shared/components";

interface Props {
  dotoriForm: DotoriForm;
  onChangeForm: (form: DotoriForm) => void;
}

const getCrawlingData = async (value: string) => {
  const { data } = await axios.post(CRAWLING_SERVER_URL, {
    url: value,
  });
  return data;
};

function useDotoriAddQuery(value: string) {
  const {
    data = { html: "" },
    isFetching: isCrawlingDataFetching,
    isError: isCrawlingDataError,
    isSuccess: isCrawlingDataSuccess,
  } = useQuery(["test", value], () => getCrawlingData(value), {
    cacheTime: Infinity,
    staleTime: Infinity,
    retry: false,
    enabled: value.length > 0,
  });

  const {
    data: metaData,
    isFetching: isMetaDataFetching,
    isError: isMetaDataError,
    isSuccess: isMetaDataSuccess,
  } = useQuery(["test1", value], () => getMetaDataByUrl(data.html, value), {
    cacheTime: Infinity,
    staleTime: Infinity,
    retry: false,
    keepPreviousData: true,
    enabled: data && !!data.html,
  });

  const isLoading = isCrawlingDataFetching || isMetaDataFetching;
  const isError = isCrawlingDataError || isMetaDataError;
  const isSuccess = isCrawlingDataSuccess && isMetaDataSuccess;

  return {
    metaData,
    isSuccess,
    isLoading,
    isError,
  };
}
function DotoriAddForm({ dotoriForm, onChangeForm }: Props) {
  const { description, image, title, remind } = dotoriForm;
  const heightRef = useRef<HTMLTextAreaElement>(null);
  const [linkValue, onChangeLinkValue] = useInput("");
  const [imageLoadError, setImageLoadError] = useState(false);
  const onImageLoadError = () => setImageLoadError(true);

  const onChangeNewForm = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    onChangeForm({
      ...dotoriForm,
      [e.target.name]: e.target.value,
    });
  };

  const _linkValue = useQueryDebounce(linkValue, 1000);

  const { metaData, isLoading, isError, isSuccess } =
    useDotoriAddQuery(_linkValue);

  useEffect(() => {
    if (isError) {
      onChangeForm({
        ...dotoriForm,
        description: "",
        image: "",
        title: "",
        link: "",
      });
    } else if (!isLoading) {
      onChangeForm({
        ...dotoriForm,
        description: metaData?.description || "",
        image: metaData?.image || "",
        title: metaData?.title || "",
        link: metaData?.url || "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [metaData, isError, isSuccess]);

  useEffect(() => {
    if (heightRef.current) {
      heightRef.current.style.height = "45px"; // textarea 라이브러리가 초기 값을 인라인 css로 강제로 설정해논걸 없애기 위해서 이 방식 썼음
    }
  }, []);

  const onRemindToggle = () => {
    onChangeForm({
      ...dotoriForm,
      remind: !dotoriForm.remind,
    });
  };

  const isDisabledForm = useMemo(
    () => _linkValue.length === 0 || isLoading,
    [_linkValue, isLoading]
  );

  return (
    <Container>
      <ProgressSection>
        {_linkValue.length === 0 ? (
          <ProgressFocused16Icon />
        ) : (
          <ProgressFinish16Icon />
        )}

        <ProgressColumnBar isDisabled={isDisabledForm} />

        {(function () {
          switch (true) {
            case isDisabledForm === true:
              return <ProgressDisabled16Icon />;
            case !isDisabledForm && title.length > 0 && description.length > 0:
              return <ProgressFinish16Icon />;
            default:
              return <ProgressFocused16Icon />;
          }
        })()}
      </ProgressSection>

      <Content>
        <Input
          width="100%"
          height="28px"
          className="url-input"
          placeholder="URL을 입력하세요"
          name="link"
          onChange={onChangeLinkValue}
        />

        <OpenGraphBox isDisabled={_linkValue.length === 0}>
          {isLoading ? (
            <LoadingIconBox>
              <img src={LoadingIcon} width="70" alt="loading" />
            </LoadingIconBox>
          ) : (
            <>
              <ImageBox>
                {image && !imageLoadError ? (
                  <Image
                    src={image}
                    alt="og-title"
                    onError={onImageLoadError}
                  />
                ) : (
                  <DotoriDefaultImage />
                )}
              </ImageBox>

              <InputBox>
                <Input
                  width="200px"
                  height="28px"
                  placeholder="og:title"
                  name="title"
                  value={title}
                  disabled={isDisabledForm}
                  onChange={onChangeNewForm}
                />
                <DescriptionInput
                  placeholder="og:description"
                  ref={heightRef}
                  name="description"
                  value={description}
                  disabled={isDisabledForm}
                  onChange={onChangeNewForm}
                />
                <RemindBox>
                  <div className="txt">리마인드 on/off</div>

                  <div className="ico" onClick={onRemindToggle}>
                    {remind ? (
                      <>
                        <BellSelectedIcon />
                        on
                      </>
                    ) : (
                      <>
                        <BellUnSelectedIcon />
                        off
                      </>
                    )}
                  </div>
                </RemindBox>
              </InputBox>
            </>
          )}
        </OpenGraphBox>
      </Content>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  .url-input {
    margin-bottom: 20px;
  }
`;

const Content = styled.div`
  width: 335px;
`;

const ProgressSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 16px;
`;

const ProgressColumnBar = styled.div<{ isDisabled: boolean }>`
  width: 2px;
  height: 24px;
  border-radius: 2px;
  margin: 4px 0;
  background-color: ${({ isDisabled }) =>
    isDisabled ? palette.grayLightest : palette.primary};
`;

const LoadingIconBox = styled.div`
  width: 100%;
  height: 115px;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    margin-right: 15px;
    z-index: 999;
  }
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
    cursor: pointer;
    svg {
      margin-right: 3px;
    }
  }
`;

export default DotoriAddForm;
