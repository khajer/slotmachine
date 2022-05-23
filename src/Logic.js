const MAX_COL = 5;
const MAX_TYPE = 4;
const MAX_ROW = 3;

var Logic = {
    checkDataRule(dataSlot){

        var dataResult = [];
        var cnt = 0;
        if(dataSlot[0] === dataSlot[1] && dataSlot[0] === dataSlot[2] && dataSlot[0] === dataSlot[3] && dataSlot[0] === dataSlot[4]){
            cnt = 5;
            dataResult = [0, 1, 2, 3, 4]
        }
        else if(dataSlot[0] === dataSlot[1] && dataSlot[0] === dataSlot[2] && dataSlot[0] === dataSlot[3]){
            cnt = 4;
            dataResult = [0, 1, 2, 3];
        }
        else if(dataSlot[0] === dataSlot[1] && dataSlot[0] === dataSlot[2]){
            cnt = 3;
            dataResult = [0, 1, 2];
        }

        if(dataSlot[1] === dataSlot[2] && dataSlot[1] === dataSlot[3] && dataSlot[1] === dataSlot[4]){
            cnt = 4;
            dataResult = [1, 2, 3, 4];
        }
        else if(dataSlot[1] === dataSlot[2] && dataSlot[1] === dataSlot[3]){
            cnt = 3;
            dataResult = [1, 2, 3];
        }

        if(dataSlot[2] === dataSlot[3] && dataSlot[2] === dataSlot[4]){
            cnt = 3;
            dataResult = [2, 3, 4];
        }
    
        var data = [];
        data[0] = [0];
        data[1] = [0];
        data[2] = [0];

        return data;
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
