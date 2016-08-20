hex_id = 0
function create_row(amount){
    cell = ""
    for(var x = 0; x!=amount;x++){
        to_left = calculate_hex_sides(cell_width, cell_height)
        cell += "<span class='hex_wrapper' style='display:inline-block; padding-left:"+to_left+"'>" + empty_cell_start + "id='hex_"+(hex_id++) + "' class='hex svg' style='';" + empty_cell_end + "</span>"
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

    img2svg(true)
    hex_drop()
}