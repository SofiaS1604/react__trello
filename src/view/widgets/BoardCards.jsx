import * as React from 'react';
import {debounce, bindAll} from 'lodash';
import CardItem from '../components/CardItem';
import CardCreateBoard from '../components/CardCreateBoard';
import Button from '../components/Button';
import Input from '../components/Input';

import PropTypes from "prop-types";

class BoardCards extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            button_active: 0,
            id: +window.location.pathname.split('/')[2],
            boards: JSON.parse(localStorage.getItem('boards')),
            value: ''
        }

        bindAll(this, [
            'onClick', 
            'buttonGroup',
            'onChange'
        ])
      
        this.onChangeDebounced = debounce(this.props.onClick);
    }

    onClick(type, isFormOn) {
        this.onChangeDebounced(type, isFormOn, [this.props.board.id, this.state.value]);
    }

    buttonGroup(type){
        if(typeof type === 'object' || type === 'exit' || type === 'exit_update'){
            this.setState({button_active: type === 'exit' ? 0 : 1})
        }

        if (type === 'delete')
            this.onClick('delete_group', false)

        if (type === 'save'){
            this.onClick('save_group', false)
            this.setState({button_active: 1})
        }

        if (type === 'update')
            this.setState({button_active: 2, value: this.props.board.title})
    }

    onChange(type, value){
        this.setState({value})
    }

    render() {
        let cards = this.props.board.cards_id.map(el => this.props.cards.filter(card_el => card_el.id === el)[0]);
        
        return (
            <div className="board__item">
                {this.state.button_active < 2 &&
                    <div className="board__block">
                        <div className="board__title">{this.props.board.title}</div>
                        
                        {!this.state.button_active && 
                            <div onClick={this.buttonGroup} className="board__more">&#8226; &#8226; &#8226;</div>
                        }
                        
                        {this.state.button_active === 1 && 
                            <div className="board__buttons">
                                <div className="button__item">
                                    <Button 
                                        type="delete" 
                                        onClick={this.buttonGroup}
                                        style={{backgroundImage: 'url("https://www.svgrepo.com/show/48292/delete.svg")'}}
                                    />
                                </div>
                                <div className="button__item">
                                    <Button 
                                        type="update" 
                                        onClick={this.buttonGroup}
                                        style={{backgroundImage: 'url("https://www.svgrepo.com/show/281825/pencil.svg")'}}
                                    />
                                </div>
                                <div className="button__item">
                                    <Button 
                                        type="exit" 
                                        onClick={this.buttonGroup} 
                                        style={{backgroundImage: 'url("https://www.svgrepo.com/show/361486/exit.svg")'}}
                                    />
                                </div>
                            </div>
                        }
                    </div>
                }


                {this.state.button_active === 2 &&
                    <div className="board__block board__block--update">
                        <Input value={this.state.value} typeInput="title" onChange={this.onChange} className="board__input"/>
                           
                        <div className="board__buttons">
                            <div className="button__item">
                                <Button 
                                    type="save" 
                                    onClick={this.buttonGroup}
                                    style={{backgroundImage: 'url("https://www.svgrepo.com/show/309414/checkbox-checked.svg")'}}
                                />
                            </div>
                            <div className="button__item">
                                <Button 
                                    type="exit_update" 
                                    onClick={this.buttonGroup}
                                    style={{backgroundImage: 'url("https://www.svgrepo.com/show/361486/exit.svg")'}}
                                />
                            </div>
                        </div>
                    </div>
                }


                {cards.map((card, index) => (
                    <CardItem 
                        key={index}
                        card={card}
                    />
                ))} 
                <CardCreateBoard 
                    title="+Add new card" 
                    onClick={this.onClick}
                 />
            </div>
        )
    }
}

BoardCards.propTypes = {
    onChange: PropTypes.func,
}

BoardCards.defaultProps = {
    onChange: () => null,
}

export default BoardCards