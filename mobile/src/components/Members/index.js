import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import InviteMember from '~/components/InviteMember';
import RoleUpdater from '~/components/RoleUpdater';

import MembersActions from '~/store/ducks/members';

import styles from './styles';

class Members extends Component {
  state = {
    isInviteModalOpen: false,
    isRoleModalOpen: false,
    memberEdit: null,
  };

  componentDidMount() {
    const { getMembersRequest } = this.props;

    getMembersRequest();
  }

  toggleInviteModal = (memberEdit) => {
    this.setState({ isInviteModalOpen: !this.state.isInviteModalOpen, memberEdit });
  }

  toggleRoleModal = (memberEdit) => {
    this.setState({ isRoleModalOpen: !this.state.isRoleModalOpen, memberEdit });
  }

  render() {
    const { members } = this.props;
    const { isInviteModalOpen, isRoleModalOpen, memberEdit } = this.state;

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

              <TouchableOpacity hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }} onPress={this.toggleRoleModal}>
                <Icon name="settings" size={20} color="#b0b0b0" />
              </TouchableOpacity>
            </View>
          )}
          ListFooterComponent={() => (
            <TouchableOpacity style={styles.button} onPress={() => this.toggleInviteModal(item)}>
              <Text style={styles.buttonText}>Invite</Text>
            </TouchableOpacity>
          )}
        />

        {memberEdit && (
          <RoleUpdater visible={isRoleModalOpen} onRequestClose={this.toggleRoleModal} member={memberEdit} />
        )}

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
