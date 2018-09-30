export default function(state = false, action) {
  switch (action.type) {
    case 'TOGGLE_LOADING':
      return action.payload
    default:
      return state;
  }
}
