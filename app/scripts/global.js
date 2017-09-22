'use strict';

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

Modernizr.addTest('hires', function() {
    // starts with default value for modern browsers
    var dpr = window.devicePixelRatio ||

    // fallback for IE
        (window.screen.deviceXDPI / window.screen.logicalXDPI) ||

    // default value
        1;

    return !!(dpr > 1);
});

function divRemove() {
	var slideContent = document.querySelector('#heroUnit').removeChild(document.querySelector('.slider'));
}