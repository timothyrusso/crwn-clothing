import {
  BaseButton,
  GoogleSignInButton,
  InvertedButton,
} from './button.styles.jsx';

const BUTTON_STYLE_CLASSES = {
  google: 'google-sign-in',
  inverted: 'inverted',
};

const Button = ({ children, buttonType, ...otherProps }) => {
  return (
    <button
      className={`button-container ${BUTTON_STYLE_CLASSES[buttonType]}`}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default Button;
