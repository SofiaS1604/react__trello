import * as React from 'react';
import {debounce} from 'lodash';


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
            <input onChange={this.onChange} className={this.props.className} type="text" placeholder={this.props.placeholder} />
        );
    }
}

export default Input