import * as React from 'react';
import PropTypes from "prop-types";
import {bindAll, debounce} from 'lodash';
import Input from '../components/Input';
import Button from '../components/Button';

class FormCreateBoard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            type_form: 'none',
            type_plus: 'grid'
        };

        bindAll(this, [
            'onClick',
            'onChange'
        ])

        this.onChangeDebounced = debounce(this.props.createBoard);
    }

   
    onClick(type){
        if(type !== 'add_board' && type !== 'cancel')
            this.onChangeDebounced(this.state.title);

        this.setState({
            type_form: (this.state.type_form === 'none' ? 'grid' : 'none'),
            type_plus: (this.state.type_form === 'none' ? 'none' : 'grid'),
            title: ''
        })
    }

    onChange(typeInput, title){
        this.setState({title})
    }

    render() {
        return (
            <div className="board__block board__block--create">
               <div style={{display: this.state.type_form}} className="board__container">
                    <Input 
                        className="board__input" 
                        value={this.state.title} 
                        typeInput="add_block" 
                        onChange={this.onChange}
                     />
                    <div className="board__buttons">
                        <Button 
                            className="board__button" 
                            type="save" 
                            value="Save" 
                            onClick={this.onClick}
                         />
                        <Button 
                            className="board__button" 
                            type="cancel" 
                            value="Cancel" 
                            onClick={this.onClick}
                         />
                    </div>
               </div>
               <Button 
                    style={{display: this.state.type_plus}} 
                    type="add_board" 
                    value="+"
                    onClick={this.onClick} 
                    className="board__plus"
                 />
            </div>
        );
    }
}

FormCreateBoard.propTypes = {
    onChange: PropTypes.func,
    onClick: PropTypes.func,
}

FormCreateBoard.defaultProps = {
    onChange: () => null,
    onClick: () => null,
}
 

export default FormCreateBoard