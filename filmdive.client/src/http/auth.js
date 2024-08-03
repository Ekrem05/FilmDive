export async function signup({ email, username, password }) {
  const response = await fetch("/Auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      username,
      password,
    }),
  });
  const data = await response.json();
  console.log(data);

  return data;
}
export async function login({ username, password }) {
  const response = await fetch("/Auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });
  const data = await response.json();
  return data;
}
export async function userDetails({ token }) {
  console.log("hello");
  const response = await fetch(`/Auth/user/${token}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error();
  }
  const data = await response.json();
  return data;
}
