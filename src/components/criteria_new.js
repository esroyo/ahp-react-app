import _ from 'lodash';
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    ButtonToolbar,
    Button,
    ButtonGroup,
    MenuItem,
    Panel,
    Alert,
    FormGroup,
    FormControl,
    ControlLabel,
    InputGroup,
    HelpBlock,
    Glyphicon,
    Collapse,
    PageHeader
} from 'react-bootstrap';
import { addCriterion, deleteCriterion } from '../actions';

class CriteriaNew extends Component {

    constructor(props) {
        super(props);

        this.renderField = this.renderField.bind(this);
        if (!this.props.decision) {
            this.props.history.push("/");
        }
    }

    onDeleteClick() {
        const { id } = this.props.match.params;
        this.props.deletePost(id, () => {
            this.props.history.push("/");
        });
    }

    renderFeedback() {

        const { decision } = this.props;
        const open = decision && decision.criteria.length < 2;

        return (
            <div>
                <Collapse in={open}>
                    <Alert bsStyle="info">
                        <strong>Heads up!</strong> You should identify at least two 
                        criteria to be used in reaching your goal. Think carefully
                        about them, but do not worry about their relative importances now.
                    </Alert>
                </Collapse>
            </div>
        );
    }

    renderCriteria() {

        const { decision, criteria, deleteCriterion } = this.props;
        const hasCriteria = decision && decision.criteria.length > 0;
        const header = `Criteria to be used in “${decision && decision.goal}”`;
        const criteriaElements = Object.values(criteria).map(criterion => {

            const { id, name } = criterion;

            return (
                <ButtonGroup className="criterion" key={id}>
                    <Button
                        bsSize="lg"
                        className="criterion"
                        type="button"
                    >
                        {name}
                    </Button>
                    <Button
                        type="button"
                        className="criterion-remove"
                        bsSize="lg"
                        onClick={e => { deleteCriterion(decision.id, id); }}
                    >
                        <Glyphicon glyph="remove" />
                    </Button>
                </ButtonGroup>
            );
        });

        if (!hasCriteria) {
            return '';
        }

        return (
            <Panel header={header} className="criteria-panel">
                <ButtonToolbar>{criteriaElements}</ButtonToolbar>
            </Panel>
        );


    }

    renderField(field) {

        const { meta: { touched, error } } = field;
        const { decision } = this.props;
        const hasCriteria = decision && decision.criteria.length > 0;
        const hasEnoughCriteria = decision && decision.criteria.length > 1;
        const className = `form-group form-group-lg ${touched && error && !hasCriteria ? "has-error" : ''}`;

        return (
            <FormGroup bsSize="large" bsClass={className}>
                <ControlLabel className="sr-only">{field.label}</ControlLabel>
                <InputGroup>
                    <InputGroup.Addon>
                        <Glyphicon glyph="stats" />
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
                            bsStyle={hasEnoughCriteria ? 'default' : 'primary'}
                            type="submit">
                            Add
                        </Button>
                    </InputGroup.Button>
                </InputGroup>
                <FormControl.Feedback />
                <HelpBlock>
                    {touched && !hasCriteria ? error : ''}
                </HelpBlock>
            </FormGroup>
        );
    }

    onSubmit(values) {
        this.props.addCriterion({
            decisionId: this.props.decision.id,
            criterion: values
        });
        this.props.reset();
    }

    render() {

        const { handleSubmit, decision } = this.props;
        const hasEnoughCriteria = decision && decision.criteria.length > 1;

        return (
            <div>
                <ol className="breadcrumb">
                    <li><Link to="/">AHP</Link></li>
                    <li><Link to={`/decisions/${decision && decision.id}`}>{decision && decision.goal}</Link></li>
                    <li className="active">Criteria</li>
                </ol>
                <PageHeader>Add criteria</PageHeader>
                <p className="lead">
                    According to your understanding of the problem, you have to identify important features in “{decision.goal}”. This features —<strong>criteria</strong> for now on— relate to any aspect of the decision problem —tangible or intangible, carefully measured or roughly estimated, well or poorly understood— anything at all that applies to the decision at hand. For instance in <em>“Choosing a leader”</em>, some criteria could be <em>“Experience”</em>, <em>“Charisma”</em>, or <em>“Education”</em>.
                </p>
                {this.renderFeedback()}
                {this.renderCriteria()}
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <Field
                        name="name"
                        label="Introduce a new criterion"
                        component={this.renderField}
                    />
                    <div className={`text-center ${!hasEnoughCriteria ? 'hidden' : ''}`}>
                        <Link
                            to={`/decisions/${decision.id}/alternatives`}
                            className="btn btn-lg btn-block btn-primary"
                        >
                            Continue
                        </Link>
                    </div>
                    <div className="text-center">
                        <Link
                            to={`/decisions/${decision.id}`}
                            className="btn btn-link"
                        >
                            &laquo; Back
                        </Link>
                    </div>
                </form>
            </div>
        );
    }
}

function validate(values) {

    const errors = {};

    // validation
    if (!values.name) {
        errors.name = 'Please enter a criterion name';
    }

    return errors;
}

function mapStateToProps({ decisions, criteria }, ownProps) {

    const { id } = ownProps.match.params;
    const decision = decisions[id];

    return {
        decision,
        criteria: (decision && _.pick(criteria, decision.criteria)) || {}
    };
}
export default connect(mapStateToProps, { addCriterion, deleteCriterion })(
    reduxForm({
        validate,
        form: 'CriterionNewForm'
    })(CriteriaNew)
);
