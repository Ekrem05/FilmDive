import { useState, useRef, useEffect } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useParams, useNavigate } from "react-router";

export default function YearSelection() {
  const [value, setValue] = useState([1878, 2024]);
  const { genres, year, rating, orderBy, cast } = useParams();
  const navigate = useNavigate();
  const timeoutRef = useRef(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      navigate(
        `/browse/${genres ? genres : "all"}/${newValue.join(";")}/${rating}/${
          orderBy ? orderBy : ""
        }/${cast ? cast : ""}`
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

  return (
    <Box className="pt-9 px-5">
      <Slider
        color="highlightdrk"
        className=""
        getAriaLabel={() => "Temperature range"}
        defaultValue={2024}
        disableSwap={true}
        min={1878}
        max={2024}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        marks
      />
    </Box>
  );
}
