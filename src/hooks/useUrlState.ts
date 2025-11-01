import { useCallback } from "react";
import { useSearchParams } from "react-router";

const useUrlState = ({
  key,
  defaultValue,
}: {
  key: string;
  defaultValue: string;
}): [string, (value: string) => void] => {
  const [searchParams, setSearchParams] = useSearchParams();
  const value = decodeURIComponent(searchParams.get(key) || defaultValue);

  const setValue = useCallback(
    (newValue: string) => {
      setSearchParams(
        (prev) => {
          const newParams = new URLSearchParams(prev);

          if (
            newValue === defaultValue ||
            newValue === "" ||
            newValue === null
          ) {
            newParams.delete(key);
          } else {
            newParams.set(key, encodeURIComponent(newValue));
          }

          return newParams;
        },
        {
          replace: true,
        }
      );
    },
    [key, defaultValue, setSearchParams]
  );

  return [value, setValue] as const;
};

export default useUrlState;
