import { Editor } from "@monaco-editor/react"

interface CodeEditorProps {
  code: string
  language: string
  onChange: (value: string) => void
}
export default function CodeEditor({
  code,
  language,
  onChange,
}: CodeEditorProps) {
  return (
    <div className="h-full w-full rounded-md overflow-hidden p-4">
      <Editor
        height={"100%"}
        language={language}
        value={code}
        onChange={(val) => onChange(val || "")}
        theme="vs-dark"
        options={{
          fontSize: 14,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          wordWrap: "on",
          tabSize: 2,
          lineNumbers: "on",
          automaticLayout: true,
          padding: { top: 12 },
        }}
      />
    </div>
  )
}
