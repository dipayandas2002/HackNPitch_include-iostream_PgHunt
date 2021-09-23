"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const header = document.querySelector(".header");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");
const nav = document.querySelector(".nav");

const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener("click", openModal);

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});


//document.documentElement.style.setProperty("--color-primary", "orangered");

//Attributed eg. class,id
//ONLY STANDARD PROPERTIES ARE AVAILABLE
//const logo = document.querySelector(".nav__logo");
//console.log(logo.alt);
//console.log(logo.src);
//console.log(logo.className);
//Non standard
//user defined attributes can be accessed by this way
//exactly the way written in the HTML file
//console.log(logo.getAttribute("designer"));
//Data attributes
//.....
//CLASSES
//logo.classList.add("c", "j");
// logo.classList.toggle("c");
// logo.classList.remove("c","j");
// logo.classList.toggle("c");
//console.log(logo.className); //c j are added
//Dont use
//logo.className = "jonas"; //removes the existing classes
//1:48

//... .
//... . . .                                                    
//button scrolling

btnScrollTo.addEventListener("click", function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);
  console.log(e.target.getBoundingClientRect());
  console.log("Current scroll (X/Y", window.pageXOffset, window.pageYOffset);
  //calculates the height and width of the visible viewport
  console.log(
    "height/width viewport",
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset

  // );
  //old way with smooth behaviour
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: "smooth",
  // });
  //MODERN WAY
  section1.scrollIntoView({ behavior: "smooth" });
});

//Page Navigation
//!!!!!!!!!!!!!!! ineffective method !!!!!!!!!!
//Attaching the same event handlers for multiple elements
// document.querySelectorAll(".nav__link").forEach(function (el) {
//   el.addEventListener("click", function (e) {
//     e.preventDefault();
//     const id = this.getAttribute("href");
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: "smooth" });
//   });
// });
// USING EVENT DELEGATION
// 1. Add event listener to common parent element
// 2. Determine what element originated the event

document.querySelector(".nav__links").addEventListener("click", function (e) {
  // console.log(e.target);
  //Matching strategy

  if (e.target.classList.contains("nav__link")) {
    e.preventDefault(); //prevents the scrolling
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

// Tabbed component

tabsContainer.addEventListener("click", function (e) {
  console.log(e.target); //the region inside the entire tabsContainer where the event e occured
  const clicked = e.target.closest(".operations__tab"); //find the closest parent with the class name ".operations__tab
  console.log(clicked);
  //Guard clause
  if (!clicked) return;
  //Active tAb
  tabs.forEach((t) => t.classList.remove("operations__tab--active"));
  tabsContent.forEach((c) => c.classList.remove("operations__content--active"));
  clicked.classList.add("operations__tab--active");
  //Activate Content Area

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});
//Menu fade Animation
//mouseenter DOESNOT BUBBLE UP
const handleOver = function (e) {
  if (e.target.classList.contains("nav__link")) {
    console.log(e);
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");
    siblings.forEach((el) => {
      if (el != link) {
        el.style.opacity = this;
      }
    });
    logo.style.opacity = this;
  }
};
// nav.addEventListener("mouseover", function (e) {
//   handleOver(e, 0.5);
// });
// nav.addEventListener("mouseout", function (e) {
//   handleOver(e, 1);
// });
//passing an 'argument' into handler function

nav.addEventListener("mouseover", handleOver.bind(0.5));
nav.addEventListener("mouseout", handleOver.bind(1));
//Sticky Navigation

// window.addEventListener("scroll", function (e) {
//   const initialCoords = section1.getBoundingClientRect();
//   // console.log(window.scrollY);
//   if (initialCoords.top <= 0) nav.classList.add("sticky");
//   else nav.classList.remove("sticky");
// });
//Sticky Navigation:- INERSECTION OBSERVER API
// const obsCallBack = function (entries, observer) {
//   entries.forEach((entry) => {
//     console.log(entry);
//   });
// };
// const obsOptions = {
//   //when root is null then it is the viewport
//   root: null,
//   threshold: [0.1, 0.15, 0.2],
// };
// const observer = new IntersectionObserver(obsCallBack, obsOptions);
// observer.observe(section1);
const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function (entries) {
  const entry = entries[0];
  // console.log(entry);
  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);
//Reveal Sections
const allSections = document.querySelectorAll(".section");
const revealSection = function (entries, observer) {
  const entry = entries[0];
  // console.log(entry);
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  //small improvement
  console.log(observer == sectionObserver);
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});
//Lazy Loading Images
const imgTargets = document.querySelectorAll("img[data-src]"); //selecting all the images that has the property data src
console.log(imgTargets);
const loadImg = function (entries, observer) {
  const entry = entries[0];
  // console.log(entry);
  if (!entry.isIntersecting) return;
  //Replace src with data-src
  entry.target.src = entry.target.dataset.src;
  // entry.target.classList.remove("lazy-img");
  // console.log(entry.target);
  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });
  //stop observing
  observer.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: "200px",
});
imgTargets.forEach((img) => imgObserver.observe(img));

//Slider Component
const slides = document.querySelectorAll(".slide");
const slider = document.querySelector(".slider");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
let curSlide = 0;
const maxSlide = slides.length;
// slider.style.transform = "scale(0.4) translateX(-800px)";
// slider.style.overflow = "visible";
slides.forEach((s, i) => (s.style.transform = `translateX(${100 * i}%)`));
//Next slide

btnRight.addEventListener("click", function () {
  if (curSlide === maxSlide - 1) curSlide = -1;
  else {
    curSlide++;
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - curSlide)}%)`)
    );
  }
});
btnLeft.addEventListener("click", function () {
  if (curSlide === 0) curSlide = maxSlide;
  else {
    curSlide--;
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - curSlide)}%)`)
    );
  }
});
//events
// const alertH1 = function (e) {
//   alert("hello mouseenter");
//   //this removes the event handler
//   //hence it would be executed only once
//   h1.removeEventListener("mouseenter", alertH1);
// };
// const h1 = document.querySelector("h1");
// h1.addEventListener("mouseenter", alertH1);
//EVENT PROPAGATION
// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);
// const randomColor = () =>
//   `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

// document.querySelector(".nav__link").addEventListener("click", function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log("LINK", e.target, e.currentTarget);
//   console.log(e.currentTarget === this);
//   //Stops Propagation
//   //e.stopPropagation();
//   //e.target is the element from which the event originated
// });
// document.querySelector(".nav__links").addEventListener("click", function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log("CONTAINER", e.target, e.currentTarget);
// });
// document.querySelector(".nav").addEventListener("click", function (e) {
//   this.style.backgroundColor == randomColor();
//   console.log("NAV", e.target, e.currentTarget);
// });
//DOM TRAVEERSAL
// const h1 = document.querySelector("h1");
// //Going downwards
// console.log(h1.querySelectorAll(".highlight"));
// console.log(h1.children); //return only children elements(IMPORTANT!!!)
// console.log(h1.childNodes); //ALso returns text,comments etc nodes
// h1.firstElementChild.style.color = "white"; //(IMPORTANT !!!!)
// h1.lastElementChild.style.color = "orangered"; //(IMPORTANT !!!!)

// //Going upwards parents
// console.log(h1.parentNode);
// console.log(h1.parentElement); //return null if no parent found(IMPORTANT!!!)
// //Going sideways
// console.log(h1.previousElementSibling); //(IMPORTANT !!!!)
// console.log(h1.nextElementSibling); //(IMPORTANT !!!!)
