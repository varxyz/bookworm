export default function(state = [], action) {
  switch (action.type) {
    case 'FETCH_BOOKS':
    // console.log('fetch called')
      return action.payload
    default:
      return state;
  }
}
