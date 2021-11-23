import * as React from 'react';

class CardBoard extends React.Component {
    render() {
        const color = ['#EEF7FB', '#F8F1FF', '#FEF7EF', '#F4F4F4', '#EBFDF5', '#F4F4FF', '#F8E8E8']
        let indexColor = Math.floor(Math.random() * 7)
        return (
            <div style={{backgroundColor: color[indexColor]}} className="card__item card">
                <div className="card__info">
                    <div className="card__title">{this.props.title}</div>
                    <div className="card__text">{this.props.text}</div>
                </div>
                <div className="card__arrow">&#10132;</div>
            </div>
        );
    }
}

export default CardBoard