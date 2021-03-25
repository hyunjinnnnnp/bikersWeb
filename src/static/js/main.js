(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var addCommentForms = document.querySelectorAll("#jsAddComment");
var photoId;
var targetPhotoBlock;
var commentId;

var increaseNumber = () => {
  var commentNumber = targetPhotoBlock.querySelector("#jsCommentNumber");
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;
};

var addComment = comment => {
  var postEditUrl = "/api/".concat(commentId, "/edit-comment");
  var postDelUrl = "/api/".concat(commentId, "/delete-comment");
  var userName = document.querySelector("#userName").innerText;
  var userAvatar = document.querySelector("#userAvatar").getAttribute("src");
  var fakeCommentBlock = document.querySelector("#jsFakeBlock").cloneNode(true);
  targetPhotoBlock.querySelector("#jsCommentList").prepend(fakeCommentBlock);
  fakeCommentBlock.classList.remove("hide-element");
  fakeCommentBlock.classList.add("commentBlock");
  fakeCommentBlock.querySelector(".commentBlock__link").setAttribute("href", "/me");
  fakeCommentBlock.querySelector(".author-avatar").setAttribute("src", userAvatar);
  fakeCommentBlock.querySelector(".author-name").innerHTML = userName;
  fakeCommentBlock.querySelector("#jsCurrentComment").innerText = comment; //바뀐 커맨트 내용

  fakeCommentBlock.querySelector("#jsEditCommentForm input").value = comment;
  fakeCommentBlock.querySelector("#jsEditComment").setAttribute("href", postEditUrl);
  fakeCommentBlock.querySelector("#jsDeleteComment").setAttribute("href", postDelUrl);
  increaseNumber();
};

var sendComment = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (comment) {
    var urlPath = window.location.pathname;

    if (urlPath === "/") {
      var a = targetPhotoBlock.querySelector("a"); // eslint-disable-next-line prefer-destructuring

      photoId = a.getAttribute("href").split("/")[2];
    } else {
      // eslint-disable-next-line prefer-destructuring
      photoId = window.location.pathname.split("/")[2];
    }

    yield (0, _axios.default)({
      url: "/api/".concat(photoId, "/comment"),
      method: "POST",
      data: {
        comment
      }
    }).then(res => {
      if (res.status === 200) {
        commentId = res.data;
        addComment(comment);
      }
    });
  });

  return function sendComment(_x) {
    return _ref.apply(this, arguments);
  };
}();

var handleSubmit = event => {
  event.preventDefault();
  var currentInput = event.currentTarget.querySelector("input");
  [,, targetPhotoBlock] = event.path;
  var comment = currentInput.value;
  sendComment(comment);
  currentInput.value = "";
};

function init() {
  //HOME: 커맨트 폼이 여러개임
  //PHOTO DETAIL: 커맨트 폼 하나밖에 없음
  addCommentForms.forEach(form => form.addEventListener("submit", handleSubmit));
}

