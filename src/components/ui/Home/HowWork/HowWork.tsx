import { motion } from "framer-motion";
import { BsCalendarCheck, BsTools, BsCreditCard } from "react-icons/bs";
import img1 from "../../../../assets/image1.png";
import img2 from "../../../../assets/image2.png";
import img3 from "../../../../assets/image3.png";
import { Link } from "react-router-dom";

interface WorkflowStepProps {
  number: number;
  title: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  imgSrc?: string;
}

const WorkflowStep: React.FC<WorkflowStepProps> = ({
  number,
  title,
  description,
  icon: Icon,
  imgSrc,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: number * 0.2 }}
      className="flex flex-col md:flex-row items-center gap-6 bg-gray-900 rounded-2xl p-6 relative overflow-hidden"
    >
      <div className="relative w-full md:w-1/2">
        <motion.div
          initial={{ scale: 0.8 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.5, delay: number * 0.3 }}
          className="relative z-10"
        >
          <img src={imgSrc} alt={title} className="rounded-xl w-full" />
        </motion.div>
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.5, delay: number * 0.4 }}
          className="absolute -top-2 -right-2 bg-green-400 text-black w-8 h-8 z-40 rounded-full flex items-center justify-center font-bold"
        >
          {number.toString().padStart(2, "0")}
        </motion.div>
      </div>

      <div className="w-full md:w-1/2 space-y-4">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: number * 0.5 }}
          className="flex items-center gap-3"
        >
          <div className="p-2 bg-green-400 rounded-lg">
            <Icon className="w-6 h-6 text-black" />
          </div>
          <h3 className="text-xl font-bold text-white">{title}</h3>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: number * 0.6 }}
          className="text-gray-300"
        >
          {description}
        </motion.p>
      </div>
    </motion.div>
  );
};

const HowItWorks = () => {
  const steps = [
    {
      imgSrc: img1,
      number: 1,
      title: "Reservation and Confirmation",
      description:
        "Effortlessly schedule your appointment online or send us a text at (555) 123-4567. Confirm your booking with a nominal deposit, and we'll send you an instant confirmation text for your assurance.",
      icon: BsCalendarCheck,
    },
    {
      imgSrc: img2,
      number: 2,
      title: "On-Site Expertise",
      description:
        "Our professional team, equipped with all the necessary tools and equipment, arrives at your location. We perform a thorough diagnosis, provide a power quote, and we begin to execute your vehicle's correction.",
      icon: BsTools,
    },
    {
      imgSrc: img3,
      number: 3,
      title: "Visual Approval and Payment",
      description:
        "Review photos and videos showcasing the transformation. Once you're completely satisfied with the resulting brilliance, quick payment processing makes the experience stress-free vehicle maintenance at its finest.",
      icon: BsCreditCard,
    },
  ];

  return (
    <section className="bg-black py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">How it Works</h2>
        </motion.div>

        <div className="space-y-8">
          {steps.map((step) => (
            <WorkflowStep key={step.number} {...step} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center mt-12"
        >
          <Link to="/services">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className=" px-8 py-3 rounded-xl font-semibold btn-custom transition-colors"
            >
              Book Now
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
