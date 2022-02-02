import * as React from 'react';
import {debounce} from 'lodash';
import PropTypes from "prop-types";

class Input extends React.Component {
    constructor(props) {
        super(props);
        
        this.onChange = this.onChange.bind(this);
        this.onChangeDebounced = debounce(this.props.onChange);
      }

    onChange(e){
        this.onChangeDebounced(this.props.typeInput, e.target.value);
    }

    render() {
        return (
            <input 
                value={this.props.value} 
                onChange={this.onChange} 
                className={this.props.className} 
                type="text" 
                placeholder={this.props.placeholder}
             />
        );
    }
}


Input.propTypes = {
    onChange: PropTypes.func,
}
  
Input.defaultProps = {
    onChange: () => null,
    placeholder: ''
}


export default Input