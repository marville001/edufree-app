
const initialState = {
  open: true
}
export const navigationReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'startSpinner': {
      return {
        open: true
      };
    }

    case 'stopSpinner': {
      return {
        open: false
      };
    }

    default:
      return state;
  }
}
