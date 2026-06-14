import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"

const LANGUAGES = [
  { value: "python", label: "Python" },
  { value: "javascript", label: "JavaScript" },
  // { value: "cpp", label: "C++" },
  // { value: "java", label: "Java" },
]

interface LanguageSelectorProps {
  value: string
  onChange: (lang: string) => void
}

export default function LanguageSelector({
  value,
  onChange,
}: LanguageSelectorProps) {
  return (
    <NativeSelect value={value} onChange={(e) => {onChange(e.target.value)}}>
      {LANGUAGES.map((lang) => (
        <NativeSelectOption key={lang.value} value={lang.value}>
          {lang.label}
        </NativeSelectOption>
      ))}
    </NativeSelect>
  )
}
