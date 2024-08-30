import img1 from "../assets/carwash3-slider-bg.svg";
import ContactSection from "../components/ui/AboutUs/ContactUsForm";
import MemberCard from "../components/ui/AboutUs/MemberCard";

const AboutUs = () => {
  return (
    <div>
      <div
        className="mt-5 bg-no-repeat bg-cover bg-white/75 bg-blend-overlay"
        style={{ backgroundImage: `url(${img1})` }}
      >
        <div className="text-center py-8 container mx-auto">
          <h1 className="text-4xl font-bold mb-4">Welcome to Shine Slot</h1>
          <p className="text-lg">
            At <span className="text-[#fc8d10] font-semibold">Shine Slot</span>,
            Our car washing system is designed to provide a comprehensive and
            efficient cleaning solution for your vehicle. Utilizing
            state-of-the-art technology and eco-friendly products, we ensure
            that every car receives a thorough wash, leaving it spotless and
            shining. Our system includes automated washing, waxing, and drying
            processes, along with manual detailing by our skilled professionals
            to address every nook and cranny. Whether you need a quick wash or a
            detailed cleaning, our car washing system guarantees exceptional
            results and customer satisfaction.
          </p>
        </div>
      </div>
      <div className="container mx-auto my-6">
      <h2 className="text-3xl font-bold text-center">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-3 my-3">
          <MemberCard />
          <MemberCard />
          <MemberCard />
        </div>
      </div>
      <div className="container mx-auto my-6">
        <ContactSection />
      </div>
    </div>
  );
};

export default AboutUs;
