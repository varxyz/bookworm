export default function(state = null, action) {
  switch (action.type) {
    case 'TOGGLE_LOADING':
      return action.payload
    default:
      return state;
  }
}
