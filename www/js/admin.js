
var app = {
    // Application Constructor
    initialize: function() {
    
        var qsParm = new Array();
        document.addEventListener("deviceready", onDeviceReady, false);
        function onDeviceReady() {
            document.addEventListener("backbutton", onBackKeyDown, false);
        }
        function onBackKeyDown() {
        }
        function qs() {
            var query = window.location.search.substring(1);
            var parms = query.split('&');
            for (var i = 0; i < parms.length; i++) {
                var pos = parms[i].indexOf('=');
                if (pos > 0) {
                    var key = parms[i].substring(0, pos);
                    var val = parms[i].substring(pos + 1);
                    qsParm[key] = val;
                }
            }
            if (parms.length > 0) {
                $("#hidusrid").val(atob(qsParm["user"]));
                return true;
            }
            else {
                window.location.href = 'Login.html';
                return false;
            }
        }
        $(document).ready(function(){
            qs();
            $("#loading").hide();
            $(".box1").click(function(){
                $("#loading").show();
                window.location.href = 'RegDevice.html?user=' + btoa($("#hidusrid").val()) + '';
            });
            $(".box2").click(function(){
                $("#loading").show();
                window.location.href = 'StageMapping.html?user=' + btoa($("#hidusrid").val()) + '';
            });
            $(".box3").click(function(){
                $("#loading").show();
                window.location.href = 'SDS.html?user=' + btoa($("#hidusrid").val()) + '';
            });
        });   
    },
};

app.initialize();

// based on https://gist.github.com/miguelmota/5b67e03845d840c949c4
function randomDate(start, end) {
    var date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    
    var dat = date.getDate();
    var month = date.getMonth() + 1;
    var yr = date.getFullYear();
    
    return yr + "-" + month + "-" + dat;
}