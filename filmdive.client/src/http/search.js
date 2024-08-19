export async function search({ keyword, onlyMovies, onlySeries, onlyPeople }) {
  const response = await fetch(
    `/Search?Keyword=${keyword}&OnlyMovies=${onlyMovies}&OnlySeries=${onlySeries}&OnlyPeople=${onlyPeople}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) {
    throw new Error();
  }
  const data = await response.json();
  return data.data;
}
