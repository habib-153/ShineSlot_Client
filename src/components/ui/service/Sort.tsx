import { useDispatch } from "react-redux";
import { setSort } from "../../../redux/features/filterSlice";

const Sort = () => {
  const dispatch = useDispatch();

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sortValue = e.target.value === "asc" ? "-price" : "price";
    dispatch(setSort({ sort: sortValue }));
  };
  return (
    <div>
      <label className="font-semibold text-left mr-1">Sort:</label>
      <select
        name="price" onChange={handleSort}
        defaultValue="default"
        className="focus:outline-0 rounded-lg border border-gray-900 px-4 py-2"
        title="Sort by price"
      >
        <option value="default" disabled>
          Price
        </option>
        <option value="asc">High to Low</option>
        <option value="desc">Low to High</option>
      </select>
    </div>
  );
};

export default Sort;