import * as React from 'react';
import {debounce} from 'lodash';


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
            <textarea onChange={this.onChange} className={this.props.className}></textarea>
        );
    }
}

export default Textarea