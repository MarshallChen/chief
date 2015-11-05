import device from '../device/reducer';
import intl from '../intl/reducer';
import user from '../user/reducer';
import { combineReducers } from 'redux';

const appReducer = combineReducers({
  device,
  intl,
  user
});

export default appReducer;