export const GRAY = '#555b6e';
export const LIGHT_RED = '#c13043';
export const GREEN = '#89b0ae';
export const LIGHT_GREEN = '#bee3db';
export const CREAM = '#faf9f9';
export const CREAMY_PEACH = '#ffd6ba';
export const DARK_BLUE = '#242c39';
export const LIGHT_BLUE = '#314463';

export const colors = {
  GRAY: '#555b6e',
  ERROR: '#c14040',
  GREEN: '#89b0ae',
  LIGHT_GREEN: '#bee3db',
  CREAM: '#faf9f9',
  CREAMY_PEACH: '#ffd6ba',
  DARK_BLUE: '#242c39',
  LIGHT_BLUE: '#314463',
};

const theme = {
  font: {
    size: '1rem',
    family: 'Lexend Deca',
    weight: 'normal',
  },
  color: {
    default: 'black',
    button: 'white',
  },
};

theme.buttonTypes = {
  primary: {
    color: '#FFF',
    background: colors.DARK_BLUE,
    hover: `
      &:hover {
        background: ${colors.LIGHT_BLUE};
      }
    `,
  },
  secondary: {
    color: '#FFF',
    background: colors.DARK_BLUE,
    hover: `
      &:hover {
        background: ${colors.LIGHT_BLUE};
      }
    `,
  },
};

theme.buttonSizes = {
  large: {
    padding: '0.875rem 2.875rem',
    fontSize: '1.25rem',
  },
  medium: {
    fontSize: '1rem',
    padding: '0.875rem 1.875rem',
  },
  small: {
    fontSize: '1rem',
    padding: '0.275rem 1.275rem',
  },
};

console.log(theme);


export default theme;
