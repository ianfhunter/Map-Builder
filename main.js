empty_cell_start = '<img src="tiles/type-0/000.svg" '
empty_cell_end = ' />'

cell_width = 97
cell_height = 84

function dip(num){
    console.log("CLICK")
    $('.dip-select').hide()
    $('.dip'+num).show()
}

function enable_dip(){
  $(".dip-container").draggable({
    helper: "clone",
    revert: 'invalid',
    cursor: 'move',
    zIndex: 10000,
    stop: function (ev, ui) {
        console.log("Released")
    }
  })
  
  $(".dipstick-container").draggable({
    helper: "clone",
    revert: 'invalid',
    cursor: 'move',
    zIndex: 10000,
    stop: function (ev, ui) {
        console.log("Released")
    }
  })

  $(".hex_wrapper").droppable({
      hoverClass: 'ui-state-hover',        
      helper: 'clone',        
      cursor: 'move',      
      tolerance: "fit",
      drop: function(event, ui) {            
          console.log("Dropped on area")
          console.log($(this))
          // $(this).attr("src",(ui.draggable).attr("src"))
          a = $(this).find("svg").html(ui.draggable.find("svg").html())
          console.log(a)
          a.addClass('replaced-svg');
      } 
  }); 
}

function hex_onclick(that){
    console.log("clicked.", that.id)
    console.log("clicked -" )
    console.log($("#"+that.id))
    console.log($(that).find("svg"))

    // active = $(that).find("svg")
    active =$(that)

    if (isNaN(active.attr("v"))){
        console.log("Rotated")
        v = 60
        active.attr("v", 60);
    }else{
        v += 60
        console.log(v)
        active.attr("v", 60);
    }

    // a = $("#"+that.id)
    a = active
    a.rotate({
        // center: ["98px", "42px"],
        center: ["50%", "50%"],
        angle:v
    })
    // a.click(function() {
    //     hex_onclick(this)
    // });
    $(".hex_wrapper").droppable({
        hoverClass: 'ui-state-hover',        
        helper: 'clone',        
        cursor: 'move',      
        tolerance: "fit",
        drop: function(event, ui) {            
            console.log("Dropped on area")
            console.log($(this))
            // $(this).attr("src",(ui.draggable).attr("src"))
            a = $(this).find("svg").html(ui.draggable.find("svg").html())
            console.log(a)
            a.addClass('replaced-svg');
        } 
    });  
    console.log("HI")
 
}
function hex_drop(){

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


$(document).ready(function() {
    $("#primary").spectrum({
        showPalette: true,
        showSelectionPalette: true, // true by default
        palette: [ ],
        localStorageKey: "spectrum.storedcolors",
        change: function(color) {
            hex = color.toHexString(); // #ff0000
            console.log(hex)
            $(".dip-container .dip #area-1").attr("fill",hex)
            $(".dipstick-container .dip-select #area-1").attr("fill",hex)
        }
    });
    $("#secondary").spectrum({
        showPalette: true,
        showSelectionPalette: true, // true by default
        palette: [ ],
        localStorageKey: "spectrum.storedcolors",
        change: function(color) {
            hex = color.toHexString(); // #ff0000
            console.log(hex)
            $(".dip-container .dip #area-2").attr("fill",hex)
            $(".dipstick-container .dip-select #area-2").attr("fill",hex)
        }
    });
    
})