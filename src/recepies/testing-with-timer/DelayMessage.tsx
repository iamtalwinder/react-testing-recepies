import { useEffect, useState } from "react";

type Props = {
  message: string;
  delay: number;
}

function DelayMessage({message, delay}: Props) {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setShowMessage(true), delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  return <div>
    {showMessage && <p>{message}</p>}
  </div>
}

export default DelayMessage;