import * as React from 'react';

class Input extends React.Component {
    render() {
        return (
            <input className={this.props.className} type="text" placeholder={this.props.placeholder} />
        );
    }
}

export default Input