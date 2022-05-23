var txtLabel = "";
var describe = function(str, fn){
    txtLabel = str;
    fn();
}
var assert = {
    equal(val1, val2){
        var txt = txtLabel + ": [";
        if(val1 === val2) {
            txt += "✓] success"
        }else{
            txt += "x] fails"
        }
        console.log(txt);
    },
    notEqual(val1, val2){
        var txt = txtLabel + ": [";
        if(val1 !== val2) {
            txt += "✓] success"
        }else{
            txt += "x] fails"
        }
        console.log(txt);
    }
}
export{describe, assert}