
//verifying form inputs
const auth = (callback) => {
    var flag = true;
    if(document.getElementById("username").value != "admin")
        flag = false;
    else if(document.getElementById("password").value != "12345")
        flag = false;

    callback(flag);

}

//validating form inputs

const validate = () => {
    auth((flag) => {
        if(flag)
            window.location.href ="main.html";
        else
            alert("Try \n Username: admin \n Password: 12345");
    });

}

//ticking boxes in todoist - validating box ticks //main.html

var tickCount = 0;

const validatePromise = () => {
    return new Promise((resolve) => {
        setTimeout(()=> {
            if(tickCount == 5) resolve();
        },120);
    });
} 

//loading JSON stuff into a table 
const loadJSON = () => {
    if((document.getElementById("intro")!= null) && (document.getElementById("button")!= null)) {
        document.getElementById("intro").remove() //what is this for? -> to clear the body
        document.getElementById("button").remove() //what is this for? -> to clear the body
    }
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if(this.readyState == 4 && this.status == 200) {
            const data = JSON.parse(this.responseText);
            const table = document.getElementById('table');
            const properties = Object.getOwnPropertyNames(data[0]); //what is this for?

            var tr = document.createElement('tr');
            properties.forEach((prop, i) => {
                tr.appendChild(document.createElement('th'));
                tr.cells[i].appendChild(document.createTextNode(prop));

            })
            table.appendChild(tr);  //null error

            data.forEach((task, j) => {
                var tr = document.createElement('tr');
                properties.forEach((prop,i) => {
                    if(i == 3) {
                        var tickbox = document.createElement("input");
                        tickbox.type = "checkbox";
                        if(!(tickbox.checked = tickbox.disabled = data[j][prop] == true)) {
                            tickbox.addEventListener("change", (box) => {
                                if(tickbox.checked == true)
                                tickCount++;
                                else 
                                tickCount--;
                                validatePromise().then(() => {
                                    alert("Congrats! 5 tasks have been successfully completed!");

                                })
                            })
                        }
                        var cell = document.createElement("td");
                        cell.appendChild(tickbox);
                        tr.appendChild(cell);
                        return;
                    }

                    tr.appendChild(document.createElement('td'));
                    tr.cells[i].appendChild(document.createTextNode(data[j][prop]))

                })
                table.appendChild(tr);
            })
        }
    };
    xhttp.open("GET", "https://jsonplaceholder.typicode.com/todos", true);
    xhttp.send();
}
