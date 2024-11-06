const greet = require('./index');

test('greet function', () => {
  expect(greet('World')).toBe('Hello, World!');
});
