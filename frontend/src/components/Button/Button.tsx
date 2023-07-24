import React, { ReactNode, MouseEvent } from "react";
import styled from "styled-components";

interface ButtonProps {
  name?: string;
  icon?: React.ReactElement;
  onClick?: () => void;
  bg?: string;
  bPad?: string;
  color?: string;
  bRad?: string;
  iColor?: string;
  hColor?: string;
}

const ButtonStyled = styled.button<ButtonProps>`
  outline: none;
  border: none;
  font-family: inherit;
  font-size: inherit;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.4s ease-in-out;
  background: ${(props) => props.bg};
  padding: ${(props) => props.bPad};
  border-radius: ${(props) => props.bRad};
  color: ${(props) => props.color};
  fill: ${(props) => props.iColor};
  &:hover {
    background: ${(props) => props.hColor || props.bg} !important;
  }
`;

function Button({
  name,
  icon,
  onClick,
  bg,
  bPad,
  color,
  bRad,
  iColor,
  hColor,
}: ButtonProps) {
  return (
    <ButtonStyled
      bg={bg}
      bPad={bPad}
      color={color}
      bRad={bRad}
      onClick={onClick}
      iColor={iColor}
      hColor={hColor}
    >
      {icon}
      {name}
    </ButtonStyled>
  );
}

export default Button;
