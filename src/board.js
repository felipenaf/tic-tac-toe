import React from 'react';
import {Square} from './square.js';

class Board extends React.Component {
    renderSquare(i) {
        let winning_square = '';

        if (this.props.winners && this.props.winners.includes(i)) {
            winning_square = 'winning-square';
        }

        return (
            <Square
                winner={winning_square}
                key={i}
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    /**
     * Todos os elementos que entram na iteração precisam de "key"
     * Tanto o component Square como a div em que ele se encontra
     */
    render() {
        const cols = 3;
        const rows = 3;
        const board = [];
        let iterator = 0;

        for(let i = 0; i < rows; i++) {
            const itens = [];

            for(let j = 0; j < cols; j++) {
                itens.push(
                    this.renderSquare(iterator)
                );

                iterator++;
            };

            board.push(
                <div key={iterator} className="board-row">
                    {itens.map((x) => x)}
                </div>
            );
        };

        return (
            <div>
                {board}
            </div>
        );
    }
}

export default Board;
