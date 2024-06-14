import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white shadow-[0,-1px,2px,rgba(0,0,0,0.1)]">
      <div className="container">
        <p className="py-5 text-center text-sm text-gray-500">
          Developed by{" "}
          <Link
            className="font-medium text-blue hover:underline"
            to="https://www.drsyringe.com/"
            target="_blank"
          >
            Debehaa
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
