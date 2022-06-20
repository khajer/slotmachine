const MAX_COL = 5;
const MAX_TYPE = 4;
const MAX_ROW = 3;

const SPECIAL_TYPE = -10;

var getTypeValue = (val) => {
    if (val === SPECIAL_TYPE){
        return 3;
    }
    return 1;
}
var calcPoint = (arData, bid) => {    
    
    var spPoint = 0;
    const cntData = arData.reduce(( result, curr, currIdx, ar) => {        
        var dataFound = result.find(e => e.num === curr.val || curr.val === SPECIAL_TYPE);
        if (dataFound){         
            dataFound.cnt += 1 + spPoint;
            spPoint = 0;
        } else {
            if(curr.val === SPECIAL_TYPE){
                if (currIdx !== ar.length - 1){
                    spPoint += 1;
                }else{
                    result.push({
                        num: curr.val,
                        cnt: 1+ spPoint
                    })
                    spPoint = 0;
                }                
            }else{                
                result.push({
                    num: curr.val,
                    cnt: 1+ spPoint
                })
                spPoint = 0;
            }                        
        }
        return result;
    }, []);
    
    var point = cntData.reduce( (total, curr) =>{        
        var fac = 1;   
        var typeValue = getTypeValue(curr.num);     
        if (curr.cnt > 3 && curr.cnt < 6){
            fac = 1.5;
        }else if (curr.cnt > 6) {
            fac = 2;
        }
        return total += curr.cnt * fac * typeValue;
    }, 0);

    return point;
}
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
                        // console.log("add 2");
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
                    stackPos.push(tmp);
                }
                tmp = [];
            }
        }
        if (tmp.length >= 3){     
            stackPos.push(tmp);
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


var checkSlop = (data, direction) => {
    
    var tmp = [];

    for (var i = 0; i < MAX_COL - 1; i++){
        var curCheckPos = i;
        var nextCheckPos = i + 1;

        if (curCheckPos === 2){
            curCheckPos += 5;
        }else if ((direction ==="up" && curCheckPos < 2) || (direction !=="up" && curCheckPos > 2)){
            curCheckPos += 10;
        }

        if(i === 1){
            nextCheckPos += 5;
        }else if ((direction ==="up" && i < 1) || (direction !=="up" && i > 1)){
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
                // console.log("add 2");
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
    
    var respDown = checkSlop(data, "down");
    var respUp = checkSlop(data, "up");
    if (respDown.length > respUp.length){
        return respDown;
    }else{
        return respUp;
    }

}

var checkDataRule = (data) => {
    var dataChkDirect = checkDirectLine(data);
    var dataChkSlop = checkSlopeFive(data);
    if ( dataChkSlop.length > dataChkDirect.length){
        return dataChkSlop;
    }
    
    return dataChkDirect;
}  

var Logic = {
    checkDirectLine,
    checkVertical,
    checkSlopeFive,
    dataAcceptToSlotMachines, 
    genData,
    splitDataToSlot,
    checkDataRule,
    calcPoint   
}
export {Logic}
