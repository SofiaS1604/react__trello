import * as React from 'react';
import PropTypes from 'prop-types';

class Button extends React.Component {
    render() {
        return (
            <button className={this.props.className} type="button">{this.props.value}</button>
        );
    }
}

export default Button