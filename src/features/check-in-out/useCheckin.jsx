import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    mutate: checkin,
    isPending,
    isIdle,
  } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfuly checked in `);
      queryClient.invalidateQueries();
      navigate("/");
    },
    onError: () => toast.error("there was an error in checking in "),
  });
  const isCheckingIn = isPending || !isIdle;

  return { checkin, isCheckingIn };
}
