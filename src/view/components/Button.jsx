import * as React from 'react';
import {debounce} from 'lodash';
import PropTypes from "prop-types";

class Button extends React.Component {
    constructor(props) {
      super(props);
    
      this.onClick = this.onClick.bind(this);
      this.onChangeDebounced = debounce(this.props.onClick);
    }

    onClick() {
      this.onChangeDebounced(this.props.type);
    }

    render() {
        return (
            <button 
              style={this.props.style} 
              onClick={this.onClick} 
              className={this.props.className} 
              type="button"
            > {this.props.value} </button>
        );
    }
}

Button.propTypes = {
  onClick: PropTypes.func,
}

Button.defaultProps = {
  onClick: () => null,
}

export default Button