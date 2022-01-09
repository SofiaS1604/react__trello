import * as React from 'react';
import {debounce} from 'lodash';

class CardItem extends React.Component {
    constructor(props) {
        super(props);
      
      }

    render() {
        return (
            <div className="board__card card">
                <div className="card__title">{this.props.card.title}</div>
                <div className="card__description">
                    {this.props.card.description || ''}
                </div>
            </div>
        );
    }
}

export default CardItem