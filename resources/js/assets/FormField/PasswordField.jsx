import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import zxcvbn from 'zxcvbn';
import { useSelector } from "react-redux";


import FormField from '../FormField';

class PasswordField extends Component {

    constructor(props) {
        super(props);
        const { minStrength = 3, thresholdLength = 7 } = props;

        this.minStrength = typeof minStrength === 'number'
            ? Math.max( Math.min(minStrength, 4), 0 )
            : 3;

        this.thresholdLength = typeof thresholdLength === 'number'
            ? Math.max(thresholdLength, 7)
            : 7;

        this.state = { password: '', strength: 0 };
    }

    stateChanged = state => {
        this.setState({
            password: state.value,
            strength: zxcvbn(state.value).score
        }, () => this.props.onStateChanged(state));
    };

    validatePasswordStrong = value => {
        if (value.length <= this.thresholdLength) throw new Error("Password is short");
        if (zxcvbn(value).score < this.minStrength) throw new Error("Password is weak");
    };

    render() {
        const { type, validator, onStateChanged, children, ...restProps } = this.props;
        const { password, strength } = this.state;

        console.log("state has changed 1 -> "+JSON.stringify(this.state))

        const passwordLength = password.length;
        const passwordStrong = strength >= this.minStrength;
        const passwordLong = passwordLength > this.thresholdLength;

        const counterClass = ['badge badge-pill', passwordLong ? passwordStrong ? 'badge-success' : 'badge-warning' : 'badge-danger'].join(' ').trim();

        const strengthClass = ['strength-meter mt-2', passwordLength > 0 ? 'visible' : 'invisible'].join(' ').trim();

        return (
            <Fragment>
                <div className="position-relative">
                    {this.state.password}

                    <FormField type="password" validator={this.validatePasswordStrong} onStateChanged={this.stateChanged} {...restProps}>
                        {children}
                        <div className={strengthClass}>
                            <div className="strength-meter-fill" data-strength={strength}></div>
                        </div>
                    </FormField>
                    <span className="d-block form-hint">Password must be more than 7 characters and sufficiently strong password</span>

                    <div className="position-absolute password-count mx-3">
                        <span className={counterClass}>{ passwordLength ? passwordLong ? `${this.thresholdLength}+` : passwordLength : '' }</span>
                    </div>
                </div>

            </Fragment>
        );
    }

}

PasswordField.propTypes = {
    initValue: PropTypes.string,
    label: PropTypes.string.isRequired,
    fieldId: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    required: PropTypes.bool,
    children: PropTypes.node,
    onStateChanged: PropTypes.func,
    minStrength: PropTypes.number,
    thresholdLength: PropTypes.number
};

export default PasswordField;
