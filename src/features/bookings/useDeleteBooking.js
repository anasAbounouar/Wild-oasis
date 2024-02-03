import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteBooking  as deleteBookingApi} from "../../services/apiBookings"
import toast from "react-hot-toast"


export function useDeleteBooking() {
    const queryClient = useQueryClient()
    const { mutate:deleteBooking, isPending,isIdle } = useMutation({
        mutationFn:(id)=>deleteBookingApi(id),
        onSuccess: () => {
            toast.success('booking deleted successfuly')
            queryClient.invalidateQueries()
        },
        onError: () => toast.error('there was a probleme in deleting booking ')
    })
    const isDeleting = isPending || !isIdle
    return {deleteBooking,isDeleting}

}