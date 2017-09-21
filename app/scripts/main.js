document.addEventListener('DOMContentLoaded', function(event) { 

var heroGalleryDb = [
    {img:'http://placekitten.com/g/750/500',name:'Zeus',title:'Being cute',age:'1 month',article:'<h2>Check out this guy!</h2><p>Aliquam mauris dolor, posuere at augue vel, fringilla semper erat. Ut vehicula malesuada cursus. Donec at urna libero. Nulla sodales bibendum vulputate. Curabitur erat mauris, aliquam in augue non, porta viverra nisi. Ut nulla sem, mattis ut hendrerit quis, condimentum eget ex. Curabitur sed justo quis leo bibendum porta. Praesent sed malesuada ipsum. Aliquam malesuada purus augue, et tincidunt lectus placerat et. Nulla facilisis lorem sit amet ullamcorper tempus. Curabitur egestas aliquam suscipit. Nunc facilisis rhoncus leo sit amet convallis.</p>'},
    {img:'http://placekitten.com/g/600/400',name:'Lola',title:'Purring',age:'3 months',article:'<h2>Neat!</h2><p>Aliquam mauris dolor, posuere at augue vel, fringilla semper erat. Ut vehicula malesuada cursus. Donec at urna libero. Nulla sodales bibendum vulputate. Curabitur erat mauris, aliquam in augue non, porta viverra nisi. Ut nulla sem, mattis ut hendrerit quis, condimentum eget ex. Curabitur sed justo quis leo bibendum porta. Praesent sed malesuada ipsum. Aliquam malesuada purus augue, et tincidunt lectus placerat et. Nulla facilisis lorem sit amet ullamcorper tempus. Curabitur egestas aliquam suscipit. Nunc facilisis rhoncus leo sit amet convallis.</p>'},
    {img:'http://placekitten.com/g/450/300',name:'Jasper',title:'Sleeping',age:'1.5 months',article:'<h2>Meow, meow, meow...</h2><p>Aliquam mauris dolor, posuere at augue vel, fringilla semper erat. Ut vehicula malesuada cursus. Donec at urna libero. Nulla sodales bibendum vulputate. Curabitur erat mauris, aliquam in augue non, porta viverra nisi. Ut nulla sem, mattis ut hendrerit quis, condimentum eget ex. Curabitur sed justo quis leo bibendum porta. Praesent sed malesuada ipsum. Aliquam malesuada purus augue, et tincidunt lectus placerat et. Nulla facilisis lorem sit amet ullamcorper tempus. Curabitur egestas aliquam suscipit. Nunc facilisis rhoncus leo sit amet convallis.</p>'},
    {img:'http://placekitten.com/g/800/533',name:'Drake',title:'Eating',age:'3 months',article:'<h2>ROOOOAAAR!</h2><p>Aliquam mauris dolor, posuere at augue vel, fringilla semper erat. Ut vehicula malesuada cursus. Donec at urna libero. Nulla sodales bibendum vulputate. Curabitur erat mauris, aliquam in augue non, porta viverra nisi. Ut nulla sem, mattis ut hendrerit quis, condimentum eget ex. Curabitur sed justo quis leo bibendum porta. Praesent sed malesuada ipsum. Aliquam malesuada purus augue, et tincidunt lectus placerat et. Nulla facilisis lorem sit amet ullamcorper tempus. Curabitur egestas aliquam suscipit. Nunc facilisis rhoncus leo sit amet convallis.</p>'},
    {img:'http://placekitten.com/g/900/600',name:'Luna',title:'Catching pesky mice',age:'3 weeks',article:'<h2>Not me! Talk to the dog...</h2><p>Aliquam mauris dolor, posuere at augue vel, fringilla semper erat. Ut vehicula malesuada cursus. Donec at urna libero. Nulla sodales bibendum vulputate. Curabitur erat mauris, aliquam in augue non, porta viverra nisi. Ut nulla sem, mattis ut hendrerit quis, condimentum eget ex. Curabitur sed justo quis leo bibendum porta. Praesent sed malesuada ipsum. Aliquam malesuada purus augue, et tincidunt lectus placerat et. Nulla facilisis lorem sit amet ullamcorper tempus. Curabitur egestas aliquam suscipit. Nunc facilisis rhoncus leo sit amet convallis.</p>'}
];

function init() {
	currentImg();
	heroNext();
	heroPrev();
	// setImgHeight();
}

function currentImg(){
    var heroParent = document.querySelector('#slideContainer .slide');
    var copyParent = document.querySelector('#copyContainer .body-copy');
    var template = '';
        template += '	<div class="img-title">';
        template += '		<h4><strong>Name:</strong> '+ heroGalleryDb[0].name +'</h4>';
        template += '		<p><strong>Occupation:</strong> '+ heroGalleryDb[0].title + ' <br />';
        template += '		<strong>Age:</strong> '+ heroGalleryDb[0].age +'</p>';
        template += '	</div>';
        template += '	<div class="slide-img-container"><img src="'+ heroGalleryDb[0].img +'" class="slide-img" width="100%" alt="'+ heroGalleryDb[0].name +'" /></div>'
	var copyTemplate = ''; 
		copyTemplate += heroGalleryDb[0].article;       
	heroParent.innerHTML = '';
    copyParent.innerHTML = '';
    heroParent.insertAdjacentHTML('afterbegin', template);
    copyParent.insertAdjacentHTML('afterbegin', copyTemplate);
    setImgHeight();
};

function heroNext(){
    var nextBtn = document.querySelector('.next');
    function nextSlide(){
        var zeroIndex = heroGalleryDb.splice(0, 1);
        heroGalleryDb.push(zeroIndex[0]);
        // var navArrow = document.getElementsByClassName('nav_arrow');
        // navArrow[0].style.display = 'none';
        // navArrow[1].style.display = 'none';        
        currentImg();
    }
    nextBtn.addEventListener('mousedown', function(e) {
            nextSlide();
            this.removeEventListener('mousedown', this);
    });
};

function heroPrev(){
    var prevBtn = document.querySelector('.prev');
    function prevSlide(e){
        var lastIndex = heroGalleryDb.splice((heroGalleryDb.length - 1), 1);
        heroGalleryDb.unshift(lastIndex[0]);
        // var navArrow = document.getElementsByClassName('nav_arrow');
        // navArrow[0].style.display = 'none';
        // navArrow[1].style.display = 'none';        
        currentImg();
    }
    prevBtn.addEventListener('mousedown', function(e) {
            prevSlide();
            this.removeEventListener('mousedown', this);
    });
};

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
                // remove image from the array once it's loaded
                // for memory consumption reasons
                list.splice(index, 1);
            }
        }
        list.push(img);
        img.src = array[i];
    }
}

preloadImages(["http://placekitten.com/g/750/500", "http://placekitten.com/g/600/400", "http://placekitten.com/g/450/300", "http://placekitten.com/g/800/533", "http://placekitten.com/g/900/600"]);

init();
});

function setImgHeight() {
	var img1 = document.getElementsByClassName('slide-img')[0];
	img1.onload = function() {
	    // console.log('Image 1 ready to append');	
        var slide = document.getElementsByClassName('slide')[0];
        var slideImgTitle = document.getElementsByClassName('img-title')[0];
        var slideImg = document.getElementsByClassName('slide-img')[0];
        var slideImgTitleHeight = slideImgTitle.offsetHeight;
        var slideImgHeight= slideImg.offsetHeight;
        var slideHeight = parseInt(slideImgTitleHeight) + parseInt(slideImgHeight);
        slide.style.height = slideHeight + 'px';
	};	
}

