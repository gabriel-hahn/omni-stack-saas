import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import MembersActions from '~/store/ducks/members';

import Modal from '~/components/Modal';
import Button from '~/styles/components/Button';
import { MembersList } from './styles';

const Members = ({ toggleMembersModal }) => (
  <Modal size="big">
    <h1>Members</h1>

    <form>
      <MembersList>
        <li>
          <strong>Gabriel Hahn Schaeffer</strong>

        </li>
      </MembersList>

      <Button onClick={toggleMembersModal} filled="false" color="grey">
        Cancel
      </Button>
    </form>
  </Modal>
);

Members.propTypes = {
  toggleMembersModal: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => bindActionCreators(MembersActions, dispatch);

export default connect(null, mapDispatchToProps)(Members);
