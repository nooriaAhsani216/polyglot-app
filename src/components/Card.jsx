export default function Card({ children }) {
  return (
    <div className="w-full max-w-sm mx-auto bg-white shadow-2xl overflow-hidden border border-gray-100">
      {children}
    </div>
  );
}