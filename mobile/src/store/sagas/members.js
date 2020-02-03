import { call, put } from 'redux-saga/effects';
import api from '~/services/api';

import MembersActions from '../ducks/members';

export function* getMembers() {
  const response = yield call(api.get, 'members');

  yield put(MembersActions.getMembersSuccess(response.data));
}

export function* updateMember({ id, roles }) {
  try {
    yield call(api.put, `members/${id}`, { roles: roles.map((role) => role.id) });
    console.log('Success');
  } catch (err) {
    console.log('error');
  }
}

export function* inviteMember({ email }) {
  try {
    yield call(api.post, 'invites', { invites: [email] });
    console.log('Success')
  } catch (err) {
    console.log('Error');
  }
}
