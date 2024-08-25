import { Link } from "react-router-dom";
import CustomButton2 from "../components/ui/Buttons/CustomButton2";
import { Toaster } from "sonner";

const Login = () => {
  return (
    <div className="container mx-auto p-4">
      <Link to={`/`}>
        <CustomButton2 text="Go Back" textColor="white" bgColor="black" />
      </Link>
      <Toaster position="bottom-right" />
    </div>
  );
};

export default Login;
