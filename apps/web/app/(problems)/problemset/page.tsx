"use client"

import ProblemPagination from "@/components/ProblemPagination";
import SkeletonTable from "@/components/SkeletonTable";
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import useProblemSet from "@/hooks/useProblemSet";
import { useRouter } from "next/navigation";



export default function ProblemSetPage() {

    const router = useRouter();


    const { problemList, paginationData, setPage } = useProblemSet();
    console.log(problemList)
    return (
      <div className="flex items-center justify-center p-14">
        <Card>
          <CardContent>
            <Table className="w-[60vw]">
              <TableHeader className="pointer-events-none">
                <TableRow>
                  <TableHead className="w-[500px]">Title</TableHead>
                  <TableHead>difficulty</TableHead>
                  <TableHead>acceptance</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                { problemList.length == 0 && <SkeletonTable /> }

                {problemList.map((prob) => (
                  <TableRow
                    onClick={() => router.push(`/problem/${prob.slug}`)}
                    className="cursor-pointer"
                    key={prob.id}
                  >
                    <TableCell className="font-bold">{prob.title}</TableCell>

                    <TableCell
                      className={`${prob.difficulty == "medium" && "text-yellow-400"} ${prob.difficulty == "hard" && "text-yellow-700"}`}
                    >
                      {prob.difficulty}
                    </TableCell>

                    <TableCell className="text-xs text-slate-200">
                      {prob.acceptanceRate}%
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>

              <TableFooter></TableFooter>
            </Table>
          </CardContent>

          <CardFooter>
            <ProblemPagination paginationData={paginationData} setPage={setPage}/>
          </CardFooter>
        </Card>
      </div>
    )
}