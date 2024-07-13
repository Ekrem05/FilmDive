import { browseActions } from "@/store/browse";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
export default function GenreSelection({ genres }) {
  const formRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  console.log(params);
  function handleChange() {
    const formData = new FormData(formRef.current);
    const inputs = Array.from(formData.keys());
    dispatch(browseActions.setGenres(inputs));
    navigate(`/browse/${inputs.join("+")}`);
  }

  return (
    <form ref={formRef} onChange={handleChange} className="flex flex-col">
      <CheckInput label="Action" />
      <CheckInput label="Comedy" />
      <CheckInput label="Thriller" />
      <CheckInput label="Horror" />
      <CheckInput label="IDK" />
    </form>
  );
}

export function CheckInput({ label, value }) {
  return (
    <div className="flex flex-row text-lg items-center">
      <input
        id={label}
        type="checkbox"
        name={label}
        value={label}
        className="w-10 h-5 opacity-0 checkbox-input accent-highlightdrk duration-500"
      />
      <label htmlFor={label} className="checkbox-label">
        {label}
      </label>
    </div>
  );
}
