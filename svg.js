
$(document).ready(function() {
    
    load_tiles("tiles/type-0/", "dip0")
    load_tiles("tiles/type-1/", "dip1")
    load_tiles("tiles/type-2/", "dip2")
    load_tiles("tiles/type-3/", "dip3")
    load_tiles("tiles/type-4/", "dip4")
    load_tiles("tiles/type-5/", "dip5")
    load_tiles("tiles/type-6/", "dip6")
    load_tiles("tiles/type-7/", "dip7")

    img2svg()
});

function add_tile(class_name, location){
    $(".hue").append( "<div class='dipstick-container'><img class='"+class_name+" svg dip-select' src='"+ location +"' /> </div>" );
}

function load_tiles(folder, label){
    $.ajax({
        url : folder,
        success: function (data) {
            $(data).find("a").attr("href", function (i, val) {
                if( val.match(/\.(svg)$/) ) { 
                    add_tile(label,folder + val);
                } 
            });
        }
        error: function () {
            console.log("GITHUB PAGES or FILE NOT FOUND ERROR")
            add_tile(label, folder + "000.png");
            add_tile(label, folder + "001.png");
            add_tile(label, folder + "002.png");
        }

    });
}

function resize(w,h){
    console.log(w, h)
    $(".hex").attr("width", w)
    $(".hex").attr("height", h)
}

function img2svg(w,h){

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
                    $svg.attr('viewBox', '0 0 ' + $svg.attr('width') + ' ' + $svg.attr('height'))
            }
            // $svg.attr('preserveAspectRatio',"xMidYMid")

            // Replace image with new SVG
            $img.replaceWith($svg);
            enable_dip()

            resize(w,h)

        }, 'xml');

    });
}
