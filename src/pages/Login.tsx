import { Link, useNavigate } from "react-router-dom";
import CustomButton2 from "../components/ui/Buttons/CustomButton2";
import CustomForm from "../components/form/CustomForm";
import CustomInput from "../components/form/CustomInput";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { FieldValues } from "react-hook-form";
import { useAppDispatch } from "../redux/hooks";
import { verifyToken } from "../utils/verifyToken";
import { setUser } from "../redux/features/auth/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch()

  const onSubmit = async (data: FieldValues) => {
    
    const toastId = toast.loading("Logging In...");
    try {
      const res = await login(data);
      
      if (res?.error) {
        toast.error(res?.error?.data?.message, { id: toastId, duration: 2000 });
      } else {
        const user = verifyToken(res?.data?.token)
        dispatch(setUser({user: user, token: res?.data?.token}))
        toast.success(res?.data?.message, { id: toastId, duration: 2000 });
        navigate("/");
      }
    } catch (err) {
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
    }
  };

  return (
    <div className="bg-gray-100">
      <div className="container mx-auto p-4 min-h-screen">
      <Link to={`/`}>
        <CustomButton2 text="Go Back" textColor="white" bgColor="black" />
      </Link>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-auto mt-6"
      >
        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>
        <CustomForm onSubmit={onSubmit}>
          <CustomInput name="email" type="text" label="Email" />
          <CustomInput name="password" type="password" label="Password" />
          <div className="w-full text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="bg-black text-white px-4 py-2 rounded-lg hover:shadow-md "
            >
              Login
            </motion.button>
          </div>
        </CustomForm>
        <div className="mt-6 text-center">
          <Link to="/signUp" className="text-sm text-indigo-600 hover:text-indigo-500">
            Don't have an account? Sign up
          </Link>
        </div>
      </motion.div>
    </div>
    </div>
    
  );
};

export default Login;
