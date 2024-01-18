export const useColourStyle = () => {
    return {
        control: styles => ({
            ...styles,
            backgroundColor: "#ececf1",
            fontFamily: "Poppins",
        }),

        option: (styles, { isFocused }) => {
            return {
                ...styles,
                backgroundColor: isFocused ? '#343541' : "#ececf1",
                color: isFocused ? '#ececf1' : "#343541",
                fontFamily: "Poppins"
            }
        }
    }
}