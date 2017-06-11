import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Jumbotron } from 'react-bootstrap';
import { createDecision } from '../actions';

class AhpIndex extends Component {

    constructor(props) {
        super(props);

        if (!Object.keys(this.props.decisions).length) {
            this.props.createDecision({
                id: 0,
                goal: "",
                criteria: []
            });
        }
    }

    render() {
        return (
            <div>
            <Jumbotron>
                <h1>Analytic Hierarchy Process</h1>
                <p>Welcome! The analytic hierarchy process (AHP) is a structured technique for organizing and analyzing complex decisions, with a particular application in group decisions. The AHP helps decision makers find one that best suits their goal and their understanding of the problem. It provides a comprehensive and rational framework for structuring a decision problem, for representing and quantifying its elements, for relating those elements to overall goals, and for evaluating alternative solutions.</p>
            </Jumbotron>
                <Link className="btn btn-primary btn-lg btn-block" to="/decisions/0">
                    Define your goal to get started
                </Link>
                </div>
        );
    }
}

function mapStateToProps({ decisions }, ownProps) {
    return {
        decisions
    };
}

export default connect(mapStateToProps, { createDecision })(AhpIndex);