if (addCommentForms) {
  init();
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFkZENvbW1lbnQuanMiXSwibmFtZXMiOlsiYWRkQ29tbWVudEZvcm1zIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwicGhvdG9JZCIsInRhcmdldFBob3RvQmxvY2siLCJjb21tZW50SWQiLCJpbmNyZWFzZU51bWJlciIsImNvbW1lbnROdW1iZXIiLCJxdWVyeVNlbGVjdG9yIiwiaW5uZXJIVE1MIiwicGFyc2VJbnQiLCJhZGRDb21tZW50IiwiY29tbWVudCIsInBvc3RFZGl0VXJsIiwicG9zdERlbFVybCIsInVzZXJOYW1lIiwiaW5uZXJUZXh0IiwidXNlckF2YXRhciIsImdldEF0dHJpYnV0ZSIsImZha2VDb21tZW50QmxvY2siLCJjbG9uZU5vZGUiLCJwcmVwZW5kIiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwiYWRkIiwic2V0QXR0cmlidXRlIiwidmFsdWUiLCJzZW5kQ29tbWVudCIsInVybFBhdGgiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsInBhdGhuYW1lIiwiYSIsInNwbGl0IiwidXJsIiwibWV0aG9kIiwiZGF0YSIsInRoZW4iLCJyZXMiLCJzdGF0dXMiLCJoYW5kbGVTdWJtaXQiLCJldmVudCIsInByZXZlbnREZWZhdWx0IiwiY3VycmVudElucHV0IiwiY3VycmVudFRhcmdldCIsInBhdGgiLCJpbml0IiwiZm9yRWFjaCIsImZvcm0iLCJhZGRFdmVudExpc3RlbmVyIl0sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7OztBQUVBLElBQU1BLGVBQWUsR0FBR0MsUUFBUSxDQUFDQyxnQkFBVCxDQUEwQixlQUExQixDQUF4QjtBQUNBLElBQUlDLE9BQUo7QUFDQSxJQUFJQyxnQkFBSjtBQUNBLElBQUlDLFNBQUo7O0FBRUEsSUFBTUMsY0FBYyxHQUFHLE1BQU07QUFDM0IsTUFBTUMsYUFBYSxHQUFHSCxnQkFBZ0IsQ0FBQ0ksYUFBakIsQ0FBK0Isa0JBQS9CLENBQXRCO0FBQ0FELEVBQUFBLGFBQWEsQ0FBQ0UsU0FBZCxHQUEwQkMsUUFBUSxDQUFD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QUNGLElBQWhCO0FBQ0F6QixRQUFBQSxVQUFVLENBQUNDLE9BQUQsQ0FBVjtBQUNEO0FBQ0YsS0FYSyxDQUFOO0FBWUQsR0F0QmdCOztBQUFBLGtCQUFYZSxXQUFXO0FBQUE7QUFBQTtBQUFBLEdBQWpCOztBQXdCQSxJQUFNYSxZQUFZLEdBQUlDLEtBQUQsSUFBVztBQUM5QkEsRUFBQUEsS0FBSyxDQUFDQyxjQUFOO0FBQ0EsTUFBTUMsWUFBWSxHQUFHRixLQUFLLENBQUNHLGFBQU4sQ0FBb0JwQyxhQUFwQixDQUFrQyxPQUFsQyxDQUFyQjtBQUNBLE1BQUtKLGdCQUFMLElBQXlCcUMsS0FBSyxDQUFDSSxJQUEvQjtBQUNBLE1BQU1qQyxPQUFPLEdBQUcrQixZQUFZLENBQUNqQixLQUE3QjtBQUNBQyxFQUFBQSxXQUFXLENBQUNmLE9BQUQsQ0FBWDtBQUNBK0IsRUFBQUEsWUFBWSxDQUFDakIsS0FBYixHQUFxQixFQUFyQjtBQUNELENBUEQ7O0FBU0EsU0FBU29CLElBQVQsR0FBZ0I7QUFDZDtBQUNBO0FBQ0E5QyxFQUFBQSxlQUFlLENBQUMrQyxPQUFoQixDQUF5QkMsSUFBRCxJQUN0QkEsSUFBSSxDQUFDQyxnQkFBTCxDQUFzQixRQUF0QixFQUFnQ1QsWUFBaEMsQ0FERjtBQUdEOztBQUNELElBQUl4QyxlQUFKLEVBQXFCO0FBQ25COEMsRUFBQUEsSUFBSTtBQUNMIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGF4aW9zIGZyb20gXCJheGlvc1wiO1xuXG5jb25zdCBhZGRDb21tZW50Rm9ybXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiI2pzQWRkQ29tbWVudFwiKTtcbmxldCBwaG90b0lkO1xubGV0IHRhcmdldFBob3RvQmxvY2s7XG5sZXQgY29tbWVudElkO1xuXG5jb25zdCBpbmNyZWFzZU51bWJlciA9ICgpID0+IHtcbiAgY29uc3QgY29tbWVudE51bWJlciA9IHRhcmdldFBob3RvQmxvY2sucXVlcnlTZWxlY3RvcihcIiNqc0NvbW1lbnROdW1iZXJcIik7XG4gIGNvbW1lbnROdW1iZXIuaW5uZXJIVE1MID0gcGFyc2VJbnQoY29tbWVudE51bWJlci5pbm5lckhUTUwsIDEwKSArIDE7XG59O1xuY29uc3QgYWRkQ29tbWVudCA9IChjb21tZW50KSA9PiB7XG4gIGNvbnN0IHBvc3RFZGl0VXJsID0gYC9hcGkvJHtjb21tZW50SWR9L2VkaXQtY29tbWVudGA7XG4gIGNvbnN0IHBvc3REZWxVcmwgPSBgL2FwaS8ke2NvbW1lbnRJZH0vZGVsZXRlLWNvbW1lbnRgO1xuICBjb25zdCB1c2VyTmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdXNlck5hbWVcIikuaW5uZXJUZXh0O1xuICBjb25zdCB1c2VyQXZhdGFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN1c2VyQXZhdGFyXCIpLmdldEF0dHJpYnV0ZShcInNyY1wiKTtcbiAgY29uc3QgZmFrZUNvbW1lbnRCbG9jayA9IGRvY3VtZW50XG4gICAgLnF1ZXJ5U2VsZWN0b3IoXCIjanNGYWtlQmxvY2tcIilcbiAgICAuY2xvbmVOb2RlKHRydWUpO1xuICB0YXJnZXRQaG90b0Jsb2NrLnF1ZXJ5U2VsZWN0b3IoXCIjanNDb21tZW50TGlzdFwiKS5wcmVwZW5kKGZha2VDb21tZW50QmxvY2spO1xuICBmYWtlQ29tbWVudEJsb2NrLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRlLWVsZW1lbnRcIik7XG4gIGZha2VDb21tZW50QmxvY2suY2xhc3NMaXN0LmFkZChcImNvbW1lbnRCbG9ja1wiKTtcblxuICBmYWtlQ29tbWVudEJsb2NrXG4gICAgLnF1ZXJ5U2VsZWN0b3IoXCIuY29tbWVudEJsb2NrX19saW5rXCIpXG4gICAgLnNldEF0dHJpYnV0ZShcImhyZWZcIiwgXCIvbWVcIik7XG4gIGZha2VDb21tZW50QmxvY2tcbiAgICAucXVlcnlTZWxlY3RvcihcIi5hdXRob3ItYXZhdGFyXCIpXG4gICAgLnNldEF0dHJpYnV0ZShcInNyY1wiLCB1c2VyQXZhdGFyKTtcbiAgZmFrZUNvbW1lbnRCbG9jay5xdWVyeVNlbGVjdG9yKFwiLmF1dGhvci1uYW1lXCIpLmlubmVySFRNTCA9IHVzZXJOYW1lO1xuICBmYWtlQ29tbWVudEJsb2NrLnF1ZXJ5U2VsZWN0b3IoXCIjanNDdXJyZW50Q29tbWVudFwiKS5pbm5lclRleHQgPSBjb21tZW50OyAvL+uwlOuAkCDsu6Trp6jtirgg64K07JqpXG4gIGZha2VDb21tZW50QmxvY2sucXVlcnlTZWxlY3RvcihcIiNqc0VkaXRDb21tZW50Rm9ybSBpbnB1dFwiKS52YWx1ZSA9IGNvbW1lbnQ7XG4gIGZha2VDb21tZW50QmxvY2tcbiAgICAucXVlcnlTZWxlY3RvcihcIiNqc0VkaXRDb21tZW50XCIpXG4gICAgLnNldEF0dHJpYnV0ZShcImhyZWZcIiwgcG9zdEVkaXRVcmwpO1xuICBmYWtlQ29tbWVudEJsb2NrXG4gICAgLnF1ZXJ5U2VsZWN0b3IoXCIjanNEZWxldGVDb21tZW50XCIpXG4gICAgLnNldEF0dHJpYnV0ZShcImhyZWZcIiwgcG9zdERlbFVybCk7XG4gIGluY3JlYXNlTnVtYmVyKCk7XG59O1xuXG5jb25zdCBzZW5kQ29tbWVudCA9IGFzeW5jIChjb21tZW50KSA9PiB7XG4gIGNvbnN0IHVybFBhdGggPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU7XG4gIGlmICh1cmxQYXRoID09PSBcIi9cIikge1xuICAgIGNvbnN0IGEgPSB0YXJnZXRQaG90b0Jsb2NrLnF1ZXJ5U2VsZWN0b3IoXCJhXCIpO1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBwcmVmZXItZGVzdHJ1Y3R1cmluZ1xuICAgIHBob3RvSWQgPSBhLmdldEF0dHJpYnV0ZShcImhyZWZcIikuc3BsaXQoXCIvXCIpWzJdO1xuICB9IGVsc2Uge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBwcmVmZXItZGVzdHJ1Y3R1cmluZ1xuICAgIHBob3RvSWQgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUuc3BsaXQoXCIvXCIpWzJdO1xuICB9XG4gIGF3YWl0IGF4aW9zKHtcbiAgICB1cmw6IGAvYXBpLyR7cGhvdG9JZH0vY29tbWVudGAsXG4gICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICBkYXRhOiB7XG4gICAgICBjb21tZW50LFxuICAgIH0sXG4gIH0pLnRoZW4oKHJlcykgPT4ge1xuICAgIGlmIChyZXMuc3RhdHVzID09PSAyMDApIHtcbiAgICAgIGNvbW1lbnRJZCA9IHJlcy5kYXRhO1xuICAgICAgYWRkQ29tbWVudChjb21tZW50KTtcbiAgICB9XG4gIH0pO1xufTtcblxuY29uc3QgaGFuZGxlU3VibWl0ID0gKGV2ZW50KSA9PiB7XG4gIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIGNvbnN0IGN1cnJlbnRJbnB1dCA9IGV2ZW50LmN1cnJlbnRUYXJnZXQucXVlcnlTZWxlY3RvcihcImlucHV0XCIpO1xuICBbLCAsIHRhcmdldFBob3RvQmxvY2tdID0gZXZlbnQucGF0aDtcbiAgY29uc3QgY29tbWVudCA9IGN1cnJlbnRJbnB1dC52YWx1ZTtcbiAgc2VuZENvbW1lbnQoY29tbWVudCk7XG4gIGN1cnJlbnRJbnB1dC52YWx1ZSA9IFwiXCI7XG59O1xuXG5mdW5jdGlvbiBpbml0KCkge1xuICAvL0hPTUU6IOy7pOunqO2KuCDtj7zsnbQg7Jes65+s6rCc7J6EXG4gIC8vUEhPVE8gREVUQUlMOiDsu6Trp6jtirgg7Y+8IO2VmOuCmOuwluyXkCDsl4bsnYxcbiAgYWRkQ29tbWVudEZvcm1zLmZvckVhY2goKGZvcm0pID0+XG4gICAgZm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIGhhbmRsZVN1Ym1pdClcbiAgKTtcbn1cbmlmIChhZGRDb21tZW50Rm9ybXMpIHtcbiAgaW5pdCgpO1xufVxuIl19
},{"axios":6}],2:[function(require,module,exports){
"use strict";

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var deleteBtns = document.querySelectorAll("#jsDeleteComment");
var selectedBtn;
var targetPhotoBlock;
var deletedList;
var parent;

var decreaseNumber = () => {
  var commentNumber = targetPhotoBlock.querySelector("#jsCommentNumber");
  commentNumber.innerText = parseInt(commentNumber.innerText, 10) - 1;
};

var hideElement = () => {
  parent.removeChild(deletedList);
  decreaseNumber();
};

var deleteComment = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (url) {
    var commentId = url.split("/")[2];
    var photoId;

    if (window.location.pathname === "/") {
      var a = targetPhotoBlock.querySelector("a");
      var photoUrl = a.getAttribute("href"); // eslint-disable-next-line prefer-destructuring

      photoId = photoUrl.split("/")[2];
    } else {
      // eslint-disable-next-line prefer-destructuring
      photoId = window.location.pathname.split("/")[2];
    }

    var response = yield (0, _axios.default)({
      url,
      method: "POST",
      data: {
        commentId,
        photoId
      }
    });

    if (response.status === 200) {
      hideElement();
    }
  });

  return function deleteComment(_x) {
    return _ref.apply(this, arguments);
  };
}();

