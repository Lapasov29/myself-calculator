class Calculator{
    equalCount = 0
    dotcount = 0
    constructor(numbers, clear, sign, dot, equal){
        this.play = this.rendering(numbers, sign, dot, equal)
        this.clearDisplay = this.clear(clear)
    }
    rendering(digits, mathOperations, dot, compute){
        let part2 = ''
        for(let i of digits){
            i.addEventListener('click', (event) => {
                if(this.equalCount > 0 && !/[+\-\✕\÷\.]/i.test(input.value[input.value.length - 1])){
                    input.value = null
                    this.equalCount = 0
                } 
                else if(this.equalCount > 0 && /[+\-\✕\÷]/i.test(input.value[input.value.length - 1])) input.value = input.value
                if(input.value[input.value.length - 1] == '0' && /[+\-\✕\÷]/i.test(input.value[input.value.length - 2])) input.value = input.value.replace(/0$/, '')
                
                if((input.value[0] == '0' && input.value[0 + 1] != '.')) input.value = null
                input.value += i.textContent;
            })
        }
        for(let operation of mathOperations){
            operation.addEventListener('click', (event) => {
                if(input.value[input.value.length - 1] == '.') input.value = input.value.replace('.', operation.textContent)

                if(input.value[input.value.length - 1] == (input.value.match(/[+\-\✕\÷]/g) + '')) input.value = input.value.replace(input.value[input.value.length - 1], operation.textContent)

                if(input.value[0] == '-' && !(/[+\-\✕\÷]/g.test(input.value[input.value.length-1]))) input.value += operation.textContent

                if(!/[+\-\✕\÷]/i.test(input.value)) input.value += operation.textContent
            })
        }
        dot.addEventListener('click', (event) => {
            if(/[+\-\✕\÷]/g.test(input.value[input.value.length-1])){
                this.dotcount++
                input.value += '0.'
            } 
            if(input.value[input.value.length-1] == '.') input.value = input.value
            else if((!input.value.includes('.')) || ((/[+\-\✕\÷]/g.test(input.value)) && this.dotcount < 2)){
                this.dotcount++
                input.value += dot.textContent
            } 
                
        })
        compute.addEventListener('click', (event) => {
            if((/[+\-\✕\÷]/g.test(input.value))) this.equal(input.value)
        })
    }

    clear(clearButtons){
        for(let btn of clearButtons){
            btn.addEventListener('click', (event) => {
                if(btn.textContent == 'C') input.value = '0'
                else input.value = input.value.split('').splice(0, input.value.length - 1).join('') 
                if(input.value == '') input.value = '0'
            })
        }
    }

    equal(expression){
        this.equalCount++
        if(expression.match(/[+\-\✕\÷]/g).length > 1){
            expression = expression.replace('✕', '*')
            expression = expression.replace('÷', '/')
            input.value = eval(expression);
        }else{
            let numbers = expression.split(expression.match(/[+\-\✕\÷]/g))
            switch (expression.match(/[+\-\✕\÷]/g) + '') {
                case '+':
                    this.plus(+numbers[0], numbers[1])
                    break;
    
                case '-':
                    this.substract(+numbers[0], numbers[1])
                    break;
    
                case '✕':
                    this.multiply(+numbers[0], numbers[1])
                    break;
    
                case '÷':
                    this.devide(+numbers[0], numbers[1])
                    break;
            
                default:
                    input.value = 'Error'
                    break;
            }
        }
    }

    plus(arg1, arg2){
        if(!(/[0-9]/g.test(arg2))) input.value = arg1 + arg1
        else input.value = arg1 + +arg2
    }
    substract(arg1, arg2){
        if(!(/[0-9]/g.test(arg2))) input.value = arg1 - arg1
        else input.value = arg1 - +arg2
    }
    multiply(arg1, arg2){
        if(!(/[0-9]/g.test(arg2))) input.value = arg1 * arg1
        else input.value = arg1 * +arg2
    }
    devide(arg1, arg2){
        if(!(/[0-9]/g.test(arg2))) input.value = arg1 / arg1
        else input.value = arg1 / +arg2
    }
}

let input = document.querySelector('#input')
let nums = document.querySelectorAll('.num')
let clear = document.querySelectorAll('.remove-element')
let sign = document.querySelectorAll('.sign')
let dot = document.querySelector('.dot')
let equal = document.querySelector('.equal')
let calc = new Calculator(nums, clear, sign, dot, equal)
