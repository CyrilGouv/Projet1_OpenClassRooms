/* HEADER NAV BAR */
const navBar = document.querySelector('.header-top');

window.addEventListener('scroll', () => {
    if (this.pageYOffset > 0) {
        navBar.classList.add('shrink');
    } else {
        navBar.classList.remove('shrink');
    }
});


/* SLIDER */
const slides  = document.querySelectorAll('.slide');
const prev    = document.querySelector('.prev');
const next    = document.querySelector('.next');
const loading = document.querySelector('.loading');

// Permet d'indiquer l'index de l'image actuel
let current  = 0;


// Permet de cacher les images
function reset() {
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
}


// Permet d'initialiser le slider à la première image en cachant les autres
function init() {
    reset();
    slides[0].style.display = "block";
}


// Permet d'afficher l'image précédente
function before() {
    reset();
    slides[current - 1].style.display = "block";
    current--;
}

// Permet d'afficher l'image suivante
function after() {
    reset();
    slides[current + 1].style.display = "block";
    current++;
}


function autoload() {
    setInterval(function() {
        if (current === slides.length - 1) {
            current = -1;
        }
    
        after();
    }, 5000);
}



// Gère le click sur la flèche "en arrière"
prev.addEventListener('click', () => {
    // Si le slider est à la première image permet d'afficher la dernière au click
    if (current === 0) {
        current = slides.length;
    }
    
    before();
});

// Gère le click sur la flèche "en avant"
next.addEventListener('click', () => {
    // Si le slider est à la dernière image permet d'afficher la première au click
    if (current === slides.length - 1) {
        current = -1;
    }
    
    after();
});

init();
autoload();


$(function() {
    // Cache le menu responsive par défault
    $('.menu-responsive-slide').hide();
    
    
    /* Effet de slideDown & up au click sur le menu-hamburger */
    $('.menu-responsive').on("click", function() {
        const $this = $(this);
        
        $this.toggleClass('open');
        
        if ($this.hasClass('open')) {
            $('.menu-responsive-slide').slideDown();
        } else {
            $('.menu-responsive-slide').slideUp();
        }
    });
    
    
    
    /* Gère l'animation de scroll au click sur un lien */
    $('.scroll-animation').on('click', function() {
        const topElt = $(this.hash).offset().top - 50;   
        
        $("html, body").animate({
            scrollTop: topElt
        }, 750);
        
        if ($('.menu-responsive').hasClass('open')) {
            $('.menu-responsive-slide').slideUp();
            $('.menu-responsive').removeClass('open');
        }
    });
    
    
    /* Gère le tri du portfolio */
    $('.portfolio-menu a').on('click', function(e) {
        e.preventDefault();
        
        const $this = $(this);
        const category = $this.text().toLowerCase();
        
        $this.addClass('activePortfolio');
        $this.siblings().removeClass('activePortfolio');
        
        $('.portfolio-item').hide();
        
        if (category === 'tout') {
            $('.portfolio-item').fadeIn();
            
        } else if (category === 'design') {
            $('.design').fadeIn();
            
        } else if (category === 'website') {
            $('.website').fadeIn();
            
        } else if (category === 'seo') {
            $('.seo').fadeIn();
        }
    });
    
    
    /* Animation au scroll */
    $(window).on('scroll', function() {
        
        $('.scroll-animation').each(function() {
           const sectionOffset = $(this.hash).offset().top - 90;
            
            if ($(window).scrollTop() >= sectionOffset) {
                $(this).parent().addClass('active');
                $(this).parent().siblings().removeClass('active');
            }
        });
        
        
        $('.animateUp').each(function() {
           const target = $(this);    
            
           if ($(window).scrollTop() > target.offset().top - $(window).height() * 3.5/4) {
               target.addClass('animateUpStart');
           } else {
               target.removeClass('animateUpStart');
           }
        });
        
        $('.animateRight').each(function() {
           if ($(window).scrollTop() > $(this).offset().top - $(window).height() * 3.5/4) {
               $(this).addClass('animateRightStart');
           } else {
               $(this).removeClass('animateRightStart');
           }
        });
        
        $('.animateLeft').each(function() {
           if ($(window).scrollTop() > $(this).offset().top - $(window).height() * 3.5/4) {
               $(this).addClass('animateLeftStart');
           } else {
               $(this).removeClass('animateLeftStart');
           }
        });
        
        if ($(window).scrollTop() > $('.animateShake').offset().top - $(window).height() * 3.5/4) {
            $('.animateShake').addClass('animateShakeStart');
       } else {
           $('.animateShake').removeClass('animateShakeStart');
       }
        
    });
    
});