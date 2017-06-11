import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateDecision } from '../actions';
import {
    Button,
    FormGroup,
    FormControl,
    ControlLabel,
    InputGroup,
    HelpBlock,
    Glyphicon,
    PageHeader
} from 'react-bootstrap';


class DecisionsNew extends Component {

    constructor(props) {
        super(props);

        if (!this.props.decision) {
            this.props.history.push("/");
        }
    }

    renderField(field) {

        const { meta: { touched, error } } = field;
        const className = `form-group form-group-lg ${touched && error ? "has-error" : ''}`;

        return (
            <FormGroup bsSize="large" bsClass={className}>
                <ControlLabel className="sr-only">{field.label}</ControlLabel>
                <InputGroup>
                    <InputGroup.Addon>
                        <Glyphicon glyph="road" />
                    </InputGroup.Addon>
                    <FormControl
                        type="text"
                        {...field.input}
                        autoComplete="off"
                        autoFocus={true}
                    />
                    <InputGroup.Button>
                        <Button
                            bsSize="lg"
                            bsStyle="primary"
                            type="submit">
                            Continue
                        </Button>
                    </InputGroup.Button>
                </InputGroup>
                <FormControl.Feedback />
                <HelpBlock>
                    {touched ? error : ''}
                </HelpBlock>
            </FormGroup>
        );
    }

    onSubmit(values) {
        this.props.updateDecision({ ...this.props.decision, ...values});
        this.props.history.push(`/decisions/${this.props.decision.id}/criteria`);
    }

    render() {

        const { handleSubmit, decision } = this.props;

        return (
            <div>
                <ol className="breadcrumb">
                    <li><Link to="/">AHP</Link></li>
                    <li className="active">{(decision && decision.goal) || 'Goal'}</li>
                </ol>
                <PageHeader>Set the goal</PageHeader>
                <p className="lead">
                    The goal is the decision the decision problem that you face, expressed in a short phrase. For instance: <em>"Choosing a new leader"</em> or <em>"Buying a new car"</em>.
                </p>
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <Field
                        name="goal"
                        label="The goal of your decision"
                        component={this.renderField}
                    />

                    <div className="text-center">
                        <Link to="/" className="btn btn-link">&laquo; Back</Link>
                    </div>
                </form>
            </div>
        );
    }
}

function validate(values) {

    const errors = {};

    // validation
    if (!values.goal) {
        errors.goal = 'Please enter a goal to proceed';
    }

    return errors;
}

function mapStateToProps({ decisions }, ownProps) {
    const decision = decisions[ownProps.match.params.id];
    return {
        decision,
        initialValues: {
            goal: (decision && decision.goal) || ''
        }
    };
}

export default connect(mapStateToProps, { updateDecision })(
    reduxForm({
        validate,
        form: 'DecisionsNewForm'
    })(DecisionsNew)
);
