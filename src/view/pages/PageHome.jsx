import * as React from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {bindAll} from 'lodash';
import {debounce} from 'lodash';

import Header from '../widgets/Header';
import Form from '../widgets/Form'
import ListCardsBoard from '../widgets/ListCardsBoard';

class PageHome extends React.Component {
    constructor(props) {
        super(props);

        this.color = ['#EEF7FB', '#F8F1FF', '#FEF7EF', 
                        '#F4F4F4', '#EBFDF5', '#F4F4FF', '#F8E8E8']

        this.onClick = this.onClick.bind(this);

        this.state = {
            id: 0,
            isFormOn: false, 
            description: '', 
            title: '',
            boards: JSON.parse(localStorage.getItem('boards') || '[]'),
            cards: [],
            color: 0
        };
    }

    onClick(type, isFormOn, info){
        if(type == 'form_close' || type === 'form_open')
            this.setState({isFormOn})
        else if (type === 'form_search')
            this.setState({boards: info}) 
        else{
            let boards = JSON.parse(localStorage.getItem('boards') || '[]')
            let id = boards.length > 0 ? 
                        boards[boards.length - 1].id + 1 : 0

            this.setState({
                id, 
                title: info[0], 
                description: info[1], 
                color: this.color[Math.floor(Math.random() * 7)]
            })

            boards.push(this.state) 
            localStorage.setItem("boards", JSON.stringify(boards)) 

            this.setState({isFormOn, boards})
        }
    }

    render() {
        let displayForm = this.state.isFormOn ? 'grid' : 'none';
       
        return (
            <div className="page">
                <Header onClick={this.onClick}/>
                <Form 
                    style={{display: displayForm, animation: '0.25s ease-in-out form_find'}} 
                    title={'Create board'} 
                    onClick={this.onClick}
                />
                <ListCardsBoard boards={this.state.boards} onClick={this.onClick}/>
            </div>
        );
    }
}

PageHome.propTypes = {
    onClick: PropTypes.func
}
  
PageHome.defaultProps = {
    onClick: () => null,
}


export default PageHome