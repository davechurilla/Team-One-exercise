'use strict';

(function() {

// db object for first five slides, displayed in the hero
var heroGalleryDb = [
    {img:'/images/default/cat09.jpg',retina:'/images/retina/cat09.jpg',thumb:'/images/thumbs/cat09.jpg',name:'Zeus',title:'Being cute',age:'1 month',article:'<h2>Check out this guy!</h2><p>Aliquam mauris dolor, posuere at augue vel, fringilla semper erat. Ut vehicula malesuada cursus. Donec at urna libero. Nulla sodales bibendum vulputate. Curabitur erat mauris, aliquam in augue non, porta viverra nisi. Ut nulla sem, mattis ut hendrerit quis, condimentum eget ex. Curabitur sed justo quis leo bibendum porta. Praesent sed malesuada ipsum. Aliquam malesuada purus augue, et tincidunt lectus placerat et. Nulla facilisis lorem sit amet ullamcorper tempus. Curabitur egestas aliquam suscipit. Nunc facilisis rhoncus leo sit amet convallis.</p>'},
    {img:'/images/default/cat02.jpg',retina:'/images/retina/cat02.jpg',thumb:'/images/thumbs/cat02.jpg',name:'Lola',title:'Purring',age:'3 months',article:'<h2>Neat!</h2><p>Praesent laoreet ligula lectus. Sed a neque nunc. Vivamus ornare libero non nunc semper pretium. Donec in tellus quis odio finibus auctor. Maecenas imperdiet aliquet massa eu luctus. Ut posuere suscipit arcu. In mattis velit non fringilla scelerisque. Pellentesque nulla ligula, condimentum non odio at, feugiat vehicula tellus. Vestibulum ut egestas lectus. Sed et urna quis nunc accumsan commodo eget eget dui. Nulla ac nisl sodales, pretium tellus non, porta urna.</p>'},
    {img:'/images/default/cat03.jpg',retina:'/images/retina/cat03.jpg',thumb:'/images/thumbs/cat03.jpg',name:'Jasper',title:'Sleeping',age:'1.5 months',article:'<h2>Meow, meow, meow...</h2><p>Fusce convallis purus erat, eget ullamcorper quam vestibulum at. Donec quis ligula aliquet, sodales lacus sed, dictum magna. Etiam placerat iaculis leo sit amet bibendum. Integer tincidunt sagittis scelerisque. Suspendisse dictum ultrices justo. Proin justo est, auctor nec nulla et, vestibulum hendrerit magna. Pellentesque mauris turpis, consectetur quis porttitor varius, lacinia ac urna. Maecenas aliquet risus id sollicitudin convallis. Sed a tortor arcu. Cras leo nulla, viverra at velit eget, laoreet tristique justo.</p>'},
    {img:'/images/default/cat04.jpg',retina:'/images/retina/cat04.jpg',thumb:'/images/thumbs/cat04.jpg',name:'Drake',title:'Eating',age:'3 months',article:'<h2>ROOOOAAAR!</h2><p>Nam interdum lobortis nulla quis euismod. Nam euismod nisl sed leo lobortis, eget cursus elit molestie. Nulla congue id urna et eleifend. Integer at erat nec mauris ultrices cursus eu ut lorem. Vestibulum vitae leo arcu. In volutpat eleifend ante eget commodo. Mauris vitae malesuada ipsum. Aenean ac enim dignissim, consectetur ligula a, interdum arcu. Phasellus molestie nulla ac dignissim porttitor. Aliquam iaculis felis ac egestas tempor. Nulla facilisi.</p>'},
    {img:'/images/default/cat05.jpg',retina:'/images/retina/cat05.jpg',thumb:'/images/thumbs/cat05.jpg',name:'Luna',title:'Catching pesky mice',age:'3 weeks',article:'<h2>What ya got to eat around here?</h2><p>Cras scelerisque a nibh nec pretium. Integer faucibus in lacus et aliquet. Vestibulum iaculis ante mi, eu egestas mauris ultrices eget. Etiam euismod hendrerit scelerisque. Etiam id felis at leo eleifend pulvinar in ac libero. Vivamus blandit vel quam at hendrerit. Duis ac odio ante. Integer varius laoreet tempus. Vivamus dolor nunc, consequat vel sem eu, aliquam commodo est.</p>'}
];

// db object for second five slides, displayed in the gallery
var extendedGalleryDb = [
    {img:'/images/default/cat06.jpg',retina:'/images/retina/cat06.jpg',thumb:'/images/thumbs/cat06.jpg',name:'Harold',title:'Breaking stuff',age:'4 months',article:''},
    {img:'/images/default/cat07.jpg',retina:'/images/retina/cat07.jpg',thumb:'/images/thumbs/cat07.jpg',name:'Sam',title:'Attacking things',age:'3.5 weeks',article:''},
    {img:'/images/default/cat08.jpg',retina:'/images/retina/cat08.jpg',thumb:'/images/thumbs/cat08.jpg',name:'Bill',title:'Staring out the window',age:'1 month',article:''},
    {img:'/images/default/cat01.jpg',retina:'/images/retina/cat01.jpg',thumb:'/images/thumbs/cat01.jpg',name:'Bob',title:'Cleaning... more cleaning',age:'6 months',article:''},
    {img:'/images/default/cat10.jpg',retina:'/images/retina/cat10.jpg',thumb:'/images/thumbs/cat10.jpg',name:'Betty',title:'Making lots of noise',age:'5 weeks',article:''}
];

// merge 2 above objects for full db for thumbs and main gallery displayed in modal
var mainGalleryDb = [];
for(var i=0; i < heroGalleryDb.length; i++) {
	mainGalleryDb.push(heroGalleryDb[i]);
}
for(var i=0; i < extendedGalleryDb.length; i++) {
	mainGalleryDb.push(extendedGalleryDb[i]);
}

// init and start hero gallery, next and prev nav, and thumbnails
function init() {
	currentImg('#slideContainer',undefined,false);
	heroNext();
	heroPrev();
	galleryThumbs();
	setTimeout(function(){setImgHeight(0);},250);
}

// output and render slider and initital image
function currentImg(container,id,style){
	//since HTML template is shared, id passed determines which db object to use (hero or main gallery)
	if(id == undefined) {
		var currentGallery = heroGalleryDb;
		id = 0;
	} else {
		var currentGallery = mainGalleryDb;
	}
	// use retina sized images for retina devices, otherwise, use default size
	if(Modernizr.hires && Modernizr.touch) {var imgDir = currentGallery[id].retina;} else {var imgDir = currentGallery[id].img;}

	// set up and populate HTML dynamically on page load or when vav arrows are clicked
	// container is the selctor passed as argument for either hero or modal gallery
	var Parent = document.querySelector(container + ' .slide');
	var template = ''; 
	    template += '	<div class="slide-content">';
	    template += '		<div class="img-title">';
	    template += '			<h4><strong>Name:</strong> '+ currentGallery[id].name +'</h4>';
	    template += '			<p><strong>Occupation:</strong> '+ currentGallery[id].title + ', ';
	    template += '			<strong>Age:</strong> '+ currentGallery[id].age +'</p>';
	    template += '		</div>';
	    template += '		<div class="slide-img-container"><img src="'+ imgDir +'" class="slide-img fadein" width="100%" alt="'+ currentGallery[id].name +'" /></div>'
	    template += '	</div>';
		  
	Parent.innerHTML = '';
	Parent.insertAdjacentHTML('beforeend', template);
	currentCopy();
	
};

// populates copy from db for appropriate slide below the slider interface
function currentCopy() {
	var copyTemplate = ''; 
	var copyParent = document.querySelector('#copyContainer .body-copy');
	copyTemplate += heroGalleryDb[0].article;
    copyParent.innerHTML = '';
    copyParent.insertAdjacentHTML('afterbegin', copyTemplate);
}

// adjust db when next button is pressed
// render slider image again at the 0 index
function heroNext(){
    var nextBtn = document.querySelector('.next');
    function nextSlide(){
        var zeroIndex = heroGalleryDb.splice(0, 1);
        heroGalleryDb.push(zeroIndex[0]);
		var slideContent = document.querySelector('#heroUnit #slideContainer .slide .slide-content');
        setTimeout(function(){currentImg('#slideContainer',undefined,true);},500);
    }
    nextBtn.addEventListener('mousedown', function(e) {
            nextSlide();
            this.removeEventListener('mousedown', this);	
    });
};

// adjust db when prev button is pressed
// render slider image content again at the 0 index
function heroPrev(){
    var prevBtn = document.querySelector('.prev');
    function prevSlide(e){
        var lastIndex = heroGalleryDb.splice((heroGalleryDb.length - 1), 1);
        heroGalleryDb.unshift(lastIndex[0]);
		var slideContent = document.querySelector('#heroUnit #slideContainer .slide .slide-content');
        setTimeout(function(){currentImg('#slideContainer',undefined,true);},500);
    }
    prevBtn.addEventListener('mousedown', function(e) {
            prevSlide();
            this.removeEventListener('mousedown', this);
    });
};

// this function contains everything for the main gallery in the modal
function openGallery(id) {
	// display modal and overlay, set variable for even handlers
	overlay.className = 'overlay-show';
	galleryUnit.className = 'gallery-show';
	id = parseInt(id);
	var closeBtn = document.querySelector('#overlay .box');
	var mGallLength = mainGalleryDb.length;
	var modalNextBtn = document.querySelector('#galleryUnit .next');
	var modalPrevBtn = document.querySelector('#galleryUnit .prev');
	
	// close button function
	function closeGallery() {
		overlay.className = '';
		galleryUnit.className = '';    		
	}	

	// counter functions for prev and next buttons
    function modalNextSlide(){
	    if(mGallLength != (parseInt(id) + 1)) {
	        id++;
	        if(mGallLength == (id + 1)) {modalNextBtn.className = 'nav_arrow next disabled';}
			var slideContent = document.querySelector('#galleryUnit #slideContainer .slide .slide-content');
	        setTimeout(function(){currentImg('#galleryUnit #slideContainer',id);},500);      
	    } 
	}

    function modalPrevSlide(){
	    if(id != 0) {
	        id--;
	        if(id == 0) {modalPrevBtn.className = 'nav_arrow prev disabled';}
			var slideContent = document.querySelector('#galleryUnit #slideContainer .slide .slide-content');
		    setTimeout(function(){currentImg('#galleryUnit #slideContainer',id);},500);      
	    } 
	}

	// previous and next buttons to be used within modal slider
    modalNextBtn.addEventListener('mousedown', function(e) {
        modalNextSlide();
        idCheck();
        this.removeEventListener('mousedown', this);	
    });

    modalPrevBtn.addEventListener('mousedown', function(e) {
        modalPrevSlide();
        idCheck();
        this.removeEventListener('mousedown', this);	
    });    

    // close the modal and the overlay
    closeBtn.addEventListener('click', function(e) {
    	closeGallery();
	});	

	// check id to check if one needs to be disabled on first image, load image
	function idCheck() {
		if(mGallLength != (id + 1)) {modalNextBtn.className = 'nav_arrow next';} else {modalNextBtn.className = 'nav_arrow next disabled';}
		if(id != 0) {modalPrevBtn.className = 'nav_arrow prev';} else {modalPrevBtn.className = 'nav_arrow prev disabled';}
	}

	idCheck();
	currentImg('#galleryUnit',id);	
	setTimeout(function(){setImgHeight(1);},200);
}

//use the main gallery db to create the thumbnails that will launch the gallery in a modal window
function galleryThumbs() {
	var thumbsList = document.querySelector('#thumbsList');
	var overlay = document.querySelector('#overlay');
	var galleryUnit = document.querySelector('#galleryUnit');
	thumbsList.innerHTML = '';
	for (var i=0; i < mainGalleryDb.length; i++) {
    	
    	thumbsList.insertAdjacentHTML('beforeend', '<li class="thumb"><a href="#" id="' + i + '"><img src="'+ mainGalleryDb[i].thumb +'" class="gallery-img" width="70" alt="Gallery thumbnail" /></a></li>');
    	
    	var thumb = thumbsList.children[i].querySelectorAll('a');
	    thumb[0].addEventListener('click', function(e) {
            e.preventDefault(this);
            openGallery(this.id);
            this.removeEventListener('click', this);
	    });
    }
}

// snippet to preload images for default devices (desktop), or for retina devices.
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

// start everything
init();
}());

