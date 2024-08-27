/* eslint-disable react-hooks/exhaustive-deps */
import { Input } from "@material-tailwind/react";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import _ from "lodash";
import { setSearchTerm } from "../../../redux/features/filterSlice";

const Search = () => {
  const dispatch = useDispatch();

  // debounce functionality
  const debounceSearch = useCallback(
    _.debounce((searchTerm) => {
      dispatch(setSearchTerm(searchTerm));
    }, 400),
    []
  );
  return (
    <div className="group relative">
      <Input
        onChange={(e) => debounceSearch(e.target.value)}
        type="text"
        placeholder="Search"
        className="focus:!border-t-gray-900 group-hover:border-2 group-hover:!border-gray-900"
        labelProps={{
          className: "hidden",
        }}
        onPointerEnterCapture={() => {}}
        onPointerLeaveCapture={() => {}}
        crossOrigin=""
      />
      <div className="absolute top-[calc(50%-1px)] right-2.5 -translate-y-2/4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6"
        >
          <path d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
      </div>
    </div>
  );
};

export default Search;