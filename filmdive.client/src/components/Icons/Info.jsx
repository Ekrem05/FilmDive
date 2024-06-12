const Info = ({ fill }) => {
  return (
    <svg
      width="20px"
      viewBox="0 0 24 24"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="10" stroke="#1C274C" strokeWidth="1.5" />
      <path
        d="M12 17V11"
        stroke="#1C274C"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle
        cx="1"
        cy="1"
        r="1"
        transform="matrix(1 0 0 -1 11 9)"
        fill="#1C274C"
      />
    </svg>
  );
};
export default Info;
