import type { Config } from "jest"

const config: Config = {
  verbose: true,
  moduleNameMapper: {
    // Aliases
    "^@/(.*)$": "<rootDir>/src/../$1"
  },
  testPathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/.next/",
    "<rootDir>/cypress/"
  ],
  moduleFileExtensions: ["ts", "js", "json", "node"],
  testMatch: ["**/__tests__/**/*.ts?(x)", "**/?(*.)+(spec|test).ts?(x)"],
  transform: {
    "^.+\\.(t|j)sx?$": "ts-jest"
  }
}

export default config
