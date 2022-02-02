import * as React from 'react';

class CardItem extends React.Component {
    constructor(props) {
        super(props);  
    }

    render() {
        return (
            <div className="board__card card">
                <div className="card__title">{this.props.card.title}</div>
                {this.props.card.description.length > 0 && 
                    <div className="card__description">
                        {this.props.card.description || ''}
                    </div>
                }
            </div>
        );
    }
}

export default CardItem