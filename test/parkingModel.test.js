import {expect} from 'chai';
import {calculateParkingDuration, calculateBaseFee, roundToBillableHours} from '../src/models/parkingModel.js';

// Test suite: collection of test cases
describe('Testing parkingModel.js', () => {
    // Test cases for each function
    describe('Testing calculateParkingDuration', () => {
        it("Calculate parkingDuration",() =>{
            const entry = new Date('2026-01-29T08:00:00');
            const exit = new Date('2026-01-29T10:00:00');
            expect(calculateParkingDuration(entry, exit)).to.equal(2);
        })
         it("Calculate parkingDuration",() =>{
            const entry = new Date('2026-01-29T08:00:00');
            const exit = new Date('2026-01-29T08:15:00');
            expect(calculateParkingDuration(entry, exit)).to.closeTo(0.25, 0.01);
        })
    })

    describe('Testing calculateBaseFee', () => {
        it("Calculate parking fee",() =>{
            expect(calculateBaseFee(2.5)).to.equal(12.5);
        })
    })
    describe('Testing roundToBillableHours', () => {
        it("Calculate roundToBillableHours",() =>{
            expect(roundToBillableHours(2.6)).to.equal(3);
        })
        it("Calculate roundToBillableHours",() =>{
            expect(roundToBillableHours(4)).to.equal(4);
        })
        it("Calculate roundToBillableHours",() =>{
            expect(roundToBillableHours(0.5)).to.equal(1);
        })
    })
});