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
            if(dChk === dataSlot[i + 1]){
                if(tmp.length === 0){
                    tmp.push(i);
                }
                tmp.push(i+1);                ;
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
            tmp.push(0+i, 5+i, 10+i);   

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
        var slotNumber = e%5;
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
    for(var i = 0; i < (MAX_COL * MAX_ROW); i++){
        var typeId = (Math.floor(Math.random() * 10) % MAX_TYPE) + 1;
        data.push(typeId);
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
var Logic = {
    checkDirectLine,
    checkVertical,
    dataAcceptToSlotMachines, 
    genData,
    splitDataToSlot,
    checkDataRule(){

    }
     
}
export {Logic}
