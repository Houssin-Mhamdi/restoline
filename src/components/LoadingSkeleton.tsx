export default function LoadingSkeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`flex justify-center items-center ${className || "min-h-[400px]"}`}>
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary" />
    </div>
  )
}
