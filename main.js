
  let curScrollPos = 0
  let oldScrollPos = 0

window.addEventListener('scroll', function(){
  // console.log(this.scrollY)

  let isScrolledNav = false


  //HTML Elements
  const nav = document.querySelector('.nav-wrapper')
  
  if ( window.pageYOffset > curScrollPos ) {
      nav.classList.add("scroll")
      isScrolledNav = true
  }

  oldScrollPos = curScrollPos
  console.log("oldScrollPos " + oldScrollPos)
  curScrollPos = this.scrollY
  console.log("curScrollPos " + curScrollPos)
  console.log("window y " + this.scrollY)

  if (oldScrollPos < curScrollPos) {
    nav.classList.add("scroll")
  } else if (oldScrollPos > curScrollPos) {
    nav.classList.remove("scroll")
  }


})

// window.onscroll = function () {

//   let isScrolledNav = false

//   let curScrollPos = window.screenY
//   let oldScrollPos = 0

//   //HTML Elements
//   const nav = document.querySelector('.nav-wrapper')
  
//   if ( window.pageYOffset > curScrollPos ) {
//       nav.classList.add("scroll")
//       isScrolledNav = true
//   }

//   function onScroll() {
//     // oldScrollPos = curScrollPos
//     console.log("oldScrollPos " + oldScrollPos)
//     curScrollPos = window.screenY
//     console.log("curScrollPos " + curScrollPos)
//     console.log("window y " + window.screenY)

//     if (oldScrollPos < curScrollPos) {
//       nav.classList.add("scroll")
//     } else if (oldScrollPos > curScrollPos) {
//       nav.classList.remove("scroll")
//     }

//     // if ( window.pageYOffset > curScrollPos) {
//     //   nav.classList.add("scroll")
//     //   isScrolledNav = true
//     // }   else if ( window.pageYOffset <= curScrollPos ) {
//     //   nav.classList.remove("scroll")
      
//     //   isScrolledNav = false
//     // }
//   }
//   onScroll ()
//   return onScroll

// }()



function scrollToVideos() {
  const anchorHome = document.getElementById("videos")
  anchorHome.scrollIntoView({behavior: "smooth"})
}
