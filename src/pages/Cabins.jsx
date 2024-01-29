import Heading from "../ui/Heading";
import Row from "../ui/Row";

import CabinTable from "../features/cabins/CabinTable";
import Button from "../ui/Button";
import { useState } from "react";
import CreateCabinForm from "../features/cabins/CreateCabinForm";

function Cabins() {
  const [showForm, setShowForm] = useState();
  const btnStyle = {
    width: "100%",

    marginTop: "10px",
    marginBottom: "10px",
  };
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>

        <p>Filter / Sort </p>
      </Row>
      <Row>
        <CabinTable />
        <Button
          style={btnStyle}
          size="large"
          variation="primary"
          onClick={() => setShowForm((h) => !h)}
        >
          {showForm ? "cancel" : "add new cabin"}
        </Button>
        {showForm && <CreateCabinForm />}
      </Row>
    </>
  );
}

export default Cabins;
