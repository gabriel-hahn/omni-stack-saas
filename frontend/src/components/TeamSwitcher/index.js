import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Button from '~/styles/components/Button';
import Modal from '~/components/Modal';

import TeamsActions from '~/store/ducks/teams';

import {
  Container,
  TeamList,
  Team,
  NewTeam,
} from './styles';

class TeamSwitcher extends Component {
  componentDidMount() {
    const { getTeamsRequest } = this.props;

    getTeamsRequest();
  }

  handleTeamSelect(team) {
    const { selectTeam } = this.props;

    selectTeam(team);
  }

  render() {
    const { teams, openTeamModal, closeTeamModal } = this.props;

    return (
      <Container>
        <TeamList>
          {teams.data.map((team) => (
            <Team key={team.id} onClick={() => this.handleTeamSelect(team)}>
              <img alt={team.name} src={`https://ui-avatars.com/api/?font-size=0.33&background=7159c1&color=fff&name=${team.name}`} />
            </Team>
          ))}

          <NewTeam onClick={openTeamModal}>NEW</NewTeam>

          {teams.teamModalOpen && (
            <Modal>
              <h1>Create new team</h1>

              <form onSubmit={() => { }}>
                <span>NAME</span>
                <input name="newTeam" />

                <Button size="big" type="submit">
                  Save
                </Button>
                <Button onClick={closeTeamModal} size="small" color="grey">
                  Cancel
                </Button>
              </form>
            </Modal>
          )}
        </TeamList>
      </Container>
    );
  }
}

TeamSwitcher.propTypes = {
  getTeamsRequest: PropTypes.func.isRequired,
  selectTeam: PropTypes.func.isRequired,
  openTeamModal: PropTypes.func.isRequired,
  closeTeamModal: PropTypes.func.isRequired,
  teams: PropTypes.shape({
    teamModalOpen: PropTypes.bool.isRequired,
    data: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    })),
  }).isRequired,
};

const mapStateToProps = (state) => ({
  teams: state.teams,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(TeamsActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TeamSwitcher);
