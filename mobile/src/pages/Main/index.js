import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';

import SideMenu from 'react-native-side-menu';
import Icon from 'react-native-vector-icons/MaterialIcons';

import TeamSwitcher from '~/components/TeamSwitcher';

import styles from './styles';

const Main = ({ activeTeam }) => {
  const [leftOpen, setLeftOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);

  return (
    <View style={styles.backgroundWrapper}>
      <SideMenu
        isOpen={leftOpen}
        disableGestures
        onChange={isOpen => setLeftOpen(isOpen)}
        openMenuOffset={70}
        menu={<TeamSwitcher />}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity hitSlop={{ top: 5, bottom: 5, left: 10, right: 10 }} onPress={() => setLeftOpen(true)}>
              <Icon name="menu" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.teamTitle}>{activeTeam ? activeTeam.name : 'Select a team'}</Text>
            <TouchableOpacity hitSlop={{ top: 5, bottom: 5, left: 10, right: 10 }} onPress={() => { }}>
              <Icon name="group" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </SideMenu>
    </View>
  );
};

Main.propTypes = {
  activeTeam: PropTypes.shape({
    name: PropTypes.string,
  }),
};

Main.defaultProps = {
  activeTeam: null,
};

const mapStateToProps = state => ({
  activeTeam: state.teams.active,
});

export default connect(mapStateToProps)(Main);
