

var app = {
    // Application Constructor
    initialize: function() {
		document.addEventListener('deviceready', app.onDeviceReady, false);
		//function onDeviceReady() {
        //    document.addEventListener("backbutton", onBackKeyDown, false);
        //    $("#hiduuid").val(device.uuid);
        //    window.plugins.imeiplugin.getImei(callback);       
        //    alert($("#hidimei").val() + ","+$("#hiduuid").val());     
        // }
        var url = "";
		function onBackKeyDown() {
			var state = confirm('Are You Sure you want to Exit.');
			if (state)
				navigator.app.exitApp(); // exit the app
		}
        function callback(imei) {
            $("#hidimei").val(imei);
        }
		$(document).ready(function() {
            //$("#hiduuid").val(device.uuid);
            //window.plugins.imeiplugin.getImei(callback);       
            //alert($("#hidimei").val() + ","+$("#hiduuid").val()); 
        $("#txtusername").focus();
        $("#btnSubmit").click(function() {
            var $btn = $("#btnSubmit");alert($("#hidimei").val() + ","+$("#hiduuid").val()); 
            if ($("#txtusername").val() == "") {
                alert('Enter User Name.');
                $("#txtusername").focus();
                return false;
            } else if ($("#txtpassword").val() == "") {
                alert('Enter Password.');
                $("#txtpassword").focus();
                return false;
            } else {
                //$btn.find("i.fa").attr('class', 'fa fa-spinner fa-spin fa-lg');
                //$btn.find("span").text("logging in please wait...");
                $btn.attr('disabled', true);
                //$btn.attr('class', 'btn btn-custom-icon');
                $("#txtusername").attr('disabled', true);
				$("#txtpassword").attr('disabled', true);
                alert("Ajax Call-1");
                $.ajax({
                    type: "GET",
                    url: "http://apps.kpcl.com/KPCTSDS/api/Account/ValidateUser/" + $("#txtusername").val().trim() + "/" + $("#txtpassword").val(),
		            data: '{}',
                    contentType: "application/json",
                    success: function(data) {   
                        if (data[1] == 'True' || data[1] == 'TRUE') {
							$("#hidusrid").val(data[0]);
							
                            $.ajax({
									type: "GET",
									url: "http://apps.kpcl.com/KPCTSDS/api/Account/GetUserScreens/" + $("#hidusrid").val(),
									data: '{}',
									contentType: "application/json",
									success: function(result) {   
                                    window.location.href = result + '?user=' + btoa($("#hidusrid").val());
                                }
                            });
                        } else {
                            //$btn.find("i.fa").attr('class', 'fa fa-sign-in fa-lg');
                            //$btn.find("span").text("Login");
                            $btn.attr('disabled', false);
                            //$btn.attr('class', 'btn btn-custom');
                            $("#txtusername").attr('disabled', false);
                            $("#txtpassword").attr('disabled', false);
                            $("#txtpassword").val("");
							$("#txtusername").focus();							
                            alert("Invalid User Name or Password.");
                        }
                    },
                    error: function() {
                        //$btn.find("i.fa").attr('class', 'fa fa-sign-in fa-lg');
                        //$btn.find("span").text("Login");
                        $btn.attr('disabled', false);
                        //$btn.attr('class', 'btn btn-custom');
                        $("#txtusername").attr('disabled', false);
                        $("#txtpassword").attr('disabled', false);
                        $("#txtpassword").val("");
						$("#txtusername").focus();						
                        alert("Server Connection Unavailable, Please Check It.");
                    }
                });
            }
        });
    });
    },
    onDeviceReady: function(){
        console.log('deviceready');
        var p= document.querySelector('#device p');
        p.innerHTML = device.cordova +'<br/>'+
                device.platform +'<br/>'+
                device.name +'<br/>'+
                device.uuid +'<br/>'+
                device.version +'<br/>'+
                device.manufacturer +'<br/>'+
                device.isVirtual +'<br/>'+
                device.serial +'<br/>';
                $("#hiduuid").val(device.uuid);

                window.plugins.imeiGetter.get(function(imei){
                    console.log(imei);$("#hidimei").val(imei);
                    p.innerHTML =imei;
                 }, function(){
                    console.error("Oh... :(");
                 });
    }
};

app.initialize();
















(function ($) {
    "use strict";

    /*==================================================================
    [ Focus Contact2 ]*/
    $('.input100').each(function(){
        $(this).on('blur', function(){
            if($(this).val().trim() != "") {
                $(this).addClass('has-val');
            }
            else {
                $(this).removeClass('has-val');
            }
        })    
    })

    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit',function(){
        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }

        return check;
    });


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });

    function validate (input) {
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if($(input).val().trim() == ''){
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }
    

})(jQuery);