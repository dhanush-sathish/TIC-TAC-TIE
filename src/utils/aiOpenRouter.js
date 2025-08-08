

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
        `

    const getMoveFromDeepSeek = async () => {

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                Authorization: `Bearer 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`,
                "Content-Type": 'application/json',
            },
            body: JSON.stringify({
                // model: 'deepseek/deepseek-r1-0528:free',
                model: 'perplexity/sonar-reasoning-pro',
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
             return move;
         } catch (error) {
             console.error("Error fetching AI move:", error);

             const preferredOrder = [4, 0, 8, 2, 6, 1, 3, 5, 7];
              return preferredOrder.find(index => board[index] === null) || null;
         }
    

    
};