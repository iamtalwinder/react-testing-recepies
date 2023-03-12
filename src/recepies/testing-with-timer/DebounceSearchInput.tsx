import { ChangeEvent, useEffect, useState } from "react";

type Props = {
  onChange: (input: string) => void;
}

function debounce(func: Function, delay: number) {
    let timer: NodeJS.Timeout;

    return (...args: any[]) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
      }, delay);
    }
}

function DebounceSearchInput({onChange}: Props) {
  const [value, setValue] = useState('');

  const debounceOnChange = debounce(onChange, 500);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    debounceOnChange(e.target.value);
  }

  return <input value={value} onChange={handleChange}/>
}

export default DebounceSearchInput;