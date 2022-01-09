import * as React from 'react';

import Header from '../widgets/Header';
import BoardCards from '../widgets/BoardCards';
import Form from '../widgets/Form';
import FormCreateBoard from '../widgets/FormCreateBoard';

class PageBoard extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            id: +window.location.pathname.split('/')[2],
            boards: JSON.parse(localStorage.getItem('boards')),
            isFormOn: false,
            board_id: null,
        }

        this.board = this.state.boards.filter(el => el.id === this.state.id)[0];
        this.cards = this.board.cards;
        this.boards = this.board.boards;
        
        this.onClick = this.onClick.bind(this);
        this.createBoard = this.createBoard.bind(this);
    }

    onClick(type, isFormOn, info){
        if (type === 'form_open' || type === 'form_close'){
            this.setState({
                isFormOn,
                board_id: typeof info === 'number' ? info : this.state.board_id
            })
        }else{
            let card_id = this.cards.length ? this.cards[this.cards.length - 1].id + 1 : 0
            let card = {id: card_id, title: info[0], description: info[1]};
            cards.push(card)
            let board = this.boards.filter(el => el.id === this.state.board_id)[0]
            board.cards_id.push(card_id)

            this.setState({
                isFormOn: false
            })

            localStorage.setItem('boards', JSON.stringify(this.state.boards))
        }
    }

    createBoard(title){
        let board_id = this.boards.length ? this.boards[boards - 1].id + 1 : 0
        let board = {id: board_id, title, cards_id: []};
        this.boards.push(board)
        
        this.setState({
            isFormOn: false
        })

        localStorage.setItem('boards', JSON.stringify(this.state.boards))
    }
    
    render() {
        let displayForm = this.state.isFormOn ? 'grid' : 'none';
        return (
            <div className="page page_board">
                <Header></Header>
                <Form style={{display: displayForm, animation: '0.25s ease-in-out form_find'}} title={'Create card'} onClick={this.onClick}/>
              <div className="page__main main">
                    <div className="main__info info">
                        <div className="info__container">
                            <div className="info__title">{this.board.title}</div>
                            <div className="info__description">{this.board.description}</div>
                        </div>
                        <div className="info__container"></div>
                    </div>
                    <div className="main__boards boards">
                        {this.board.boards.map((board) => (
                            <BoardCards 
                                key={board.id}
                                board={board}
                                cards={this.board.cards}
                                onClick={this.onClick}
                            />
                        ))} 
                        <FormCreateBoard createBoard={this.createBoard}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default PageBoard