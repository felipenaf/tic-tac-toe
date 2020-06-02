import React from 'react';
import {Square} from './square.js';

class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square
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
        const cols = Array(3).fill(null);
        const rows = Array(3).fill(null);
        const board = [];
        let iterator = 0;

        rows.map(() => {
            const itens = [];

            cols.map(() => {
                itens.push(
                    this.renderSquare(iterator)
                );

                iterator++;
            });

            board.push(
                <div key={iterator} className="board-row">
                    {itens.map((x) => x)}
                </div>
            );
        });

        return (
            <div>
                {board}
            </div>
        );
    }
}

export default Board;
