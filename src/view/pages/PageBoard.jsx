import * as React from 'react';
import PropTypes from "prop-types";
import {bindAll} from 'lodash'

import Header from '../widgets/Header';
import BoardCards from '../widgets/BoardCards';
import Form from '../widgets/Form';
import Button from '../components/Button';
import Input from '../components/Input';
import Textarea from '../components/Textarea';
import FormCreateBoard from '../widgets/FormCreateBoard';

class PageBoard extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            id: +window.location.pathname.split('/')[2],
            boards: JSON.parse(localStorage.getItem('boards')),
            isFormOn: false,
            board_id: null,
            title: '',
            description: '',
            update_header: 0
        }

        this.board = this.state.boards.filter(el => el.id === this.state.id)[0];
        this.cards = this.board.cards;
        this.boards = this.board.boards;

        
        bindAll(this, [
            'onClick',
            'createBoard',
            'buttonBoard',
            'onChange'
        ])
    }

    onClick(type, isFormOn, info){
        if (type === 'form_open' || type === 'form_close'){
            this.setState({
                isFormOn,
                board_id: typeof info === 'number' ? info : this.state.board_id
            })
        }else{
            let card_id = this.cards.length 
                            ? this.cards[this.cards.length - 1].id + 1 : 0

            let card = {
                id: card_id, 
                title: info[0], 
                description: info[1]
            };
            this.cards.push(card)

            let board = this.boards.filter(el => el.id === this.state.board_id)[0]
            board.cards_id.push(card_id)

            this.setState({
                isFormOn: false
            })

            localStorage.setItem('boards', JSON.stringify(this.state.boards))
        }
    }

    createBoard(title){
        let board_id = this.boards.length 
                            ? this.boards[this.boards.length - 1].id + 1 : 0

        let board = {id: board_id, title, cards_id: []};
        this.boards.push(board)
        
        this.setState({
            isFormOn: false
        })

        localStorage.setItem('boards', JSON.stringify(this.state.boards))
    }

    onChange(type, value){
        this.state[type] = value
        this.setState(this.state)
    }

    buttonBoard(type){
        if(type === 'delete')
            localStorage.setItem('boards', JSON.stringify(this.state.boards.filter(el => el.id !== this.state.id)))
        
        if(type === 'exit' || type === 'delete')
            window.location.href = '../'

        if(type === 'update'){
            this.setState({
                update_header: 1, 
                title: this.board.title, 
                description: this.board.description
            })
        }

        if(type === 'check'){
            this.board.title = this.state.title
            this.board.description = this.state.description

           localStorage.setItem('boards', JSON.stringify(this.state.boards))
        }

        if(type === 'exit_update' || type === 'check')
            this.setState({
                update_header: 0
            })
    }
    
    render() {
        let displayForm = this.state.isFormOn ? 'grid' : 'none';

        return (
            <div className="page page_board">
                <Header/>
                <Form 
                    style={{display: displayForm, animation: '0.25s ease-in-out form_find'}} 
                    title={'Create card'} 
                    onClick={this.onClick}
                />
              <div className="page__main main">
                        {this.state.update_header < 1 &&
                            <div className="main__info info">
                                <div className="info__container">
                                    <div className="info__title">{this.board.title}</div>
                                    <div className="info__description">{this.board.description}</div>
                                </div>

                                <div className="info__container">
                                    <div className="info__button">
                                        <Button 
                                            type="delete" 
                                            onClick={this.buttonBoard}
                                            style={{backgroundImage: 'url("https://www.svgrepo.com/show/48292/delete.svg")'}}
                                        />
                                    </div>
                                    <div className="info__button">
                                        <Button 
                                            type="update" 
                                            onClick={this.buttonBoard}
                                            style={{backgroundImage: 'url("https://www.svgrepo.com/show/281825/pencil.svg")'}}
                                        />
                                    </div>
                                    <div className="info__button">
                                        <Button 
                                            type="exit" 
                                            onClick={this.buttonBoard} 
                                            style={{backgroundImage: 'url("https://www.svgrepo.com/show/361486/exit.svg")'}}
                                        />
                                    </div>
                                </div>
                            </div>
                        }

                        {this.state.update_header === 1 &&
                            <div className="main__info main__info--update info">
                                <div className="info__container">
                                    <Input typeInput="title" onChange={this.onChange} className="info__title" value={this.state.title}/>
                                    <Textarea onChange={this.onChange} className="info__description" value={this.state.description}/>
                                </div>

                                <div className="info__container">
                                    <div className="info__button">
                                        <Button 
                                            type="check" 
                                            onClick={this.buttonBoard}
                                            style={{backgroundImage: 'url("https://www.svgrepo.com/show/309414/checkbox-checked.svg")'}}
                                        />
                                    </div>
                                    <div className="info__button">
                                        <Button 
                                            type="exit_update" 
                                            onClick={this.buttonBoard}
                                            style={{backgroundImage: 'url("https://www.svgrepo.com/show/361486/exit.svg")'}}
                                        />
                                    </div>
                                    
                                </div>
                            </div>
                        }

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

PageBoard.propTypes = {
    createBoard: PropTypes.func,
    onClick: PropTypes.func
}
  
PageBoard.defaultProps = {
    createBoard: () => null,
    onClick: () => null,
}


export default PageBoard