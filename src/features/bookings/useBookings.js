import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useBookings() {
  const [searchParams] = useSearchParams();
  //filter
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };
  // sort
  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };
  //pagination
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
  const { error, isLoading, data } = useQuery({
    queryKey: ["bookings", filter, sortByRaw, page],
    queryFn: () => getBookings(filter, sortBy, page),
  });
  const bookings = data?.data;
  const count = data?.count;

  return { error, isLoading, bookings, count };
}
