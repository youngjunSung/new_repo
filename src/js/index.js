// header 언어 선택 박스
const langBox = document.querySelector('.select_box'),
      langValue = document.querySelector('.selected_value .text');
      langList = document.querySelector('.select_box .select_list'),
      langText = document.querySelectorAll('.lang');

langBox.addEventListener('click', function(e){
  e.preventDefault()
  langList.classList.toggle('on');
})

langList.addEventListener('click', function(e){
  e.preventDefault();
  e.stopPropagation();
  langValue.innerText=e.target.innerText;
  langList.classList.remove('on');
  for (i = 0; i < langText.length; i++ ) {
    langText[i].classList.remove('selected');
  }
  e.target.parentElement.classList.add('selected');
})

// footer 사이트맵
const siteMap = document.querySelector('.sitemap_box'),
      siteMapList = document.querySelector('.sitemap_box .select_list');

siteMap.addEventListener('click', function(e){
  e.preventDefault();
  siteMapList.classList.toggle('on');
});

siteMapList.addEventListener('click', function(e){
  e.stopPropagation();
})