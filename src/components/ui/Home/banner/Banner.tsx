import { Link } from "react-router-dom";
import bg from "../../../../assets/Banner.jpeg";
import CustomButton from "../../Buttons/CustomButton";

const Banner = () => {
  return (
    <div
      style={{ backgroundImage: `url(${bg})` }}
      className="md:h-[600px] mx-auto bg-no-repeat bg-cover mix-blend-overlay flex items-center bg-blend-overlay bg-black/30"
    >
      <div className="md:space-y-3 container mx-auto text-center w-full text-[#FFFFFF] space-y-2 py-8">
        <h1 className="md:text-6xl text-xl font-semibold">
          <span className="text-2xl md:text-7xl font-bold">Shine Slot</span>, A
          Car Wash Service
        </h1>
        <p className="md:text-xl">
          We provide the best car wash service in town. We are here to make your
          car shine.
        </p>
        <div className="w-full flex justify-center">
          <Link to="/services">
            <CustomButton
              text="Explore Services"
              textColor="#111111"
              bgColor="#FFFFFF"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
