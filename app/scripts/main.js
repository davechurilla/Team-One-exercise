document.addEventListener('DOMContentLoaded', function(event) { 

var heroGalleryDb = [
    {img:'http://placekitten.com/g/750/500',name:'Zeus',title:'Being cute',age:'1 month'},
    {img:'http://placekitten.com/g/600/400',name:'Lola',title:'Purring',age:'3 months'},
    {img:'http://placekitten.com/g/450/300',name:'Jasper',title:'Sleeping',age:'1.5 months'},
    {img:'http://placekitten.com/g/800/533',name:'Drake',title:'Eating',age:'3 months'},
    {img:'http://placekitten.com/g/900/600',name:'Luna',title:'Catching pesky mice',age:'3 weeks'}
];

function init() {
	currentImg();
	heroNext();
	heroPrev();

	var img1 = document.getElementsByClassName('slide-img')[0];
	img1.onload = function() {
    console.log('Image 1 ready to append');
    // var slideEl = document.getElementsByClassName('slide')[0];
	var slideImg = document.getElementsByClassName('slide-img')[0];
	var slideHeight= slideImg.offsetHeight;
	slideImg.style.height = slideHeight + 'px';	    	
	};
}

function currentImg(){
    var parent = document.querySelector('#slideContainer');
    var template = '';
        template += '<li class="slide">';
        template += '<div class="img-title">';
        template += '	<h4><strong>Name:</strong> '+ heroGalleryDb[0].name +'</h4>';
        template += '	<p><strong>Occupation:</strong> '+ heroGalleryDb[0].title + ', ';
        template += '	<strong>Age:</strong> '+ heroGalleryDb[0].age +'</p>';
        template += '</div>';
        template += '<img src="'+ heroGalleryDb[0].img +'" class="slide-img" width="100%" alt="'+ heroGalleryDb[0].name +'" /></li>';
    parent.innerHTML = '';
    parent.insertAdjacentHTML('afterbegin', template);

    // var navArrow = document.getElementsByClassName('nav_arrow');
    // navArrow[0].style.display = 'block';
    // navArrow[1].style.display = 'block';
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

init();
// document.getElementsByClassName('slide-img')[0].offsetHeight;
});