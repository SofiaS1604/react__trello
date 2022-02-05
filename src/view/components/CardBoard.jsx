import * as React from 'react';
import { Link } from "react-router-dom";

class CardBoard extends React.Component {
    render() {
        return (
            <div style={{backgroundColor: this.props.color}} className="card__item card">
                <div className="card__info">
                    <div className="card__title">{this.props.title}</div>
                    <div className="card__text">{this.props.text}</div>
                </div>
                <Link className="card__arrow" to={`board/${this.props.id}`}>&#10132;</Link>
            </div>
        );
    }
}

export default CardBoard