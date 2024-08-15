import { useEffect, useState } from "react";

export default function Checkbox() {
  const [isChecked, setIsChecked] = useState(() => {
    const remember = localStorage.getItem("remember");
    return remember === "true"; // Convert string "true"/"false" to boolean
  });
  function handleClick() {
    setIsChecked(!isChecked);
  }
  useEffect(() => {
    if (isChecked) {
      localStorage.setItem("remember", true);
    } else if (!isChecked) {
      localStorage.setItem("remember", false);
    }
  }, [isChecked]);
  return (
    <>
      <input
        id="Rememberme"
        name="rememberme"
        type="checkbox"
        checked={isChecked}
        className="opacity-0 checkbox-input accent-headerColor duration-500"
      />
      <p className="checkbox-label" onClick={handleClick}>
        Remember me
      </p>
    </>
  );
}
