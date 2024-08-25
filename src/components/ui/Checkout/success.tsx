import { Link } from "react-router-dom";
import img from "../../../assets/correct.png";
import CustomButton2 from "../Buttons/CustomButton2";

const Success = () => {
  return (
    <div className="my-4">
      <div className="w-96 mx-auto bg-base-100 shadow">
        <figure className="w-full my-4 pt-4">
          <img src={img} alt="Shoes" className="rounded-xl mx-auto w-44" />
        </figure>
        <div className="space-y-2 my-3 text-center">
          <h2 className="font-semibold">Congratulations</h2>
          <p>Your Payment Successful.</p>
          <div className="py-3">
            <Link to="/products">
              <CustomButton2 text="Products" bgColor="black" textColor="white"/>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
