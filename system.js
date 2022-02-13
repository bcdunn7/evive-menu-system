/** takeOrder
 * @param {String} order - accepts orders in the form of a string: "Breakfast 1,2,3"
 * @return {String} returns string of items ordered
 * @throws {Error} throws error if invalid meal, items missing, or multiple invalid items ordered
 */
const takeOrder = (order) => {
    const [meal, itemsStr] = order.split(' ');
    const items = itemsStr.split(',').sort();
    const itemFreqs = makeFreqCounter(items);
    const out = [];
    const missingItems = [];

    let menu;

    switch (meal) {
        case 'Breakfast':
            menu = breakfastMenu;
            break;
        case 'Lunch':
            menu = lunchMenu;
            break;
        case 'Dinner':
            menu = dinnerMenu;
            break;
        default:
            throw new Error('Unable to process: Invalid meal')
    }

    /** MAIN, '1' */
    if (!itemFreqs.has('1')) missingItems.push('main');

    if (itemFreqs.get('1') > 1) throw new Error(`Unable to process: ${menu['1']} cannot be ordered more than once`);

    out.push(menu['1']);

    /** SIDE, '2' */
    if (!itemFreqs.has('2')) missingItems.push('side');

    if (meal === 'Lunch') {
        out.push(`${menu['2']}${itemFreqs.get('2') > 1 ? `(${itemFreqs.get('2')})` : ''}`);
    } else {
        if (itemFreqs.get('2') > 1) throw new Error(`Unable to process: ${menu['2']} cannot be ordered more than once`);

        out.push(menu['2']);
    }

    /** DRINK, '3' */
    if (meal === 'Breakfast') {
        if (!itemFreqs.has('3')) out.push('Water');

        else out.push(`${menu['3']}${itemFreqs.get('3') > 1 ? `(${itemFreqs.get('3')})` : ''}`);
    } else {
        if (itemFreqs.get('3') > 1) throw new Error(`Unable to process: ${menu['3']} cannot be ordered more than once`);

        if (meal === 'Dinner') {
            if (itemFreqs.has('3')) out.push(menu['3']);
            out.push('Water');
        } else if (meal === 'Lunch') {
            if (!itemFreqs.has('3')) out.push('Water');
            else out.push(menu['3']);
        }
    }

    /** DESSERT, '4' */
    if (meal === 'Dinner') {
        if (!itemFreqs.has('4')) missingItems.push('dessert');
        else out.push(menu['4']);
    }

    // Throw error if any items are missing
    if (missingItems.length) {
        throw new Error(missingItems.reduce((message, item) => {
            if (message === 'Unable to process: ') {
                return message + `${item.slice(0, 1).toUpperCase()}${item.slice(1)} is missing`
            }
            else return message + `, ${item} is missing`
        }, 'Unable to process: '))
    }

    return out.join(', ');;
}

/** makeFreqCounter
 *  func to create frequency counter used by takeOrder
 */
function makeFreqCounter(arr) {
    let freqs = new Map();

    for (let val of arr) {
        freqs.set(val, freqs.get(val) + 1 || 1);
    }

    return freqs;
}

/** item assignments */
const breakfastMenu = {
    '1': 'Eggs',
    '2': 'Toast',
    '3': 'Coffee'
}

const lunchMenu = {
    '1': 'Sandwich',
    '2': 'Chips',
    '3': 'Soda'
}

const dinnerMenu = {
    '1': 'Steak',
    '2': 'Potatoes',
    '3': 'Wine',
    '4': 'Cake'
}

module.exports = {
    takeOrder,
    makeFreqCounter
}