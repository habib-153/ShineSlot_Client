/* eslint-disable @typescript-eslint/no-explicit-any */
import { Radio } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { InputV2 } from "../../form/InputV2";
import { TCheckoutForm } from "../../../types/global";
import { useAppSelector } from "../../../redux/hooks";
import { selectCurrentUser } from "../../../redux/features/auth/authSlice";

const CheckoutForm = ({ submitHandler }: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TCheckoutForm>();
  
  const user = useAppSelector(selectCurrentUser);
  console.log(user)

  return (
    <div className="">
      <h1 className="text-2xl font-bold mt-4 text-center px-4">Shipping</h1>
      <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
        <div className="border-b px-4 py-3 space-y-2">
          <div>
            <label htmlFor="name" className="font-medium text-gray-700">
              Name
            </label>
            <InputV2
              id="name"
              type="text" 
              register={{ ...register("name", { required: true }) }}
            />
            {errors.name && (
              <span className="text-red-500 text-sm"> Name is required</span>
            )}
          </div>
          <div>
            <label htmlFor="email" className="font-medium text-gray-700">
              Email
            </label>
            <InputV2
              id="email" readonly={true}
              type="email" defaultValue={user?.email}
              register={{ ...register("email", { required: true }) }}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">Email is required</span>
            )}
          </div>
          <div>
            <label htmlFor="phone" className="font-medium text-gray-700">
              Phone
            </label>
            <InputV2
              id="phone"
              type="text"
              register={{ ...register("phone", { required: true }) }}
            />
            {errors.phone && (
              <span className="text-red-500 text-sm">
                Phone Number is required
              </span>
            )}
          </div>
          <div>
            <label htmlFor="address" className="font-medium text-gray-700">
              Address
            </label>
            <InputV2
              id="address"
              type="text"
              register={{ ...register("address", { required: true }) }}
            />
            {errors.address && (
              <span className="text-red-500 text-sm">Address is required</span>
            )}
          </div>
        </div>
        <div className="border-b px-4">
          <h1 className="text-2xl font-bold text-center px-4">
            Payment Method
          </h1>
          <p className="text-xl text-gray-600 font-bold text-center">
            Select Method
          </p>
          <div className="flex justify-center space-x-4">
            <Radio
              //   name="paymentMethod"
              label="Cash on Delivery"
              value="COD"
              crossOrigin={undefined}
              onPointerEnterCapture={() => {}}
              onPointerLeaveCapture={() => {}}
              {...register("paymentMethod", { required: true })}
            />
            <Radio
              crossOrigin={undefined}
              onPointerEnterCapture={() => {}}
              onPointerLeaveCapture={() => {}}
              label="AmarPay"
              value="amarPay"
              {...register("paymentMethod", { required: true })}
            />
          </div>
          {errors.paymentMethod && (
            <span className="text-red-500 text-sm">
              Payment Method is required
            </span>
          )}
        </div>
        <div className="w-full text-center">
          <button
            type="submit"
            className="py-2 px-4 bg-black hover:bg-blue-gray-800 text-white my-3 rounded"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;
