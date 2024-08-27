import CustomTitle from "../../customTitle/CustomTitle";
import ReviewCard from "./ReviewCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import img1 from "../../../../assets/carwash3-home-pic3.svg";
import img2 from "../../../../assets/carwash3-home-pic2.webp";
import { motion } from "framer-motion";
import { FreeMode, Pagination } from "swiper/modules";
import { Rating, Textarea } from "@material-tailwind/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import CustomButton2 from "../../Buttons/CustomButton2";
import { useAppSelector } from "../../../../redux/hooks";
import { selectCurrentUser } from "../../../../redux/features/auth/authSlice";
import { Button, Modal } from "antd";
import { MdCheckCircleOutline } from "react-icons/md";
import TotalRatings from "./TotalRatings";

const Reviews = () => {
  const [rating, setRating] = useState(0);
  const user = useAppSelector(selectCurrentUser);
  const [isOpen, setIsOpen] = useState(false);

  const handleReview = (e: any) => {
    e.preventDefault();
    e.target.reset();
    setIsOpen(true);
  };

  const handleOk = () => {
    setIsOpen(false);
  };

  return (
    <div className="container mx-auto">
      <CustomTitle title="Reviews" />
      <div className="my-5">
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          modules={[FreeMode, Pagination]}
          className="mySwiper"
        >
          <SwiperSlide>
            <ReviewCard
              name="John Doe"
              date="12/12/2021"
              rating={4}
              comment="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates."
            />
          </SwiperSlide>
          <SwiperSlide>
            <ReviewCard
              name="Jane Doe"
              date="12/12/2021"
              rating={5}
              comment="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates."
            />
          </SwiperSlide>
          <SwiperSlide>
            <ReviewCard
              name="John Doe"
              date="12/12/2021"
              rating={4}
              comment="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates."
            />
          </SwiperSlide>
          <SwiperSlide>
            <ReviewCard
              name="Jane Doe"
              date="12/12/2021"
              rating={5}
              comment="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates."
            />
          </SwiperSlide>
          <SwiperSlide>
            <ReviewCard
              name="John Doe"
              date="12/12/2021"
              rating={4}
              comment="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates."
            />
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="flex flex-col md:flex-row md:flex-wrap gap-8 my-8">
        <div className="">
          <div className="flex items-center gap-1">
            <h2 className="text-4xl text-[#163196]">500</h2>
            <img src={img1} alt="carwash" className="size-6" />
          </div>
          <p className="text-4xl text-[#1c3aa4]">
            Satisfied <br />
            Customers
          </p>
        </div>
        <figure>
          <img
            className="max-w-[260px] bg-[#f0f0f0] rounded-2xl"
            src={img2}
            alt=""
          />
        </figure>
        <div className="flex-1 relative">
          <div className="bg-[#ffffff] shadow-lg  rounded-lg  p-8 sm:p-5">
            <h2 className="text-4xl text-[#1c3aa4]">Leave A Review</h2>
            <form onSubmit={handleReview} className="mt-4">
              <Rating
                value={rating}
                onChange={(value) => setRating(value as unknown as number)}
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              />
              <div>
                <label
                  htmlFor="feedback"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Feedback:
                </label>
                <Textarea
                  label="Share your thoughts and experiences..."
                  className="w-full rounded-lg border border-gray-300 focus:border-blue-500"
                  rows={3}
                  name="feedback"
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                />
              </div>
              <div className="w-full text-center mt-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="bg-black text-white px-4 py-2 rounded-lg hover:shadow-md "
                >
                  Submit Review
                </motion.button>
              </div>
            </form>
          </div>
          <div
            className={`${
              user
                ? "hidden"
                : "absolute w-full pt-[35%] sm:pt-[20%] top-0 bg-black/75 text-center h-full rounded-lg"
            }`}
          >
            <Link to="/login">
              <CustomButton2
                text="Login"
                bgColor="#FFFFFF"
                textColor="#111111"
              />
            </Link>
          </div>
        </div>
      </div>
      <Modal
        open={isOpen}
        onOk={handleOk}
        onCancel={handleOk}
        width='90%'
        style={{maxWidth: '700px'}}
        footer={[
          <Button key="ok" type="primary" onClick={handleOk}>
            OK
          </Button>,
        ]}
      >
        <div className="text-center">
          <MdCheckCircleOutline className="text-[#52c41a] text-5xl mx-auto" />
          <p className="mt-3">Your review has been submitted successfully!</p>
          <div>
            <h3 className="mt-4 font-semibold text-xl">Previous Reviews</h3>
              <div className="flex flex-col md:flex-row gap-2 items-center justify-center my-2">
                <ReviewCard
                  name="John Doe"
                  date="12/12/2021"
                  rating={4}
                  comment="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates."
                />
                <ReviewCard
                  name="John Doe"
                  date="12/12/2021"
                  rating={5}
                  comment="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates."
                />
              </div>
              <div className="max-w-[600px] mx-auto">
             <TotalRatings />   
              </div> 
            </div>
        </div>
      </Modal>
    </div>
  );
};

export default Reviews;
