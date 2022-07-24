import { useCallback, useEffect, useState } from "react";

const useLocalStorage = (key: string) => {
  const [initialValues, setInitialValues] = useState<string[]>([]);

  useEffect(() => {
    const storedInputs = localStorage.getItem(key);
    if (storedInputs) {
      setInitialValues(JSON.parse(storedInputs));
    }
  }, [key]);

  const setNewValue = useCallback(
    (newValue: string) => {
      localStorage.setItem(key, newValue);
    },
    [key]
  );

  return { initialValues, setNewValue };
};

export default useLocalStorage;
