empty_cell_start = '<img src="tiles/type-0/000.svg" '
empty_cell_end = ' />'

cell_width = 97
cell_height = 84

function dip(num){
    $('.dip-select').hide()
    $('.dip'+num).show()
}

function enable_dip(){
  $(".dip").draggable({
    helper: "clone",
    cursor: 'move',
    zIndex: 10000,
    stop: function (ev, ui) {
            console.log("Released")
        }
  });
  $(".dip-select").draggable({
    helper: "clone",
    cursor: 'move',
    zIndex: 10000,
    stop: function (ev, ui) {
            console.log("Released")
        }
  });
}

function hex_onclick(that){
    console.log("clicked.", that.id)
    console.log("clicked -" )
    console.log($("#"+that.id))
    
    if (isNaN($(that).attr("v"))){
        console.log("Rotated")
        v = 60
        $(that).attr("v", 60);
    }else{
        v += 60
        console.log(v)
        $(that).attr("v", 60);
    }

    a = $("#"+that.id)
    a.rotate({
        // center: ["98px", "42px"],
        center: ["50%", "50%"],
        angle:v
    })
    // a.click(function() {
    //     hex_onclick(this)
    // });
    $(".hex").droppable({
           hoverClass: 'ui-state-hover',        
           helper: 'clone',        
           cursor: 'move',      
           tolerance: "fit",
            drop: function(event, ui) {            
               console.log("Dropped on area")
               $(this).attr("src",(ui.draggable).attr("src"))
               window.setTimeout(function(){
                lock = false
                })
            } 
        });  
}

$( document ).ready(function() {
    enable_dip()
});


function calculate_hex_sides(w, h){
    // 
    //       __A__
    //     B/\   /\C
    //     /  \ /  \
    //     \       /
    //     D\_____/E
    //         F
    // Width = W
    // Height = H 
    //
    // Equilateral Triangle - Same length. Width is two edges.
    // Length of any A-F = W/2
    len_A = w/2
    // 
    // Equilateral Triangle A - Base (a) = W/2
    //                        - P-Height (b) = H/2. 
    // Ratio is 2:sqrt(b) 
    // 
    // Therefore, Length of any A-F = sqrt(b)/2
    len_A = Math.sqrt(h/2) / 2
    //
    // Desired length is (Width - A_Width) / 2
    // (width - (sqrt(H/2)/2) ) /2
    return (w - len_A )/2 + 3  // + Adjustment TODO: Figure out a good way to do this
}

hex_id = 0
function create_row(amount){
    cell = ""
    for(var x = 0; x!=amount;x++){
        to_left = calculate_hex_sides(cell_width, cell_height)
        cell += "<span style='display:inline-block; padding-left:"+to_left+"'>" + empty_cell_start + "id='hex_"+(hex_id++) + "' class='hex' style='';" + empty_cell_end + "</span>"
        console.log(hex_id)
    }
    return cell
}

function generate_grid(radius){
    //TODO: Expand to x,y
    $("#grid").empty()
    radius = parseInt(radius)
    if (radius <= 1){
        return
    }
    
    row_count = 0
    offset_to_above = -cell_height/2 // + Adjustment TODO: Figure out a good way to do this

    to_left = calculate_hex_sides(cell_width, cell_height)
    left_amount = cell_width + to_left

    get_offset_to_previous = function(val){
        return val/2 
    }

    //Spread
    for(var r = 1; r!=radius+1;r++){
        offset = left_amount * (radius-r)

        style = 'padding-left: ' + get_offset_to_previous(offset)  + 'px;'
        style += "position: relative;top: "  + offset_to_above * row_count++ +";"
        var row = "<div style='"+style+"';>"
        row += create_row(r)
        row += "</div>"
        $(row).css("color","green")
        $("#grid").append(row)
    }
    //Repeat
    for(var r = 0; r != radius - 2;r++){    // -2 for top and bottom
        offset = left_amount
        style = 'padding-left: ' + get_offset_to_previous(offset)  + 'px;'
        style += "position: relative;top: "  + offset_to_above * row_count++ +";"
        var row = "<div style='"+style+"';>"
        row += create_row(radius - 1)
        offset = 0
        style = 'padding-left: ' + get_offset_to_previous(offset)  + 'px;'
        style += "position: relative;top: "  + offset_to_above * row_count++ +";"
        row += "</div><div style='"+style+"';>"
        row += create_row(radius)

        row += "</div>"
        $("#grid").append(row)
    }

    //Connect
    offset = left_amount
    style = 'padding-left: ' + get_offset_to_previous(offset)  + 'px;'
    style += "position: relative;top: "  + offset_to_above * row_count++ +";"
    var row = "<div style='"+style+"';>"
    row += create_row(radius - 1)
    row += "</div>"
    $("#grid").append(row)

    //Collapse
    for(var r = radius; r!=0;r--){
        offset = left_amount * (radius-r)
        style = 'padding-left: ' + get_offset_to_previous(offset)  + 'px;'
        style += "position: relative;top: "  + offset_to_above * row_count++ +";"
        var row = "<div style='"+style+"';>"
        row += create_row(r)
        row += "</div>"
        $("#grid").append(row)
    }

    $('.hex').click(function() {
        hex_onclick(this)
    });

    $(".hex").droppable({
       hoverClass: 'ui-state-hover',        
       helper: 'clone',        
       cursor: 'move',      
       tolerance: "fit",
        drop: function(event, ui) {            
           console.log("taking")
           // if (lock == false){
           //   lock = true
           // }else{
           //  return
           // }
           $(this).attr("src",(ui.draggable).attr("src"))
           window.setTimeout(function(){
            lock = false
            })
        } 
    });  
}
var lock = false