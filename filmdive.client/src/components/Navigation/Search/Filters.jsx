export default function Filters({ onChange, selectedValue }) {
  return (
    <form className="p-2">
      <div className="flex gap-2 text-primaryText">
        <input
          type="radio"
          id="search-all"
          name="search"
          value="all"
          checked={selectedValue === "all"}
          onChange={onChange}
          className="checkbox-input"
        />
        <label htmlFor="search-all" className="checkbox-label">
          All
        </label>
      </div>

      <div className="flex gap-2 text-primaryText">
        <input
          type="radio"
          id="search-movies"
          name="search"
          value="movies"
          checked={selectedValue === "movies"}
          onChange={onChange}
          className="checkbox-input"
        />
        <label htmlFor="search-movies" className="checkbox-label">
          Only Movies
        </label>
      </div>

      <div className="flex gap-2 text-primaryText">
        <input
          type="radio"
          id="search-series"
          name="search"
          value="series"
          checked={selectedValue === "series"}
          onChange={onChange}
          className="checkbox-input"
        />
        <label htmlFor="search-series" className="checkbox-label">
          Only Series
        </label>
      </div>

      <div className="flex gap-2 text-primaryText">
        <input
          type="radio"
          id="search-people"
          name="search"
          value="people"
          checked={selectedValue === "people"}
          onChange={onChange}
          className="checkbox-input"
        />
        <label htmlFor="search-people" className="checkbox-label">
          Only People
        </label>
      </div>
    </form>
  );
}
