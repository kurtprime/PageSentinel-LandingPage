export default function Loading() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-3xl space-y-6 animate-pulse">
          <div className="h-6 w-32 mx-auto bg-muted/40 rounded-full" />
          <div className="h-12 w-3/4 mx-auto bg-muted/50 rounded-xl" />
          <div className="h-6 w-1/2 mx-auto bg-muted/40 rounded-lg" />
          <div className="flex gap-3 justify-center mt-4">
            <div className="h-14 w-40 bg-emerald-200/50 rounded-xl" />
            <div className="h-14 w-40 bg-muted/40 rounded-xl" />
          </div>
          <div className="h-64 w-full mx-auto mt-8 bg-muted/30 rounded-xl" />
        </div>
      </div>
    </div>
  )
}
