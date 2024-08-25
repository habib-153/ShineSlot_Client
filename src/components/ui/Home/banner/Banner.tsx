import bg from "../../../../assets/Banner.jpeg";

const Banner = () => {
  return (
    <div
      style={{ backgroundImage: `url(${bg})` }}
      className="md:h-[90vh] h-[30vh] mx-auto bg-no-repeat bg-cover mix-blend-overlay flex items-center bg-blend-overlay bg-black/30"
    >
      <div className="md:space-y-3 max-w-[1200px] mx-auto text-center w-full text-[#FFFFFF] space-y-2">
        <h1 className="md:text-6xl text-xl font-semibold">
        <span className="text-2xl md:text-7xl font-bold">Shine Slot</span>, A Car Wash Service
        </h1>
        <p className="md:text-xl">
            We provide the best car wash service in town. We are here to make your car shine.
        </p>
      </div>
    </div>
  );
};

export default Banner;
