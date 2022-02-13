const { takeOrder } = require('./system');

const commandLineOrder = (orderInput) => {
    try {
        console.log(takeOrder(orderInput))
    } catch (e) {
        console.error(e);
    }
}

commandLineOrder(process.argv[2])
