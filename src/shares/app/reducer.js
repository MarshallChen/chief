import { combineReducers } from 'redux';

import device from '../device/reducer';
import intl from '../intl/reducer';
import user from '../user/reducer';

const appReducer = combineReducers({
  device,
  intl,
  user
});

export default appReducer;