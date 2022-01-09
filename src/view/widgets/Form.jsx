import * as React from 'react';

import Button from '../components/Button';
import Textarea from '../components/Textarea';
import Input from '../components/Input';

import {debounce} from 'lodash';

class Form extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isFormOn: false,
            title: '',
            description: ''
        };

        this.onClick = this.onClick.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onChangeDebounced = debounce(this.props.onClick);
      }

      onClick(type) {
        this.onChangeDebounced(type, this.state.isFormOn, [this.state.title, this.state.description]);
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
                        <Button onClick={this.onClick} type="form_close" className="form__button--close" value="&#9747;"/>
                        <div className="form__title">{this.props.title}</div>
                        <label htmlFor="" className="form__container">
                            <span className="form__text">Title</span>
                            <Input onChange={this.onChange} placeholder="" typeInput="title" onChange={this.onChange} className="form__input" />
                        </label>
                        <label htmlFor="" className="form__container">
                            <span className="form__text">Description</span>
                            <Textarea onChange={this.onChange} className="form__input" />
                        </label>
                        <Button className="form__button" value="Save" onClick={this.onClick} type="form_save"/>
                    </form> 
                </div>
            </div>
        );
    }
}

export default Form