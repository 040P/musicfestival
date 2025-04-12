document.addEventListener('DOMContentLoaded', function() {
    
    fixednavigation();
    createGallery();
    lazyLoadAllImages(); // Aquí cargamos también la del DJ
    highlightLink();
    scrollNav();
})

function fixednavigation() {
    const header = document.querySelector('.header');
    const aboutFestival = document.querySelector('.about-festival');

    document.addEventListener('scroll', function() {
        if(aboutFestival.getBoundingClientRect().bottom < 1) {
            header.classList.add('fixed');
        } else {
            header.classList.remove('fixed');
        }
    }) 
}
  
function lazyLoadAllImages() {
    const lazyImages = document.querySelectorAll('img.lazy-img');

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                obs.unobserve(img);
            }
        });
    }, {
        rootMargin: '0px 0px 80px 0px',
        threshold: 0.1
    });

    lazyImages.forEach(img => {
        observer.observe(img);
    });
}

    function createGallery(){
        const AMOUT_IMAGES = 16;
        const gallery = document.querySelector('.gallery-images');
    
        for(let i = 1; i <= AMOUT_IMAGES; i++){
            const image = document.createElement('PICTURE');
            image.innerHTML = `
                <source srcset="build/img/gallery/thumb/${i}.avif" type="image/avif">
                <source srcset="build/img/gallery/thumb/${i}.webp" type="image/webp">
                <img loading="lazy" width="200" height="300" src="build/img/gallery/thumb/${i}.jpg" alt="imagen galeria">
            `;
            // image.setAttribute('data-src', `src/img/gallery/thumb/${i}.jpg`);
            // image.setAttribute('alt', 'Image Gallery');
            // image.setAttribute('width', '300');
            // image.setAttribute('height', '200');
            // image.classList.add('lazy-img');

            //Imagen invisible o pixel transparente como placeholder
             image.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';
             

               
            image.onclick = function() {
                showImage(i);
            }
    
            gallery.appendChild(image);
        }
    }  
    

function showImage(i) {
    const image = document.createElement('PICTURE'); 
    image.innerHTML = `
        <source srcset="build/img/gallery/full/${i}.avif" type="image/avif">
        <source srcset="build/img/gallery/full/${i}.webp" type="image/webp">
        <img loading="lazy" width="200" height="300" src="build/img/gallery/full/${i}.jpg" alt="imagen galeria">
    `;

    // Trigger Modal
    const modal = document.createElement('DIV')
    modal.classList.add('modal')
    modal.onclick = closeModal;

    //Button close modal
    const closeModalBtn = document.createElement('BUTTON')
    closeModalBtn.textContent = 'X' 
    closeModalBtn.classList.add('btn-close')
    closeModalBtn.onclick = closeModal

    modal.appendChild(image);
    modal.appendChild(closeModalBtn)

    // Add HTML
    const body = document.querySelector('body');
    body.classList.add('overflow-hidden')
    body.appendChild(modal)
}

function closeModal() {
    const modal = document.querySelector('.modal')
    modal.classList.add('fade-out');

    setTimeout(() => {
        modal?.remove();

        const body = document.querySelector('body');
        body.classList.remove('overflow-hidden')
    }, 500);
}

function highlightLink() {
    document.addEventListener('scroll', function(){
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-main a');


        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop
            const sectionHeight = section.clientHeight
            if(window.scrollY >= (sectionTop - sectionHeight / 3) ) {
                current = section.id
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active')
            if(link.getAttribute('href') === '#' + current) {
                link.classList.add('active')
            }
        })
    })
}

function scrollNav() {
    const navLinks = document.querySelectorAll('.nav-main a')

    navLinks.forEach( link =>{
        link.addEventListener('click', e => {
            e.preventDefault();
            const sectionScroll = e.target.getAttribute('href')
            const section = document.querySelector(sectionScroll)

            section.scrollIntoView({behavior: 'smooth'})

        })
    })

}