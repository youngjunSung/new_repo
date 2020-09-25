const slideNav = document.querySelectorAll('.slide_nav li'),
      slideWrap = document.querySelector('.slide_wrap'),
      slides = document.querySelectorAll('.slide'),
      slideBtnPrev = document.querySelector('.slide_btn_prev'),
      slideBtnNext = document.querySelector('.slide_btn_next');

let currentSlide = 0;

// 슬라이드 왼쪽 버튼
slideBtnPrev.addEventListener('click', function(){
  if (currentSlide == 0) {
    return
  }

  for (i = 0; i < slideNav.length; i++ ) {
    slideNav[i].classList.remove('active');
  }
  
  currentSlide--;
  slideNav[currentSlide].classList.add('active');

  slideWrap.style.transform=`translateX(-${currentSlide}00%)`
});

// 슬라이드 오른쪽 버튼
slideBtnNext.addEventListener('click', function(){
  if (currentSlide == slides.length - 1) {
    return
  }

  for (i = 0; i < slideNav.length; i++ ) {
    slideNav[i].classList.remove('active');
  }

  currentSlide++;
  slideNav[currentSlide].classList.add('active');

  slideWrap.style.transform=`translateX(-${currentSlide}00%)`
});

// 상단 탭
function navClick(index){
  slideNav[index].addEventListener('click', function(){
    for (i = 0; i < slideNav.length; i++ ) {
      slideNav[i].classList.remove('active');
    }
    slideNav[index].classList.add('active');
    currentSlide = index;
    slideWrap.style.transform=`translateX(-${index}00%)`
  });
}

for (i = 0; i < slideNav.length; i++) {
  navClick(i)
}