export const initialStates = {
	recipes: [],
	query: '',
	isLoading: false,
	search: '',
	error: '',
	noResults: false,
	scrollY: 0,
};

export const searchReducer = (state = '', action) => {
	switch (action.type) {
		case 'FETCH_SUCCESS': {
			return {
				...state,
				isLoading: false,
				recipes: action.payload,
				error: '',
				noResuts: false,
			};
		}
		case 'FETCH_FAIL': {
			return {
				...state,
				isLoading: false,
				search: '',
				noResults: true,
			};
		}
		case 'UPDATE_SEARCH': {
			return {
				...state,
				search: action.payload,
			};
		}
		case 'GET_SEARCH': {
			return {
				...state,
				isLoading: true,
				query: action.payload,
			};
		}
		case 'YES_RESULTS': {
			return {
				...state,
				noResults: false,
				search: '',
			};
		}
		default:
			return state;
	}
};
