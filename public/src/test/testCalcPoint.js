import {Logic} from '../Logic.js';

import {describe, assert} from './TestUtils.js';

describe('test Calculate Point 1', ()=>{    

    var arInput = [
        {pos:1, val:1},
        {pos:2, val:1},
        {pos:3, val:1},
    ];
    var bid = 1;
    var point = Logic.calcPoint(arInput, bid);

    assert.equal(3, point);
});

describe('test Calculate Point 1 special x', ()=>{    

    var arInput = [
        {pos:1, val:1},
        {pos:2, val:-10},
        {pos:3, val:1},
    ];
    var bid = 1;
    var point = Logic.calcPoint(arInput, bid);

    assert.equal(3, point);
});


describe('test Calculate Point 1 special x2', ()=>{    

    var arInput = [
        {pos:1, val:-10},
        {pos:2, val:1},
        {pos:3, val:1},
    ];
    var bid = 1;
    var point = Logic.calcPoint(arInput, bid);

    assert.equal(3, point);
});
describe('test Calculate Point 1 special x22s', ()=>{    

    var arInput = [
        {pos:1, val:-10},
        {pos:2, val:-10},
        {pos:3, val:1},
    ];
    var bid = 1;
    var point = Logic.calcPoint(arInput, bid);

    assert.equal(3, point);
});
describe('test Calculate Point 1 special x3', ()=>{    

    var arInput = [
        {pos:1, val:1},
        {pos:2, val:1},
        {pos:3, val:-10},
    ];
    var bid = 1;
    var point = Logic.calcPoint(arInput, bid);

    assert.equal(3, point);
});

describe('test Calculate Point 1 special xxx', ()=>{    
    var arInput = [
        {pos:1, val:-10},
        {pos:2, val:-10},
        {pos:3, val:-10},
    ];
    var bid = 1;
    var point = Logic.calcPoint(arInput, bid);

    assert.equal(3*3, point);
});

describe('test Calculate Point 1 special xxx bid 2', () => {    
    var arInput = [
        {pos:1, val:-10},
        {pos:2, val:-10},
        {pos:3, val:-10},
    ];
    var bid = 2;
    var point = Logic.calcPoint(arInput, bid);

    assert.equal((3*3)*bid, point);
});


describe('prop test', () => {    
    var cnt = 0;
    for(var i = 0; i < 10000; i++){
        var data = Logic.genData();
        if (Logic.checkDataRule(data).length > 0){
            cnt++;
        }
    }
    console.log("percent success: " +  cnt/100 + "%");

    
    
});