var handleClick = event => {
  event.preventDefault();
  [,,,, deletedList, parent, targetPhotoBlock] = event.path;
  selectedBtn = event.currentTarget;
  var targetCommentUrl = selectedBtn.getAttribute("href");
  deleteComment(targetCommentUrl);
};

function init() {
  deleteBtns.forEach(elem => elem.addEventListener("click", handleClick));
}

if (deleteBtns) {
  init();
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlbGV0ZUNvbW1lbnQuanMiXSwibmFtZXMiOlsiZGVsZXRlQnRucyIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvckFsbCIsInNlbGVjdGVkQnRuIiwidGFyZ2V0UGhvdG9CbG9jayIsImRlbGV0ZWRMaXN0IiwicGFyZW50IiwiZGVjcmVhc2VOdW1iZXIiLCJjb21tZW50TnVtYmVyIiwicXVlcnlTZWxlY3RvciIsImlubmVyVGV4dCIsInBhcnNlSW50IiwiaGlkZUVsZW1lbnQiLCJyZW1vdmVDaGlsZCIsImRlbGV0ZUNvbW1lbnQiLCJ1cmwiLCJjb21tZW50SWQiLCJzcGxpdCIsInBob3RvSWQiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsInBhdGhuYW1lIiwiYSIsInBob3RvVXJsIiwiZ2V0QXR0cmlidXRlIiwicmVzcG9uc2UiLCJtZXRob2QiLCJkYXRhIiwic3RhdHVzIiwiaGFuZGxlQ2xpY2siLCJldmVudCIsInByZXZlbnREZWZhdWx0IiwicGF0aCIsImN1cnJlbnRUYXJnZXQiLCJ0YXJnZXRDb21tZW50VXJsIiwiaW5pdCIsImZvckVhY2giLCJlbGVtIiwiYWRkRXZlbnRMaXN0ZW5lciJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7Ozs7Ozs7QUFFQSxJQUFNQSxVQUFVLEdBQUdDLFFBQVEsQ0FBQ0MsZ0JBQVQsQ0FBMEIsa0JBQTFCLENBQW5CO0FBQ0EsSUFBSUMsV0FBSjtBQUNBLElBQUlDLGdCQUFKO0FBQ0EsSUFBSUMsV0FBSjtBQUNBLElBQUlDLE1BQUo7O0FBRUEsSUFBTUMsY0FBYyxHQUFHLE1BQU07QUFDM0IsTUFBTUMsYUFBYSxHQUFHSixnQkFBZ0IsQ0FBQ0ssYUFBakIsQ0FBK0Isa0JBQS9CLENBQXRCO0FBQ0FELEVBQUFBLGFBQWEsQ0FBQ0UsU0FBZCxHQUEwQkMsUUFBUSxDQUFDSCxhQUFhLENBQUNFLFNBQWYsRUFBMEIsRUFBMUIsQ0FBUixHQUF3QyxDQUFsRTtBQUNELENBSEQ7O0FBSUEsSUFBTUUsV0FBVyxHQUFHLE1BQU07QUFDeEJOLEVBQUFBLE1BQU0sQ0FBQ08sV0FBUCxDQUFtQlIsV0FBbkI7QUFDQUUsRUFBQUEsY0FBYztBQUNmLENBSEQ7O0FBSUEsSUFBTU8sYUFBYTtBQUFBLCtCQUFHLFdBQU9DLEdBQVAsRUFBZTtBQUNuQyxRQUFNQyxTQUFTLEdBQUdELEdBQUcsQ0FBQ0UsS0FBSixDQUFVLEdBQVYsRUFBZSxDQUFmLENBQWxCO0FBQ0EsUUFBSUMsT0FBSjs7QUFDQSxRQUFJQyxNQUFNLENBQUNDLFFBQVAsQ0FBZ0JDLFFBQWhCLEtBQTZCLEdBQWpDLEVBQXNDO0FBQ3BDLFVBQU1DLENBQUMsR0FBR2xCLGdCQUFnQixDQUFDSyxhQUFqQixDQUErQixHQUEvQixDQUFWO0FBQ0EsVUFBTWMsUUFBUSxHQUFHRCxDQUFDLENBQUNFLFlBQUYsQ0FBZSxNQUFmLENBQWpCLENBRm9DLENBR3BDOztBQUNBTixNQUFBQSxPQUFPLEdBQUdLLFFBQVEsQ0FBQ04sS0FBVCxDQUFlLEdBQWYsRUFBb0IsQ0FBcEIsQ0FBVjtBQUNELEtBTEQsTUFLTztBQUNMO0FBQ0FDLE1BQUFBLE9BQU8sR0FBR0MsTUFBTSxDQUFDQyxRQUFQLENBQWdCQyxRQUFoQixDQUF5QkosS0FBekIsQ0FBK0IsR0FBL0IsRUFBb0MsQ0FBcEMsQ0FBVjtBQUNEOztBQUNELFFBQU1RLFFBQVEsU0FBUyxvQkFBTTtBQUMzQlYsTUFBQUEsR0FEMkI7QUFFM0JXLE1BQUFBLE1BQU0sRUFBRSxNQUZtQjtBQUczQkMsTUFBQUEsSUFBSSxFQUFFO0FBQ0pYLFFBQUFBLFNBREk7QUFFSkUsUUFBQUE7QUFGSTtBQUhxQixLQUFOLENBQXZCOztBQVFBLFFBQUlPLFFBQVEsQ0FBQ0csTUFBVCxLQUFvQixHQUF4QixFQUE2QjtBQUMzQmhCLE1BQUFBLFdBQVc7QUFDWjtBQUNGLEdBdkJrQjs7QUFBQSxrQkFBYkUsYUFBYTtBQUFBO0FBQUE7QUFBQSxHQUFuQjs7QUF3QkEsSUFBTWUsV0FBVyxHQUFJQyxLQUFELElBQVc7QUFDN0JBLEVBQUFBLEtBQUssQ0FBQ0MsY0FBTjtBQUNBLFFBQVMxQixXQUFULEVBQXNCQyxNQUF0QixFQUE4QkYsZ0JBQTlCLElBQWtEMEIsS0FBSyxDQUFDRSxJQUF4RDtBQUNBN0IsRUFBQUEsV0FBVyxHQUFHMkIsS0FBSyxDQUFDRyxhQUFwQjtBQUNBLE1BQU1DLGdCQUFnQixHQUFHL0IsV0FBVyxDQUFDcUIsWUFBWixDQUF5QixNQUF6QixDQUF6QjtBQUNBVixFQUFBQSxhQUFhLENBQUNvQixnQkFBRCxDQUFiO0FBQ0QsQ0FORDs7QUFPQSxTQUFTQyxJQUFULEdBQWdCO0FBQ2RuQyxFQUFBQSxVQUFVLENBQUNvQyxPQUFYLENBQW9CQyxJQUFELElBQVVBLElBQUksQ0FBQ0MsZ0JBQUwsQ0FBc0IsT0FBdEIsRUFBK0JULFdBQS9CLENBQTdCO0FBQ0Q7O0FBQ0QsSUFBSTdCLFVBQUosRUFBZ0I7QUFDZG1DLEVBQUFBLElBQUk7QUFDTCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBheGlvcyBmcm9tIFwiYXhpb3NcIjtcblxuY29uc3QgZGVsZXRlQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIjanNEZWxldGVDb21tZW50XCIpO1xubGV0IHNlbGVjdGVkQnRuO1xubGV0IHRhcmdldFBob3RvQmxvY2s7XG5sZXQgZGVsZXRlZExpc3Q7XG5sZXQgcGFyZW50O1xuXG5jb25zdCBkZWNyZWFzZU51bWJlciA9ICgpID0+IHtcbiAgY29uc3QgY29tbWVudE51bWJlciA9IHRhcmdldFBob3RvQmxvY2sucXVlcnlTZWxlY3RvcihcIiNqc0NvbW1lbnROdW1iZXJcIik7XG4gIGNvbW1lbnROdW1iZXIuaW5uZXJUZXh0ID0gcGFyc2VJbnQoY29tbWVudE51bWJlci5pbm5lclRleHQsIDEwKSAtIDE7XG59O1xuY29uc3QgaGlkZUVsZW1lbnQgPSAoKSA9PiB7XG4gIHBhcmVudC5yZW1vdmVDaGlsZChkZWxldGVkTGlzdCk7XG4gIGRlY3JlYXNlTnVtYmVyKCk7XG59O1xuY29uc3QgZGVsZXRlQ29tbWVudCA9IGFzeW5jICh1cmwpID0+IHtcbiAgY29uc3QgY29tbWVudElkID0gdXJsLnNwbGl0KFwiL1wiKVsyXTtcbiAgbGV0IHBob3RvSWQ7XG4gIGlmICh3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgPT09IFwiL1wiKSB7XG4gICAgY29uc3QgYSA9IHRhcmdldFBob3RvQmxvY2sucXVlcnlTZWxlY3RvcihcImFcIik7XG4gICAgY29uc3QgcGhvdG9VcmwgPSBhLmdldEF0dHJpYnV0ZShcImhyZWZcIik7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHByZWZlci1kZXN0cnVjdHVyaW5nXG4gICAgcGhvdG9JZCA9IHBob3RvVXJsLnNwbGl0KFwiL1wiKVsyXTtcbiAgfSBlbHNlIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcHJlZmVyLWRlc3RydWN0dXJpbmdcbiAgICBwaG90b0lkID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLnNwbGl0KFwiL1wiKVsyXTtcbiAgfVxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGF4aW9zKHtcbiAgICB1cmwsXG4gICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICBkYXRhOiB7XG4gICAgICBjb21tZW50SWQsXG4gICAgICBwaG90b0lkLFxuICAgIH0sXG4gIH0pO1xuICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSAyMDApIHtcbiAgICBoaWRlRWxlbWVudCgpO1xuICB9XG59O1xuY29uc3QgaGFuZGxlQ2xpY2sgPSAoZXZlbnQpID0+IHtcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgWywgLCAsICwgZGVsZXRlZExpc3QsIHBhcmVudCwgdGFyZ2V0UGhvdG9CbG9ja10gPSBldmVudC5wYXRoO1xuICBzZWxlY3RlZEJ0biA9IGV2ZW50LmN1cnJlbnRUYXJnZXQ7XG4gIGNvbnN0IHRhcmdldENvbW1lbnRVcmwgPSBzZWxlY3RlZEJ0bi5nZXRBdHRyaWJ1dGUoXCJocmVmXCIpO1xuICBkZWxldGVDb21tZW50KHRhcmdldENvbW1lbnRVcmwpO1xufTtcbmZ1bmN0aW9uIGluaXQoKSB7XG4gIGRlbGV0ZUJ0bnMuZm9yRWFjaCgoZWxlbSkgPT4gZWxlbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlQ2xpY2spKTtcbn1cbmlmIChkZWxldGVCdG5zKSB7XG4gIGluaXQoKTtcbn1cbiJdfQ==
},{"axios":6}],3:[function(require,module,exports){
"use strict";

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var editCommentElems = document.querySelectorAll("#jsEditComment");
var selectedList;
var editForm;
var currentComment;
var editIcon;
var deleteIcon;

var edit = editedComment => {
  var span = document.createElement("span");
  span.innerHTML = editedComment;
  var parent = selectedList.querySelector(".commentBlock__contents");
  parent.appendChild(span);
  editForm.classList.remove("show-element");
  editForm.classList.add("hide-element");
  editIcon.classList.remove("hide-element");
  editIcon.classList.add("show-element");
  deleteIcon.classList.remove("hide-element");
  deleteIcon.classList.add("show-element");
};

var sendComment = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (editedComment) {
    var a = selectedList.querySelector("#jsEditComment");
    var commentId = a.getAttribute("href");
    var response = yield (0, _axios.default)({
      url: commentId,
      method: "POST",
      data: {
        editedComment
      }
    });

    if (response.status === 200) {
      edit(editedComment);
    }
  });

  return function sendComment(_x) {
    return _ref.apply(this, arguments);
  };
}();

