import {Logic} from '../Logic.js';

import {describe, assert} from './TestUtils.js';

describe('Logic.genData(): test length = 15', ()=>{    
    assert.equal(15, Logic.genData().length);
});

describe('Logic.genData(): test length != 0', ()=>{    
    assert.notEqual(0, Logic.genData().length);
});

describe('Logic.splitDataToSlot(): check first array == 5 column', ()=>{    
    var data = [ 
                1,1,1,1,1,
                1,1,1,1,1,
                1,1,1,1,1
            ];
    var sp = Logic.splitDataToSlot(data);
    assert.equal(5, sp.length);
});

describe('Logic.splitDataToSlot(): check first slot machine data', ()=>{    
    var data = [ 
                1,1,1,1,1,
                1,1,1,1,1,
                3,1,1,1,1
            ];
    var sp = Logic.splitDataToSlot(data);
    assert.equal([1, 1, 3], sp[0]);
});

describe('Logic.checkDataRule() 5', ()=>{
    var data = [1, 1, 1, 1, 1, 
                0, 4, 0, 4, 0,
                2, 0, 1, 4, 0]
    
    var dataExpectSlot = [];
    dataExpectSlot = [0, 1, 2, 3, 4];
    
    var dataRule = Logic.checkDataRule(data);
    assert.equal(dataRule, dataExpectSlot);
    
});
describe('Logic.checkDataRule() 4', ()=>{
    var data = [0, 1, 1, 1, 1, 
                0, 3, 0, 1, 0,
                0, 1, 0, 2, 0]
    
    var dataExpectSlot = [];
    dataExpectSlot = [1, 2, 3, 4];
    
    var dataRule = Logic.checkDataRule(data);
    
    assert.equal(dataRule, dataExpectSlot);
    
});
describe('Logic.checkDataRule() 3.0', ()=>{
    var data = [0, 1, 1, 1, 0, 
                0, 4, 0, 2, 0,
                0, 2, 1, 0, 1]
    
    var dataExpectSlot = [];
    dataExpectSlot = [1, 2, 3];
    
    var dataRule = Logic.checkDataRule(data);
    
    assert.equal(dataRule, dataExpectSlot);
    
});
describe('Logic.checkDataRule() 3.1', ()=>{
    var data = [1, 1, 1, 0, 0, 
                0, 3, 0, 1, 4,
                0, 1, 0, 0, 1]
    
    var dataExpectSlot = [];
    dataExpectSlot = [0, 1, 2];
    
    var dataRule = Logic.checkDataRule(data);
    
    assert.equal(dataRule, dataExpectSlot);
    
});
describe('Logic.checkDataRule() 4.2', ()=>{
    var data = [0, 1, 1, 1, 1, 
                0, 3, 0, 5, 0,
                0, 0, 2, 3, 0]
    
    var dataExpectSlot = [];
    dataExpectSlot = [1, 2, 3, 4];
    
    var dataRule = Logic.checkDataRule(data);
    
    assert.equal(dataRule, dataExpectSlot);
    
});

describe('Logic.checkDataRule() 3.1.1', ()=>{
    var data = [1, 0, 1, 1, 0, 
                0, 1, 3, 4, 0,
                0, 1, 0, 3, 0]
    
    var dataExpectSlot = [];
    
    var dataRule = Logic.checkDataRule(data);
    
    assert.equal(dataRule, dataExpectSlot);
    
});

describe('Logic.checkDataRule() random', ()=>{
    var data = [1, 2, 0, 3, 4, 
                0, 4, 0, 2, 0,
                0, 0, 1, 0, 3]
    
    var dataExpectSlot = [];
    
    var dataRule = Logic.checkDataRule(data);
    
    assert.equal(dataRule, dataExpectSlot);
    
});

describe('Logic.checkDataRule() line1 normal', ()=>{
    var data = [0, 0, 1, 0, 0, 
                1, 1, 1, 1, 1,
                0, 4, 0, 1, 0]
    
    var dataExpectSlot = [5, 6, 7, 8, 9];
    
    var dataRule = Logic.checkDataRule(data);
    
    assert.equal(dataRule, dataExpectSlot);
    
});

describe('Logic.checkDataRule() line1, line2 ', ()=>{
    var data = [0, 1, 0, 1, 0, 
                1, 1, 1, 1, 1,
                0, 0, 0, 0, 0]
    
    var dataExpectSlot = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
    
    var dataRule = Logic.checkDataRule(data);
    
    assert.equal(dataRule, dataExpectSlot);
    
});
describe('Logic.checkDataRule() line1, line2, line3  ', ()=>{
    var data = [
        1, 1, 1, 1, 1,
        2, 2, 2, 2, 2,
        1, 3, 3, 3, 1
    ]
    
    var dataExpectSlot = [
        0, 1, 2, 3, 4, 
        5, 6, 7, 8, 9, 
        11, 12, 13];
    
    var dataRule = Logic.checkDataRule(data);
    
    assert.equal(dataRule, dataExpectSlot);
    
});


describe('dataAcceptToSlotMachines() & split to slot ', ()=>{
    // data test 
    // [
    //     1, 1, 1, 1, 1, 
    //     3, 2, 5, 1, 2,   
    //     3, 2, 1, 1, 3,   
    // ]
    var data = [0, 1, 2, 3, 4];
    var slots = Logic.dataAcceptToSlotMachines(data);    
    console.log(slots);
    assert.equal(slots[0], [0]);
    assert.equal(slots[1], [0]);
    assert.equal(slots[2], [0]);
    assert.equal(slots[3], [0]);
    assert.equal(slots[4], [0]);
    
});
describe('dataAcceptToSlotMachines() & split to slot 1', ()=>{
    // data test 
    // [
    //     3, 2, 5, 1, 2,           
    //     1, 1, 1, 1, 1, 
    //     3, 2, 1, 1, 3,   
    // ]
    var data = [5, 6, 7, 8, 9];
    var slots = Logic.dataAcceptToSlotMachines(data);    
    console.log(slots);
    assert.equal(slots[0], [1]);
    assert.equal(slots[1], [1]);
    assert.equal(slots[2], [1]);
    assert.equal(slots[3], [1]);
    assert.equal(slots[4], [1]);
    
});
describe('dataAcceptToSlotMachines() & split to slot 2', ()=>{
    // data test 
    // [
    //     3, 2, 5, 1, 2,           
    //     3, 2, 1, 1, 3,   
    //     1, 1, 1, 1, 1, 
    // ]
    var data = [10, 11, 12, 13, 14];
    var slots = Logic.dataAcceptToSlotMachines(data);    
    console.log(slots);
    assert.equal(slots[0], [2]);
    assert.equal(slots[1], [2]);
    assert.equal(slots[2], [2]);
    assert.equal(slots[3], [2]);
    assert.equal(slots[4], [2]);
    
});