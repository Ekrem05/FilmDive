import Imdb from "../../Imdb/Imdb";
export default function Trending({ onItemHover }) {
  function handleHover() {
    onItemHover({
      name: "Kingdom of the Planet of the Apes",
      overview:
        "Several generations in the future following Caesar's reign, apes are now the dominant species and live harmoniously while humans have been reduced to living in the shadows. As a new tyrannical ape leader builds his empire, one young ape undertakes a harrowing journey that will cause him to question all that he has known about the past and to make choices that will define a future for apes and humans alike.",
      imageUrl:
        "https://image.tmdb.org/t/p/original/fqv8v6AycXKsivp1T5yKtLbGXce.jpg",
    });
  }
  return (
    <section className="pt-10">
      <h3 className="text-[36pt] text-white ">Trending</h3>
      <ul className="flex items-start">
        <li
          className="flex flex-col items-center basis-30 bg-black rounded-xl pb-2 hover:cursor-pointer"
          onClick={handleHover}
        >
          <img
            className="rounded-xl"
            width={"150px"}
            src="https://image.tmdb.org/t/p/original/gKkl37BQuKTanygYQG1pyYgLVgf.jpg"
            alt=""
          />
          <p className="text-accentdrk text-xl w-32 text-center overflow-ellipsis overflow-hidden whitespace-nowrap">
            Kingdom of the Planet of the Apes
          </p>
          <div className="w-[100%] flex justify-between items-center pr-3">
            <Imdb rating={"8.8"} />
            <p className="text-secondarydrk">2024</p>
          </div>
        </li>
      </ul>
    </section>
  );
}
