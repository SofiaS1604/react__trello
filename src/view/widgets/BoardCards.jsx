import * as React from 'react';
import {debounce} from 'lodash';
import CardItem from '../components/CardItem';
import CardCreateBoard from '../components/CardCreateBoard';

class BoardCards extends React.Component {
    constructor(props) {
        super(props);
      
        this.onClick = this.onClick.bind(this);
        this.onChangeDebounced = debounce(this.props.onClick);
      }

      onClick(type, isFormOn) {
        this.onChangeDebounced(type, isFormOn, this.props.board.id);
      }

    render() {
        let cards = this.props.board.cards_id.map(el => this.props.cards.filter(card_el => card_el.id === el)[0]);
        return (
            <div className="board__item">
                <div className="board__block">
                    <div className="board__title">{this.props.board.title}</div>
                    <div className="board__more">&#8226; &#8226; &#8226;</div>
                </div>
                {cards.map((card, index) => (
                    <CardItem 
                        key={index}
                        card={card}
                    />
                ))} 
                <CardCreateBoard title="+Add new card" onClick={this.onClick}/>
            </div>
        )
    }
}

export default BoardCards