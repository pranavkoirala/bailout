import { useNavigate } from "react-router-dom";
import Footer from "../../assets/Footer";
const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center bg-[#010101] h-screen text-white font-mono text-center w-screen">
      <h1 className="text-2xl">bailout</h1>
      <p className="text-lg mt-[1rem]">
        set plans... more importantly, cancel plans
      </p>
      <p className="text-lg mt-[1rem]">
        bailout is currently down for winter break because i will be away from
        campus and don't want to spend the money to keep the server running for
        a wasted month.
      </p>
      <button
        onClick={() => navigate("/create")}
        className="mt-[2rem] bg-[#292929] border-2 border-[#3e3e3e] rounded-lg text-white px-6 py-3 text-base hover:border-[#fff] cursor-pointer transition"
      >
        create
      </button>

      <Footer />
    </div>
  );
};

export default Home;
