import * as React from 'react';

import PropTypes from 'prop-types';
import {debounce} from 'lodash';

class CardCreateBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isFormOn: true};
    
        this.onClick = this.onClick.bind(this);
        this.onChangeDebounced = debounce(this.props.onClick);
    }

    onClick() {
        this.onChangeDebounced('form_open', this.state.isFormOn);
    }

    render() {
        return (
            <div onClick={this.onClick} className="card__item card card--create">
                <div className="card__title">Create new board</div>
            </div>
        );
    }
}

export default CardCreateBoard