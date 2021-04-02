function init(player, OPPONENT) {
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    const gameOverElement = document.querySelector('.gameover')
    const COLUMN = 3;
    const ROW = 3;

    let board = [];

    const SPACE_SIZE = 150;

    let gameData = new Array(9);
    let currentPlayer = player.man;

    const xImage = new Image();
    xImage.src = 'x.png'
    const oImage = new Image();
    oImage.src = 'O.png'

    const COMBOS = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

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

    function drawOnBoard(player, i, j) {
        let img = player == "X" ? xImage : oImage;

        ctx.drawImage(img, j * SPACE_SIZE, i * SPACE_SIZE);
    }

    canvas.addEventListener('click', function (event) {
        let x = event.clientX - canvas.getBoundingClientRect().x;
        let y = event.clientY - canvas.getBoundingClientRect().y;

        let i = Math.floor(y / SPACE_SIZE);
        let j = Math.floor(x / SPACE_SIZE);

        let id = board[i][j];

        if (gameData[id]) return;

        gameData[id] = currentPlayer;
        drawOnBoard(currentPlayer, i, j);
        if (isWinner(gameData, currentPlayer)) {
            showGameOver(currentPlayer);
            GAME_OVER = true;
            return;
        }
        if (isTie(gameData)) {
            showGameOver("tie");
            GAME_OVER = true;
            return;
        }

        if (OPPONENT == "computer") {
            // get id of space using minimax algorithm
            let id = minimax(gameData, player.computer).id;

            // store the player's move to gameData
            gameData[id] = player.computer;

            // get i and j of space
            let space = getIJ(id);

            // draw the move on board
            drawOnBoard(player.computer, space.i, space.j);

            // Check if the play wins
            if (isWinner(gameData, player.computer)) {
                showGameOver(player.computer);
                GAME_OVER = true;
                return;
            }

            // check if it's a tie game
            if (isTie(gameData)) {
                showGameOver("tie");
                GAME_OVER = true;
                return;
            }


        } else {
            // GIVE TURN TO THE OTHER PLAYER
            currentPlayer = currentPlayer == player.man ? player.friend : player.man;
        }

    });

    function isWinner(gameData, player) {
        for (let i = 0; i < COMBOS.length; i++) {
            let won = true;

            for (let j = 0; j < COMBOS[i].length; j++) {
                let id = COMBOS[i][j];
                won = gameData[id] == player && won;
            }

            if (won) {
                return true;
            }
        }
        return false;
    }

    function isTie(gameData) {
        let isBoardFill = true;
        for (let i = 0; i < gameData.length; i++) {
            isBoardFill = gameData[i] && isBoardFill;
        }
        if (isBoardFill) {
            return true;
        }
        return false;
    }

    function showGameOver(player) {
        let message = player == "tie" ? "nobody won!" : "the winner is...";
        let imgSrc = `${player}.png`;

        gameOverElement.innerHTML = `
            <h1>${message}</h1>
            <img class="winner-img" src=${imgSrc} </img>
            <div class="play" onclick="location.reload()">run it back</div>
        `;

        gameOverElement.classList.remove("hide");


    }

    function minimax(gameData, PLAYER) {
        // BASE
        if (isWinner(gameData, player.computer)) return { evaluation: +10 };
        if (isWinner(gameData, player.man)) return { evaluation: -10 };
        if (isTie(gameData)) return { evaluation: 0 };

        // LOOK FOR EMTY SPACES
        let EMPTY_SPACES = getEmptySpaces(gameData);

        // SAVE ALL MOVES AND THEIR EVALUATIONS
        let moves = [];

        // LOOP OVER THE EMPTY SPACES TO EVALUATE THEM
        for (let i = 0; i < EMPTY_SPACES.length; i++) {
            // GET THE ID OF THE EMPTY SPACE
            let id = EMPTY_SPACES[i];

            // BACK UP THE SPACE
            let backup = gameData[id];

            // MAKE THE MOVE FOR THE PLAYER
            gameData[id] = PLAYER;

            // SAVE THE MOVE'S ID AND EVALUATION
            let move = {};
            move.id = id;
            // THE MOVE EVALUATION
            if (PLAYER == player.computer) {
                move.evaluation = minimax(gameData, player.man).evaluation;
            } else {
                move.evaluation = minimax(gameData, player.computer).evaluation;
            }

            // RESTORE SPACE
            gameData[id] = backup;

            // SAVE MOVE TO MOVES ARRAY
            moves.push(move);
        }

        // MINIMAX ALGORITHM
        let bestMove;

        if (PLAYER == player.computer) {
            // MAXIMIZER
            let bestEvaluation = -Infinity;
            for (let i = 0; i < moves.length; i++) {
                if (moves[i].evaluation > bestEvaluation) {
                    bestEvaluation = moves[i].evaluation;
                    bestMove = moves[i];
                }
            }
        } else {
            // MINIMIZER
            let bestEvaluation = +Infinity;
            for (let i = 0; i < moves.length; i++) {
                if (moves[i].evaluation < bestEvaluation) {
                    bestEvaluation = moves[i].evaluation;
                    bestMove = moves[i];
                }
            }
        }

        return bestMove;
    }
    function getEmptySpaces(gameData) {
        let EMPTY = [];

        for (let id = 0; id < gameData.length; id++) {
            if (!gameData[id]) EMPTY.push(id);
        }

        return EMPTY;
    }
    function getIJ(id) {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (board[i][j] == id) return { i: i, j: j }
            }
        }
    }
}



