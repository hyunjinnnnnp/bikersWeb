# Bikers

Website for Bikers photo with Vanilla and NodeJS

❌ 모바일 에러

[x] 메타태그 바꾸기: 인풋 포커스 확대 방지
https://taeminimini.tistory.com/438

- fixed DOM과 가상키보드 이슈
  https://nuhends.tistory.com/2

- MAIN

  [] 전체적으로 버튼이 작고 서로 너무 가까움
  크기는 키우고 이벤트 타겟을 부모에게 ?

- PHOTOBLOCK

  [x] 좋아요 더블탭

  [] ELLIPSIS, CAROUSEL 아이콘 클릭 x

  [] ELLIPSIS -> CANCEL BUTTON

  [x] DELETE fake comment 에러

  [] DELETE COMMENT swipe

  [x] CAROUSEL swipe

- COMMENT MODAL

  [x] BODY 스크롤 없애기 -> HTML overflow hidden

  [x] 인풋 클릭시 화면 확대 방지

  [x] 새 댓글이 생성되면 포커스, 그 위치로 이동시킨다 & COLOR

  [] EDIT, DELETE BUTTONS 클릭 x

- UPLOAD PHOTO

  [] MAP SIZE 조정

  [] HEIGHT, OVERFLOW HIDDEN

  [] REMOVE MAIN HEADER

  [] 인풋 클릭시 화면 확대 방지

- USER DETAIL(MAP)

  [] userDetailMap.js:65 Uncaught TypeError: Cannot set property 'className' of null
  at HTMLDivElement.enableEditPhotoNav (userDetailMap.js:65)

  [] USER INFO HEADER fix

  [] remove main header

  [] overflow & height 조정

  [] GOOGLE MAP cluster: 가까운 곳에 마커 겹치면 숫자만 표시됨

  [] INFO WINDOW

- USER PHOTOS

  [] PHOTO INFO - 위치 디스플레이

- EDIT PROFILE

  [] 인풋 클릭시 화면 확대 방지

  [] scroll bar

🌞 추가하고싶은 기능

[] ZOOM -> 사진만 확대

[] 채팅 혹은 개인 메세지

[] favourite location

[] 사람들이 좋아하는 스팟
