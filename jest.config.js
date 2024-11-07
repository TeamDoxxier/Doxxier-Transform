
module.exports = {
  globals:{
    'ts-jest': {
      babelConfig: true,
      useESM: true,
    },
  },
  testEnvironment: "node",
  transform: {
    "^.+.ts?$": "babel-jest",
    "^.+.tsx?$": "babel-jest",
  },
};