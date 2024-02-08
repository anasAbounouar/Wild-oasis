import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import Spinner from "../../ui/Spinner";
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiTrash,
} from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../check-in-out/useCheckout";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteBooking } from "./useDeleteBooking";
import Empty from "../../ui/Empty";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const navigate = useNavigate();
  const { deleteBooking, isDeleting } = useDeleteBooking();

  const { booking, isLoading } = useBooking();
  const { checkout, isCheckingOut } = useCheckout();
  const moveBack = useMoveBack();
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };
  const isWorking = isLoading || isCheckingOut;
  if (!booking) return <Empty resource="booking" />;

  if (isWorking) return <Spinner />;
  const { id: bookingId, status } = booking;

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading type="" as="h1">
            Booking #${bookingId}
          </Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        <Button variation="secondary" size="medium" onClick={moveBack}>
          Back
        </Button>
        {status === "unconfirmed" && (
          <Button
            variation="primary"
            size="medium"
            icon={<HiArrowDownOnSquare />}
            onClick={() => navigate(`/checkin/${bookingId}`)}
          >
            Check In
          </Button>
        )}
        <Modal>
          <Modal.Open opens="delete">
            <Button variation="danger" size="medium" icon={<HiTrash />}>
              Delete Booking
            </Button>
          </Modal.Open>
          <Modal.Window name="delete">
            <ConfirmDelete
              disabled={isDeleting}
              resourceName="booking"
              onConfirm={() => {
                navigate("/bookings");
                deleteBooking(bookingId);
              }}
            />
          </Modal.Window>
        </Modal>
        {status === "checked-in" && (
          <Button
            variation="primary"
            size="medium"
            disabled={isCheckingOut}
            icon={<HiArrowUpOnSquare />}
            onClick={() => checkout({ bookingId })}
          >
            Check Out
          </Button>
        )}
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