var handleSubmit = event => {
  event.preventDefault();
  var commentInput = editForm.querySelector("input");
  var editedComment = commentInput.value;
  sendComment(editedComment);
  commentInput.value = "";
};

var toggleShowing = elem => {
  if (elem.classList.contains("show-element")) {
    elem.classList.remove("show-element");
    elem.classList.add("hide-element");
  } else if (elem.classList.contains("hide-element")) {
    elem.classList.remove("hide-element");
    elem.classList.add("show-element");
  }
};

var handleClick = event => {
  event.preventDefault();
  selectedList = event.currentTarget.parentNode.parentNode;
  editForm = selectedList.querySelector("#jsEditCommentForm");
  currentComment = selectedList.querySelector("#jsCurrentComment");
  editIcon = event.currentTarget;
  deleteIcon = editIcon.nextSibling;
  toggleShowing(editForm);
  toggleShowing(currentComment);
  toggleShowing(editIcon);
  toggleShowing(deleteIcon);
  editForm.addEventListener("submit", handleSubmit);
};

function init() {
  editCommentElems.forEach(item => item.addEventListener("click", handleClick));
}

if (editCommentElems) {
  init();
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVkaXRDb21tZW50LmpzIl0sIm5hbWVzIjpbImVkaXRDb21tZW50RWxlbXMiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJzZWxlY3RlZExpc3QiLCJlZGl0Rm9ybSIsImN1cnJlbnRDb21tZW50IiwiZWRpdEljb24iLCJkZWxldGVJY29uIiwiZWRpdCIsImVkaXRlZENvbW1lbnQiLCJzcGFuIiwiY3JlYXRlRWxlbWVudCIsImlubmVySFRNTCIsInBhcmVudCIsInF1ZXJ5U2VsZWN0b3IiLCJhcHBlbmRDaGlsZCIsImNsYXNzTGlzdCIsInJlbW92ZSIsImFkZCIsInNlbmRDb21tZW50IiwiYSIsImNvbW1lbnRJZCIsImdldEF0dHJpYnV0ZSIsInJlc3BvbnNlIiwidXJsIiwibWV0aG9kIiwiZGF0YSIsInN0YXR1cyIsImhhbmRsZVN1Ym1pdCIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCJjb21tZW50SW5wdXQiLCJ2YWx1ZSIsInRvZ2dsZVNob3dpbmciLCJlbGVtIiwiY29udGFpbnMiLCJoYW5kbGVDbGljayIsImN1cnJlbnRUYXJnZXQiLCJwYXJlbnROb2RlIiwibmV4dFNpYmxpbmciLCJhZGRFdmVudExpc3RlbmVyIiwiaW5pdCIsImZvckVhY2giLCJpdGVtIl0sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7OztBQUVBLElBQU1BLGdCQUFnQixHQUFHQyxRQUFRLENBQUNDLGdCQUFULENBQTBCLGdCQUExQixDQUF6QjtBQUNBLElBQUlDLFlBQUo7QUFDQSxJQUFJQyxRQUFKO0FBQ0EsSUFBSUMsY0FBSjtBQUNBLElBQUlDLFFBQUo7QUFDQSxJQUFJQyxVQUFKOztBQUVBLElBQU1DLElBQUksR0FBSUMsYUFBRCxJQUFtQjtBQUM5QixNQUFNQyxJQUFJLEdBQUdULFFBQVEsQ0FBQ1UsYUFBVCxDQUF1QixNQUF2QixDQUFiO0FBQ0FELEVBQUFBLElBQUksQ0FBQ0UsU0FBTCxHQUFpQkgsYUFBakI7QUFDQSxNQUFNSSxNQUFNLEdBQUdWLFlBQVks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QUF0QjtBQUNBTixFQUFBQSxhQUFhLENBQUM3QixRQUFELENBQWI7QUFDQTZCLEVBQUFBLGFBQWEsQ0FBQzVCLGNBQUQsQ0FBYjtBQUNBNEIsRUFBQUEsYUFBYSxDQUFDM0IsUUFBRCxDQUFiO0FBQ0EyQixFQUFBQSxhQUFhLENBQUMxQixVQUFELENBQWI7QUFDQUgsRUFBQUEsUUFBUSxDQUFDb0MsZ0JBQVQsQ0FBMEIsUUFBMUIsRUFBb0NaLFlBQXBDO0FBQ0QsQ0FaRDs7QUFjQSxTQUFTYSxJQUFULEdBQWdCO0FBQ2R6QyxFQUFBQSxnQkFBZ0IsQ0FBQzBDLE9BQWpCLENBQTBCQyxJQUFELElBQ3ZCQSxJQUFJLENBQUNILGdCQUFMLENBQXNCLE9BQXRCLEVBQStCSixXQUEvQixDQURGO0FBR0Q7O0FBQ0QsSUFBSXBDLGdCQUFKLEVBQXNCO0FBQ3BCeUMsRUFBQUEsSUFBSTtBQUNMIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGF4aW9zIGZyb20gXCJheGlvc1wiO1xuXG5jb25zdCBlZGl0Q29tbWVudEVsZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIiNqc0VkaXRDb21tZW50XCIpO1xubGV0IHNlbGVjdGVkTGlzdDtcbmxldCBlZGl0Rm9ybTtcbmxldCBjdXJyZW50Q29tbWVudDtcbmxldCBlZGl0SWNvbjtcbmxldCBkZWxldGVJY29uO1xuXG5jb25zdCBlZGl0ID0gKGVkaXRlZENvbW1lbnQpID0+IHtcbiAgY29uc3Qgc3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICBzcGFuLmlubmVySFRNTCA9IGVkaXRlZENvbW1lbnQ7XG4gIGNvbnN0IHBhcmVudCA9IHNlbGVjdGVkTGlzdC5xdWVyeVNlbGVjdG9yKFwiLmNvbW1lbnRCbG9ja19fY29udGVudHNcIik7XG4gIHBhcmVudC5hcHBlbmRDaGlsZChzcGFuKTtcbiAgZWRpdEZvcm0uY2xhc3NMaXN0LnJlbW92ZShcInNob3ctZWxlbWVudFwiKTtcbiAgZWRpdEZvcm0uY2xhc3NMaXN0LmFkZChcImhpZGUtZWxlbWVudFwiKTtcbiAgZWRpdEljb24uY2xhc3NMaXN0LnJlbW92ZShcImhpZGUtZWxlbWVudFwiKTtcbiAgZWRpdEljb24uY2xhc3NMaXN0LmFkZChcInNob3ctZWxlbWVudFwiKTtcbiAgZGVsZXRlSWNvbi5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZS1lbGVtZW50XCIpO1xuICBkZWxldGVJY29uLmNsYXNzTGlzdC5hZGQoXCJzaG93LWVsZW1lbnRcIik7XG59O1xuXG5jb25zdCBzZW5kQ29tbWVudCA9IGFzeW5jIChlZGl0ZWRDb21tZW50KSA9PiB7XG4gIGNvbnN0IGEgPSBzZWxlY3RlZExpc3QucXVlcnlTZWxlY3RvcihcIiNqc0VkaXRDb21tZW50XCIpO1xuICBjb25zdCBjb21tZW50SWQgPSBhLmdldEF0dHJpYnV0ZShcImhyZWZcIik7XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXhpb3Moe1xuICAgIHVybDogY29tbWVudElkLFxuICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgZGF0YToge1xuICAgICAgZWRpdGVkQ29tbWVudCxcbiAgICB9LFxuICB9KTtcbiAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gMjAwKSB7XG4gICAgZWRpdChlZGl0ZWRDb21tZW50KTtcbiAgfVxufTtcbmNvbnN0IGhhbmRsZVN1Ym1pdCA9IChldmVudCkgPT4ge1xuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICBjb25zdCBjb21tZW50SW5wdXQgPSBlZGl0Rm9ybS5xdWVyeVNlbGVjdG9yKFwiaW5wdXRcIik7XG4gIGNvbnN0IGVkaXRlZENvbW1lbnQgPSBjb21tZW50SW5wdXQudmFsdWU7XG4gIHNlbmRDb21tZW50KGVkaXRlZENvbW1lbnQpO1xuICBjb21tZW50SW5wdXQudmFsdWUgPSBcIlwiO1xufTtcbmNvbnN0IHRvZ2dsZVNob3dpbmcgPSAoZWxlbSkgPT4ge1xuICBpZiAoZWxlbS5jbGFzc0xpc3QuY29udGFpbnMoXCJzaG93LWVsZW1lbnRcIikpIHtcbiAgICBlbGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJzaG93LWVsZW1lbnRcIik7XG4gICAgZWxlbS5jbGFzc0xpc3QuYWRkKFwiaGlkZS1lbGVtZW50XCIpO1xuICB9IGVsc2UgaWYgKGVsZW0uY2xhc3NMaXN0LmNvbnRhaW5zKFwiaGlkZS1lbGVtZW50XCIpKSB7XG4gICAgZWxlbS5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZS1lbGVtZW50XCIpO1xuICAgIGVsZW0uY2xhc3NMaXN0LmFkZChcInNob3ctZWxlbWVudFwiKTtcbiAgfVxufTtcbmNvbnN0IGhhbmRsZUNsaWNrID0gKGV2ZW50KSA9PiB7XG4gIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIHNlbGVjdGVkTGlzdCA9IGV2ZW50LmN1cnJlbnRUYXJnZXQucGFyZW50Tm9kZS5wYXJlbnROb2RlO1xuICBlZGl0Rm9ybSA9IHNlbGVjdGVkTGlzdC5xdWVyeVNlbGVjdG9yKFwiI2pzRWRpdENvbW1lbnRGb3JtXCIpO1xuICBjdXJyZW50Q29tbWVudCA9IHNlbGVjdGVkTGlzdC5xdWVyeVNlbGVjdG9yKFwiI2pzQ3VycmVudENvbW1lbnRcIik7XG4gIGVkaXRJY29uID0gZXZlbnQuY3VycmVudFRhcmdldDtcbiAgZGVsZXRlSWNvbiA9IGVkaXRJY29uLm5leHRTaWJsaW5nO1xuICB0b2dnbGVTaG93aW5nKGVkaXRGb3JtKTtcbiAgdG9nZ2xlU2hvd2luZyhjdXJyZW50Q29tbWVudCk7XG4gIHRvZ2dsZVNob3dpbmcoZWRpdEljb24pO1xuICB0b2dnbGVTaG93aW5nKGRlbGV0ZUljb24pO1xuICBlZGl0Rm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIGhhbmRsZVN1Ym1pdCk7XG59O1xuXG5mdW5jdGlvbiBpbml0KCkge1xuICBlZGl0Q29tbWVudEVsZW1zLmZvckVhY2goKGl0ZW0pID0+XG4gICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlQ2xpY2spXG4gICk7XG59XG5pZiAoZWRpdENvbW1lbnRFbGVtcykge1xuICBpbml0KCk7XG59XG4iXX0=
},{"axios":6}],4:[function(require,module,exports){
"use strict";

require("./addComment");

require("./editComment");

require("./deleteComment");

require("./navigation");
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZha2VfOGYyYzY1NWMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBcIi4vYWRkQ29tbWVudFwiO1xuaW1wb3J0IFwiLi9lZGl0Q29tbWVudFwiO1xuaW1wb3J0IFwiLi9kZWxldGVDb21tZW50XCI7XG5pbXBvcnQgXCIuL25hdmlnYXRpb25cIjtcbi8vIGltcG9ydCBcIi4vbWVkaWFxdWVyeVwiO1xuIl19
},{"./addComment":1,"./deleteComment":2,"./editComment":3,"./navigation":5}],5:[function(require,module,exports){
"use strict";

var dropDown = document.querySelector("#jsDropDown");
var dropBtn = dropDown.querySelector("i");
var dropDownContent = dropDown.querySelector("#jsDropDownContent");

var handleHover = event => {
  dropDownContent.classList.toggle("dropdown-show");

  if (event.target !== dropBtn) {
    if (dropDownContent.classList.contains("drop-down-show")) dropDownContent.classList.remove("dropdown-show");
  }
};

function init() {
  window.addEventListener("click", handleHover);
}

if (dropDown) {
  init();
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5hdmlnYXRpb24uanMiXSwibmFtZXMiOlsiZHJvcERvd24iLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJkcm9wQnRuIiwiZHJvcERvd25Db250ZW50IiwiaGFuZGxlSG92ZXIiLCJldmVudCIsImNsYXNzTGlzdCIsInRvZ2dsZSIsInRhcmdldCIsImNvbnRhaW5zIiwicmVtb3ZlIiwiaW5pdCIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBTUEsUUFBUSxHQUFHQyxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsYUFBdkIsQ0FBakI7QUFDQSxJQUFNQyxPQUFPLEdBQUdILFFBQVEsQ0FBQ0UsYUFBVCxDQUF1QixHQUF2QixDQUFoQjtBQUNBLElBQU1FLGVBQWUsR0FBR0osUUFBUSxDQUFDRSxhQUFULENBQXVCLG9CQUF2QixDQUF4Qjs7QUFFQSxJQUFNRyxXQUFXLEdBQUlDLEtBQUQsSUFBVztBQUM3QkYsRUFBQUEsZUFBZSxDQUFDRyxTQUFoQixDQUEwQkMsTUFBMUIsQ0FBaUMsZUFBakM7O0FBQ0EsTUFBSUYsS0FBSyxDQUFDRyxNQUFOLEtBQWlCTixPQUFyQixFQUE4QjtBQUM1QixRQUFJQyxlQUFlLENBQUNHLFNBQWhCLENBQTBCRyxRQUExQixDQUFtQyxnQkFBbkMsQ0FBSixFQUNFTixlQUFlLENBQUNHLFNBQWhCLENBQTBCSSxNQUExQixDQUFpQyxlQUFqQztBQUNIO0FBQ0YsQ0FORDs7QUFRQSxTQUFTQyxJQUFULEdBQWdCO0FBQ2RDLEVBQUFBLE1BQU0sQ0FBQ0MsZ0JBQVAsQ0FBd0IsT0FBeEIsRUFBaUNULFdBQWpDO0FBQ0Q7O0FBRUQsSUFBSUwsUUFBSixFQUFjO0FBQ1pZLEVBQUFBLElBQUk7QUFDTCIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGRyb3BEb3duID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNqc0Ryb3BEb3duXCIpO1xuY29uc3QgZHJvcEJ0biA9IGRyb3BEb3duLnF1ZXJ5U2VsZWN0b3IoXCJpXCIpO1xuY29uc3QgZHJvcERvd25Db250ZW50ID0gZHJvcERvd24ucXVlcnlTZWxlY3RvcihcIiNqc0Ryb3BEb3duQ29udGVudFwiKTtcblxuY29uc3QgaGFuZGxlSG92ZXIgPSAoZXZlbnQpID0+IHtcbiAgZHJvcERvd25Db250ZW50LmNsYXNzTGlzdC50b2dnbGUoXCJkcm9wZG93bi1zaG93XCIpO1xuICBpZiAoZXZlbnQudGFyZ2V0ICE9PSBkcm9wQnRuKSB7XG4gICAgaWYgKGRyb3BEb3duQ29udGVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJkcm9wLWRvd24tc2hvd1wiKSlcbiAgICAgIGRyb3BEb3duQ29udGVudC5jbGFzc0xpc3QucmVtb3ZlKFwiZHJvcGRvd24tc2hvd1wiKTtcbiAgfVxufTtcblxuZnVuY3Rpb24gaW5pdCgpIHtcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVIb3Zlcik7XG59XG5cbmlmIChkcm9wRG93bikge1xuICBpbml0KCk7XG59XG4iXX0=
},{}],6:[function(require,module,exports){
module.exports = require('./lib/axios');
},{"./lib/axios":8}],7:[function(require,module,exports){
'use strict';

var utils = require('./../utils');
var settle = require('./../core/settle');
var cookies = require('./../helpers/cookies');
var buildURL = require('./../helpers/buildURL');
var buildFullPath = require('../core/buildFullPath');
var parseHeaders = require('./../helpers/parseHeaders');
var isURLSameOrigin = require('./../helpers/isURLSameOrigin');
var createError = require('../core/createError');

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request.onreadystatechange = function handleLoad() {
      if (!request || request.readyState !== 4) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(createError(timeoutErrorMessage, config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (!requestData) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};

},{"../core/buildFullPath":14,"../core/createError":15,"./../core/settle":19,"./../helpers/buildURL":23,"./../helpers/cookies":25,"./../helpers/isURLSameOrigin":28,"./../helpers/parseHeaders":30,"./../utils":32}],8:[function(require,module,exports){
'use strict';

var utils = require('./utils');
var bind = require('./helpers/bind');
var Axios = require('./core/Axios');
var mergeConfig = require('./core/mergeConfig');
var defaults = require('./defaults');

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = require('./cancel/Cancel');
axios.CancelToken = require('./cancel/CancelToken');
axios.isCancel = require('./cancel/isCancel');

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = require('./helpers/spread');

// Expose isAxiosError
axios.isAxiosError = require('./helpers/isAxiosError');

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;

},{"./cancel/Cancel":9,"./cancel/CancelToken":10,"./cancel/isCancel":11,"./core/Axios":12,"./core/mergeConfig":18,"./defaults":21,"./helpers/bind":22,"./helpers/isAxiosError":27,"./helpers/spread":31,"./utils":32}],9:[function(require,module,exports){
'use strict';

/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;

},{}],10:[function(require,module,exports){
'use strict';

var Cancel = require('./Cancel');

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;

},{"./Cancel":9}],11:[function(require,module,exports){
'use strict';

module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};

},{}],12:[function(require,module,exports){
'use strict';

var utils = require('./../utils');
var buildURL = require('../helpers/buildURL');
var InterceptorManager = require('./InterceptorManager');
var dispatchRequest = require('./dispatchRequest');
var mergeConfig = require('./mergeConfig');

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config);

  // Set config.method
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: (config || {}).data
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;

},{"../helpers/buildURL":23,"./../utils":32,"./InterceptorManager":13,"./dispatchRequest":16,"./mergeConfig":18}],13:[function(require,module,exports){
'use strict';

var utils = require('./../utils');

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;

},{"./../utils":32}],14:[function(require,module,exports){
'use strict';

var isAbsoluteURL = require('../helpers/isAbsoluteURL');
var combineURLs = require('../helpers/combineURLs');

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */
module.exports = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
};

},{"../helpers/combineURLs":24,"../helpers/isAbsoluteURL":26}],15:[function(require,module,exports){
'use strict';

var enhanceError = require('./enhanceError');

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};

},{"./enhanceError":17}],16:[function(require,module,exports){
'use strict';

var utils = require('./../utils');
var transformData = require('./transformData');
var isCancel = require('../cancel/isCancel');
var defaults = require('../defaults');

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};

},{"../cancel/isCancel":11,"../defaults":21,"./../utils":32,"./transformData":20}],17:[function(require,module,exports){
'use strict';

/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code
    };
  };
  return error;
};

},{}],18:[function(require,module,exports){
'use strict';

var utils = require('../utils');

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  var valueFromConfig2Keys = ['url', 'method', 'data'];
  var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy', 'params'];
  var defaultToConfig2Keys = [
    'baseURL', 'transformRequest', 'transformResponse', 'paramsSerializer',
    'timeout', 'timeoutMessage', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
    'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'decompress',
    'maxContentLength', 'maxBodyLength', 'maxRedirects', 'transport', 'httpAgent',
    'httpsAgent', 'cancelToken', 'socketPath', 'responseEncoding'
  ];
  var directMergeKeys = ['validateStatus'];

  function getMergedValue(target, source) {
    if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
      return utils.merge(target, source);
    } else if (utils.isPlainObject(source)) {
      return utils.merge({}, source);
    } else if (utils.isArray(source)) {
      return source.slice();
    }
    return source;
  }

  function mergeDeepProperties(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  }

  utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    }
  });

  utils.forEach(mergeDeepPropertiesKeys, mergeDeepProperties);

  utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });

  utils.forEach(directMergeKeys, function merge(prop) {
    if (prop in config2) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (prop in config1) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });

  var axiosKeys = valueFromConfig2Keys
    .concat(mergeDeepPropertiesKeys)
    .concat(defaultToConfig2Keys)
    .concat(directMergeKeys);

  var otherKeys = Object
    .keys(config1)
    .concat(Object.keys(config2))
    .filter(function filterAxiosKeys(key) {
      return axiosKeys.indexOf(key) === -1;
    });

  utils.forEach(otherKeys, mergeDeepProperties);

  return config;
};

},{"../utils":32}],19:[function(require,module,exports){
'use strict';

var createError = require('./createError');

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};

},{"./createError":15}],20:[function(require,module,exports){
'use strict';

var utils = require('./../utils');

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};

},{"./../utils":32}],21:[function(require,module,exports){
(function (process){
'use strict';

var utils = require('./utils');
var normalizeHeaderName = require('./helpers/normalizeHeaderName');

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = require('./adapters/xhr');
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = require('./adapters/http');
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,
  maxBodyLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

}).call(this,require("rH1JPG"))
},{"./adapters/http":7,"./adapters/xhr":7,"./helpers/normalizeHeaderName":29,"./utils":32,"rH1JPG":33}],22:[function(require,module,exports){
'use strict';

module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};

},{}],23:[function(require,module,exports){
'use strict';

var utils = require('./../utils');

function encode(val) {
  return encodeURIComponent(val).
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};

},{"./../utils":32}],24:[function(require,module,exports){
'use strict';

/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};

},{}],25:[function(require,module,exports){
'use strict';

var utils = require('./../utils');

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

  // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
);

},{"./../utils":32}],26:[function(require,module,exports){
'use strict';

/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};

},{}],27:[function(require,module,exports){
'use strict';

/**
 * Determines whether the payload is an error thrown by Axios
 *
 * @param {*} payload The value to test
 * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
 */
module.exports = function isAxiosError(payload) {
  return (typeof payload === 'object') && (payload.isAxiosError === true);
};

},{}],28:[function(require,module,exports){
'use strict';

var utils = require('./../utils');

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
        var href = url;

        if (msie) {
        // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
      return function isURLSameOrigin(requestURL) {
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);

},{"./../utils":32}],29:[function(require,module,exports){
'use strict';

var utils = require('../utils');

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};

},{"../utils":32}],30:[function(require,module,exports){
'use strict';

var utils = require('./../utils');

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};

},{"./../utils":32}],31:[function(require,module,exports){
'use strict';

/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};

},{}],32:[function(require,module,exports){
'use strict';

var bind = require('./helpers/bind');

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a plain Object
 *
 * @param {Object} val The value to test
 * @return {boolean} True if value is a plain Object, otherwise false
 */
function isPlainObject(val) {
  if (toString.call(val) !== '[object Object]') {
    return false;
  }

  var prototype = Object.getPrototypeOf(val);
  return prototype === null || prototype === Object.prototype;
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (isPlainObject(result[key]) && isPlainObject(val)) {
      result[key] = merge(result[key], val);
    } else if (isPlainObject(val)) {
      result[key] = merge({}, val);
    } else if (isArray(val)) {
      result[key] = val.slice();
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 * @return {string} content value without BOM
 */
function stripBOM(content) {
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return content;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isPlainObject: isPlainObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim,
  stripBOM: stripBOM
};

},{"./helpers/bind":22}],33:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}]},{},[4])