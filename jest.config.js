const { pathsToModuleNameMapper } = require("ts-jest");
// const { compilerOptions } = require("./tsconfig.json");

module.exports = {
	preset: "ts-jest",
	testEnvironment: "node",
	testMatch: ["**/**/*.spec.ts"],
	verbose: true,
	forceExit: true,
	clearMocks: true,
	resetMocks: true,
	restoreMocks: true,
	roots: ["./src"],
	modulePaths: ["./src"], // <-- This will be set to 'baseUrl' value
	moduleNameMapper: pathsToModuleNameMapper(
		{
			"@/resource/*": ["resource/*"],
			"@/util/*": ["util/*"],
			"@/typings/*": ["typings/*"],
			"@/middleware/*": ["middleware/*"],
			"@/config/*": ["config/*"],
		} /*, { prefix: '<rootDir>/' } */
	),
};
