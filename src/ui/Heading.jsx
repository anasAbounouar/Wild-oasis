import styled, { css } from "styled-components";

const test = css`
  text-align: center;
  font-size: 12px;
  ${10 > 5 && "background: blue;"}
`;

const Heading = styled.h1`
  ${(props) =>
    props.type === "big" &&
    css`
      font-size: 13px;
    `}
  ${(props) =>
    props.type === "medium" &&
    css`
      font-size: 10px;
    `}
  ${(props) =>
    props.type === "small" &&
    css`
      font-size: 8px;
    `}
`;
Heading.defaultProps = {
  type: "big",
};
export default Heading;
