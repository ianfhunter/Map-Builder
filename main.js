$(document).ready(function() {
    if(window.location.hostname == "127.0.0.1"){
        $(".demo-warning").css("display","none")
    }
});

function combinations(str) {
    var fn = function(active, rest, a) {
        if (!active && !rest)
            return;
        if (!rest) {
            a.push(active);
        } else {
            fn(active + rest[0], rest.slice(1), a);
            fn(active, rest.slice(1), a);
        }
        return a;
    }
    return fn("", str, []);
}
console.log(combinations("ABCDE"))

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
          last_drag = ui.draggable.find("svg").html()
          console.log(a)
          a.addClass('replaced-svg');
      } 
  }); 
}

mode = "tiling"
function toggle_mode(str, that){
    mode = str
    $(".mode").removeClass("mode-active")
    $(".mode").addClass("mode-deactive")
    console.log(that)
    $(that).removeClass("mode-deactive")
    $(that).addClass("mode-active")
}

last_drag = null
function hex_onclick(that){
    if (mode == "tiling"){
        active =$(that)

        if (isNaN(active.attr("v"))){
            v = 60
        }else{
            v += 60   
        }
        active.attr("v", v);
        a = active
        a.rotate({
            center: ["50%", "50%"],
            angle:v
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
                last_drag = ui.draggable.find("svg").html()
                console.log(a)
                a.addClass('replaced-svg');
            } 
        });  
    } else if (mode == "pathing"){
        active =$(that)
        p = 0
        if (isNaN(active.attr("p")) || active.attr("p") == ""){
            p = 0
        }else{
            p = parseInt(active.attr("p"))
        }
        p++
        console.log(p)

        if (active.find(".user_path").length <= p ){
            p = 0
        }
        active.attr("p", p);

        active.find(".user_path").attr("stroke-width","0")
        active.find("#path_" + p).attr("stroke-width","3")
        console.log("#path_" + p)
    } else if (mode == "painting"){
        console.log("YO")
        console.log(last_drag)
        console.log($(that))
        if (last_drag != null){
            $(that).html(last_drag)
        }
    }
    else{
        console.log("NONE")
    }
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
            $(".dip-container .dip #area-1").attr("stop-color",hex)
            $(".dipstick-container .dip-select #area-1").attr("fill",hex)
            $(".dipstick-container .dip-select #area-1").attr("stop-color",hex)
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
            $(".dip-container .dip #area-2").attr("stop-color",hex)
            $(".dipstick-container .dip-select #area-2").attr("fill",hex)
            $(".dipstick-container .dip-select #area-2").attr("stop-color",hex)
        }
    });
    $("#path").spectrum({
        showPalette: true,
        showSelectionPalette: true, // true by default
        palette: [ ],
        localStorageKey: "spectrum.storedcolors",
        change: function(color) {
            hex = color.toHexString(); // #ff0000
            console.log(hex)
            $(".user_path").attr("stroke",hex)
        }
    });
    
})