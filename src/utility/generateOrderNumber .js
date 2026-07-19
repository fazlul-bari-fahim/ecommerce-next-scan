const generateOrderNumber = () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";

    const randomLetters = (length) => {
        let result = "";
        for (let i = 0; i < length; i++) {
            result += letters[Math.floor(Math.random() * letters.length)];
        }
        return result;
    };

    const randomNumbers = (length) => {
        let result = "";
        for (let i = 0; i < length; i++) {
            result += numbers[Math.floor(Math.random() * numbers.length)];
        }
        return result;
    };

    return `ORD-${randomLetters(3)}${randomNumbers(4)}${randomLetters(3)}${randomNumbers(4)}`;
};


export default generateOrderNumber;



