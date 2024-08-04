export async function getPeople() {
  const response = await fetch("/People", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error();
  }
  const data = await response.json();
  return data;
}
export async function searchFor({ name }) {
  console.log(name);
  const response = await fetch(`/People/search/${name}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error();
  }
  const data = await response.json();
  return data;
}
