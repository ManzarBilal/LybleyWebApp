const initialState = {
    data: [],
    showLoading: false
};
const allCategories = (state = initialState, action) => {
    switch (action.type) {
        case "GET_CATEGORY": return{...state, data:action.payload};
        case "LOADING": return { ...state, showLoading: action.payload };
        default: return state;
    }
}

export default allCategories;