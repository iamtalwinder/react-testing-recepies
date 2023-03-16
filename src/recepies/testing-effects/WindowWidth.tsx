import React, { useState, useEffect } from 'react';

export const handleResize = (setWidth: (width: number) => void) => () => {
  setWidth(window.innerWidth);
};

function WindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const resizeListener = handleResize(setWidth);

    window.addEventListener('resize', resizeListener);

    return () => window.removeEventListener('resize', resizeListener);
  }, []);

  return (
    <div>Window width: {width}</div>
  );
}

export default WindowWidth;
