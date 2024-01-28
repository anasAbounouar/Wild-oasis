import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import styled from "styled-components";
const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4em 4.8em 6.4em;
  overflow-y: scroll;
`;

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;
const Container = styled.div`
  max-width: 120rem;
  margin: 0px auto;
  flex-direction: column;
  display: flex;
  gap: 3.2rem;
`;
function AppLayout() {
  return (
    <StyledAppLayout>
      <Sidebar />
      <Header />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
