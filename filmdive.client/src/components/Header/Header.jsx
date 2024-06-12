export default function Header({ children }) {
  const headerStyle = {
    "--bg-image": `url('https://image.tmdb.org/t/p/original/kYgQzzjNis5jJalYtIHgrom0gOx.jpg'`,
  };
  return (
    <section className="" style={headerStyle}>
      {children}
    </section>
  );
}
