"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { TableCell, TableRow } from "./ui/table"

export default function SkeletonTable() {
  return (
    <>

     {Array.from({ length: 20 }).map((prob, indx) => (
                  <TableRow
                    className="cursor-pointer"
                    key={indx}
                  >
                    <TableCell className="font-bold">
                        <Skeleton className="h-4"/>
                    </TableCell>

                    <TableCell>
                      <Skeleton className="h-4"/>
                    </TableCell>

                    <TableCell className="text-xs text-slate-200">
                        <Skeleton className="h-4"/>
                    </TableCell>
                  </TableRow>
                ))}
    </>
  )
}
