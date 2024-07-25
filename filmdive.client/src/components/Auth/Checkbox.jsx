import { useState } from "react";

export default function Checkbox() {
  const [isChecked, setIsChecked] = useState(false);

  function handleClick() {
    setIsChecked(!isChecked);
  }
  return (
    <>
      <input
        id="Rememberme"
        name="rememberme"
        type="checkbox"
        checked={isChecked}
        className="opacity-0 checkbox-input accent-headersdrk duration-500"
      />
      <p className="checkbox-label" onClick={handleClick}>
        Remember me
      </p>
    </>
  );
}
