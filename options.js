const options = document.querySelector(".options"); // select start menu

const computerBtn = document.querySelector(".computer"); // selects the buttons on menu
const friendBtn = document.querySelector(".friend");
const xBtn = document.querySelector(".x");
const oBtn = document.querySelector(".o");
const playBtn = document.querySelector(".play");

// for gameover

const player = new Object;
let OPPONENT;
oBtn.addEventListener("click", function () {
    player.man = "O";
    player.computer = "X";
    player.friend = "X";

    switchActive(xBtn, oBtn);
});

xBtn.addEventListener("click", function () {
    player.man = "X";
    player.computer = "O";
    player.friend = "O";

    switchActive(oBtn, xBtn);
});

computerBtn.addEventListener("click", function () {
    OPPONENT = "computer";
    switchActive(friendBtn, computerBtn);
});

friendBtn.addEventListener("click", function () {
    OPPONENT = "friend";
    switchActive(computerBtn, friendBtn);
});

playBtn.addEventListener("click", function () {
    if (!OPPONENT) {
        computerBtn.style.backgroundColor = "LightCoral";
        friendBtn.style.backgroundColor = "LightCoral";
        return;
    }

    if (!player.man) {
        oBtn.style.backgroundColor = "LightCoral";
        xBtn.style.backgroundColor = "LightCoral";
        return;
    }

    init(player, OPPONENT);
    options.classList.add("hide");
});

function switchActive(off, on) {
    off.classList.remove("active");
    on.classList.add("active");
}