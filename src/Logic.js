const MAX_COL = 5;
const MAX_TYPE = 4;
const MAX_ROW = 3;

var checkDirectLine = (dataSlot)=>{
    var tmp = [];
    var seq=0;
    var stackPos = [];
    for(var row = 0; row < 3; row++){     
        tmp = [];       
        seq = MAX_COL * row;
        var maxCheck = MAX_COL * (row+1);
        while(tmp.length === 0 && seq < maxCheck){
            var dChk = dataSlot[seq];
            for(var j=seq+1; j< maxCheck; j++){
                if(dChk === dataSlot[j]){                  
                    if(tmp.length === 0){
                        tmp.push(seq);
                    }
                    tmp.push(j);
                }else{
                    break;
                }
            }
            seq++;
        }            
        if(tmp.length >= 3){     
            stackPos = stackPos.concat(tmp);
        }            
    }
    return stackPos;
}
var Logic = {
    checkDataRule(dataSlot){
        var stackPos = [];
        stackPos = checkDirectLine(dataSlot);
        return stackPos;
    },
    genData(){
        var data = [
            1, 1, 3, 1, 1,
            1, 4, 4, 2, 2,
            4, 3, 3, 3, 1,
        ]
        // var data = [];
        // for(var i = 0; i < (MAX_COL * MAX_ROW); i++){
        //     var typeId = (Math.floor(Math.random() * 10) % MAX_TYPE) + 1;
        //     data.push(typeId);
        // }
        return data;
    },
    splitDataToSlot(dataSlot){        
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
}

export {Logic}
