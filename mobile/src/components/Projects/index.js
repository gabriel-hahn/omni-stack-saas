import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import ProjectsActions from '~/store/ducks/projects';

import NewProject from '~/components/NewProject';
import Can from '~/components/Can';

import styles from './styles';

class Projects extends Component {
  state = {
    isModalOpen: false,
  };

  componentDidMount() {
    const { getProjectsRequest, activeTeam } = this.props;

    if (activeTeam) {
      getProjectsRequest();
    }
  }

  toggleModalOpen = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  };

  render() {
    const { projects, activeTeam } = this.props;
    const { isModalOpen } = this.state;

    if (!activeTeam) return null;

    return (
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={styles.projectsList}
          data={projects.data}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <View style={styles.projectContainer}>
              <Text style={styles.projectTitle}>{item.title}</Text>
            </View>
          )}
        />

        <Can checkPermission="projects_create">
          <TouchableOpacity style={styles.newProjectButton} onPress={this.toggleModalOpen}>
            <Icon name="add" size={28} color="#FFF" />
          </TouchableOpacity>
        </Can>

        <NewProject visible={isModalOpen} onRequestClose={this.toggleModalOpen} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  projects: state.projects,
  activeTeam: state.teams.active,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(ProjectsActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
