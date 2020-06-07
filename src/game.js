import React from 'react';
import Board from './board.js';
import {calculateWinner, positionSquare} from './utils.js';

class Game extends React.Component {
    /**
     * O super é obrigatório no construtor
     */
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
                filledPosition: '',
                class: ''
            }],
            stepNumber: 0,
            xIsNext: true,
            order: 'Asc'
        };
    }

    handleClick(i) {
        /**
         * O motivo do slice()
         * Evitar mutação nos permite manter o histórico das versões anteriores do jogo intacta e reutiliza-las mais tarde.
         */
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        // Se houver vencedor ou o square já for preenchido return false
        if (calculateWinner(squares) || squares[i]) {
            return;
        }

        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            // concat é parecido com o push mas o cocat não altera o array original
            history: history.concat([{
                squares: squares,
                filledPosition: i
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0
        });
    }

    handleChange() {
        if (this.state.order === 'Asc') {
            this.setState({order: 'Desc'})
        } else {
            this.setState({order: 'Asc'})
        }
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winners = calculateWinner(current.squares);
        current.class = "active"

        const moves = history.map((step, move) => {
            const desc = move ? `Go to move #${move}` : 'Go to game start';

            if (move !== this.state.stepNumber) {
                step.class = ''
            }

            return (
                <li key={move}>
                    <button className={step.class} onClick={() => this.jumpTo(move)}>{desc}</button>
                    <span className="position-square">{positionSquare(step.filledPosition)}</span>
                </li>
            )
        })

        let status;

        if (winners) {
            status = `Winner: ${current.squares[winners[0]]}`;
        } else {
            status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        winners={winners}
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>

                    <div className="container-toggle">
                        <label className="switch">
                            <Checkbox onChange={() => this.handleChange()}/>
                            <span className="slider round"></span>
                        </label>
                        <br /><span>Order: {this.state.order}</span>
                    </div>

                    <ol>
                        {
                            this.state.order === "Asc"
                            ? moves
                            : moves.reverse()
                        }
                    </ol>
                </div>
            </div>
        );
    }
}

function Checkbox(props) {
    return (
        <input type="checkbox" onChange={props.onChange} />
    );
}

export default Game;
