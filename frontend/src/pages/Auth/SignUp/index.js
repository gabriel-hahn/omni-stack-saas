import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AuthActions from '~/store/ducks/auth';

import Button from '~/styles/components/Button';
import { Container, SignForm } from '../styles';

class SignUp extends Component {
  state = {
    name: '',
    email: '',
    password: ''
  };

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, password } = this.state;
    const { signUpRequest } = this.props;

    signUpRequest(name, email, password);
  }

  render() {
    const { email, name, password } = this.state;

    return (
      <Container>
        <SignForm onSubmit={this.handleSubmit}>
          <h1>Create a new account</h1>

          <span>NAME</span>
          <input name="name" value={name} onChange={this.handleInputChange} />

          <span>E-MAIL</span>
          <input type="email" name="email" value={email} onChange={this.handleInputChange} />

          <span>PASSWORD</span>
          <input type="password" name="password" value={password} onChange={this.handleInputChange} />

          <Button size="big" type="submit">Sign Up</Button>
        </SignForm>
      </Container>
    );
  }
}

SignUp.propTypes = {
  signUpRequest: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => bindActionCreators(AuthActions, dispatch);

export default connect(null, mapDispatchToProps)(SignUp);
