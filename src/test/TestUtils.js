// ----------------------------------------------
// https://stackoverflow.com/questions/7837456/how-to-compare-arrays-in-javascript
// ----------------------------------------------
Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time 
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;       
        }           
        else if (this[i] != array[i]) { 
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;   
        }           
    }       
    return true;
}
// --------------

var txtLabel = "";
var describe = function(str, fn){
    txtLabel = str;
    fn();
}
var assert = {
    equal(val1, val2){
        var txt = txtLabel + "\n";
        if((typeof (val1) == "object" 
                && Array.isArray(val1) 
                && val1.equals(val2))
            || (val1 === val2)){
            txt += "[✓] success";
            console.log(txt);
        }else{
            txt += "%c[x] fails"
            txt += "\n val1: " + val1 +", val2: " +val2;
            console.log(txt, "color:red");
        }
    },
    notEqual(val1, val2){
        var txt = txtLabel + "\n";
        if((typeof (val1) == "object" 
                && Array.isArray(val1) 
                && val1.equals(val2))
            || val1!==val2){
                txt += "[✓] success";
                console.log(txt);   
        }else{
            txt += "%c[x] fails"
            txt += "\n val1: " + val1 +", val2: " +val2;
            console.log(txt, "color:red");  
        }
        console.log(txt);       
    }
}


export{describe, assert}