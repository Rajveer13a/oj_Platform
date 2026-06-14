import { UUID } from "crypto"

export interface apiResponse<T = unknown> {
  success: boolean
  message: string
  data: T
}

type Difficulty = "easy" | "medium" | "hard"

type Language = "python" | "javascript";

export interface TestCase {
  id: UUID
  input: string
  expectedOutput: string
  displayInput: string
  displayOutput: string
}

interface Boilerplate {
  language: Language
  starterCode: string
}

export interface Problem {
  id: UUID
  title: string
  description: string
  slug: string
  difficulty: Difficulty
  testCases: TestCase[]
  acceptanceRate: number
  boilerplates: Boilerplate[]
}

export interface Submission {
  id: UUID
  verdict: string
  language: Language
  runtime: number
  memory: number
  code: string
  errorMessage: string
  failedTestCase: number
  totalTestCases: number
}