export async function signup({ email, password }) {
  console.log("hello", { email, password });
  const response = await fetch("/Auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  if (!response.ok) {
    throw new Error();
  }
  const data = await response.json();
  return data;
}
