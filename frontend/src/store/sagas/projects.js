import { call, put } from 'redux-saga/effects';
import api from '~/services/api';

import ProjectsActions from '../ducks/projects';

export function* getProjects() {
  const response = yield call(api.get, 'projects');

  yield put(ProjectsActions.getProjectsSuccess(response.data));
}
