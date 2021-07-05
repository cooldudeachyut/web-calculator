let grid = document.getElementById("calc-grid");
let expression = document.getElementById("inside-exp");
let decimalFlag = 0;

function isSign(value) {
	return (value == '+' || value == 'x' || value == '-' || value == '÷');
}

function isInteger(value) {
	return /^\d+$/.test(value);
}

function inputExpression(event) {
	const inputChar = event.target.innerHTML;
	const exp = expression.innerHTML;
	const lastChar = exp[exp.length - 1];
	if (exp == "0")
	{
		if (isInteger(inputChar))
			expression.innerHTML = inputChar;

		else if (inputChar == '.')
			expression.innerHTML = "0.";
	}

	else if (exp.length <= 256)
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

	if (exp.length === 1)
		expression.innerHTML = "0";
	
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

function evaluate() {

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
		button.addEventListener("click", evaluate());
		button.setAttribute("style", "background-color:rgb(40, 238, 99);");
	}

	grid.appendChild(button);
}

document.getElementById("clear").addEventListener("click", () => expression.innerHTML = "0");
document.getElementById("delete").addEventListener("click", deleteSingleChar);