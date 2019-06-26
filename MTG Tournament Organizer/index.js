var players = [];

function addPlayer() {
    let name = document.getElementById("playerName").value;
    document.getElementById("playerName").value = ''; // clear the input value
    // console.log(name);
    if (name != "") {
        players.push(name);
        document.getElementById("playerArray").innerHTML = players;
        // console.log(players);
    }
}

function hideElement(ele) {
    var elem = document.getElementById(ele);
    if (elem.style.display === "none") {
        elem.style.display = "block";
    } else {
        elem.style.display = "none";
    }
}

function finishAdd() {
    hideElement("addPlayerID");
}