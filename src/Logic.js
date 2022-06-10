const MAX_COL = 5;
const MAX_TYPE = 4;
const MAX_ROW = 3;

const SPECIAL_TYPE = -10;

var checkDirectLine = (dataSlot) => {
    var tmp = [];
    var seq = 0;
    var stackPos = [];
    for (var row = 0; row < 3; row++) {
        tmp = [];
        seq = MAX_COL * row;
        var maxCheck = MAX_COL * (row+1);
        for (var i = seq; i < maxCheck-1; i++) {                        
            
            var dChk = dataSlot[i];  
            var dNextChk = dataSlot[i + 1];    
            if (dChk === dNextChk || 
                dChk === SPECIAL_TYPE || 
                dNextChk === SPECIAL_TYPE){     
                    if (tmp.length === 0 && (dChk === dNextChk || dChk === SPECIAL_TYPE || dNextChk === SPECIAL_TYPE)){ // [ ] | x x , [ ] | 1 x , [ ] | x 1
                        // console.log(tmp.length, tmp, dChk, dNextChk);
                        tmp = [{
                            pos: i, 
                            val: dChk
                        },{
                            pos: i+1,
                            val: dNextChk
                        }];
                        console.log("add 2");
                    }else{  
                        // console.log(tmp.length, tmp, dChk, dNextChk);
                        var tmpNum = tmp.filter((dt)=>{return dt.val !== SPECIAL_TYPE});                       

                        if (tmpNum.length <= 0){ // [ x x] | 1 1 
                            // console.log("tmpNum.length <= 0", tmpNum)    
                            tmp.push({
                                pos: i+1,
                                val: dNextChk
                            }); 
                            // console.log("add 1");
                        }else{   // [1 x ] x x true, [x 1 ] 1 1                             
                            var tmpNumber = tmpNum[0].val;
                            // console.log("tmpNum.length > 0");
                            if (dChk === SPECIAL_TYPE && dNextChk === SPECIAL_TYPE){ // [1 x] x x 
                                tmp.push({
                                    pos: i+1,
                                    val: dNextChk
                                });
                                // console.log("add 1 // [1 x] x x ");
                            }
                            else if (dChk === dNextChk && tmpNumber === dChk){ // [x 1] 1 1, 
                                tmp.push({
                                    pos: i+1,
                                    val: dNextChk
                                });
                                // console.log("add 1 // [x 1] 1 1");
                            }
                            else if (dChk === SPECIAL_TYPE){ // [1 x] x                                                                
                                if (tmpNumber === dNextChk){ // [1 x] x 1
                                    tmp.push({
                                        pos: i+1,
                                        val: dNextChk
                                    });  
                                    // console.log("add 1 // [1 x] x 1");
                                }else{ // [0 x] x 1 
                                    if(tmp.length < 3){
                                        tmp = [{
                                            pos: i, 
                                            val: dChk
                                        },{
                                            pos: i+1,
                                            val: dNextChk
                                        }];
                                        // console.log("add 2 // [0 x] x 1")
                                    }else{
                                        // console.log("break // [0 0 x] x 1")
                                        break;
                                    }                                    
                                }
                            }
                            else if (dNextChk === SPECIAL_TYPE && tmpNumber === dChk){ // [1 x] 1 x                            
                                tmp.push({
                                    pos: i+1,
                                    val: dNextChk
                                });
                                // console.log("add 1 // [1 x] 1 x");
                                                                
                            }   
                            // console.log("end")
                        }                        
                    }

            } else {
                if (tmp.length >= 3){                    
                    stackPos = stackPos.concat(tmp);
                }
                tmp = [];
            }
        }
        if (tmp.length >= 3){     
            stackPos = stackPos.concat(tmp);
        }  
    }
    return stackPos;
}
var checkVertical = (dataSlot) => {
    var tmp = [];
    for (var i = 0; i < MAX_COL; i++){
        if ((dataSlot[0+i] === dataSlot[5+i] && dataSlot[5+i] === dataSlot[10+i] )|| 
            (dataSlot[0+i] === SPECIAL_TYPE && dataSlot[5+i] === dataSlot[10+i] ) || 
            (dataSlot[0+i] === SPECIAL_TYPE && dataSlot[10+i] === SPECIAL_TYPE ) || 
            (dataSlot[0+i] === SPECIAL_TYPE && dataSlot[5+i] === SPECIAL_TYPE ) || 
            (dataSlot[5+i] === SPECIAL_TYPE && dataSlot[0+i] === dataSlot[10+i] ) ||
            (dataSlot[5+i] === SPECIAL_TYPE && dataSlot[0+i] === SPECIAL_TYPE ) ||
            (dataSlot[5+i] === SPECIAL_TYPE && dataSlot[0+i] === SPECIAL_TYPE ) ||            
            (dataSlot[10+i] === SPECIAL_TYPE && dataSlot[0+i] === dataSlot[5+i] ) ||
            (dataSlot[10+i] === SPECIAL_TYPE && dataSlot[0+i] === SPECIAL_TYPE ) ||
            (dataSlot[10+i] === SPECIAL_TYPE && dataSlot[5+i] === SPECIAL_TYPE ) )
            {
            tmp.push(
                { pos:0+i, val:dataSlot[0+i] }, 
                { pos:5+i, val:dataSlot[0+i] }, 
                { pos:10+i, val:dataSlot[0+i] }
            );   
        }
    }
    return tmp;
}
var dataAcceptToSlotMachines = (data) => {
    var dataRuleSlot = [];

    dataRuleSlot[0] = [];
    dataRuleSlot[1] = [];
    dataRuleSlot[2] = [];
    dataRuleSlot[3] = [];
    dataRuleSlot[4] = [];

    data.forEach(e => {
        var slotNumber = e % 5;
        var numberPush = Math.floor(e/5);        
        dataRuleSlot[slotNumber].push(numberPush);

    });
    return dataRuleSlot
}  
var genData = ()=>{
    // var data = [
    //     1, 1, 3, 1, 1,
    //     1, 4, 4, 2, 2,
    //     4, 3, 3, 3, 1,
    // ]
    var data = [];
    var cntSp = 0;
    for (var i = 0; i < (MAX_COL * MAX_ROW); i++) {
        var typeId = (Math.floor(Math.random() * 10) % MAX_TYPE) + 1;
        if (Math.floor(Math.random() * 10)%10 === 1 && cntSp < 3) {
            data.push(SPECIAL_TYPE);  
            cntSp++;
        } else {
            data.push(typeId);    
        }
        
    }
    return data;
}
var splitDataToSlot = (dataSlot) => {        
    var data = [];
    for (var i=0; i< MAX_COL; i++){
        data[i] = [
            dataSlot[i],
            dataSlot[MAX_COL+i],
            dataSlot[(MAX_COL*2)+i]
        ];
    }
    return data;
}


