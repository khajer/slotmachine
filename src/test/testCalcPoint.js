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


