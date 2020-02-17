import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import InviteMember from '~/components/InviteMember';

import MembersActions from '~/store/ducks/members';

import styles from './styles';

class Members extends Component {
  state = {
    isInviteModalOpen: false,
  };

  componentDidMount() {
    const { getMembersRequest } = this.props;

    getMembersRequest();
  }

  toggleInviteModal = () => {
    this.setState({ isInviteModalOpen: !this.state.isInviteModalOpen });
  }

  render() {
    const { members } = this.props;
    const { isInviteModalOpen } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Members</Text>

        <FlatList
          style={styles.memberList}
          data={members.data}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <View style={styles.memberContainer}>
              <Text style={styles.memberName}>{item.user.name}</Text>

              <TouchableOpacity hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }} onPress={() => { }}>
                <Icon name="settings" size={20} color="#b0b0b0" />
              </TouchableOpacity>
            </View>
          )}
          ListFooterComponent={() => (
            <TouchableOpacity style={styles.button} onPress={this.toggleInviteModal}>
              <Text style={styles.buttonText}>Invite</Text>
            </TouchableOpacity>
          )}
        />

        <InviteMember visible={isInviteModalOpen} onRequestClose={this.toggleInviteModal} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  members: state.members,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(MembersActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Members);
