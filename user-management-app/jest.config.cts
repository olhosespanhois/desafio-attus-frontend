// jest.config.cjs
export default {
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
  testEnvironment: "jsdom",
  transformIgnorePatterns: ["node_modules/(?!.*\\.mjs$|@angular|@ngrx|rxjs)"],
  moduleNameMapper: {
    "^src/(.*)$": "<rootDir>/src/$1",
    "^app/(.*)$": "<rootDir>/src/app/$1",
  },
};
