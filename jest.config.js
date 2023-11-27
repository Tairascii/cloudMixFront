module.exports = {
  moduleDirectories: ['node_modules', '<rootDir>/node_modules', '.'],
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|webp|svg)$': '<rootDir>/settings/jest-image-mock.js',
  },
  modulePaths: ['modules'],
  automock: false,
  testEnvironment: 'jsdom',
};