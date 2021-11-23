import * as React from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {bindAll} from 'lodash';

import Header from '../widgets/Header';
import CardBoard from '../components/CardBoard';
import FormBoard from '../widgets/FormBoard'
import CardCreateBoard from '../components/CardCreateBoard';

class PageHome extends React.Component {
    constructor(props) {
        super(props);

        bindAll(this, [
            'formClick'
        ]);

        this.state = {
            isFormOn: false,
        };
    }

    formClick(type, isFormOn){
        if(type === 'form_close' || type === 'form_open')
            this.setState({isFormOn})
    }

    render() {
        let displayForm = this.state.isFormOn ? 'grid' : 'none';
        return (
            <div className="page">
                <Header/>
                <FormBoard style={{display: displayForm, animation: '0.25s ease-in-out form_find'}} onClick={this.formClick}/>
                <div className="page__main">
                    <CardBoard title="Pictures In The Sky" text="In the last five to six years the FTA satellite receiver has become an everyday household electronic device."/>
                    <CardCreateBoard onClick={this.formClick}/>
                </div>
            </div>
        );
    }
}

export default PageHome