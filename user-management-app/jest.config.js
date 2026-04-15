module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
  testMatch: ["**/*.spec.ts"],
  transform: {
    "^.+\\.(ts)$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "js", "html"],
  moduleNameMapper: {
    "^@app/(.*)$": "<rootDir>/src/app/$1",
  },
};
