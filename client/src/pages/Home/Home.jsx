import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center bg-[#111000] h-screen text-white font-mono text-center w-screen">
      <h1 className="text-2xl">bailout</h1>
      <p className="text-lg mt-[1rem]">
        set plans... more importantly, cancel plans
      </p>
      <button
        onClick={() => navigate("/create")}
        className="mt-[2rem] bg-[#292929] border-2 border-[#3e3e3e] rounded-lg text-white px-6 py-3 text-base hover:border-[#fff] cursor-pointer transition"
      >
        create
      </button>

      <footer className="flex flex-col items-center absolute bottom-10">
        <p className="mb-4 bg-gradient-to-r from-[#830dd9] to-pink-500 bg-clip-text text-transparent h-fit text-xs">
          bailout is made with love by{" "}
          <a
            href="https://github.com/pranavkoirala"
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-block text-black rounded-lg px-2 py-1 group"
          >
            <span
              className="absolute inset-0 rounded-lg bg-gradient-to-r from-white to-blue-200 blur-sm opacity-75 group-hover:opacity-100 transition duration-800 group-hover:duration-200 animate-tilt"
              aria-hidden="true"
            ></span>
            <span className="relative">pranav</span>
          </a>
        </p>
      </footer>
    </div>
  );
};

export default Home;
