empty_cell_start = '<img src="tiles/type-0/000.svg" '
empty_cell_end = ' />'

original_cell_width = 97
original_cell_height = 84

hex_id = 0
function create_row(amount){
    cell = ""
    for(var x = 0; x!=amount;x++){
        to_left = calculate_hex_sides(cell_width, cell_height)
        cell += "<span class='hex_wrapper' style='display:inline-block; padding-left:"+to_left+"'>" + empty_cell_start + "id='hex_"+(hex_id++) + "' class='hex svg' style='';" + empty_cell_end + "</span>"
        // console.log(hex_id)
    }
    return cell
}

function generate_grid(radius, scale){

    cell_width = original_cell_width * scale
    cell_height = original_cell_height * scale

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

    // $('.hex_wrapper').click(function() {
    //     hex_onclick(this)
    // });
    $('.hex').click(function(e) {
        
        hex_onclick(this)
    });
    $('.hex').attr('onclick', 'top.hex_onclick(this)')

    // $(".hex").droppable({
    //    hoverClass: 'ui-state-hover',        
    //    helper: 'clone',        
    //    cursor: 'move',      
    //    tolerance: "fit",
    //     drop: function(event, ui) {            
    //        console.log("taking")
    //        console.log(this)
    //        console.log((ui.draggable))
    //        $(this).attr("src",(ui.draggable).attr("src"))
    //     } 
    // });  

    img2svg(cell_width, cell_height)



}


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