// Mobile Navigation top of pages

const primaryHeader = document.querySelector(".primary-header");
const navToggle = document.querySelector(".mobile-nav-toggle");
const primaryNav = document.querySelector(".primary-navigation");

navToggle.addEventListener("click", () => {
  primaryNav.hasAttribute("data-visible")
    ? navToggle.setAttribute("aria-expanded", false)
    : navToggle.setAttribute("aria-expanded", true);
  primaryNav.toggleAttribute("data-visible");
  primaryHeader.toggleAttribute("data-overlay");
});

// Project page cards with hover affect

const boxes = document.querySelectorAll('.box')
window.addEventListener('scroll', checkBoxes)
    checkBoxes()

    function checkBoxes() {
        const triggerBottom = window.innerHeight / 5 * 4
        boxes.forEach(box => {
            const boxTop = box.getBoundingClientRect().top
            if(boxTop < triggerBottom) {
                box.classList.add('show')
            } else {
                box.classList.remove('show')
            }
        })
    }

    // Move boxes up
    const boxes2 = document.querySelectorAll('.box2')
    window.addEventListener('scroll', checkBoxes2)
        checkBoxes2()
    
        function checkBoxes2() {
            const triggerBottom = window.innerHeight / 5 * 4
            boxes2.forEach(box2 => {
                const boxTop2 = box2.getBoundingClientRect().top
                if(boxTop2 < triggerBottom) {
                    box2.classList.add('show')
                } else {
                    box2.classList.remove('show')
                }
            })
        }

        //  Scroll trigger for moving boxes
    gsap.registerPlugin(ScrollTrigger);
    var tl = gsap.timeline();

    tl.from('.moving-img' , {
      y: '-30%',
      opacity: 0,
      duration: 2,
      ease: Power4.easeOut
    })
    tl.from('.stagger1' , {
      opacity: 0,
      y: -50,
      stagger: .3,
      ease: Power4.easeOut,
      duration: 2
    },"-=1.5" )

    // slider for testimonials
    const track = document.querySelector('.carousel__track');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.carousel__button--right');
    const prevButton = document.querySelector('.carousel__button--left');
    const dotsNav = document.querySelector('.carousel__nav');
    const dots = Array.from(dotsNav.children);

    const slideWidth = slides[0].getBoundingClientRect().width;
    
    // arrange the slides next to one another

    const setSlidePosition = (slide, index) => {
        slide.style.left = slideWidth * index + 'px';
    };
    slides.forEach(setSlidePosition);

    // function for the right and left arrow click
    const moveToSlide = (track, currentSlide, targetSlide) => {
        track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
        currentSlide.classList.remove('current-slide');
        targetSlide.classList.add('current-slide');
    }

    const updateDots = (currentDot, targetDot) => {
        currentDot.classList.remove('current-slide');
        targetDot.classList.add('current-slide');
    }

    const hideShowArrows = (slides,prevButton, nextButton, targetIndex) => {
        if (targetIndex === 0) {
          prevButton.classList.add('is-hidden');
          nextButton.classList.remove('is-hidden');
        } else if (targetIndex === slides.length - 1) {
          prevButton.classList.remove('is-hidden');
          nextButton.classList.add('is-hidden');
        } else {
          prevButton.classList.remove('is-hidden');
          nextButton.classList.remove('is-hidden');
        }
    }
    // when I click right, move slides to the right

        nextButton.addEventListener('click', e => {
          const currentSlide = track.querySelector('.current-slide');
          const nextSlide = currentSlide.nextElementSibling;
          const currentDot = dotsNav.querySelector('.current-slide');
          const nextDot = currentDot.nextElementSibling;
          const prevIndex = slides.findIndex(slide => slide === nextSlide);
          
          // move to the target slide
          moveToSlide(track, currentSlide, nextSlide);
          updateDots(currentDot, nextDot);
          hideShowArrows(slides, prevButton, nextButton, prevIndex);
        });

       // when I click left, move slides to the left
        prevButton.addEventListener('click', e => {
            const currentSlide = track.querySelector('.current-slide');
            const prevSlide = currentSlide.previousElementSibling;
            const currentDot = dotsNav.querySelector('.current-slide');
            const previousDot = currentDot.previousElementSibling;
            const prevIndex = slides.findIndex((slide) => slide === prevSlide);

            moveToSlide(track, currentSlide, prevSlide);
            updateDots(currentDot, previousDot);
            hideShowArrows(slides, prevButton, nextButton, prevIndex);
        })
        

        
    // when I click the nav indicators, move to that slide

        dotsNav.addEventListener('click', e => {
            // what indicator was clicked on
            const targetDot = e.target.closest('button');

            if (!targetDot) return;

            const currentSlide = track.querySelector('.current-slide');
            const currentDot = dotsNav.querySelector('.current-slide');
            const targetIndex = dots.findIndex(dot => dot === targetDot);
            const targetSlide = slides[targetIndex];

            moveToSlide(track, currentSlide, targetSlide);
            updateDots(currentDot, targetDot);
            hideShowArrows(slides, prevButton, nextButton, targetIndex);

        })
    // could use below if I didn't loop above
    // slides[0].style.left = slideWidth * 0 + 'px';
    // slides[1].style.left = slideWidth * 1 + 'px';
    // slides[2].style.left = slideWidth * 2 + 'px';
    // slides[3].style.left = slideWidth * 3 + 'px';
    // slides[4].style.left = slideWidth * 4 + 'px';
