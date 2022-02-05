import * as React from 'react';
import {debounce} from 'lodash';

import PropTypes from "prop-types";

import CardCreateBoard from '../components/CardCreateBoard';
import CardBoard from '../components/CardBoard';


class ListCardsBoard extends React.Component {
    constructor(props) {
        super(props);
      
        this.onClick = this.onClick.bind(this);
        this.onChangeDebounced = debounce(this.props.onClick);
      }

      onClick(type, isFormOn) {
        this.onChangeDebounced(type, isFormOn);
      }

    render() {
        let boards = JSON.parse(localStorage.getItem('boards') || '[]')
        
        return (
            <div className="page__main">
                <CardCreateBoard 
                    title="Create new board" 
                    onClick={this.onClick}
                 />

                {boards.map((board) => (
                    <CardBoard 
                        key={board.id}
                        id={board.id}
                        title={board.title} 
                        text={board.description}
                        color={board.color}
                     />
                ))} 
            </div>
        )
    }
}


ListCardsBoard.propTypes = {
    onClick: PropTypes.func,
}

ListCardsBoard.defaultProps = {
    onClick: () => null,
}
 
export default ListCardsBoard