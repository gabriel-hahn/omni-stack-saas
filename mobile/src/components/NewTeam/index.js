import React, { Component } from 'react';
import { TextInput, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TeamsActions from '~/store/ducks/teams';

import Modal from '~/components/Modal';

import styles from './styles';

class NewTeam extends Component {
  state = {
    newTeam: '',
  };

  handleSubmit = () => {
    const { createTeamRequest, onRequestClose } = this.props;
    const { newTeam } = this.state;

    createTeamRequest(newTeam);
    onRequestClose();
  };

  render() {
    const { visible, onRequestClose } = this.props;
    const { newTeam } = this.state;

    return (
      <Modal visible={visible} onRequestClose={onRequestClose}>
        <Text style={styles.label}>NAME</Text>
        <TextInput
          style={styles.input}
          autoFocus
          underlineColorAndroid="transparent"
          returnKeyType="send"
          onSubmitEditing={this.handleSubmit}
          value={newTeam}
          onChangeText={text => this.setState({ newTeam: text })}
        />

        <TouchableOpacity onPress={this.handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>
            CREATE TEAM
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onRequestClose} style={styles.cancel}>
          <Text style={styles.cancelText}>
            CANCEL
          </Text>
        </TouchableOpacity>
      </Modal>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(TeamsActions, dispatch);

export default connect(null, mapDispatchToProps)(NewTeam);
