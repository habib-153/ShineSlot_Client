import Banner from "../components/ui/Home/banner/Banner";
import CallToAction from "../components/ui/Home/CallToAction/CallToAction";
import { FAQ } from "../components/ui/Home/FAQ/FAQ";
import Feature from "../components/ui/Home/features/Feature";
// import HowItWorks from "../components/ui/Home/HowWork/HowWork";
import { Newsletter } from "../components/ui/Home/Newsletter/Newsletter";
import Reviews from "../components/ui/Home/reviews/Reviews";

const Home = () => {
  return (
    <div>
      <Banner />
      <Feature />
      <Reviews />
      <CallToAction />
      <Newsletter />
      <FAQ />
      {/* <HowItWorks /> */}
    </div>
  );
};

export default Home;
