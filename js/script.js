'use strict';

// const { list } = require('postcss');

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

// STICKY NAV ____________
//////////////////////////
const stickyNav = function (entries) {
  const [entry] = entries;
  //   console.log(entry);

  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else nav.classList.remove('sticky');
};

const stickyObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0.15,
});

stickyObserver.observe(header);

// SCROLL TO _____________
//////////////////////////
window.addEventListener('scroll', function (e) {
  // console.log(Math.round(window.scrollY));
});

document.querySelector('.list').addEventListener('click', function (e) {
  e.preventDefault();

  const clicked = e.target.closest('.list__link');
  if (!clicked) return;
  const id = clicked.getAttribute('href');

  document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  // document.querySelector(id).style.paddingTop = '100px';
});

// ACTIVE SECTION - OBSERVER_________
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

// BUTTON OFF CANVAS _________
//////////////////////////////
offCanvasBtn.addEventListener('click', function () {
  if (offCanvas.classList.contains('hidden')) {
    offCanvas.classList.remove('hidden');
    offCanvasL.classList.add('reveal-list');
  } else {
    offCanvas.classList.add('hidden');
    offCanvasL.classList.remove('reveal-list');
  }
});

// LOGO - home _________
///////////////////////
logo.addEventListener('click', function (e) {
  e.preventDefault();
  const logo = e.target.closest('.logo__link');
  const id = logo.getAttribute('href');
  document.querySelector(id).scrollIntoView({ behavior: 'smooth' });

  if (!offCanvas.classList.contains('hidden'))
    offCanvas.classList.add('hidden');
});

// OFF CANVAS MENU_________
///////////////////////
offCanvas.addEventListener('click', function (e) {
  e.preventDefault();
  const target = e.target;

  if (target.classList.contains('off-list__link')) {
    const targetId = target.getAttribute('href');

    document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });

    offCanvas.classList.add('hidden');
  }
});

// TECHNOLOGIES
techNav.addEventListener('click', function (e) {
  const btn = e.target.closest('.btn-tab');
  console.log(btn);

  const id = btn.dataset.btn;
  console.log(id);

  techButtons.forEach(b => {
    b.classList.remove('active');
    btn.classList.add('active');
    // id = b.getAttribute('id');
  });

  techContent.forEach(content => {
    content.classList.add('tech-hidden');
    document.getElementById(id).classList.remove('tech-hidden');
  });
});
