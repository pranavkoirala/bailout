import Particles, { initParticlesEngine } from "@tsparticles/react";
import { useEffect, useState } from "react";
import { loadSlim } from "@tsparticles/slim";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Create from "./pages/Create/Create";

function App() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = (container) => {};

  return (
    <Router>
      <div className="flex flex-col justify-center items-center bg-[#111000] h-screen text-white font-mono text-center w-screen">
        <div className="text-white flex-1 flex justify-center items-center">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<Create />} />
          </Routes>
        </div>
        <Particles
          id="tsparticles"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: -1,
          }}
          particlesLoaded={particlesLoaded}
          options={{
            fpsLimit: 60,
            // interactivity: {
            //   events: {
            //     onHover: {
            //       enable: true,
            //       mode: "repulse",
            //     },
            //     resize: true,
            //   },
            //   modes: {
            //     push: {
            //       quantity: 4,
            //     },
            //     repulse: {
            //       distance: 200,
            //       duration: 0.4,
            //     },
            //   },
            // },
            particles: {
              color: {
                value: "#ffffff",
              },
              links: {
                color: "#ffffff",
                distance: 150,
                enable: true,
                opacity: 0.5,
                width: 1,
              },
              move: {
                direction: "none",
                enable: true,
                outModes: {
                  default: "bounce",
                },
                random: false,
                speed: 3,
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                  area: 800,
                },
                value: 80,
              },
              opacity: {
                value: 0.5,
              },
              shape: {
                type: "circle",
              },
              size: {
                value: { min: 1, max: 5 },
              },
            },
            detectRetina: true,
          }}
        />
      </div>
    </Router>
  );
}

export default App;
