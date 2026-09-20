// Get display

const display = document.getElementById("display");


// Add value to display

function appendValue(value) {

    if (display.value === "0") {

        display.value = value;

    } else {

        display.value += value;

    }
}


// Clear display

function clearDisplay() {

    display.value = "0";

}


// Delete last character

function deleteLast() {

    if (display.value.length === 1) {

        display.value = "0";

    } else {

        display.value =
            display.value.slice(0, -1);

    }

}


// Calculate result

function calculate() {

    try {

        let expression = display.value;

        // Convert percentage

        expression = expression.replace(
            /(\d+(?:\.\d+)?)%/g,
            "($1/100)"
        );

        let result = Function(
            "return " + expression
        )();

        display.value = result;

    } catch (error) {

        display.value = "Error";

    }

}


// Keyboard support

document.addEventListener(
    "keydown",
    function(event) {

        const key = event.key;


        // Numbers

        if (
            key >= "0" &&
            key <= "9"
        ) {

            appendValue(key);

        }


        // Operators

        else if (
            key === "+" ||
            key === "-" ||
            key === "*" ||
            key === "/" ||
            key === "%"
        ) {

            appendValue(key);

        }


        // Decimal

        else if (key === ".") {

            appendValue(".");

        }


        // Enter

        else if (
            key === "Enter" ||
            key === "="
        ) {

            calculate();

        }


        // Backspace

        else if (key === "Backspace") {

            deleteLast();

        }


        // Escape

        else if (key === "Escape") {

            clearDisplay();

        }

    }
);