const MAX_COL = 5;
const MAX_TYPE = 4;
const MAX_ROW = 3;

var Logic = {
    checkDataRule(dataSlot){
        var tmp = [];
        var seq=0;
        

        for(var row = 0; row < 3; row++){
            tmp = [];
            seq = 0;
            while(tmp.length === 0 && seq < 5){
                var dChk = dataSlot[seq];
                for(var j=seq+1; j< 5; j++){
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
        }
        

        if(tmp.length < 3){
            tmp = [];
        }

        return tmp;
    },
    genData(){
        var data = [
            1, 1, 1, 1, 1,
            2, 2, 2, 2, 2,
            1, 3, 3, 3, 1,
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
                dataSlot[(MAX_COL*2)+i], 
                dataSlot[MAX_COL+i],
                dataSlot[i]
            ];
        }
        return data;
    }  
}

export {Logic}
