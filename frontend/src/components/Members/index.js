import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import MembersActions from '~/store/ducks/members';

import Modal from '~/components/Modal';
import Button from '~/styles/components/Button';
import { MembersList } from './styles';

class Members extends Component {
  componentDidMount() {
    const { getMembersRequest } = this.props;

    getMembersRequest();
  }

  render() {
    const { toggleMembersModal, members } = this.props;

    return (
      <Modal size="big">
        <h1>Members</h1>

        <form>
          <MembersList>
            {members.data.map(member => (
              <li key={member.id}>
                <strong>{member.user.name}</strong>
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
  getMembersRequest: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  members: state.members,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(MembersActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Members);
