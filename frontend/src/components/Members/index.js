import React, { Component } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import api from '~/services/api';

import MembersActions from '~/store/ducks/members';

import Modal from '~/components/Modal';
import Button from '~/styles/components/Button';
import { MembersList } from './styles';

class Members extends Component {
  state = {
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

  render() {
    const { toggleMembersModal, members } = this.props;
    const { roles } = this.state;

    return (
      <Modal size="big">
        <h1>Members</h1>

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
  members: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      user: PropTypes.shape({
        name: PropTypes.string,
      }),
    })).isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  members: state.members,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(MembersActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Members);
