class Agent {
    constructor() { }

    minimax(board, depth, isMaximizing, alpha, beta, player, opponent) {
        const result = board.gameOver();
        if (result !== 0) {
            if (result === player) return 10 - depth;
            if (result === opponent) return depth - 10;
            return 0;
        }

        if (isMaximizing) {
            let maxEval = -Infinity;
            for (let i = 0; i < board.cells.length; i++) {
                const cell = i + 1;
                if (board.cellFree(cell)) {
                    const newBoard = board.clone();
                    newBoard.move(cell);
                    const evaluation = this.minimax(newBoard, depth + 1, false, alpha, beta, player, opponent);
                    maxEval = Math.max(maxEval, evaluation);
                    alpha = Math.max(alpha, evaluation);
                    if (beta <= alpha) break;
                }
            }
            return maxEval;
        } else {
            let minEval = Infinity;
            for (let i = 0; i < board.cells.length; i++) {
                const cell = i + 1;
                if (board.cellFree(cell)) {
                    const newBoard = board.clone();
                    newBoard.move(cell);
                    const evaluation = this.minimax(newBoard, depth + 1, true, alpha, beta, player, opponent);
                    minEval = Math.min(minEval, evaluation);
                    beta = Math.min(beta, evaluation);
                    if (beta <= alpha) break;
                }
            }
            return minEval;
        }
    }

    selectMove(board) {
        let bestScore = -Infinity;
        let move = null;
        const player = board.playerOne ? 1 : 2;
        const opponent = board.playerOne ? 2 : 1;

        for (let i = 0; i < board.cells.length; i++) {
            const cell = i + 1;
            if (board.cellFree(cell)) {
                const newBoard = board.clone();
                newBoard.move(cell);
                const score = this.minimax(newBoard, 0, false, -Infinity, Infinity, player, opponent);
                if (score > bestScore) {
                    bestScore = score;
                    move = cell;
                }
            }
        }
        return move;
    }
}
