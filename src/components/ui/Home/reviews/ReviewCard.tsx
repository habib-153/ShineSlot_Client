import { Rating } from "@material-tailwind/react";
import { TReviewProps } from "../../../../types/review";

const ReviewCard = ({ name, comment, date, rating }: TReviewProps) => {
  return (
    <div className="p-6 mb-3 rounded-tl-2xl rounded-br-2xl rounded-bl-md rounded-tr-md border-[#163196] border-[1px] shadow-lg max-w-[350px]">
      <div className="flex items-center gap-4 mb-2">
        <div>
          <div className="font-bold text-base">{name}</div>
          <div className="text-sm text-gray-800">{date}</div>
        </div>
        <div className="ml-auto flex items-center">
          <Rating
            value={rating} readonly
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          />
          <span className="ml-2 font-semibold">{rating}.0</span>
        </div>
      </div>
      <p className="text-gray-900 text-[15px]">{comment}</p>
    </div>
  );
};

export default ReviewCard;
