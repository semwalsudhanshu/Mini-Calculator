 const calc = require('./public/script')


  test("Factorial of number 5 is 20",()=>{
      expect(calc.calculator.factorial(5)).toBe(120)

  });

  test("Square root of 16 is 4",()=>{
    expect(calc.calculator.getsqrt(16)).toBe(4)
  });

  test("Exponential of 2 to the power 3 is 8",()=>{
    expect(calc.calculator.getexponent(2,3)).toBe(8)
  });

  test("Natural log of 8 is 2.0794415416798357",()=>{
    expect(calc.calculator.getlog(8)).toBe(2.0794415416798357)
  });