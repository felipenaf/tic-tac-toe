import React from 'react';
import {Square} from './square.js';
import {SquareId} from './squareId.js';

class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    renderSquareId(i) {
        return (
            <SquareId
                value={i}
            />
        );
    }

    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquareId()}
                    {this.renderSquareId('1')}
                    {this.renderSquareId('2')}
                    {this.renderSquareId('3')}
                </div>
                <div className="board-row">
                    {this.renderSquareId('1')}
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquareId('2')}
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquareId('3')}
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

export default Board;
