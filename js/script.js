'use strict';

// Variables
const header = document.querySelector('.header');
const nav = document.querySelector('.nav-bar');
const links = document.querySelectorAll('.list__link');
const logo = document.querySelector('.logo');
const sections = document.querySelectorAll('section');

// Sticky nav-bar
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
document.querySelector('.list').addEventListener('click', function (e) {
  e.preventDefault();

  //   links.forEach(link => link.classList.remove('list__link--active'));
  //   console.log(e.target.closest('.list__item'));
  const clicked = e.target.closest('.list__link');
  if (!clicked) return;
  const id = clicked.getAttribute('href');

  //   console.log(clicked, id);
  document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  //   clicked.classList.add('list__link--active');
});

// ACTIVE SECTION _________
const secActive = function (entries) {
  const [entry] = entries;
  console.log(entry);

  if (entry.isIntersecting) {
    const id = entry.target.getAttribute('id');
    // console.log(id);

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
  threshold: 0.5,
  margin: '60px 0 0 0',
});

sections.forEach(sec => {
  secObserver.observe(sec);
});
