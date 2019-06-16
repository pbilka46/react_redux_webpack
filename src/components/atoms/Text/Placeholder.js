import styled, { css } from "styled-components";
import { textBase, textProps, textDefaults } from './textBase';
import theme from "theme";

const Placeholder = styled.div`
  ${textBase};
  font-size: 0.775rem;
  background: #FFF;
  font-weight: normal;
  color: black;
  position: absolute;
  ${({ color }) => color && css`color: ${color}`};
`;

Placeholder.propTypes = textProps;

Placeholder.defaultProps = textDefaults;

export default Placeholder;
