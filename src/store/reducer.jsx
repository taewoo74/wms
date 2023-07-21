const initalState = {
    access_token: '',
};

function access_token(state = initalState, action) {
  switch (action.type) {
      case "add" : 
          return {
            access_token: action.data,
          }
      default:
          return state;
      }
}

export { access_token  } 