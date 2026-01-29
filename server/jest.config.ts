module.exports = {
	preset: "ts-jest",
	testEnvironment: "node",
	roots: ["<rootDir>/src"],
	testMatch: ["**/__test__/**/*.spec.ts"],
	collectCoverageFrom: ["src/**/*.ts", "!src/**/*.spec.ts"],
	moduleNameMapper: {
		"^src/(.*)$": "<rootDir>/src/$1",
	},
};