var checkSlopDown = (data) => {
    
    var tmp = [];

    for (var i = 0; i < MAX_COL - 1; i++){

        var curCheckPos = i;
        if (curCheckPos === 2) {
            curCheckPos += 5;
        } else if(curCheckPos > 2) {
            curCheckPos += 10;
        }
        
        var nextCheckPos = i + 1;
        
        if (i === 1) {
            nextCheckPos += 5;            
        } else if (i > 1) {
            nextCheckPos += 10;
        }
        
        var dChk = data[curCheckPos];
        var dNextChk = data[nextCheckPos];
        // var dChk = dataSlot[i];  
        // var dNextChk = dataSlot[i + 1];    
        if (dChk === dNextChk || 
            dChk === SPECIAL_TYPE || 
            dNextChk === SPECIAL_TYPE){     
                if (tmp.length === 0 && (dChk === dNextChk || dChk === SPECIAL_TYPE || dNextChk === SPECIAL_TYPE)){ // [ ] | x x , [ ] | 1 x , [ ] | x 1
                    // console.log(tmp.length, tmp, dChk, dNextChk);
                    tmp = [{
                        pos: curCheckPos, 
                        val: dChk
                    },{
                        pos: nextCheckPos,
                        val: dNextChk
                    }];
                    console.log("add 2");
                }else{  
                    // console.log(tmp.length, tmp, dChk, dNextChk);
                    var tmpNum = tmp.filter((dt)=>{return dt.val !== SPECIAL_TYPE});                       

                    if (tmpNum.length <= 0){ // [ x x] | 1 1 
                        // console.log("tmpNum.length <= 0", tmpNum)    
                        tmp.push({
                            pos: nextCheckPos,
                            val: dNextChk
                        }); 
                        // console.log("add 1");
                    }else{   // [1 x ] x x true, [x 1 ] 1 1                             
                        var tmpNumber = tmpNum[0].val;
                        // console.log("tmpNum.length > 0");
                        if (dChk === SPECIAL_TYPE && dNextChk === SPECIAL_TYPE){ // [1 x] x x 
                            tmp.push({
                                pos: nextCheckPos,
                                val: dNextChk
                            });
                            // console.log("add 1 // [1 x] x x ");
                        }
                        else if (dChk === dNextChk && tmpNumber === dChk){ // [x 1] 1 1, 
                            tmp.push({
                                pos: nextCheckPos,
                                val: dNextChk
                            });
                            // console.log("add 1 // [x 1] 1 1");
                        }
                        else if (dChk === SPECIAL_TYPE){ // [1 x] x                                                                
                            if (tmpNumber === dNextChk){ // [1 x] x 1
                                tmp.push({
                                    pos: nextCheckPos,
                                    val: dNextChk
                                });  
                                // console.log("add 1 // [1 x] x 1");
                            }else{ // [0 x] x 1 
                                if(tmp.length < 3){
                                    tmp = [{
                                        pos: i, 
                                        val: dChk
                                    },{
                                        pos: nextCheckPos,
                                        val: dNextChk
                                    }];
                                    // console.log("add 2 // [0 x] x 1")
                                }else{
                                    // console.log("break // [0 0 x] x 1")
                                    break;
                                }                                    
                            }
                        }
                        else if (dNextChk === SPECIAL_TYPE && tmpNumber === dChk){ // [1 x] 1 x                            
                            tmp.push({
                                pos: nextCheckPos,
                                val: dNextChk
                            });
                            // console.log("add 1 // [1 x] 1 x");
                                                            
                        }   
                        // console.log("end")
                    }                        
                }
        }         
    }

    if (tmp.length >= 3){                    
        return tmp;
    }
    return [];
}

