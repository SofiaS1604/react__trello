import * as React from 'react';
import {debounce} from 'lodash';

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
            <button style={this.props.style} onClick={this.onClick} className={this.props.className} type="button">{this.props.value}</button>
        );
    }
}

export default Button