const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

const isYes = (value: string): boolean => {
    const firstLetter = value[0];
    return firstLetter.toLowerCase() === 'y'
}

export default {
    isValidEmail,
    isYes
}