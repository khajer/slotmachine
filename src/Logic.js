const MAX_COL = 5;
const MAX_TYPE = 4;
const MAX_ROW = 3;

var Logic = {
    checkDataRule(){
        var data = [];
        data[0] = [0];
        data[1] = [0];
        data[2] = [0];

        return data;
    },
    genData(){
        // var data = [
        //     1, 1, 1, 1, 1,
        //     2, 2, 2, 2, 2,
        //     1, 3, 3, 3, 1,
        // ]
        var data = [];
        for(var i = 0; i < (MAX_COL * MAX_ROW); i++){
            var typeId = (Math.floor(Math.random() * 10) % MAX_TYPE) + 1;
            data.push(typeId);
        }
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