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
  // $(".dip").draggable({
  //   helper: "clone",
  //   cursor: 'move',
  //   zIndex: 10000,
  //   stop: function (ev, ui) {
  //       console.log("Released")
  //   }
  // }).bind('mousedown', function(event, ui){
  //   // bring target to front
  //   $(event.target.parentElement).append( event.target );
  //   event.preventDefault(); 
  // })
  // .bind('drag', function(event, ui){
  //   // update coordinates manually, since top/left style props don't work on SVG
  //   event.target.setAttribute('x', ui.position.left);
  //   event.target.setAttribute('y', ui.position.top);
  //   draggedObj = event.target
  // })

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

  // $(".dip-select").draggable({
  //   helper: "clone",
  //   cursor: 'move',
  //   zIndex: 10000,
  //   stop: function (ev, ui) {
  //           console.log("Released")
  //       }
  // }).bind('mousedown', function(event, ui){
  //   // bring target to front
  //   $(event.target.parentElement).append( event.target );
  // })
  // .bind('drag', function(event, ui){
  //   // update coordinates manually, since top/left style props don't work on SVG
  //   event.target.setAttribute('x', ui.position.left);
  //   event.target.setAttribute('y', ui.position.top);
  //   draggedObj = event.target
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
    $(".hex_wrapper").droppable({
        hoverClass: 'ui-state-hover',        
        helper: 'clone',        
        cursor: 'move',      
        tolerance: "fit",
        drop: function(event, ui) {            
            console.log("Dropped on area")
            $(this).attr("src",(ui.draggable).attr("src"))
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
        change: function(color) {
            hex = color.toHexString(); // #ff0000
            console.log(hex)
            $(".dip-container .dip #area-1").attr("fill",hex)
            $(".dipstick-container .dip-select #area-1").attr("fill",hex)
        }
    });
    $("#secondary").spectrum({
        change: function(color) {
            hex = color.toHexString(); // #ff0000
            console.log(hex)
            $(".dip-container .dip #area-2").attr("fill",hex)
            $(".dipstick-container .dip-select #area-2").attr("fill",hex)
        }
    });
    img2svg(false)
    enable_dip()
    test_svg()
})


function img2svg(v){

    /*
 * Replace all SVG images with inline SVG
 */
jQuery('img.svg').each(function(){
    var $img = jQuery(this);
    var imgID = $img.attr('id');
    var imgClass = $img.attr('class');
    var imgURL = $img.attr('src');

    var imgOnClick = $img.attr('onclick');

    jQuery.get(imgURL, function(data) {
        // Get the SVG tag, ignore the rest
        var $svg = jQuery(data).find('svg');

        // Add replaced image's ID to the new SVG
        if(typeof imgID !== 'undefined') {
            $svg = $svg.attr('id', imgID);
        }
        // Add replaced image's classes to the new SVG
        if(typeof imgClass !== 'undefined') {
            $svg = $svg.attr('class', imgClass+' replaced-svg');
        }

        // Add replaced image's onclick events to the new SVG
        if(typeof imgClass !== 'undefined') {
            $svg = $svg.attr('onclick', imgOnClick);
        }
        // Remove any invalid XML tags as per http://validator.w3.org
        $svg = $svg.removeAttr('xmlns:a');

        // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
        if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
            if(!v){
                $svg.attr('viewBox', '0 0 ' + $svg.attr('width') + ' ' + $svg.attr('height'))
            }else{
                $svg.attr('viewBox', '0 0 ' + $svg.attr('width') + ' ' + $svg.attr('height')) //81 73
            }
        }
        // $svg.attr('preserveAspectRatio',"xMidYMid")

        // Replace image with new SVG
        $img.replaceWith($svg);
        enable_dip()


    }, 'xml');

});
}

function test_svg(){
// $.ui.intersect_o = $.ui.intersect;
// $.ui.intersect = function (draggable, droppable, toleranceMode, event) {
// //Fix helper
// if (draggable.helperProportions && draggable.helperProportions.width === 0 && draggable.helperProportions.height === 0) {
//    draggable.helperProportionsBBox = draggable.helperProportionsBBox || $(draggable.element).get(0).getBBox();
//    draggable.helperProportions = draggable.helperProportionsBBox;
// }

// if (droppable.proportions && !droppable.proportions().width && !droppable.proportions().height)
//    if (typeof $(droppable.element).get(0).getBBox === "function") {
//        droppable.proportionsBBox = droppable.proportionsBBox || $(droppable.element).get(0).getBBox();
//        droppable.proportions = function () {
//            return droppable.proportionsBBox;
//        };
//    }

//     return $.ui.intersect_o(draggable, droppable, toleranceMode, event);
// };
}