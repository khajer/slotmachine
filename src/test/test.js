import {Logic} from '../Logic.js';

import {describe, assert} from './TestUtils.js';

describe('Logic.genData(): test length = 15', ()=>{    
    assert.equal(15, Logic.genData().length);
});

describe('Logic.genData(): test length != 0', ()=>{    
    assert.notEqual(0, Logic.genData().length);
});

describe('Logic.splitDataToSlot(): check first array == 5 column', ()=>{    
    var data = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
    var sp = Logic.splitDataToSlot(data);
    assert.equal(5, sp.length);
});

describe('Logic.checkDataRule() 5', ()=>{
    var data = [1, 1, 1, 1, 1, 
                0, 0, 0, 0, 0,
                0, 0, 0, 0, 0]
    
    var dataExpectSlot = [];
    dataExpectSlot = [0, 1, 2, 3, 4];
    
    var dataRule = Logic.checkDataRule(data);
    assert.equal(dataRule, dataExpectSlot);
    
});
describe('Logic.checkDataRule() 4', ()=>{
    var data = [0, 1, 1, 1, 1, 
                0, 0, 0, 0, 0,
                0, 0, 0, 0, 0]
    
    var dataExpectSlot = [];
    dataExpectSlot = [1, 2, 3, 4];
    
    var dataRule = Logic.checkDataRule(data);
    
    assert.equal(dataRule, dataExpectSlot);
    
});
describe('Logic.checkDataRule() 3.0', ()=>{
    var data = [0, 1, 1, 1, 0, 
                0, 0, 0, 0, 0,
                0, 0, 0, 0, 0]
    
    var dataExpectSlot = [];
    dataExpectSlot = [1, 2, 3];
    
    var dataRule = Logic.checkDataRule(data);
    
    assert.equal(dataRule, dataExpectSlot);
    
});
describe('Logic.checkDataRule() 3.1', ()=>{
    var data = [1, 1, 1, 0, 0, 
                0, 0, 0, 0, 0,
                0, 0, 0, 0, 0]
    
    var dataExpectSlot = [];
    dataExpectSlot = [0, 1, 2];
    
    var dataRule = Logic.checkDataRule(data);
    
    assert.equal(dataRule, dataExpectSlot);
    
});
describe('Logic.checkDataRule() 4.2', ()=>{
    var data = [0, 1, 1, 1, 1, 
                0, 0, 0, 0, 0,
                0, 0, 0, 0, 0]
    
    var dataExpectSlot = [];
    dataExpectSlot = [1, 2, 3, 4];
    
    var dataRule = Logic.checkDataRule(data);
    
    assert.equal(dataRule, dataExpectSlot);
    
});
describe('Logic.checkDataRule() 3.1', ()=>{
    var data = [1, 1, 0, 1, 0, 
                0, 0, 0, 0, 0,
                0, 0, 0, 0, 0]
    
    var dataExpectSlot = [];
    dataExpectSlot = [];
    
    var dataRule = Logic.checkDataRule(data);
    
    assert.equal(dataRule, dataExpectSlot);
    
});
describe('Logic.checkDataRule() 3.1.1', ()=>{
    var data = [1, 0, 1, 1, 0, 
                0, 0, 0, 0, 0,
                0, 0, 0, 0, 0]
    
    var dataExpectSlot = [];
    // dataExpectSlot = [0,1,2,3,4];
    
    var dataRule = Logic.checkDataRule(data);
    
    assert.equal(dataRule, dataExpectSlot);
    
});

describe('Logic.checkDataRule() random', ()=>{
    var data = [1, 2, 0, 3, 4, 
                0, 0, 0, 0, 0,
                0, 0, 0, 0, 0]
    
    var dataExpectSlot = [];
    
    var dataRule = Logic.checkDataRule(data);
    
    assert.equal(dataRule, dataExpectSlot);
    
});

describe('Logic.checkDataRule() line1', ()=>{
    var data = [0, 1, 0, 1, 0, 
                1, 1, 1, 1, 1,
                0, 0, 1, 0, 0]
    
    var dataExpectSlot = [5, 6, 7, 8, 9];
    
    var dataRule = Logic.checkDataRule(data);
    
    assert.equal(dataRule, dataExpectSlot);
    
});

describe('Logic.checkDataRule() line1', ()=>{
    var data = [0, 1, 0, 1, 0, 
                1, 1, 1, 1, 1,
                0, 0, 0, 0, 0]
    
    var dataExpectSlot = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
    
    var dataRule = Logic.checkDataRule(data);
    
    assert.equal(dataRule, dataExpectSlot);
    
});