/* eslint-disable @typescript-eslint/no-explicit-any */
import { Radio } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { FormInput } from "../ProductManagement/FormInput";

const CheckoutForm = ({ submitHandler }: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(); // Specify the type here

  return (
    <div className="">
      <h1 className="text-2xl font-bold mt-4 text-center px-4">Shipping</h1>
      <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
        <div className="border-b px-4 space-y-1 py-3">
          <label htmlFor="name" className="font-medium text-gray-700">
            Name
          </label>
          <FormInput
            id="name"
            type="text"
            register={{ ...register("name", { required: true }) }}
          />
          {errors.name && (
            <span className="text-red-500 text-sm"> Name is required</span>
          )}
          <label htmlFor="email" className="font-medium text-gray-700">
            Email
          </label>
          <FormInput
            id="email"
            type="email"
            register={{ ...register("email", { required: true }) }}
          />
          {errors.email && (
            <span className="text-red-500 text-sm">Email is required</span>
          )}
          <label htmlFor="phone" className="font-medium text-gray-700">
            Phone
          </label>
          <FormInput
            id="phone"
            type="text"
            register={{ ...register("phone", { required: true }) }}
          />
          {errors.phone && (
            <span className="text-red-500 text-sm">
              Phone Number is required
            </span>
          )}
          <label htmlFor="address" className="font-medium text-gray-700">
            Address
          </label>
          <FormInput
            id="address"
            type="text"
            register={{ ...register("address", { required: true }) }}
          />
          {errors.address && (
            <span className="text-red-500 text-sm">Address is required</span>
          )}
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
              label="Stripe"
              value="Stripe"
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
            className="py-3 px-4 bg-black hover:bg-blue-gray-800 text-white my-3 rounded"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;
