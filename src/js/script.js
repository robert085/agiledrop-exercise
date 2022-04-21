'use strict';

// Variables
const body = document.querySelector('body');
const header = document.querySelector('.header');
const nav = document.querySelector('.nav-bar');
const links = document.querySelectorAll('.list__link');
const logo = document.querySelector('.logo');
const sections = document.querySelectorAll('section');
const offCanvas = document.querySelector('.off-canvas');
const offCanvasBtn = document.querySelector('.button-offc');
const offCanvasL = document.querySelector('.off-list');
const offCanvasLI = document.querySelectorAll('.off-list__item');
const offCanvasLIL = document.querySelectorAll('.off-list__link');
const techNav = document.querySelector('.tech-box__nav');
const techButtons = document.querySelectorAll('.btn-tab');
const techContent = document.querySelectorAll('.tech-box__content');

const btnDrupal = document.querySelector('.btn-drupal');
const btnLaraver = document.querySelector('.btn-laraver');
const btnVue = document.querySelector('.btn-vue');

const drupal = document.getElementById('drupal');
const laraver = document.getElementById('laraver');
const vue = document.getElementById('vue');

// STICKY NAV
//////////////////////////
const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else nav.classList.remove('sticky');
};

const stickyObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0.14,
});

stickyObserver.observe(header);

// SCROLL TO
//////////////////////////
// window.addEventListener('scroll', function (e) {});

document.querySelector('.list').addEventListener('click', function (e) {
  e.preventDefault();

  const clicked = e.target.closest('.list__link');
  if (!clicked) return;
  const id = clicked.getAttribute('href');

  document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
});

// ACTIVE SECTION - OBSERVER
///////////////////////////
const secActive = function (entries) {
  const [entry] = entries;
  // console.log(entry);
  if (entry.isIntersecting) {
    const id = entry.target.getAttribute('id');

    links.forEach(link => {
      // console.log(link.getAttribute('href'));
      if (link.getAttribute('href') === `#${id}`) {
        link.classList.add('list__link--active');
      } else link.classList.remove('list__link--active');
    });
  }
};

const secObserver = new IntersectionObserver(secActive, {
  root: null,
  threshold: 0.6,
});

sections.forEach(sec => {
  secObserver.observe(sec);
});

// BUTTON OFF CANVAS
//////////////////////////////
// Helper function __________________________
const delayList = function () {
  offCanvasLI.forEach((item, i) => {
    setTimeout(function () {
      item.classList.toggle('reveal-list');
      console.log(i);
    }, i * 100);
  });
};
// _________________________________________
offCanvasBtn.addEventListener('click', function () {
  if (offCanvas.classList.contains('hidden')) {
    offCanvas.classList.remove('hidden');
    document
      .querySelector('.button-offc__icon')
      .classList.add('button-offc__icon--close');
    delayList();
  } else {
    offCanvas.classList.add('hidden');
    document
      .querySelector('.button-offc__icon')
      .classList.remove('button-offc__icon--close');
    delayList();
  }
});

// LOGO - home
///////////////////////
logo.addEventListener('click', function (e) {
  e.preventDefault();
  const logo = e.target.closest('.logo__link');
  const id = logo.getAttribute('href');
  document.querySelector(id).scrollIntoView({ behavior: 'smooth' });

  if (!offCanvas.classList.contains('hidden'))
    offCanvas.classList.add('hidden');
});

// OFF CANVAS MENU
///////////////////////
offCanvas.addEventListener('click', function (e) {
  e.preventDefault();
  const target = e.target;

  if (target.classList.contains('off-list__link')) {
    const targetId = target.getAttribute('href');
    document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
    document
      .querySelector('.button-offc__icon')
      .classList.remove('button-offc__icon--close');
    offCanvas.classList.add('hidden');

    delayList();
  }
});

// TECHNOLOGIES
///////////////////////
techNav.addEventListener('click', function (e) {
  const btn = e.target.closest('.btn-tab');
  const id = btn.dataset.btn;

  techButtons.forEach(b => {
    b.classList.remove('active');
    btn.classList.add('active');
  });

  techContent.forEach(content => {
    content.classList.add('tech-hidden');
    document.getElementById(id).classList.remove('tech-hidden');
  });
});

const maxWidth = window.matchMedia('(max-width: 1000px)');

//Helper function
const condition = function (input) {
  if (input.matches) {
    // console.log('LESS then 1000px', maxWidth);

    btnDrupal.after(drupal);
    btnVue.after(vue);
    btnLaraver.after(laraver);
  } else {
    // console.log('MORE then 1000px', maxWidth);

    techNav.after(drupal);
    techNav.after(vue);
    techNav.after(laraver);
  }
};
condition(maxWidth);
maxWidth.onchange = e => {
  condition(e);
};

// ABOUT-SLIDER
///////////////////////

// SLIDER
const slider = function () {
  // Variables
  const slides = document.querySelectorAll('.slide');
  let slide = 0;

  const moveSlide = function () {
    slide++;
    if (slide <= slides.length - 1) {
      slides.forEach(s => {
        s.style.transform = `translateX(-${100 * slide}%)`;
        console.log(slide);
      });
    } else {
      slide = 0;
      slides.forEach(s => {
        s.style.transform = `translateX(${100 * slide}%)`;
      });
    }
  };

  const delaySlide = function () {
    slides.forEach((_, i) => {
      setTimeout(() => {
        moveSlide();
      }, (i + 1) * 2000);
    });
  };
  delaySlide();

  //end
};
slider();
