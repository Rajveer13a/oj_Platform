"use client"

import CodeEditor from "@/components/editor/CodeEditor"
import LanguageSelector from "@/components/editor/LanguageSelector"
import { Submission } from "@/components/submission/Submission"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import useProblem from "@/hooks/useProblem"
import { useProblemEditor } from "@/hooks/useProblemEditor"
import { useParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { useSubmission } from "@/hooks/useSubmission"
import { BookText, CloudUpload } from "lucide-react"
import { Spinner } from "@/components/ui/spinner"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProblemPage() {
  const { slug } = useParams()

  const { problemData } = useProblem(slug as string)

  const {
    language,
    code,
    submissionId,
    isSubmitting,
    error,
    setCode,
    handleLanguageChange,
    handleSubmit,
  } = useProblemEditor(problemData)

  const { submission, isPolling } = useSubmission(submissionId)

  return (
    <div className="h-[90vh] w-full">
      <ResizablePanelGroup
        orientation="horizontal"
        className="rounded-lg border"
      >
        <ResizablePanel className="p-4" defaultSize="50%">
          <Tabs className="h-full" defaultValue="description">

            <TabsList>

              <TabsTrigger value="description">
                <BookText className="text-blue-400" />
                Description
              </TabsTrigger>

              <TabsTrigger disabled value="solutions">
                
                Solutions 
              </TabsTrigger>

            </TabsList>
            

            <TabsContent className="h-full" value="description">
              <Card className="h-full">
                <CardContent className="h-full space-y-4 p-6">
                  <h1 className="text-2xl font-bold">{problemData?.title}</h1>

                  <Badge variant="secondary">
                    {problemData?.difficulty || "easy"}
                  </Badge>

                  <pre className="text-wrap">{problemData?.description}</pre>
                </CardContent>
              </Card>
            </TabsContent>

          </Tabs>
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel defaultSize="75%">
          <ResizablePanelGroup orientation="vertical">
            <ResizablePanel defaultSize="75%">
              <div className="h-full border p-6">
                <div className="flex gap-4">
                  <LanguageSelector
                    value={language}
                    onChange={handleLanguageChange}
                  />

                  <Button
                    variant={"outline"}
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className={`flex rounded-md px-4 py-1.5 text-sm font-bold text-green-600 hover:text-green-600 disabled:opacity-50 ${isPolling && "pointer-events-none"}`}
                  >
                    {isPolling ? (
                      <>
                        <Spinner />
                        Pending...
                      </>
                    ) : (
                      <>
                        <CloudUpload />
                        Submit
                      </>
                    )}
                  </Button>
                </div>

                <CodeEditor
                  code={code}
                  language={language}
                  onChange={setCode}
                />
              </div>
            </ResizablePanel>

            <ResizableHandle withHandle />

            <ResizablePanel defaultSize="25%">
              <div className="h-full px-6 pt-2">

                <Submission testCases={problemData?.testCases || []} submission={submission} isPolling={isPolling} />
                
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
