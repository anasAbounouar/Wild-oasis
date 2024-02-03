import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

export function useBooking() {
  const { bookingId } = useParams();
  const { data: booking, isLoading } = useQuery({
    queryKey: ["cabins", bookingId],
    queryFn: () => getBooking(Number(bookingId)),
  });
  return { isLoading, booking };
}
