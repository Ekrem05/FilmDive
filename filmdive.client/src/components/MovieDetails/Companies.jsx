export default function Companies({ data }) {
  return (
    <section className="w-full ">
      <ul className="flex justify-evenly flex-wrap">
        {data.map((company) => {
          if (company.logoPath) {
            return (
              <li className="content-center" key={company.id}>
                <img
                  className="w-56 grayscale"
                  src={`https://image.tmdb.org/t/p/original/${company.logoPath}`}
                  alt=""
                />
              </li>
            );
          }
        })}
      </ul>
    </section>
  );
}
