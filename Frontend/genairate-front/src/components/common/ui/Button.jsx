export default function Button({ children, onClick, variant = 'default', className = '', ...props }) {
  const baseStyle = 'px-4 py-2 rounded focus:outline-none focus:ring';
  const variants = {
    default: 'bg-blue-600 text-white hover:bg-blue-700',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700',
  };
  const style = variants[variant] || variants.default;
  return (
    <button onClick={onClick} className={`${baseStyle} ${style} ${className}`} {...props}>
      {children}
    </button>
  );
}
