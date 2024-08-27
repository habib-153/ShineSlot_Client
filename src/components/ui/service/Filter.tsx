import { Checkbox } from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../redux/hooks";
import { removeFilter, setFilter } from "../../../redux/features/filterSlice";

const Filter = () => {
    const dispatch = useDispatch();
    const { filters } = useAppSelector((state) => state.filter);
  
    const categories = ["less than 60 Min", "more than 60 Min"];

    const handleCategory = (category: string) => {
      if (filters.includes(category)) {
        dispatch(removeFilter(category));
      } else {
        dispatch(setFilter(category));
      }
    };
    return (
      <div className="">
        <label className="font-semibold">Filter Product:</label>
        <div className="flex flex-wrap  items-center">
          {categories?.map((category, idx) => (
          <div className="flex items-center gap-2" key={idx}>
            <Checkbox
                onChange={() => handleCategory(category)}
                checked={filters.includes(category)} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined}          />
            <p className="capitalize">{category}</p>
          </div>
        ))}
        </div>
        
      </div>
    );
  };
  
  export default Filter;