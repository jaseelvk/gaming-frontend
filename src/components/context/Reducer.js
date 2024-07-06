export const initialState = {
	userData: {},
  };
  
  export const reducer = (state, action) => {
	switch (action.type) {
	  case "SIGNOUT":
		localStorage.clear();
		return { ...state, userData: {} };
	  case "LOGIN":
		return { ...state, userData: action.payload };
	  default:
		return state;
	}
  };
  