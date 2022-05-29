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

describe('Logic.checkDirectLine() 5', ()=>{
    var data = [1, 1, 1, 1, 1, 
                0, 4, 0, 4, 0,
                2, 0, 1, 4, 0]
    
    var dataExpectSlot = [];
    dataExpectSlot = [0, 1, 2, 3, 4];
    
    var dataRule = Logic.checkDirectLine(data);
    assert.equal(dataRule, dataExpectSlot);
    
});
describe('Logic.checkDirectLine() 4', ()=>{
    var data = [0, 1, 1, 1, 1, 
                0, 3, 0, 1, 0,
                0, 1, 0, 2, 0]
    
    var dataExpectSlot = [];
    dataExpectSlot = [1, 2, 3, 4];
    
    var dataRule = Logic.checkDirectLine(data);
    
    assert.equal(dataRule, dataExpectSlot);
    
});
describe('Logic.checkDirectLine() 3.0', ()=>{
    var data = [0, 1, 1, 1, 0, 
                0, 4, 0, 2, 0,
                0, 2, 1, 0, 1]
    
    var dataExpectSlot = [];
    dataExpectSlot = [1, 2, 3];
    
    var dataRule = Logic.checkDirectLine(data);
    
    assert.equal(dataRule, dataExpectSlot);
    
});
describe('Logic.checkDirectLine() 3.1', ()=>{
    var data = [1, 1, 1, 0, 0, 
                0, 3, 0, 1, 4,
                0, 1, 0, 0, 1]
    
    var dataExpectSlot = [];
    dataExpectSlot = [0, 1, 2];
    
    var dataRule = Logic.checkDirectLine(data);
    
    assert.equal(dataRule, dataExpectSlot);
    
});
describe('Logic.checkDirectLine() 3.2 - 011110', ()=>{
    var data = [3, 1, 1, 1, 0, 
                0, 3, 0, 1, 4,
                0, 1, 0, 0, 1]
    
    var dataExpectSlot = [];
    dataExpectSlot = [1, 2, 3];
    
    var dataRule = Logic.checkDirectLine(data);
    
    assert.equal(dataRule, dataExpectSlot);
    
});
describe('Logic.checkDirectLine() 3.2xcx - 011110', ()=>{
    var data = [3, 1, 2, 2, 2, 
                0, 3, 0, 1, 4,
                0, 1, 0, 0, 0]
    
    var dataExpectSlot = [];
    dataExpectSlot = [2, 3, 4, 12, 13, 14];
    
    var dataRule = Logic.checkDirectLine(data);
    
    assert.equal(dataRule, dataExpectSlot);
    
});
describe('Logic.checkDirectLine() 4.2', ()=>{
    var data = [0, 1, 1, 1, 1, 
                0, 3, 0, 5, 0,
                0, 0, 2, 3, 0]
    
    var dataExpectSlot = [];
    dataExpectSlot = [1, 2, 3, 4];
    
    var dataRule = Logic.checkDirectLine(data);
    
    assert.equal(dataRule, dataExpectSlot);
    
});

describe('Logic.checkDirectLine() 3.1.1', ()=>{
    var data = [1, 0, 1, 1, 0, 
                0, 1, 3, 4, 0,
                0, 1, 0, 3, 0]
    
    var dataExpectSlot = [];
    
    var dataRule = Logic.checkDirectLine(data);
    
    assert.equal(dataRule, dataExpectSlot);
    
});

describe('Logic.checkDirectLine() random', ()=>{
    var data = [1, 2, 0, 3, 4, 
                0, 4, 0, 2, 0,
                0, 0, 1, 0, 3]
    
    var dataExpectSlot = [];
    
    var dataRule = Logic.checkDirectLine(data);
    
    assert.equal(dataRule, dataExpectSlot);
    
});

describe('Logic.checkDirectLine() line1 normal', ()=>{
    var data = [0, 0, 1, 0, 0, 
                1, 1, 1, 1, 1,
                0, 4, 0, 1, 0]
    
    var dataExpectSlot = [5, 6, 7, 8, 9];
    
    var dataRule = Logic.checkDirectLine(data);
    
    assert.equal(dataRule, dataExpectSlot);
    
});

describe('Logic.checkDirectLine() line1, line2 ', ()=>{
    var data = [0, 1, 0, 1, 0, 
                1, 1, 1, 1, 1,
                0, 0, 0, 0, 0]
    
    var dataExpectSlot = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
    
    var dataRule = Logic.checkDirectLine(data);
    
    assert.equal(dataRule, dataExpectSlot);
    
});
describe('Logic.checkDirectLine() line1, line2, line3  ', ()=>{
    var data = [
        1, 1, 1, 1, 1,
        2, 2, 2, 2, 2,
        1, 3, 3, 3, 1
    ]
    
    var dataExpectSlot = [
        0, 1, 2, 3, 4, 
        5, 6, 7, 8, 9, 
        11, 12, 13];
    
    var dataRule = Logic.checkDirectLine(data);
    
    assert.equal(dataRule, dataExpectSlot);
    
});


