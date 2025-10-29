module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',

  rootDir: './',
  moduleFileExtensions: ['js', 'json', 'ts'],
  testRegex: '.*\\.spec\\.ts$',
  collectCoverageFrom: ['src/**/*.(t|j)s'],
  coverageDirectory: 'coverage',

  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
  },

  // Compilación rápida
  transform: {
    '^.+\\.(t|j)s$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.json',
        isolatedModules: true, // evita análisis de tipos completo
        diagnostics: false,
      },
    ],
  },

  // Optimiza ejecución y suprime ruido de consola
  verbose: false,
  silent: true,

  // Corre tests en un solo proceso (útil si usas Windows o tienes CPU saturada)
  maxWorkers: '50%',

  // Ignora carpetas grandes o innecesarias
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/build/'],

  // Limpia mocks entre tests (evita fugas de memoria)
  clearMocks: true,
};
