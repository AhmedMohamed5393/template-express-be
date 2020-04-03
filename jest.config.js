module.exports = {
    "roots": [
        "./tests"
    ],
    "transform": {
        "^.+\\.tsx?$": "ts-jest"
    },
    testEnvironment: 'node',
    setupFilesAfterEnv: ["<rootDir>/tests/setup.js"]
}