const {add} = require('./script');


test('sečte ruzná čísla a porovná s výstupem', () => {
    expect(add(5, 10)).toBe(15);
    expect(add(7, 11)).toBe(18);
    expect(add(0, 5)).toBe(5);
});
