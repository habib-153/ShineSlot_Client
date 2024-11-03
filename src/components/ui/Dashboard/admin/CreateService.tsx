import { Button, Modal } from "antd";
import CustomButton2 from "../../Buttons/CustomButton2";
import CustomForm from "../../../form/CustomForm";
import CustomInput from "../../../form/CustomInput";
import { ChangeEvent, useState } from "react";
import { useAddServiceMutation } from "../../../../redux/features/service/serviceApi";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { TError } from "../../../../types/global";
import { LuImagePlus } from "react-icons/lu";
import { BsTrash } from "react-icons/bs";

const CreateService = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [createService] = useAddServiceMutation();
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreviews, setImagePreviews] = useState<string[] | []>([]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      const newFiles = Array.from(files);

      // Validate file size and type
      const validFiles = newFiles.filter((file) => {
        const isValidSize = file.size / 1024 / 1024 < 2; // Less than 2MB
        const isValidType = file.type.startsWith("image/");

        if (!isValidSize) {
          toast.error(`${file.name} is too large. Max size is 2MB`);
        }
        if (!isValidType) {
          toast.error(`${file.name} is not a valid image file`);
        }

        return isValidSize && isValidType;
      });

      setImageFiles((prev) => [...prev, ...validFiles]);

      validFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreviews((prev) => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: FieldValues) => {
    const formData = new FormData();

    const toastId = toast.loading("Creating service...");
    const payload = {
      name: data.name,
      description: data.description,
      price: parseFloat(data.price),
      duration: parseFloat(data.duration),
      isDeleted: false,
    };

    formData.append("data", JSON.stringify(payload));

    imageFiles.forEach((file) => {
      formData.append(`Images`, file);
    });

    const res = await createService(formData);

    if (res.error) {
      toast.error((res?.error as TError)?.data?.message, { id: toastId });
    } else {
      toast.success(res?.data?.message, { id: toastId });
      setIsOpen(false);
    }
  };

  return (
    <div>
      <div className="w-full text-end">
        <CustomButton2
          onClick={() => setIsOpen(true)}
          text="Create A Service"
          textColor="#ffffff"
          bgColor="#111111"
        />
      </div>
      <Modal open={isOpen} onCancel={() => setIsOpen(false)} footer={null}>
        <h2 className="text-2xl font-semibold text-center">Add Service</h2>
        <CustomForm onSubmit={onSubmit}>
          <CustomInput name="name" label="Service Name" type="text" />
          <CustomInput name="description" label="Description" type="text" />

          <div className="my-4">
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Images
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl">
              <div className="space-y-2 text-center">
                <div className="mx-auto h-12 w-12 text-gray-400">
                  <LuImagePlus className="w-12 h-12 mx-auto text-gray-400" />
                </div>
                <div className="flex flex-col text-sm text-gray-600">
                  <label className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500">
                    <span>Upload images</span>
                    <input
                      type="file"
                      multiple
                      required
                      accept="image/*"
                      onChange={handleImageChange}
                      className="sr-only"
                    />
                  </label>
                  <p className="text-xs text-gray-500">PNG, JPG up to 2MB</p>
                </div>
              </div>
            </div>

            {imagePreviews.length > 0 && (
              <div className="mt-4">
                <p className="text-sm text-gray-500 mb-3">
                  {imagePreviews.length} image
                  {imagePreviews.length > 1 ? "s" : ""} selected
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative group">
                      <div className="relative aspect-square rounded-lg overflow-hidden shadow-sm">
                        <img
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          className="h-full w-full object-cover"
                        />
                        <button
                          onClick={() => removeImage(index)}
                          className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center"
                        >
                          <BsTrash className="w-6 h-6 text-white" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <CustomInput name="price" label="Price" type="number" />
          <CustomInput name="duration" label="Duration" type="number" />
          <div className="w-full text-center">
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </div>
        </CustomForm>
      </Modal>
    </div>
  );
};

export default CreateService;
