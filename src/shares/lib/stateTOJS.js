export default function stateTOJS(state) {
  return Object.keys(state).reduce((acc, key) => {
    return {...acc, [key]: state[key].toJS() };
  }, {});
}