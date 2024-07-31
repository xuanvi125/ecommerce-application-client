import { useSearchParams } from "react-router-dom";

export function PriceSelection() {
  const [searchParam, setSearchParam] = useSearchParams();
  const selectValue = () => {
    const gte = searchParam.get("min_price");
    const lte = searchParam.get("max_price");
    if (gte && lte) return `${gte}-${lte}`;
    if (gte) return `${gte}-`;
    if (lte) return `-${lte}`;
    return "all";
  };
  return (
    <div className="w-72 my-3">
      <select
        className="border border-gray-300 rounded-lg p-2 cursor-pointer w-full"
        label="Select Price Range"
        value={selectValue()}
        onChange={(e) => {
          const searchParams = new URLSearchParams(searchParam);
          searchParams.delete("min_price");
          searchParams.delete("max_price");
          searchParams.delete("page");

          if (e.target.value === "all") {
            setSearchParam(searchParams);
            return;
          } else {
            const [min, max] = e.target.value.split("-");

            if (min) {
              searchParams.set("min_price", min);
              setSearchParam(searchParams);
            }
            if (max) {
              searchParams.set("max_price", max);
              setSearchParam(searchParams);
            }
          }
        }}
      >
        <option value="all">All</option>
        <option value="-50000">Under 50.000</option>
        <option value="50000-100000">50.000 - 100.000</option>
        <option value="100000-">Above 100.000</option>
      </select>
    </div>
  );
}
