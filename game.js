function init(player, OPPONENT) {
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');

    const COLUMN = 3;
    const ROW = 3;

    let board = [];

    const SPACE_SIZE = 150;

    let gameData = new Array(9);
    let currentPlayer = player.man;

    function drawBoard() {
        let id = 0;
        for (let i = 0; i < ROW; i++) {
            board[i] = [];
            for (let j = 0; j < COLUMN; j++) {
                board[i][j] = id;
                id++;

                ctx.strokeStyle = "#000";
                ctx.strokeRect(j * SPACE_SIZE, i * SPACE_SIZE, SPACE_SIZE, SPACE_SIZE);
            }
        }
    } drawBoard();


    canvas.addEventListener('click', function (event) {
        let x = event.clientX - canvas.getBoundingClientRect().x;
        let y = event.clientY - canvas.getBoundingClientRect().y;

        let i = Math.floor(Y / SPACE_SIZE);
        let j = Math.floor(X / SPACE_SIZE);

        let id = board[i][j];

        if (gameData[id]) return;

        gameData[id] = currentPlayer;
        drawOnBoard();
        if (isWinner(gameData, currentPlayer)) {
            showGameOver(currentPlayer);
            GAME_OVER = true;
            return;
        }
    })
}



