
var app = {
    // Application Constructor
    initialize: function() {
    
        var qsParm = new Array();
        var loc = "", cargo = "", weather = "", hndledcomp = "", hndledtype = "", total = 0, operation = "", container = "";
        function save()
        {
            $("#test").data("jqScribble").save(function(imageData)
            {
                if(confirm("Please check once again before submitting."))
                {
                    $.ajax({
                        type: 'POST',
                url: 'http://apps.kpcl.com/KPCTSDS/api/TallySheet/UploadSign/' + $("#hidusrid").val(),
                        //url: 'http://202.83.27.199/KPCTSDS/api/TallySheet/UploadSign/' + $("#hidusrid").val(),
                //url: 'http://182.72.244.25/KPCTSDS/api/TallySheet/UploadSign/' + $("#hidusrid").val(),
                        data: { ImageData: imageData },
                        dataType: "json",
                        success: function (result) {
                            window.location.href = 'TallySheet.html?user=' + btoa($("#hidusrid").val()) + '&trkid=' + btoa($("#hidtrkid").val()) + '&trkno=' + btoa($("#hidtruckno").val()) + '&loctype=' + btoa($("#hidloctype").val()) + '&sign=' + btoa("http://202.83.27.199/KPCTSDS/Upload/" + result) + '&loc=' + loc + '&cargo=' + cargo + '&weather=' + weather + '&hndledcomp=' + hndledcomp + '&hndledtype=' + hndledtype + '&container=' + btoa(container) + '&operation=' + operation;
                        },
                        error: function (xhr, status, error) {
                            alert('Error occurred while saving the data.\n\r' + xhr.responseText);
                        }
                    });
                }
            });
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
    
            if (parms.length > 0 && query != "") {
                $("#hidusrid").val(atob(qsParm["user"]));
                $("#hidtrkid").val(atob(qsParm["trkid"]));
                $("#hidtruckno").val(atob(qsParm["trkno"]));
                $("#hidloctype").val(atob(qsParm["loctype"]));
                loc = qsParm["loc"];
                cargo = qsParm["cargo"];
                weather = qsParm["weather"];
                hndledcomp = qsParm["hndledcomp"];
                hndledtype = qsParm["hndledtype"];
                operation = qsParm["operation"];
                container = atob(qsParm["container"]);
                return true;
            }
            else {
                window.location.href = 'Login.html';
                return false;
            }
        }
        $(document).ready(function()
        {
            qs();
            $("#test").jqScribble();
            $("#btnClear").click(function(){
                window.location.href = 'Capture.html?user=' + btoa($("#hidusrid").val()) + '&trkid=' + btoa($("#hidTruckId").val()) + '&trkno=' + btoa($("#hidtruckno").val()) + '&loctype=' + btoa($("#hidloctype").val()) + '&loc=' + loc + '&cargo=' + cargo + '&weather=' + weather + '&hndledcomp=' + hndledcomp + '&hndledtype=' + hndledtype + '&container=' + btoa($("#txtcontainerno").val()) + '&operation=' + operation;
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