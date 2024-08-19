export async function search({ keyword }) {
  const response = await fetch(`/Search?Keyword=${keyword}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error();
  }
  const data = await response.json();
  return data.data;
}
