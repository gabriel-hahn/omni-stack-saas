import React, { Component } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import api from '~/services/api';

import MembersActions from '~/store/ducks/members';

import Modal from '~/components/Modal';
import Button from '~/styles/components/Button';
import { MembersList, Invite } from './styles';

class Members extends Component {
  state = {
    invite: '',
    roles: [],
  };

  async componentDidMount() {
    const { getMembersRequest } = this.props;

    getMembersRequest();

    const response = await api.get('roles');
    this.setState({ roles: response.data });
  }

  handleRolesChange = (id, roles) => {
    const { updateMembersRequest } = this.props;

    updateMembersRequest(id, roles);
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleInvite = (e) => {
    e.preventDefault();

    const { inviteMemberRequest } = this.props;
    const { invite } = this.state;

    inviteMemberRequest(invite);
  }

  render() {
    const { toggleMembersModal, members } = this.props;
    const { roles, invite } = this.state;

    return (
      <Modal size="big">
        <h1>Members</h1>

        <Invite onSubmit={this.handleInvite}>
          <input name="invite" placeholder="Invite to the team" value={invite} onChange={this.handleInputChange} />
          <Button type="submit">Send</Button>
        </Invite>

        <form>
          <MembersList>
            {members.data.map((member) => (
              <li key={member.id}>
                <strong>{member.user.name}</strong>
                <Select
                  isMulti
                  options={roles}
                  value={member.roles}
                  getOptionLabel={(role) => role.name}
                  getOptionValue={(role) => role.id}
                  onChange={(value) => this.handleRolesChange(member.id, value)}
                />
              </li>
            ))}
          </MembersList>

          <Button onClick={toggleMembersModal} filled="false" color="grey">
            Cancel
          </Button>
        </form>
      </Modal>
    );
  }
}

Members.propTypes = {
  toggleMembersModal: PropTypes.func.isRequired,
  updateMembersRequest: PropTypes.func.isRequired,
  getMembersRequest: PropTypes.func.isRequired,
  inviteMemberRequest: PropTypes.func.isRequired,
  members: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      user: PropTypes.shape({
        name: PropTypes.string,
      }),
      roles: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      })),
    })).isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  members: state.members,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(MembersActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Members);
