import { useEffect, useState } from "react";

type Props = {
  initialCount: number
}

function Countdown({initialCount}: Props) {
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    if (count > 0) {
      const timeout = setTimeout(() => setCount(currentCount => currentCount - 1), 1000);
      return () => clearTimeout(timeout);
    }
  }, [count]);

  return <div>Time left: {count} seconds</div>
}

export default Countdown;