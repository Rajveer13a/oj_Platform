"use client"

import SkeletonTable from "@/components/SkeletonTable";
import { Card, CardContent } from "@/components/ui/card"
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



const problemList = [
    {
        title: "two sum problem",
        difficulty: "easy",
        acceptance: "98",

    },
    {
        title: "Maximum Total Subarray Value 1",
        difficulty: "medium",
        acceptance: "90"
    },
    {
        title: "hard prblem",
        difficulty: "hard",
        acceptance: "90"
    }
]



export default function ProblemSetPage() {

    const router = useRouter();


    const { problemList } = useProblemSet();
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
        </Card>
      </div>
    )
}