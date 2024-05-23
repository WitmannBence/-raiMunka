//GET
fetch("https://pizza.kando-dev.eu/Pizza").then(function(data) {
    return data.json()
})
.then(function(arrayofdata){
   
    arrayofdata.map(function(pizza){
        document.getElementById("container").innerHTML += `<h1>${pizza.name}</h1>
        <img src="${pizza.kepURL}">
        <h2>Glutén mentes: ${pizza.isGlutenFree}</h2>
        <br/>
        <button onclick="remove(${pizza.id})">Töröl</button>`
    })
})
//POST
document.getElementById("buttonsend").onclick = function () {
    if(document.getElementById("name").value == "" || document.getElementById("isGlutenFree").value == "" || document.getElementById("kepURL").value == ""){
        alert("Bizonyos mezők üresek!")
    }
    else{
        let data = JSON.stringify({
            name: document.getElementById("name").value,
            isGlutenFree: Number(document.getElementById("isGlutenFree").value),
            kepURL: document.getElementById("kepURL").value
        })

        fetch("https://pizza.kando-dev.eu/Pizza", {
            method: "POST",
            body: data,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function() {
            location.reload()
        })
    }
}
//DELETE
function remove(id){
    if(confirm("Biztos hogy eltávolítod?")) {
    fetch("https://pizza.kando-dev.eu/Pizza/"+id, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function() {
        location.reload()
    })
}
}

document.getElementById("yesgluten").onclick = function () {
    document.getElementById("isGlutenFree").value = 1
    document.getElementById("yesgluten").style.backgroundColor = 'red';
    document.getElementById("nogluten").style.backgroundColor = 'lime';
}

document.getElementById("nogluten").onclick = function () {
    document.getElementById("isGlutenFree").value = 0
    document.getElementById("nogluten").style.backgroundColor = 'red';
    document.getElementById("yesgluten").style.backgroundColor = 'lime';
}