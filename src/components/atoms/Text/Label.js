import styled, { css } from "styled-components";
import { textBase, textProps, textDefaults } from './textBase';
import theme from "theme";

const Label = styled.div`
  ${textBase};
  font-size: 0.875rem;
  margin-bottom: 15px;
  ${({ color }) => color && css`color: ${color}`};
`;

Label.propTypes = textProps;

Label.defaultProps = textDefaults;

export default Label;
