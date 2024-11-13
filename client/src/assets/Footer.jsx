"use client";

const Footer = () => {
  return (
    <footer className="flex flex-col items-center">
      <p className="mt-4 bg-gradient-to-r from-[#830dd9] to-pink-500 bg-clip-text text-transparent h-fit text-xs">
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
  );
};

export default Footer;
