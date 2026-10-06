export default function Loading() {
  return (
    <div className="container-x flex min-h-[60vh] items-center justify-center py-32">
      <div className="flex flex-col items-center gap-4">
        <span className="h-10 w-10 animate-spin rounded-full border-2 border-line/20 border-t-sky" />
        <span className="text-sm text-muted">Loading…</span>
      </div>
    </div>
  );
}
