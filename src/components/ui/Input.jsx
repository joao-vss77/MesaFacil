import { forwardRef } from 'react';

/** Input controlado com estados de erro e espaçamento para ícones. */
const Input = forwardRef(function Input(
  { error = false, hasIcon = false, hasAction = false, className = '', ...props },
  ref,
) {
  const classes = [
    'input',
    error ? 'input-error' : '',
    hasIcon ? 'pl-11' : '',
    hasAction ? 'pr-11' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <input ref={ref} className={classes} {...props} />;
});

export default Input;
