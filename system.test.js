const { expect } = require("@jest/globals");
const { takeOrder, makeFreqCounter } = require('./system');

describe('makeFreqCounter', () => {
    test('it correctly creates freq counter', () => {
        expect(makeFreqCounter(['1', '3', '2', '4', '2', '2', '3'])).toEqual(new Map(Object.entries({
            '1': 1,
            '2': 3,
            '3': 2,
            '4': 1
        })))
    })
})

describe('takeOrder accepts orders and returns names', () => {
    test('returns names of items ordered', () => {
        expect(takeOrder('Breakfast 1,2,3')).toEqual('Eggs, Toast, Coffee');

        expect(takeOrder('Lunch 1,2,3')).toEqual('Sandwich, Chips, Soda');

        expect(takeOrder('Dinner 1,2,3,4')).toEqual('Steak, Potatoes, Wine, Water, Cake');
    })

    test('returns item in set order', () => {
        expect(takeOrder('Breakfast 2,3,1')).toEqual('Eggs, Toast, Coffee');
    })

    test('indicated multiple when multiple ordered', () => {
        expect(takeOrder('Breakfast 1,2,3,3,3')).toEqual('Eggs, Toast, Coffee(3)');
    })

    test('adds water if no drink ordered', () => {
        expect(takeOrder('Lunch 1,2')).toEqual('Sandwich, Chips, Water');
    })

})

describe('takeOrder properly parses orders and throws errors', () => {
    test('throws error if invalid meal', () => {
        expect(() => { takeOrder('abcd 1,2,3') }).toThrow('Unable to process: Invalid meal');
    })

    test('throws err when invalid item ordered more than once', () => {
        expect(() => { takeOrder('Lunch 1,1,2,3') }).toThrow('Unable to process: Sandwich cannot be ordered more than once');
    })

    test('Throws err when item missing', () => {
        expect(() => { takeOrder('Lunch 3') }).toThrow('Unable to process: Main is missing, side is missing');

        expect(() => { takeOrder('Dinner 2') }).toThrow('Unable to process: Main is missing, dessert is missing');

        expect(() => { takeOrder('Dinner 1,2,3') }).toThrow('Unable to process: Dessert is missing');
    })
})