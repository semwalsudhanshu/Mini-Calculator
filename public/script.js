class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperandTextElement = currentOperandTextElement
    this.clear()
  }
  factorial(number)
  {
    number = Math.floor(number)
    let ans = 1
    if(number<=1)
    return 1
    while(number>1)
    {
      ans = ans*number
      number = number-1

    }
    return ans
  }
  getsqrt(number)
  {
    return Math.sqrt(number)
  }
  getexponent(number1,number2)
  {
      return number1 ** number2
  }
  getlog(number)
  {
      return Math.log(number)
  }
  clear() {
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = undefined
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return
    this.currentOperand = this.currentOperand.toString() + number.toString()
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return
    if(operation !=='^')
    {
      this.operation = operation
      this.previousOperand = ''
      this.compute()
    }  
    if (this.previousOperand !== '') {
      this.compute()
    }
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
  }

  compute() {
    let computation
    if(this.operation ==='^')
   { const prev  = parseFloat(this.previousOperand)
     const current = parseFloat(this.currentOperand)
     if(isNaN(prev) || isNaN(current))
     return
     computation = this.getexponent(prev,current)
   }
   else
   {
    const current = parseFloat(this.currentOperand)
    if (isNaN(current))
     return
    switch (this.operation) {
      case '!':
        computation = this.factorial(current)
        break
      case '√':
        computation = this.getsqrt(current)
        break
      case 'ln(x)':
        computation = this.getlog(current)
        break
      default:
        return
    }
  }
    this.currentOperand = computation
    this.operation = undefined
    this.previousOperand = ''
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText =
      this.getDisplayNumber(this.currentOperand)
    if (this.operation != null) {
      this.previousOperandTextElement.innerText =
        `${this.getDisplayNumber(this.previousOperand)} `
    } else {
      this.previousOperandTextElement.innerText = ''
    }
  }
}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})
if(equalsButton)
{
  equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
  })
}

if(allClearButton)
{
  allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
  })
}

if(deleteButton)
{
  deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
  })
}


// calculator.currentOperand='16'
// calculator.previousOperand = ''
// calculator.operation = '√'
// console.log(calculator.compute())
exports.calculator = calculator