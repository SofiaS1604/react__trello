import * as React from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {bindAll} from 'lodash';

import PageHome from "./pages/PageHome"


class App extends React.Component {
    render() {
        return (
            <PageHome/>
        );
    }
}

export default App