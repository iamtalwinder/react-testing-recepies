import { ChangeEvent, useState } from 'react';

const useFormInput = (initialValue: string | number) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return {
    value,
    onChange: handleChange
  };
};

export default useFormInput;
