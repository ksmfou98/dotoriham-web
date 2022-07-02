import { palette } from 'lib/styles/palette';
import transitions from 'lib/styles/transitions';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import ModalPortal from './ModalPortal';

interface IModalInnerStyled {
  width: number;
  height: number;
  isModal: boolean;
}

interface ModalTemplateProps extends IModalInnerStyled {
  children: React.ReactNode;
  className?: string;
  onToggleModal: () => void;
}

function ModalTemplate({
  width,
  height,
  isModal,
  children,
  className,
  onToggleModal,
  ...rest
}: ModalTemplateProps) {
  useEffect(() => {
    if (isModal) window.document.body.style.overflow = 'hidden';
    return () => {
      window.document.body.style.overflow = 'unset';
    };
  }, [isModal]);

  return (
    <ModalPortal>
      <ModalTemplateBlock onMouseDown={onToggleModal} {...rest}>
        <ModalInner
          width={width}
          height={height}
          isModal={isModal}
          className={className}
          onMouseDown={(e) => e.stopPropagation()}
        >
          {children}
        </ModalInner>
        <ModalBackground />
      </ModalTemplateBlock>
    </ModalPortal>
  );
}

const ModalTemplateBlock = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 9999;
`;

const ModalInner = styled.div<IModalInnerStyled>`
  position: absolute;
  z-index: 9999;
  background-color: ${palette.white};
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  margin: auto;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  border-radius: 12px;
  animation: ${transitions.fadeIn} 0.4s ease-in-out;
`;

const ModalBackground = styled.div`
  display: block;
  width: 100%;
  height: 100%;
  background-color: ${palette.black};
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0.4;
`;

export default ModalTemplate;
