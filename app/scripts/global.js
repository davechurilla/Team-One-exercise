'use strict';

// set heightof slide container using the height of the image after it loads
function setImgHeight(index) {
        var slide = document.getElementsByClassName('slide')[index];
        var slideImgTitle = document.getElementsByClassName('img-title')[index];
        var slideImg = document.getElementsByClassName('slide-img')[index];
        var slideImgTitleHeight = slideImgTitle.offsetHeight;
        var slideImgHeight= slideImg.offsetHeight;
        var slideHeight = parseInt(slideImgTitleHeight) + parseInt(slideImgHeight);
        slide.style.height = slideHeight + 'px';
}

/**
 * Modernizr test for retina / high resolution / high pixel density
 *
 * @author Joao Cunha
 * @license MIT
 */

// add a feature test to Modernizr to check for retina display
Modernizr.addTest('hires', function() {
    // starts with default value for modern browsers
    var dpr = window.devicePixelRatio ||

    // fallback for IE
        (window.screen.deviceXDPI / window.screen.logicalXDPI) ||

    // default value
        1;

    return !!(dpr > 1);
});


// add remove() support for IE
if (!('remove' in Element.prototype)) {
    Element.prototype.remove = function() {
        if (this.parentNode) {
            this.parentNode.removeChild(this);
        }
    };
}

// snippet to preload images for default devices (desktop), or for retina devices
// once all images are loaded, setImgHeight is fired
function preloadImages(array) {
    if (!preloadImages.list) {
        preloadImages.list = [];
    }
    var list = preloadImages.list;
    for (var i = 0; i < array.length; i++) {
        var img = new Image();
        img.onload = function() {
            var index = list.indexOf(this);
            if (index !== -1) {
                list.splice(index, 1);
            }
        }

        list.push(img);
        img.src = array[i];
    }
}

// invoke image preloader
if(Modernizr.hires && Modernizr.touch) {
	preloadImages(['images/retina/cat01.jpg', 'images/retina/cat02.jpg', 'images/retina/cat03.jpg', 'images/retina/cat04.jpg', 'images/retina/cat05.jpg', 'images/retina/cat06.jpg', 'images/retina/cat07.jpg', 'images/retina/cat08.jpg', 'images/retina/cat09.jpg', 'images/retina/cat10.jpg']);
} else {
	preloadImages(['images/default/cat01.jpg', 'images/default/cat02.jpg', 'images/default/cat03.jpg', 'images/default/cat04.jpg', 'images/default/cat05.jpg', 'images/default/cat06.jpg', 'images/default/cat07.jpg', 'images/default/cat08.jpg', 'images/default/cat09.jpg', 'images/default/cat10.jpg']);
}