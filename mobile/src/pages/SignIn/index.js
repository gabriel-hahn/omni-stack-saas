import React from 'react';

import {
  View,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';

import styles from './styles';

const SignIn = () => (
  <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : null}
    style={styles.container}
  >
    <View>
      <Text style={styles.title}>Hello again</Text>
      <Text style={styles.label}>E-MAIL</Text>
      <TextInput
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        underlineColorAndroid="transparent"
        returnKeyType="next"
        autoFocus
      />
      <Text style={styles.label}>PASSWORD</Text>
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        autoCorrect={false}
        underlineColorAndroid="transparent"
        returnKeyType="send"
        secureTextEntry
      />
      <TouchableOpacity onPress={() => { }} style={styles.button}>
        <Text style={styles.buttonText}>Log in</Text>
      </TouchableOpacity>
    </View>
  </KeyboardAvoidingView>
);

export default SignIn;
