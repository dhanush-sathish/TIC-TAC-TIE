

export const GetAimoveFromOpenRouter = async (board) => {
    
    
    const systemprompt = `You are an AI that plays Tic Tac Toe. 
                        Your task is to provide the best move for the AI player 'O' given the current state of the board. 
                        The board is represented as a 1D array of 9 elements, 
                        where each element can be 'X', 'O', or null.
                        
                        Your Goal:

                        1. Analyze the current board state.
                        2. Determine the best move for 'O' like Tic Tac Toe expert.
                        3. Block the player 'X' if they are about to win.
                        4. If no immediate threat, choose the best strategic move.

                        only return One number (0-8) where 'O' should play. DO Not explain.`;


    const userPrompt = `Current board state: 
        ${JSON.stringify(board)}
        Each cell is indexed like this:
        [0][1][2]
        [3][4][5]
        [6][7][8]   

        "O" = AI (You)
        "X" = Human (Player)    
        null = Empty cell

        what is the best move for 'O'?
        `;

    const getManualMove = () => {

        const winningCombinations = [
            [0, 1, 2], // Top row
            [3, 4, 5], // Middle row
            [6, 7, 8], // Bottom row
            [0, 3, 6], // Left column
            [1, 4, 7], // Middle column
            [2, 5, 8], // Right column
            [0, 4, 8], // RightDiagonal
            [2, 4, 6], // LeftDiagonal
        ];
        
        // 1. Try to win
        for (let [a, b, c] of winningCombinations) {
            if (board[a] === 'O' && board[b] === 'O' && board[c] === null) return c;
            if (board[a] === 'O' && board[c] === 'O' && board[b] === null) return b;
            if (board[b] === 'O' && board[c] === 'O' && board[a] === null) return a;
        }
        // 2. Block X
        for (let [a, b, c] of winningCombinations) {
            if (board[a] === 'X' && board[b] === 'X' && board[c] === null) return c;
            if (board[a] === 'X' && board[c] === 'X' && board[b] === null) return b;
            if (board[b] === 'X' && board[c] === 'X' && board[a] === null) return a;
        }
        // 3. Pick preferred position
        const preferredOrder = [4, 0, 8, 2, 6, 1, 3, 5, 7];
        const nextMove = preferredOrder.find(index => board[index] === null);

        return nextMove !== undefined ? nextMove : board.findIndex(cell => cell === null);

    };

    const getMoveFromDeepSeek = async () => {

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${import.meta.env.VITE_Deepseek_API_Secret_Key}`,
                "Content-Type": 'application/json',
            },
            body: JSON.stringify({
                model: 'deepseek/deepseek-r1-0528:free',
                temperature: 0.2,
                messages: [
                    { role: 'system', content: systemprompt }
                    , { role: 'user', content: userPrompt }
                ]
            })
        });

        console.log(response);

        const data = await response.json();
        console.log(data);
        const text = data.choices?.[0]?.message?.content?.trim();
        console.log(text);
        const match = text.match(/^\d+$/);

        return match ? parseInt(match[0], 10) : null;

    };

        try {
            let move = await getMoveFromDeepSeek();
            if (move !== null) {
                return move;
            } else {
                // If AI gave an invalid move, use manual
                return getManualMove();
            }
        } catch (error) {
            console.error("Error fetching AI move:", error);
            return getManualMove();
        }
    

    
};