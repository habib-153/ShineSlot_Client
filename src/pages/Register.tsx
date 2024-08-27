import { Link, useNavigate } from "react-router-dom";
import CustomButton2 from "../components/ui/Buttons/CustomButton2";
import CustomForm from "../components/form/CustomForm";
import CustomInput from "../components/form/CustomInput";
import { useSignUpMutation } from "../redux/features/auth/authApi";
import { toast } from "sonner";
import { FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { createUserValidationSchema } from "../schema/authSchema";

const Register = () => {
  const navigate = useNavigate();
  const [signUp] = useSignUpMutation();

  const onSubmit = async (data: FieldValues) => {
    // console.log(data);
    const toastId = toast.loading("Signing Up...");
    const userInfo = {
      ...data,
      role: "user",
    };
    try {
      const res = await signUp(userInfo)
      
      if (res?.error) {
        toast.error(res?.error?.data?.message, { id: toastId, duration: 2000 });
      }
      else{
        toast.success(res?.data?.message, { id: toastId, duration: 2000 });
        navigate("/login");
      }
    } catch (err) {
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
    }
  };
  return (
    <div className="container mx-auto p-4">
      <Link to={`/`}>
        <CustomButton2 text="Go Back" textColor="white" bgColor="black" />
      </Link>
      <div className="max-w-[350px] mx-auto">
        <h2 className="text-3xl font-bold text-center">Sign Up</h2>
        <CustomForm onSubmit={onSubmit} resolver={zodResolver(createUserValidationSchema)}>
          <CustomInput name="name" type="text" label="Name" />
          <CustomInput name="email" type="text" label="Email" />
          <CustomInput name="password" type="text" label="Password" />
          <CustomInput name="phone" type="text" label="Phone Number" />
          <CustomInput name="address" type="text" label="Address" />
          <div className="w-full text-center">
            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded-lg hover:shadow-md "
            >
              Sign Up
            </button>
          </div>
        </CustomForm>
      </div>
    </div>
  );
};

export default Register;
