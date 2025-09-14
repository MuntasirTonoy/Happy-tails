export default function Home() {
  return (
    <div className="text-center">
      <h1 className="text-6xl mt-40">
        code here, <span className="btn"> daisy ui already installed</span>
      </h1>
      <h2 className="text-3xl mt-10">
        {" "}
        there is some dummy data on{" "}
        <span className="btn btn-secondary btn-xl rounded-2xl ">
          @/public/data
        </span>
        fetch those and use for designing .
      </h2>
    </div>
  );
}
