// get our elements
const sliders = document.querySelectorAll(".slider-container");
const indexArray = [];
const containerWidth = document.querySelector(".section-wrapper").offsetWidth;

// set up our state
let isDragging = false,
  startPos = 0,
  currentTranslate = 0,
  prevTranslate = 0,
  animationID,
  currentIndex = 0;

sliders.forEach((slider, i) => {
  const slides = Array.from(slider.children);

  slider.style.width = `calc(100% * ${slides.length})`;
  indexArray[i] = 0;

  // add our event listeners
  slides.forEach((slide, index) => {
    const slideImage = slide.querySelector("img");
    setNextPrevCards();
    // disable default image drag
    slideImage.addEventListener("dragstart", (e) => e.preventDefault());
    // touch events
    slide.addEventListener("touchstart", touchStart(index));
    slide.addEventListener("touchend", touchEnd);

    slide.addEventListener("touchmove", touchMove);
    // mouse events
    slide.addEventListener("mousedown", touchStart(index));
    slide.addEventListener("mouseup", touchEnd);

    slide.addEventListener("mousemove", touchMove);
    slide.addEventListener("mouseleave", touchEnd);
  });

  // make responsive to viewport changes
  window.addEventListener("resize", setPositionByIndex);

  // prevent menu popup on long press
  window.oncontextmenu = function (event) {
    event.preventDefault();
    event.stopPropagation();
    return false;
  };

  function getPositionX(event) {
    return event.type.includes("mouse")
      ? event.pageX
      : event.touches[0].clientX;
  }

  // use a HOF so we have index in a closure
  function touchStart(index) {
    return function (event) {
      indexArray[i] = index;
      startPos = getPositionX(event);
      isDragging = true;
      animationID = requestAnimationFrame(animation);
      slider.classList.add("grabbing");
    };
  }

  function touchMove(event) {
    if (isDragging) {
      const currentPosition = getPositionX(event);
      currentTranslate = prevTranslate + currentPosition - startPos;
    }
  }

  function touchEnd() {
    // console.log("touch end ");
    cancelAnimationFrame(animationID);
    isDragging = false;

    const movedBy = currentTranslate - prevTranslate;

    // if moved enough negative then snap to next slide if there is one
    if (movedBy < -100 && indexArray[i] < slides.length - 1) indexArray[i] += 1;

    // if moved enough positive then snap to previous slide if there is one
    if (movedBy > 100 && indexArray[i] > 0) indexArray[i] -= 1;

    setPositionByIndex();

    slider.classList.remove("grabbing");
    setNextPrevCards();
  }

  function animation() {
    setSliderPosition();
    if (isDragging) requestAnimationFrame(animation);
  }

  function setPositionByIndex() {
    currentTranslate = indexArray[i] * -containerWidth;
    prevTranslate = currentTranslate;
    setSliderPosition();
  }

  function setSliderPosition() {
    slider.style.transform = `translateX(${currentTranslate}px)`;
  }

  function setNextPrevCards() {
    if (indexArray[i] < 1) {
      nextSwipeCard = slides[indexArray[i] + 1].querySelector("img");
      nextSwipeCard.classList.add("next-swipe-card");
      nextSwipeCard.classList.remove("cur-swipe-card");

      curSwipeCard = slides[indexArray[i]].querySelector("img");
      curSwipeCard.classList.add("cur-swipe-card");

      prevSwipeCard = slides[indexArray[i]].querySelector("img");
      prevSwipeCard.classList.remove("next-swipe-card");
      prevSwipeCard.classList.remove("prev-swipe-card");
    }
    if (indexArray[i] > 0 && indexArray[i] < slides.length) {
      try {
        // console.log("middle slide " + currentIndex);
        nextSwipeCard = slides[indexArray[i] + 1].querySelector("img");
        nextSwipeCard.classList.add("next-swipe-card");
        nextSwipeCard.classList.remove("cur-swipe-card");

        curSwipeCard = slides[indexArray[i]].querySelector("img");
        curSwipeCard.classList.remove("next-swipe-card");
        curSwipeCard.classList.remove("prev-swipe-card");
        curSwipeCard.classList.add("cur-swipe-card");

        prevSwipeCard = slides[indexArray[i] - 1].querySelector("img");
        prevSwipeCard.classList.remove("next-swipe-card");
        prevSwipeCard.classList.remove("cur-swipe-card");
        prevSwipeCard.classList.add("prev-swipe-card");
      } catch (err) {
        // console.log("last slide " + currentIndex);
        nextSwipeCard = slides[indexArray[i]].querySelector("img");

        curSwipeCard = nextSwipeCard;
        curSwipeCard.classList.add("cur-swipe-card");
        curSwipeCard.classList.remove("next-swipe-card");
        curSwipeCard.classList.remove("prev-swipe-card");

        prevSwipeCard = slides[indexArray[i] - 1].querySelector("img");
        prevSwipeCard.classList.remove("next-swipe-card");
        prevSwipeCard.classList.remove("cur-swipe-card");
        prevSwipeCard.classList.add("prev-swipe-card");
      }
    }
  }
});

//currentindex + 1 transform translateX
