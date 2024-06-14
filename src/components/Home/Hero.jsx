import { Link } from "react-router-dom";
import { Button } from "../ui/button";

const Hero = () => {
  return (
    <section className="border-t border-gray-200/50 bg-white/70 py-16 lg:py-20 xl:py-24 2xl:py-28">
      <div className="container">
        <div className="mx-auto grid max-w-lg grid-cols-1 items-center gap-x-10 gap-y-6 lg:max-w-none lg:grid-cols-2">
          <div className="text-center lg:text-left">
            <h1 className="mb-4 max-w-2xl text-[26px] font-bold leading-[1.2] text-gray-800 sm:text-3xl lg:mb-6 lg:text-4xl xl:text-[40px] xl:leading-[1.2]">
              Find & Book <span className="text-blue">Appointment</span> with
              your favourite <span className="text-blue">Doctors</span>
            </h1>
            <p className="max-w-2xl text-[15px] text-gray-600 sm:text-base">
              Discover top doctors near you with our easy-to-use search and
              booking platform. Whether you need a general check-up or
              specialist consultation, book appointments online and stay
              informed about your health.
            </p>
            <Button
              className="mt-6 border-2 border-blue bg-blue px-5 py-6 text-[15px] transition-colors duration-300 hover:bg-transparent hover:text-blue lg:mt-7"
              asChild
            >
              <Link to="/doctors">Find a Doctor</Link>
            </Button>
          </div>
          <div className="">
            <img src="/doctors-pana.svg" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
