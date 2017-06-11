import React, { Component } from 'react';
import {
    ButtonToolbar,
    Button
} from 'react-bootstrap';

export default (props) => {
    return (
        <footer className="app-footer">
            <ButtonToolbar>
                <Button bsStyle="link">
                    AHP React/Redux app (work in progress)
                </Button>
                <Button
                    bsStyle="link"
                    href="https://github.com/esroyo/ahp-react-app"
                    className="pull-right"
                >
                    Source on Github
                </Button>
            </ButtonToolbar>
        </footer>
    );
};
