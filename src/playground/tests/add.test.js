const add = (a, b) => a + b;
const genGreeting = (name = 'Anon') => `Hello, ${name}!`;

test('should add two numbers', () => {
    const result = add(3,4);
    expect(result).toBe(7);
    //  if(result !== 7) {
    //      throw new Error(`Added 4 + 3, result was ${result}. Expected 7`);
    //  }
});

test('Greeting to John', () => {
     const result = genGreeting('John');
     expect(result).toBe('Hello, John!');

});

test('Gen greeting with no name input', () => {
    const result = genGreeting();
    expect(result).toBe('Hello, Anon!');
});