import { call, put } from 'redux-saga/effects';
import { actions as toastrActions } from 'react-redux-toastr';
import api from '~/services/api';

import ProjectsActions from '../ducks/projects';

export function* getProjects() {
  const response = yield call(api.get, 'projects');

  yield put(ProjectsActions.getProjectsSuccess(response.data));
}

export function* createProject({ title }) {
  try {
    const response = yield call(api.post, 'projects', { title });

    yield put(ProjectsActions.createProjectSuccess(response.data));
    yield put(ProjectsActions.toggleProjectModal());
  } catch (err) {
    yield put(toastrActions.add({
      type: 'error',
      title: 'Operation error',
      message: 'We had some problem to create this new project for you. Try again',
    }));
  }
}
