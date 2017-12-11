$(document).ready(function(){
    $(document).keydown(function( event ){
        if (!event.repeat){
            if (event.keyCode == 103){ // numpad 7
                sendData("L1");
            }
            if (event.keyCode == 105){ // numpad 9
                sendData("L3");
            }
        }
    });

    $(document).keyup(function( event ){
        if (event.keyCode == 103){ // numpad 7
            sendData("L0");
        }
        if (event.keyCode == 105){ // numpad 9
            sendData("L2");
        }
    });
});

sendData = function(data){
    $.ajax({
        type: "POST",
        url: "/send",
        contentType: 'application/json',
        data: JSON.stringify({
            "command": data
        })
    })
};
