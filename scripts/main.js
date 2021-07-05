let grid = document.getElementById("calc-grid");
let expression = document.getElementById("inside-exp");

function isInteger(value) {
	return /^\d+$/.test(value);
}

function inputExpression(event) {
	const inputChar = event.target.innerText;

	if (expression.innerHTML == "0")
	{
		if (isInteger(inputChar))
			expression.innerHTML = inputChar;
	}

	else
		expression.innerHTML = expression.innerHTML + ` ${inputChar}`;
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