import Logo from "components/common/Logo";
import { palette } from "lib/styles/palette";
import React, { useCallback, useRef, useState } from "react";
import styled from "styled-components";

function Sidebar() {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [isResizing, setIsResizing] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(250);

  const startResizing = useCallback((mouseDownEvent) => {
    setIsResizing(true);
  }, []);

  const stopResizing = useCallback(() => {
    setIsResizing(false);
  }, []);

  const resize = useCallback(
    (mouseMoveEvent) => {
      if (isResizing && sidebarRef.current) {
        setSidebarWidth(
          mouseMoveEvent.clientX -
            sidebarRef.current.getBoundingClientRect().left
        );
      }
    },
    [isResizing]
  );

  React.useEffect(() => {
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResizing);
    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [resize, stopResizing]);

  return (
    <SidebarBlock
      ref={sidebarRef}
      width={sidebarWidth}
      onMouseDown={(e) => e.preventDefault()}
    >
      <Logo />
      <SidebarResizer onMouseDown={startResizing} />
    </SidebarBlock>
  );
}

const SidebarBlock = styled.aside<{ width: number }>`
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  top: 0;
  min-width: 150px;
  max-width: 40%;
  width: ${({ width }) => width}px;
  height: 100%;
  background-color: ${palette.white};
  border-right: 1px solid ${palette.grayLight};
  z-index: 2;
  padding: 20px 10px 40px 20px;
`;

const SidebarResizer = styled.div`
  position: absolute;
  right: -3px;
  top: 0;
  bottom: 0;
  width: 10px;
  cursor: ew-resize;
  &:hover {
    background-color: ${palette.grayLight};
  }
`;

export default Sidebar;
