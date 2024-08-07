import { useState, useRef, useEffect } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useParams, useNavigate, useLocation } from "react-router";

export default function Rating() {
  const [value, setValue] = useState([0, 10]);
  const { genres, year, rating, orderBy, cast } = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const timeoutRef = useRef(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    const root = pathname.split("/")[1];
    timeoutRef.current = setTimeout(() => {
      navigate(
        `/${root}/${genres ? genres : "all"}/${
          year ? year : "all"
        }/${newValue.join(";")}/${orderBy ? orderBy : "popularity.desc"}/${
          cast ? cast : "all"
        }`
      );
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
  useEffect(() => {
    if (rating && rating !== "all") {
      setValue(rating.split(";"));
    }
  }, [rating]);
  return (
    <Box className="pt-9 px-5">
      <Slider
        color="highlightdrk"
        className=""
        getAriaLabel={() => "Temperature range"}
        defaultValue={2024}
        disableSwap={true}
        min={0}
        max={10.0}
        step={0.1}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        marks
      />
    </Box>
  );
}
