const VARIANTES = {
  primary: 'btn-primary',
  ghost: 'btn-ghost',
  icon: 'btn-icon',
};

/** Botão padrão do sistema. */
export default function Button({
  variant = 'primary',
  size,
  className = '',
  type = 'button',
  full = false,
  children,
  ...props
}) {
  const classes = [
    VARIANTES[variant] ?? VARIANTES.primary,
    size === 'sm' ? 'btn-sm' : '',
    full ? 'w-full' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
}
