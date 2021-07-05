let grid = document.getElementById("calc-grid");
let expression = document.getElementById("expression");

function isInteger(value) {
	return /^\d+$/.test(value);
}

function input(inputChar) {

}

function evaluate()
{

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
		button.addEventListener("click", input(buttons[i]));

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