var checkSlopUp = (data) => {
    console.log("Slop UP")
    var tmp = [];

    for (var i = 0; i < MAX_COL - 1; i++){

        var curCheckPos = i;
        if (curCheckPos === 2) {
            curCheckPos += 5;
        } else if(curCheckPos < 2) {
            curCheckPos += 10;
        }
        
        var nextCheckPos = i + 1;
        
        if (i === 1) {
            nextCheckPos += 5;            
        } else if (i < 1) {
            nextCheckPos += 10;
        }
        
        var dChk = data[curCheckPos];
        var dNextChk = data[nextCheckPos];
        
        if (dChk === dNextChk || 
            dChk === SPECIAL_TYPE || 
            dNextChk === SPECIAL_TYPE){     
                if (tmp.length === 0 && (dChk === dNextChk || dChk === SPECIAL_TYPE || dNextChk === SPECIAL_TYPE)){ // [ ] | x x , [ ] | 1 x , [ ] | x 1
                    // console.log(tmp.length, tmp, dChk, dNextChk);
                    tmp = [{
                        pos: curCheckPos, 
                        val: dChk
                    },{
                        pos: nextCheckPos,
                        val: dNextChk
                    }];
                    console.log("add 2");
                }else{  
                    // console.log(tmp.length, tmp, dChk, dNextChk);
                    var tmpNum = tmp.filter((dt)=>{return dt.val !== SPECIAL_TYPE});                       

                    if (tmpNum.length <= 0){ // [ x x] | 1 1 
                        // console.log("tmpNum.length <= 0", tmpNum)    
                        tmp.push({
                            pos: nextCheckPos,
                            val: dNextChk
                        }); 
                        // console.log("add 1");
                    }else{   // [1 x ] x x true, [x 1 ] 1 1                             
                        var tmpNumber = tmpNum[0].val;
                        // console.log("tmpNum.length > 0");
                        if (dChk === SPECIAL_TYPE && dNextChk === SPECIAL_TYPE){ // [1 x] x x 
                            tmp.push({
                                pos: nextCheckPos,
                                val: dNextChk
                            });
                            // console.log("add 1 // [1 x] x x ");
                        }
                        else if (dChk === dNextChk && tmpNumber === dChk){ // [x 1] 1 1, 
                            tmp.push({
                                pos: nextCheckPos,
                                val: dNextChk
                            });
                            // console.log("add 1 // [x 1] 1 1");
                        }
                        else if (dChk === SPECIAL_TYPE){ // [1 x] x                                                                
                            if (tmpNumber === dNextChk){ // [1 x] x 1
                                tmp.push({
                                    pos: nextCheckPos,
                                    val: dNextChk
                                });  
                                // console.log("add 1 // [1 x] x 1");
                            }else{ // [0 x] x 1 
                                if(tmp.length < 3){
                                    tmp = [{
                                        pos: i, 
                                        val: dChk
                                    },{
                                        pos: nextCheckPos,
                                        val: dNextChk
                                    }];
                                    // console.log("add 2 // [0 x] x 1")
                                }else{
                                    // console.log("break // [0 0 x] x 1")
                                    break;
                                }                                    
                            }
                        }
                        else if (dNextChk === SPECIAL_TYPE && tmpNumber === dChk){ // [1 x] 1 x                            
                            tmp.push({
                                pos: nextCheckPos,
                                val: dNextChk
                            });
                            // console.log("add 1 // [1 x] 1 x");
                                                            
                        }   
                        // console.log("end")
                    }                        
                }
        }         
    
    }

    if (tmp.length >= 3){                    
        return tmp;
    }
    return [];
}
var checkSlopeFive = (data) => {
    
    var respDown = checkSlopDown(data);
    if (respDown.length > 0){
        return respDown;
    }
    var respUp = checkSlopUp(data);
    if (respUp.length > 0){
        return respUp;
    }
    return [];
}

var Logic = {
    checkDirectLine,
    checkVertical,
    checkSlopeFive,
    dataAcceptToSlotMachines, 
    genData,
    splitDataToSlot,    
    checkDataRule(data){
        var dataCheck = checkDirectLine(data);
        return dataCheck;
    }     
}
export {Logic}
