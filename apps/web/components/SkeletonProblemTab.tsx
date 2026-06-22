import { Badge } from "./ui/badge"
import { Skeleton } from "./ui/skeleton"

export default function SkeletonProblemTab() {
  return (
    <>
      <Skeleton className="h-5 w-40" />

      <Skeleton className="h-4 w-14" />

      <div className="flex w-full  flex-col gap-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-[80%]" />
      </div>
      <div className="flex w-full  flex-col gap-3 mt-12">
        <Skeleton className="h-4 w-[95%]" />
        <Skeleton className="h-4 w-[85%]" />
        <Skeleton className="h-4 w-[50%]" />
      </div>

      <div className="flex w-full  flex-col gap-3 mt-12">
        <Skeleton className="h-4 w-[35%]" />
        <Skeleton className="h-4 w-[25%]" />
        <Skeleton className="h-4 w-[20%]" />
      </div>
      <div className="flex w-full  flex-col gap-3 mt-12">
        <Skeleton className="h-4 w-[35%]" />
        <Skeleton className="h-4 w-[25%]" />
        <Skeleton className="h-4 w-[20%]" />
      </div>
    </>
  )
}
