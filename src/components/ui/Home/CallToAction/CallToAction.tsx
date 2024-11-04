import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CallToAction = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Extra Banner starts */}
      <div className="mt-14 ">
        <div className="relative h-[360px] md:h-[360px] lg:h-[300px] xl:h-[350px]">
          <img
            src="https://themeholy.com/wordpress/malen/wp-content/uploads/2023/09/cta_bg_1-2.jpg"
            className="absolute inset-0 w-full h-full object-cover object-left"
            alt=""
          />
          <div className="relative bg-gray-900 bg-opacity-70 h-full">
            <div className="flex container mx-auto flex-col lg:flex-row justify-around items-center gap-8 pt-24 lg:pt-24">
              <div className="flex flex-col gap-5">
                <div className="flex gap-3">
                  <span className="flex flex-col gap-1 mt-[6px] items-end">
                    <span className="border-t-2 border-white w-9"></span>
                    <span className="border-t-2 border-white w-6"></span>
                  </span>
                  <p className="text-white xl:text-lg font-medium tracking-widest">
                    GET OUR SERVICE
                  </p>
                </div>
                <h1 className="text-white text-2xl md:text-4xl xl:text-5xl font-bold">
                  Get Premium Auto Car Service <br /> Explore Our Services.
                </h1>
              </div>
              <div className="flex items-center gap-3">
                <Link to="/services">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="px-4 py-3 md:px-6 md:py-4 text-white bg-primary rounded-lg btn-custom font-bold md:text-lg xl:text-xl"
                  >
                    ALL SERVICES
                  </motion.button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CallToAction;