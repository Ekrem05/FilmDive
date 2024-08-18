export default function Companies({ data }) {
  return (
    <section className="w-full ">
      <ul className="flex md:justify-evenly md:flex-wrap items-center   gap-5 flex-col md:flex-row">
        {data.map((company) => {
          if (company.logoPath) {
            return (
              <li className="content-center" key={company.id}>
                <img
                  className="w-56 md:w-32 grayscale"
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
