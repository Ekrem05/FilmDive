import { getGenres } from "@/http/movies";
import { browseActions } from "@/store/browse";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export default function GenreSelection({ genres: data }) {
  const formRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { genres, year, rating, orderBy, cast } = useParams();
  function handleChange() {
    const formData = new FormData(formRef.current);
    const inputs = Array.from(formData.keys());
    // Log the IDs of the input elements
    let arrayOfGenreIds = [];
    let arrayOfGenres = [];
    inputs.forEach((inputName) => {
      const inputElement = formRef.current.elements.namedItem(inputName);
      if (inputElement) {
        arrayOfGenreIds.push(inputElement.id);
        arrayOfGenres.push({ id: inputElement.id, name: inputName });
      }
    });

    console.log(arrayOfGenreIds);
    dispatch(browseActions.setGenres(arrayOfGenres));
    const currentYear = new Date().getFullYear();
    navigate(
      `/browse/${
        arrayOfGenreIds.length > 0
          ? arrayOfGenreIds.map(encodeURIComponent).join("%20")
          : "all"
      }/${year ? year : `all`}/${rating ? rating : "all"}/${
        orderBy ? orderBy : "popularity.desc"
      }/${cast ? cast : "all"}`
    );
  }

  if (!data) {
    return <div></div>;
  }
  return (
    <form ref={formRef} onChange={handleChange} className="flex flex-col">
      {data.map((genre) => (
        <CheckInput
          key={genre.id}
          id={genre.id}
          label={genre.name}
          isChecked={genres && genres.split(" ").includes(`${genre.id}`)}
        />
      ))}
    </form>
  );
}

export function CheckInput({ id, label, isChecked }) {
  return (
    <div className="flex flex-row text-lg items-center">
      <input
        id={id}
        type="checkbox"
        name={label}
        readOnly
        checked={isChecked}
        className="w-10 h-5 opacity-0 checkbox-input accent-highlightdrk duration-500"
      />
      <label htmlFor={id} className="checkbox-label">
        {label}
      </label>
    </div>
  );
}
