import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import CheckBox from "../../ui/Checkbox";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import { useChecking } from "./useCheckin";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;
const Mrg = styled.div`
  margin-top: 20px;
`;

function CheckinBooking() {
  const moveBack = useMoveBack();
  const [confirmPaid, setConfirmPaid] = useState(true);

  const { booking, isLoading } = useBooking();

  useEffect(() => {
    setConfirmPaid(booking?.isPaid ?? false);
  }, [booking?.isPaid]);

  const { checkin, isCheckin } = useChecking();

  const isWorking = isCheckin || isLoading;

  if (isWorking) return <Spinner />;

  function handleCheckin() {
    if (!confirmPaid) return;

    checkin?.(bookingId);
  }

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>
      <BookingDataBox booking={booking} />
      <Box>
        <CheckBox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((h) => !h)}
          id="confirm"
          disabled={confirmPaid}
        >
          I confirm that {guests.fullName} has paid the total amount of{" "}
          {formatCurrency(totalPrice)}
        </CheckBox>
      </Box>
      <Mrg>
        <ButtonGroup>
          <Button variation="secondary" size="medium" onClick={moveBack}>
            Back
          </Button>
          <Button
            disabled={!confirmPaid}
            variation="primary"
            size="medium"
            onClick={handleCheckin}
          >
            Check in booking #{bookingId}
          </Button>
        </ButtonGroup>
      </Mrg>
    </>
  );
}

export default CheckinBooking;
