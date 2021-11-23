import * as React from 'react';

import Button from '../components/Button';
import PropTypes from 'prop-types';
import {debounce} from 'lodash';


class FormBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isFormOn: false};
    
        this.onClick = this.onClick.bind(this);
        this.onChangeDebounced = debounce(this.props.onClick);
      }

      onClick() {
        this.onChangeDebounced('form_close', this.state.isFormOn);
      }

    render() {
        return (
            <div style={this.props.style} className="page__modal-window modal-window">
                <div className="modal-window__container">
                    <div className="modal-window__image"></div>
                    <form className="modal-window__form form">
                        <button onClick={this.onClick} type="button" className="form__button--close">&#9747;</button>
                        <div className="form__title">Create board</div>
                        <label htmlFor="" className="form__container">
                            <span className="form__text">Title</span>
                            <input type="text" className="form__input" />
                        </label>
                        <label htmlFor="" className="form__container">
                            <span className="form__text">Description</span>
                            <textarea type="text" className="form__input"></textarea>
                        </label>
                        <Button className="form__button" value="Save"/>
                    </form> 
                </div>
            </div>
            
        );
    }
}

export default FormBoard