
var app = {
    // Application Constructor
    initialize: function() {
    
            var qsParm = new Array();
                document.addEventListener("deviceready", app.onDeviceReady, false);

                //function onDeviceReady() {
                //    document.addEventListener("backbutton", onBackKeyDown, false);
                //    $("#txtuuid").val(device.uuid);
                //    $("#hiduuid").val(device.uuid);
                //    window.plugins.imeiplugin.getImei(callback);                    
                //    if($("#txtimei").val() == "")$("#txtimei").val(device.uuid);
                //    if($('#hidimei').val() == "")$("#hidimei").val($("#hiduuid").val());
                //}
                function callback(imei) {
                    $("#txtimei").val(imei);
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
                $(document).ready(function () {
                   
                    $("#loading").hide();
                    qs();
                    //GetDeviceStatus();

                    $("#home").click(function () {
                        $.ajax({
                            type: "GET",
                       // url: "http://apps.kpcl.com/KPCTSDS/api/Account/GetUserScreens/" + $("#hidusrid").val(),
                        url: "http://202.83.27.199/KPCTSDS/api/Account/GetUserScreens/" + $("#hidusrid").val(),
                        //url: "http://182.72.244.25/KPCTSDS/api/Account/GetUserScreens/" + $("#hidusrid").val(),
                            data: '{}',
                            contentType: "application/json",
                            success: function(result) {
                                window.location.href = result + '?user=' + btoa($("#hidusrid").val());
                            }
                        });
                    });

                    $("#btnSubmit").click(function (){
                        var _loctype = $("#selLocType option:selected").val();
                        if(_loctype == 0) {
                            $("#selLocType").focus();
                            alert('Please Select Location Type.');
                            return false;
                        }
                        else {
                            $(this).find("i.fa").attr('class', 'fa fa-spinner fa-spin');
                            $(this).find("span").text(" device is registering please wait...");
                            $(this).attr('disabled', true);
                            $(this).attr('class', 'btn btn-custom-icon');
                            $("#loading").show();
                            var Adddata = {};
                            Adddata.IMEI = $("#txtimei").val();
                            Adddata.UUID = $("#txtuuid").val();
                            Adddata.LocationType = _loctype;
                            Adddata.User = 'admin';
                            $.ajax({
                                type: 'POST',
                         //       url: 'http://apps.kpcl.com/KPCTSDS/api/Account/RegisterDevice',
                        url: 'http://202.83.27.199/KPCTSDS/api/Account/RegisterDevice',
                        //url: 'http://182.72.244.25/KPCTSDS/api/Account/RegisterDevice',
                                dataType: "json",
                                data: Adddata,
                                success: function (loctyperesult) {
                                    alert('Device Registered Successfully');
                                },
                                error: function (xhr, status, error) {
                                    $("#btnSubmit").prop('disabled', false);
                                    alert('Error Occurred while Registring device.\n\r' + xhr.responseText);
                                }
                            });
                        }
                        $(this).find("i.fa").attr('class', 'fa fa-check');
                        $(this).find("span").text(" Submit");
                        $(this).attr('disabled', false);
                        $(this).attr('class', 'btn btn-custom');
                        $("#loading").hide();
                    });
                });

                function GetDeviceStatus(){
                    var Adddata = {};
                    Adddata.IMEI = $("#txtimei").val();
                    Adddata.UUID = $("#txtuuid").val();
                    $.ajax({
                        type: "POST",
                     //   url: "http://apps.kpcl.com/KPCTSDS/api/Account/GetDeviceStatus",
                    url: "http://202.83.27.199/KPCTSDS/api/Account/GetDeviceStatus",
                    //url: "http://182.72.244.25/KPCTSDS/api/Account/GetDeviceStatus",
                        dataType: "json",
                        data: Adddata,
                        success: function (result) {
                            $("#selLocType").empty();
                            if (result != null) {
                                $("#selLocType").append($("<option></option>").val(result).html(result));
                                $("#btnSubmit").prop('disabled', true);
                                $("#btnSubmit").html("Device already Registered.");
                            }
                            else {
                                $("#btnSubmit").prop('disabled', false);
                                $.ajax({
                                    type: "GET",
                                    contentType: "application/json; charset=utf-8",
                                   // url: 'http://apps.kpcl.com/KPCTSDS/api/Location/GetLocationType/',
                            url: 'http://202.83.27.199/KPCTSDS/api/Location/GetLocationType/',
                            //url: 'http://182.72.244.25/KPCTSDS/api/Location/GetLocationType/',
                                    dataType: "json",
                                    data: '{}',
                                    async: false,
                                    success: function (loctyperesult) {
                                        $("#selLocType").append($("<option></option>").val('0').html('Select'));
                                        $("#selLocType").append($("<option></option>").val('PARKING').html('PARKING'));
                                        $.each(loctyperesult, function (key, value) {
                                            $("#selLocType").append($("<option></option>").val(value.LocationType).html(value.LocationType));
                                        });
                                    },
                                    error: function () {
                                        alert('Error Occurred while getting Device Status');
                                    }
                                });
                            }
                        },
                        error: function () {
                            alert('Error Occurred while getting Device Status');
                        }
                    });
                }

    },
    onDeviceReady: function(){debugger;
        console.log('deviceready');   
       // var p= document.querySelector('#device p');
       // p.innerHTML = device.cordova +'<br/>'+
       //         device.platform +'<br/>'+
       //         device.name +'<br/>'+
       //         device.uuid +'<br/>'+
       //         device.version +'<br/>'+
       //         device.manufacturer +'<br/>'+
       //         device.isVirtual +'<br/>'+
       //         device.serial +'<br/>';
                $("#hiduuid").val(device.uuid);
                $("#txtuuid").val(device.uuid);
               // window.plugins.imeiplugin.getImei(callback); 
                if($("#txtimei").val() == "")$("#txtimei").val(device.uuid);
               if($('#hidimei').val() == "")$("#hidimei").val(device.uuid);
    }
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