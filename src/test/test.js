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

describe('Logic.checkDataRule()', ()=>{
    var data = [1, 1, 1, 1, 1, 
                0, 0, 0, 0, 0,
                0, 0, 0, 0, 0]
    
    var dataExpectSlot = [];
    dataExpectSlot[0] = [0];
    dataExpectSlot[1] = [0];
    dataExpectSlot[2] = [0];
    assert.equal(Logic.checkDataRule(data)[0], dataExpectSlot[0]);
});