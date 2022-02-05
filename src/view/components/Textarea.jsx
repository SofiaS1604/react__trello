import * as React from 'react';
import {debounce} from 'lodash';

import PropTypes from "prop-types";

class Textarea extends React.Component {
    constructor(props) {
        super(props);
        
        this.onChange = this.onChange.bind(this);
        this.onChangeDebounced = debounce(this.props.onChange);
    }

    onChange(e){
        this.onChangeDebounced('description', e.target.value);
    }

    render() {
        return (
            <textarea 
                value={this.props.value} 
                onChange={this.onChange} 
                className={this.props.className}>
            </textarea>
        );
    }
}


Textarea.propTypes = {
    onChange: PropTypes.func,
}

Textarea.defaultProps = {
    onChange: () => null,
}
  

export default Textarea