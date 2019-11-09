const initialState = {

}

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case "reset":
        return { ...state, ...payload }

    default:
        return state
    }
}
