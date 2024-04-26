// reviewsReducer.js

const initialState = {
    reviews: []
};

const reviewReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_REVIEW':
            return [...state, action.payload];
        // handle other action types...
        default:
            return state;
    }
};