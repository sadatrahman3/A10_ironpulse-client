export default function Spinner({ size = "md" }) {
  const cls = size === "lg" ? "h-12 w-12" : size === "sm" ? "h-5 w-5" : "h-8 w-8";
  return (
    <div className="flex items-center justify-center">
      <div className={`${cls} animate-spin rounded-full border-4 border-ink-600 border-t-volt`} />
    </div>
  );
}
