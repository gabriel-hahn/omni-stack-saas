import { call, put, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { actions as toastrActions } from 'react-redux-toastr';
import api from '~/services/api';

import AuthActions from '../ducks/auth';

export function* signIn({ email, password }) {
  try {
    const response = yield call(api.post, 'sessions', { email, password });

    localStorage.setItem('@Omni:token', response.data.token);

    yield put(AuthActions.signInSuccess(response.data.token));
    yield put(push('/'));
  } catch (err) {
    yield put(toastrActions.add({
      type: 'error',
      title: 'Login failed',
      message: 'Verify your e-mail/password!',
    }));
  }
}

export function* signOut() {
  localStorage.removeItem('@Omni:token');
  localStorage.removeItem('@Omni:team');

  yield put(push('/signin'));
}

export function* signUp({ name, email, password }) {
  try {
    const response = yield call(api.post, 'users', { name, email, password });

    localStorage.setItem('@Omni:token', response.data.token);

    yield put(AuthActions.signInSuccess(response.data.token));
    yield put(push('/'));
  } catch (err) {
    yield put(toastrActions.add({
      type: 'error',
      title: 'Sign up failed',
      message: 'Have you been invited to any team?',
    }));
  }
}

export function* getPermissions() {
  const team = yield select((state) => state.teams.active);
  const signedIn = yield select((state) => state.auth.signedIn);

  if (!signedIn || !team) {
    return;
  }

  const response = yield call(api.get, 'permissions');
  const { roles, permissions } = response.data;

  yield put(AuthActions.getPermissionsSuccess(roles, permissions));
}
