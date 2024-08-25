import { Button } from "@material-tailwind/react";
import { MdOutlineArrowOutward } from "react-icons/md";

interface CustomButtonProps {
  text: string;
  bgColor?: string;
  textColor: string;
}

const CustomButton = ({ text , bgColor, textColor }: CustomButtonProps) => {
  return (
    <Button
      onPointerEnterCapture={null}
      onPointerLeaveCapture={null}
      placeholder=""
      variant={!bgColor ? "outlined" : undefined}
      style={bgColor
        ? { backgroundColor: bgColor, color: textColor }
        : { color: textColor }}
      className="font-normal text-lg flex items-center gap-2 py-2 px-4 rounded-xl normal-case" >
      {text} <MdOutlineArrowOutward className="text-xl" />
    </Button>
  );
};

export default CustomButton;