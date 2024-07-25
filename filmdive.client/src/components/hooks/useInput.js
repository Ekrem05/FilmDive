import { useState } from "react";

export function useInput(initialValue, validationFn) {
  const [inputValue, setInputValue] = useState(initialValue);
  const [isEdited, setIsEdited] = useState(false);

  const isValid = !isEdited || validationFn(inputValue);
  function handleChange(value) {
    setInputValue(value);
    setIsEdited(false);
  }
  function handleBlur() {
    setIsEdited(true);
  }

  return {
    inputValue,
    isValid,
    handleChange,
    handleBlur,
  };
}
