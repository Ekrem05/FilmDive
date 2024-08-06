export default function Input({
  id,
  label,
  isValid,
  errMsg,
  inputValidations,
  ...props
}) {
  return (
    <div className="control no-margin">
      <input
        {...props}
        className={`bg-black bg-opacity-30 border ${
          !isValid ? "border-rose-600" : "border-headersdrk"
        } text-headersdrk text-md rounded-lg  xm:text-xl focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
      />
      <div className="text-rose-600">{!isValid && <p>{errMsg}</p>}</div>
      <ul style={{ listStyleType: "circle" }} className="text-rose-600 mt-2">
        {!isValid &&
          inputValidations &&
          inputValidations.map((entry) => <li>{entry}</li>)}
      </ul>
    </div>
  );
}
