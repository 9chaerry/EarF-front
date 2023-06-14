import styles from './Button.module.scss';

interface ButtonProps {
  text: string;
  className?: string;
  disabled?: boolean;
  onClick?: (E: any) => void;
}

function Button({ text, className, disabled, onClick }: ButtonProps) {
  const buttonClass = className ? `${styles.button} ${styles[className]}` : styles.button;
  const isDisabled = disabled === true;

  return (
    <button className={buttonClass} disabled={isDisabled} onClick={onClick}>
      {text}
    </button>
  );
}

export default Button;
