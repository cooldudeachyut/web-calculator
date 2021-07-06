let grid = document.getElementById("calc-grid");
let expression = document.getElementById("inside-exp");
let decimalFlag = 0;
let resultFlag = 0;
let numStack = [];
let signStack = [];

function isSign(value) {
	return (value == '+' || value == 'x' || value == '-' || value == '÷');
}

function isInteger(value) {
	return /^\d+$/.test(value);
}

function inputExpression(event) {
	const inputChar = event.target.innerHTML;
	if (resultFlag == 1)
	{
		resultFlag = 0;
		expression.innerHTML = "0";	
	}
	const exp = expression.innerHTML;
	const lastChar = exp[exp.length - 1];

	if (exp == "0")
	{
		if (isInteger(inputChar))
			expression.innerHTML = inputChar;

		else if (inputChar == '.')
		{
			expression.innerHTML = "0.";
			decimalFlag = 1;
		}
	}

	else if (exp.length < 255)
	{
		if (isSign(lastChar))
		{
			if (isInteger(inputChar))
				expression.innerHTML += ` ${inputChar}`;
		}

		else
		{
			if (isInteger(inputChar))
				expression.innerHTML += inputChar;
			
			else if (inputChar == '.')
			{
				if (decimalFlag == 0)
				{
					decimalFlag = 1;
					expression.innerHTML += inputChar;
				}
			}
			
			else
			{
				expression.innerHTML += ` ${inputChar}`;
				decimalFlag = 0;
			}
		}
	}
}

function deleteSingleChar() {
	const exp = expression.innerHTML;

	if (exp.length === 1 || exp == "Undefined" || resultFlag == 1)
	{
		expression.innerHTML = "0";
		resultFlag = 0;
	}
	
	else
	{
		const lastChar = exp[exp.length - 1];
		const secondLastChar = exp[exp.length - 2];

		if (secondLastChar == ' ')
			expression.innerHTML = exp.substr(0, exp.length - 2);
			
		else
			expression.innerHTML = exp.substr(0, exp.length - 1);

		if (lastChar == '.')
			decimalFlag = 0;
	}
}

function operation(num1, num2, sign) {
	if (sign == "+")
		return (num1 + num2);
	
	else if (sign == "-")
		return (num1 - num2);
	
	else if (sign == "x")
		return (num1 * num2);

	else
		return (num1 / num2);
}

function evaluate() {
	const exp = expression.innerHTML;
	let start = 0, end = 0;
	let lastSign, lastNum;

	while (end < exp.length)
	{
		if (exp[end] == " ")
		{
			let expPart = exp.slice(start, end);

			if (isSign(expPart))
			{
				signStack.push(expPart);
				lastSign = expPart;
			}
			
			else
			{
				if (lastSign == 'x' || lastSign == '÷')
				{
					lastNum = numStack.pop();
					signStack.pop();

					if (lastSign == '÷' && expPart == "0")
					{
						expression.innerHTML = "Undefined";
						return;
					}

					lastNum = operation(lastNum, Number(expPart), lastSign);
					numStack.push(lastNum);
				}

				else
					numStack.push(Number(expPart));
			}

			start = ++end;
		}

		end++;
	}

	if (isSign(exp[exp.length - 1]))
		signStack.pop();

	else
		numStack.push(Number(exp.substr(start)));

	let result = numStack.pop();
	
	while (signStack.length != 0)
	{
		lastSign = signStack.pop();
		lastNum = numStack.pop();

		if (lastSign == '÷' && result == 0)
		{
			expression.innerHTML = "Undefined";
			return;
		}

		result = operation(lastNum, result, lastSign);
	}

	if (result != Math.floor(result))
		expression.innerHTML = result.toFixed(2);
	
	else
		expression.innerHTML = result;

	resultFlag = 1;
}

let buttons = ['7', '8', '9', '÷', '4', '5', '6', 'x', '1', '2', '3', '-', '0', '.', '=', '+'];

for (let i = 0; i < 16; i++)
{	
	let button = document.createElement("button");
	button.type = "button";
	button.classList.add("calc-button");
	button.innerHTML = buttons[i];
	if (buttons[i] != '=')
	{
		button.addEventListener("click", inputExpression);

		if (!isInteger(buttons[i]) && buttons[i] != ".")
			button.classList.add("sign-button");
	}

	else
	{
		button.addEventListener("click", evaluate);
		button.setAttribute("style", "background-color:rgb(40, 238, 99);");
	}

	grid.appendChild(button);
}

document.getElementById("clear").addEventListener("click", () => expression.innerHTML = "0");
document.getElementById("delete").addEventListener("click", deleteSingleChar);