export const timeConvertor = (str) => {
    const units = str.slice(-1);
    const value = +str.substring(0, str.length - 1);
    
    switch (units) {
        case 's':
            return value * 1000;
        case 'm':
            return value * 60 * 1000;
        case 'h':
            return value * 60 * 60 * 1000;
        case 'd':
            return value * 24 * 60 * 60 * 1000;
    
        default:
            throw new Error('Неправильный формат времени жизни токена');
            break;
    }
}