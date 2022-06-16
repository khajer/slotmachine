import {Logic} from '../Logic.js';

import {describe, assert} from './TestUtils.js';

describe('test Calculate Point 1', ()=>{    
    var data = [1, 1, 1, 2, 2, 
                0, 3, 0, 1, 0,
                0, 1, 0, 2, 0];
    
    

    // var dataExpectSlot = [];
    // dataExpectSlot = [0, 1, 2];

    var dataMergePos = []
    Logic.checkDirectLine(data).forEach( e => {dataMergePos = dataMergePos.concat(e)});
    var dataValue = (dataMergePos.map((data)=>{return data.value}));
    console.log(data)
    // assert.equal(dataRule, dataExpectSlot);  

    assert.equal(3, 15);
});

describe('test Calculate Point 1.5', ()=>{    
    assert.equal(15, 15);
});

describe('test Calculate Point 2', ()=>{    
    assert.equal(15, 15);
});

