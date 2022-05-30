const MAX_COL = 5;
const MAX_TYPE = 4;
const MAX_ROW = 3;

var checkDirectLine = (dataSlot)=>{
    var tmp = [];
    var seq = 0;
    var stackPos = [];
    for(var row = 0; row < 3; row++){
        tmp = [];
        seq = MAX_COL * row;
        var maxCheck = MAX_COL * (row+1);
        for(var i = seq; i < maxCheck-1; i++){            
            var dChk = dataSlot[i];
            if(dChk === dataSlot[i + 1] || dChk === -10 || dataSlot[i + 1] === -10){                
                    if(tmp.length === 0){
                        tmp.push({
                            pos: i, 
                            val: dChk
                        })
                        tmp.push({
                            pos: i+1,
                            val: dataSlot[i + 1]
                        });
                    }else{
                        if(dataSlot[i + 1] === tmp[0].val || dataSlot[i + 1] === -10 || tmp[0].val === -10 ){
                            tmp.push({
                                pos: i+1,
                                val: dataSlot[i + 1]
                            });                                                  
                        }else{
                            tmp = [];
                            tmp.push({
                                pos: i, 
                                val: dChk
                            })
                            tmp.push({
                                pos: i+1,
                                val: dataSlot[i + 1]
                            });
                        }                   
                    }
                    
            }else{
                if(tmp.length >= 3){                    
                    stackPos = stackPos.concat(tmp);
                }
                tmp = [];
            }
        }
        if(tmp.length >= 3){     
            stackPos = stackPos.concat(tmp);
        }  
    }
    return stackPos;
}
var checkVertical = (dataSlot) => {
    var tmp = [];
    for(var i = 0; i < MAX_COL; i++){
        if(dataSlot[0+i] === dataSlot[5+i] && dataSlot[5+i] === dataSlot[10+i]){
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
    for(var i = 0; i < (MAX_COL * MAX_ROW); i++){
        var typeId = (Math.floor(Math.random() * 10) % MAX_TYPE) + 1;
        if(Math.floor(Math.random() * 10)%10 === 1 && cntSp < 3){
            data.push(-10);  
            cntSp++;
        }else{
            data.push(typeId);    
        }
        
    }
    return data;
}
var splitDataToSlot = (dataSlot) => {        
    var data = [];
    for(var i=0; i< MAX_COL; i++){
        data[i] = [
            dataSlot[i],
            dataSlot[MAX_COL+i],
            dataSlot[(MAX_COL*2)+i]
        ];
    }
    return data;
}
var checkSlopeFive = (data) => {
    var dataResp = [];
    if(data[0] === data[1] 
        && data[0] === data[7]
        && data[0] === data[13]
        && data[0] === data[14]){
            return [
                { pos:0, val: data[0] }, 
                { pos:1, val: data[0] }, 
                { pos:7, val: data[0] }, 
                { pos:13, val: data[0] }, 
                { pos:14, val: data[0] }
            ];

    }

    if(data[10] === data[11] 
        && data[10] === data[7]
        && data[10] === data[3]
        && data[10] === data[4]){
            return [
                { pos:10, val: data[0] }, 
                { pos:11, val: data[0] }, 
                { pos:7, val: data[0] }, 
                { pos:3, val: data[0] }, 
                { pos:4, val: data[0] }
            ];

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
