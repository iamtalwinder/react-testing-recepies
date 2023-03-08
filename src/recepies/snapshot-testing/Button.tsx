import React from 'react';

type ButtonProps = {
  text?: string;
  onClick?: () => void;
  color?: string;
  disabled?: boolean;
};

function Button({ text, onClick, color, disabled }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      style={{ backgroundColor: color }}
      disabled={disabled}>
      {text}
    </button>
  );
};

export default Button;