describe('dataAcceptToSlotMachines() & split to slot ', ()=>{    
    var data = [0, 1, 2, 3, 4];
    var slots = Logic.dataAcceptToSlotMachines(data);        
    assert.equal(slots[0], [0]);
    assert.equal(slots[1], [0]);
    assert.equal(slots[2], [0]);
    assert.equal(slots[3], [0]);
    assert.equal(slots[4], [0]);
    
});
describe('dataAcceptToSlotMachines() & split to slot 1', ()=>{
    var data = [5, 6, 7, 8, 9];
    var slots = Logic.dataAcceptToSlotMachines(data);        
    assert.equal(slots[0], [1]);
    assert.equal(slots[1], [1]);
    assert.equal(slots[2], [1]);
    assert.equal(slots[3], [1]);
    assert.equal(slots[4], [1]);
    
});
describe('dataAcceptToSlotMachines() & split to slot 2', ()=>{
    var data = [10, 11, 12, 13, 14];
    var slots = Logic.dataAcceptToSlotMachines(data);    
    assert.equal(slots[0], [2]);
    assert.equal(slots[1], [2]);
    assert.equal(slots[2], [2]);
    assert.equal(slots[3], [2]);
    assert.equal(slots[4], [2]);
    
});

describe('Logic.checkDirectLine() line1,  line3  and another type', ()=>{
    var data = [
        1, 1, 1, 4, 2,
        2, 1, 2, 7, 2,
        1, 2, 3, 3, 3
    ]
    
    var dataExpectSlot = [
        0, 1, 2, 12, 13, 14];
    
    var dataRule = Logic.checkDirectLine(data);
    
    assert.equal(dataRule, dataExpectSlot);
    
});
describe('Logic.checkDirectLine()  test 33222 line', ()=>{
    var data = [3, 3, 2, 2, 2, 
                0, 3, 0, 1, 4,
                0, 4, 3, 1, 3]
    
    var dataExpectSlot = [];
    dataExpectSlot = [2, 3, 4];
    
    var dataRule = Logic.checkDirectLine(data);
    
    assert.equal(dataRule, dataExpectSlot);
    
});

describe('Logic.checkDirectLine() 11222 >> -line1,  line3  and another type', ()=>{
    var data = [
        1, 1, 2, 2, 2,
        2, 1, 2, 7, 2,
        1, 4, 2, 2, 2,
    ];
    
    var dataExpectSlot = [
        2, 3, 4, 12, 13, 14];
    
    var dataRule = Logic.checkDirectLine(data);
    
    assert.equal(dataRule, dataExpectSlot);
    
});
describe('Logic.checkDirectLine() line2,  line3 and another type', ()=>{
    var data = [
        1, 1, 2, 2, 2,
        2, 1, 2, 7, 2,
        1, 2, 2, 2, 2,
    ];
    
    var dataExpectSlot = [
        2, 3, 4, 11, 12, 13, 14];
    
    var dataRule = Logic.checkDirectLine(data);
    
    assert.equal(dataRule, dataExpectSlot);
    
});
describe('Logic.checkDirectLine() line2-4,  line3 and another type', ()=>{
    var data = [
        4, 1, 2, 3, 2,
        2, 3, 3, 3, 3,
        3, 3, 2, 2, 2,
    ];
    
    var dataExpectSlot = [
        6, 7, 8, 9, 12, 13, 14
    ];
    
    var dataRule = Logic.checkDirectLine(data);
    
    assert.equal(dataRule, dataExpectSlot);
    
});


describe('Logic.checkDirectLine() line2-4,  line3 and another type', ()=>{
    var data = [
        1, 1, 1, 3, 2,
        2, 5, 3, 6, 3,
        3, 3, 2, 2, 2,
    ];
    
    var dataExpectSlot = [
        0, 1, 2, 12, 13, 14
    ];
    
    var dataRule = Logic.checkDirectLine(data);
    
    assert.equal(dataRule, dataExpectSlot);
    
});
describe('checkDirectLine() L shape', ()=>{
    var data = [
        1, 2, 3, 3, 2,
        1, 1, 2, 6, 3,
        1, 1, 1, 4, 2,
    ];
    
    var dataExpectSlot = [
        10, 11, 12
    ];
    
    var dataRule = Logic.checkDirectLine(data);
    
    assert.equal(dataRule, dataExpectSlot);
    
});


describe('checkVertical()', ()=>{
    var data = [
        1, 2, 1, 3, 2,
        1, 5, 3, 6, 3,
        1, 3, 2, 4, 2,
    ];
    
    var dataExpectSlot = [
        0, 5, 10
    ];
    
    var dataRule = Logic.checkVertical(data);
    
    assert.equal(dataRule, dataExpectSlot);
    
});
describe('checkVertical()', ()=>{
    var data = [
        1, 2, 1, 3, 2,
        1, 5, 1, 6, 3,
        1, 3, 1, 4, 2,
    ];
    
    var dataExpectSlot = [
        0, 5, 10, 2, 7, 12
    ];
    
    var dataRule = Logic.checkVertical(data);
    
    assert.equal(dataRule, dataExpectSlot);
    
});


describe('slopeFive ()', ()=>{
    var data = [
        1, 1, 0, 3, 2,
        1, 5, 1, 6, 3,
        1, 3, 2, 1, 1,
    ];
    
    var dataExpectSlot = [
        0, 1, 7, 13, 14
    ];
    
    var dataRule = Logic.slopeFive(data);
    
    assert.equal(dataRule, dataExpectSlot);
    
});
describe('slopeFive (2)', ()=>{
    var data = [
        1, 2, 0, 3, 3,
        1, 5, 3, 6, 3,
        3, 3, 2, 2, 1,
    ];
    
    var dataExpectSlot = [
        10, 11, 7, 3, 4
    ];
    
    var dataRule = Logic.slopeFive(data);
    
    assert.equal(dataRule, dataExpectSlot);
    
});




