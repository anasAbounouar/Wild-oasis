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
import { HiArrowDownOnSquare } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const navigate = useNavigate();
  const { booking, isLoading } = useBooking();
  const moveBack = useMoveBack();
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  if (isLoading) return <Spinner />;
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
      {status === "unconfirmed" && (
        <ButtonGroup>
          <Button variation="secondary" size="medium" onClick={moveBack}>
            Back
          </Button>
          <Button
            variation="primary"
            size="medium"
            icon={<HiArrowDownOnSquare />}
            onClick={() => navigate(`/checkin/${bookingId}`)}
          >
            Check In
          </Button>
        </ButtonGroup>
      )}
    </>
  );
}

export default BookingDetail;
