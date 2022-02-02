import * as React from 'react';

import Button from '../components/Button';
import Textarea from '../components/Textarea';
import Input from '../components/Input';

import {debounce, bindAll} from 'lodash';
import PropTypes from "prop-types";


class Form extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isFormOn: false,
            title: '',
            description: ''
        };

        bindAll(this, [
            'onClick',
            'onChange'
        ])

        this.onChangeDebounced = debounce(this.props.onClick);
      }

      onClick(type) {
        this.onChangeDebounced(type, this.state.isFormOn, [this.state.title, this.state.description]);

        this.setState({
            title: '', 
            description: ''
        })
      }

      onChange(type, value){
        this.state[type] = value
        this.setState(this.state)
      }

    render() {
        return (
            <div style={this.props.style} className="page__modal-window modal-window">
                <div className="modal-window__container">
                    <div className="modal-window__image"></div>
                    <form className="modal-window__form form">
                        <Button 
                            onClick={this.onClick} 
                            type="form_close" 
                            className="form__button--close" 
                            value="&#9747;"
                         />
                        <div className="form__title">{this.props.title}</div>
                        <label htmlFor="" className="form__container">
                            <span className="form__text">Title</span>
                            <Input 
                                value={this.state.title} 
                                onChange={this.onChange} 
                                typeInput="title" 
                                className="form__input"
                             />
                        </label>
                        <label htmlFor="" className="form__container">
                            <span className="form__text">Description</span>
                            <Textarea 
                                value={this.state.description} 
                                onChange={this.onChange} 
                                className="form__input"
                             />
                        </label>
                        <Button 
                            className="form__button" 
                            value="Save" 
                            onClick={this.onClick} 
                            type="form_save"
                         />
                    </form> 
                </div>
            </div>
        );
    }
}

Form.propTypes = {
    onChange: PropTypes.func,
    onClick: PropTypes.func
}
  
Form.defaultProps = {
    onChange: () => null,
    onClick: () => null,
}

export default Form