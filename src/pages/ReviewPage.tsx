import CustomTitle from "../components/ui/customTitle/CustomTitle";
import TotalRatings from "../components/ui/Home/reviews/TotalRatings";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination } from "swiper/modules";
import ReviewCard from "../components/ui/Home/reviews/ReviewCard";

const ReviewPage = () => {
  return (
    <div className="container mx-auto">
      <div className="my-4">
        <CustomTitle title="Reviews" />
      </div>
      <div className="flex flex-col md:flex-row items-center w-full justify-evenly">
        <div>
          <h2 className="font-bold text-3xl">Total Ratings of Our Services</h2>
          <p className="text-gray-700 text-sm">
            **This Reviews and ratings are given by our users**
          </p>
        </div>
        <div className="max-w-[600px] flex-1">
          <TotalRatings />
        </div>
      </div>
      <div>
        <CustomTitle title="Some Of The Reviews" />
      <Swiper 
          slidesPerView={3}
          spaceBetween={30}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            0: {
                slidesPerView: 1,
            },
            600: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            },

        }}
          modules={[FreeMode, Pagination]}
          className="mySwiper mt-4"
        >
          <SwiperSlide>
            <ReviewCard
              name="John Doe"
              date="12/12/2021"
              rating={4}
              comment="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates."
            />
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
            <ReviewCard
              name="John Doe"
              date="12/12/2021"
              rating={4}
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
            <ReviewCard
              name="John Doe"
              date="12/12/2021"
              rating={3}
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
            <ReviewCard
              name="John Doe"
              date="12/12/2021"
              rating={2}
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
    </div>
  );
};

export default ReviewPage;
