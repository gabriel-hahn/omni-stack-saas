import React, { Component } from 'react';

import {
  View,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';

import styles from './styles';

export default class SignIn extends Component {
  state = {
    email: '',
    password: '',
  };

  handleSubmit = () => {
    const { email, password } = this.state;

    // Action
  }

  render() {
    const { email, password } = this.state;

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={styles.container}
      >
        <View>
          <Text style={styles.title}>Hello again</Text>
          <Text style={styles.label}>E-MAIL</Text>
          <TextInput
            value={email}
            onChangeText={text => this.setState({ email: text })}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            underlineColorAndroid="transparent"
            returnKeyType="next"
            autoFocus
            onSubmitEditing={() => this.passwordInput.focus()}
          />
          <Text style={styles.label}>PASSWORD</Text>
          <TextInput
            value={password}
            onChangeText={text => this.setState({ password: text })}
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            underlineColorAndroid="transparent"
            returnKeyType="send"
            secureTextEntry
            ref={el => this.passwordInput = el}
            onSubmitEditing={this.handleSubmit}
          />
          <TouchableOpacity onPress={this.handleSubmit} style={styles.button}>
            <Text style={styles.buttonText}>Log in</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
