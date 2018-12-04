
$(function(){
    var A = parseInt($('#input_div').width(), 10),
        B = parseInt($('#earth_div').width(), 10),
        Z = parseInt($('#Border').width(), 10),
        minw = parseInt((A + B + Z) * 10 / 100, 10),
        offset = $('#container').offset(),
        splitter = function(event, ui){
            var aw = parseInt(ui.position.left),
                bw = A + B - aw;
            //set widths and information...
            $('#input_div').css({width : aw}).children();
            $('#earth_div').css({width : bw}).children();
        };
    $('#Border').draggable({
        axis : 'x',
        containment : [
            offset.left + minw,
            offset.top,
            offset.left + A + B - minw,
            offset.top + $('#container').height()
        ],
        drag : splitter
    });
    //information...

});