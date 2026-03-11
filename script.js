// Load JSON config
fetch('config.json')
    .then(response => response.json())
    .then(data => {
        console.log("App Name:", data.appName);
    });

// Load XML operations
fetch('operations.xml')
    .then(response => response.text())
    .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
    .then(data => {
        let operations = data.getElementsByTagName("operation");
        let select = document.getElementById("operation");

        for (let i = 0; i < operations.length; i++) {
            let option = document.createElement("option");
            option.value = operations[i].getAttribute("value");
            option.textContent = operations[i].textContent;
            select.appendChild(option);
        }
    });

// Send data to PHP
function calculate() {
    let num1 = document.getElementById("num1").value;
    let num2 = document.getElementById("num2").value;
    let operation = document.getElementById("operation").value;

    fetch('calculate.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `num1=${num1}&num2=${num2}&operation=${operation}`
    })
    .then(response => response.text())
    .then(data => {
        document.getElementById("result").innerHTML = "Result: " + data;
    });
}