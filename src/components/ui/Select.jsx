export default function Select({ error = false, className = '', children, ...props }) {
  return (
    <select className={['input', error ? 'input-error' : '', className].filter(Boolean).join(' ')} {...props}>
      {children}
    </select>
  );
}
