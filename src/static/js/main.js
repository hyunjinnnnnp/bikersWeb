(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var addCommentForm = document.querySelector("#jsAddComment");
var commentList = document.querySelector("#jsCommentList");
var commentNumber = document.querySelector("#jsCommentNumber");
var avatarElement = document.querySelector("#jsAvatarElement");

var increaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;
};

var addComment = comment => {
  var avatarUrl = avatarElement.getAttribute("src");
  var li = document.createElement("li");
  var img = document.createElement("img");
  var span = document.createElement("span");
  img.setAttribute("src", avatarUrl);
  span.innerHTML = comment;
  li.appendChild(img);
  li.appendChild(span);
  commentList.prepend(li);
  increaseNumber();
};

var sendComment = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (comment) {
    var photoId = window.location.pathname.split("/")[2];
    var response = yield (0, _axios.default)({
      url: "/api/".concat(photoId, "/comment"),
      method: "POST",
      data: {
        comment
      }
    });

    if (response.status === 200) {
      addComment(comment);
    }
  });

  return function sendComment(_x) {
    return _ref.apply(this, arguments);
  };
}();

var handleSubmit = event => {
  event.preventDefault();
  var commentInput = addCommentForm.querySelector("input");
  var comment = commentInput.value;
  sendComment(comment);
  commentInput.value = "";
};

function init() {
  addCommentForm.addEventListener("submit", handleSubmit);
}

if (addCommentForm) {
  init();
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFkZENvbW1lbnQuanMiXSwibmFtZXMiOlsiYWRkQ29tbWVudEZvcm0iLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJjb21tZW50TGlzdCIsImNvbW1lbnROdW1iZXIiLCJhdmF0YXJFbGVtZW50IiwiaW5jcmVhc2VOdW1iZXIiLCJpbm5lckhUTUwiLCJwYXJzZUludCIsImFkZENvbW1lbnQiLCJjb21tZW50IiwiYXZhdGFyVXJsIiwiZ2V0QXR0cmlidXRlIiwibGkiLCJjcmVhdGVFbGVtZW50IiwiaW1nIiwic3BhbiIsInNldEF0dHJpYnV0ZSIsImFwcGVuZENoaWxkIiwicHJlcGVuZCIsInNlbmRDb21tZW50IiwicGhvdG9JZCIsIndpbmRvdyIsImxvY2F0aW9uIiwicGF0aG5hbWUiLCJzcGxpdCIsInJlc3BvbnNlIiwidXJsIiwibWV0aG9kIiwiZGF0YSIsInN0YXR1cyIsImhhbmRsZVN1Ym1pdCIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCJjb21tZW50SW5wdXQiLCJ2YWx1ZSIsImluaXQiLCJhZGRFdmVudExpc3RlbmVyIl0sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7OztBQUVBLElBQU1BLGNBQWMsR0FBR0MsUUFBUSxDQUFDQyxhQUFULENBQXVCLGVBQXZCLENBQXZCO0FBQ0EsSUFBTUMsV0FBVyxHQUFHRixRQUFRLENBQUNDLGFBQVQsQ0FBdUIsZ0JBQXZCLENBQXBCO0FBQ0EsSUFBTUUsYUFBYSxHQUFHSCxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsa0JBQXZCLENBQXRCO0FBQ0EsSUFBTUcsYUFBYSxHQUFHSixRQUFRLENBQUNDLGFBQVQsQ0FBdUIsa0JBQXZCLENBQXRCOztBQUVBLElBQU1JLGNBQWMsR0FBRyxNQUFNO0FBQzNCRixFQUFBQSxhQUFhLENBQUNHLFNBQWQsR0FBMEJDLFFBQVEsQ0FBQ0osYUFBYSxDQUFDRyxTQUFmLEVBQTBCLEVBQTFCLENBQVIsR0FBd0MsQ0FBbEU7QUFDRCxDQUZEOztBQUdBLElBQU1FLFVBQVUsR0FBSUMsT0FBRCxJQUFhO0FBQzlCLE1BQU1DLFNBQVMsR0FBR04sYUFBYSxDQUFDTyxZQUFkLENBQTJCLEtBQTNCLENBQWxCO0FBQ0EsTUFBTUMsRUFBRSxHQUFHWixRQUFRLENBQUNhLGFBQVQsQ0FBdUIsSUFBdkIsQ0FBWDtBQUNBLE1BQU1DLEdBQUcsR0FBR2QsUUFBUSxDQUFDYSxhQUFULENBQXVCLEtBQXZCLENBQVo7QUFDQSxNQUFNRSxJQUFJLEdBQUdmLFFBQVEsQ0FBQ2EsYUFBVCxDQUF1QixNQUF2QixDQUFiO0FBQ0FDLEVBQUFBLEdBQUcsQ0FBQ0UsWUFBSixDQUFpQixLQUFqQixFQUF3Qk4sU0FBeEI7QUFDQUssRUFBQUEsSUFBSSxDQUFDVCxTQUFMLEdBQWlCRyxPQUFqQjtBQUNBRyxFQUFBQSxFQUFFLENBQUNLLFdBQUgsQ0FBZUgsR0FBZjtBQUNBRixFQUFBQSxFQUFFLENBQUNLLFdBQUgsQ0FBZUYsSUFBZjtBQUNBYixFQUFBQSxXQUFXLENBQUNnQixPQUFaLENBQW9CTixFQUFwQjtBQUNBUCxFQUFBQSxjQUFjO0FBQ2YsQ0FYRDs7QUFhQSxJQUFNYyxXQUFXO0FBQUEsK0JBQUcsV0FBT1YsT0FBUCxFQUFtQjtBQUNyQyxRQUFNVyxPQUFPLEdBQUdDLE1BQU0sQ0FBQ0MsUUFBUCxDQUFnQkMsUUFBaEIsQ0FBeUJDLEtBQXpCLENBQStCLEdBQS9CLEVBQW9DLENBQXBDLENBQWhCO0FBQ0EsUUFBTUMsUUFBUSxTQUFTLG9CQUFNO0FBQzNCQyxNQUFBQSxHQUFHLGlCQUFVTixPQUFWLGFBRHdCO0FBRTNCTyxNQUFBQSxNQUFNLEVBQUUsTUFGbUI7QUFHM0JDLE1BQUFBLElBQUksRUFBRTtBQUNKbkIsUUFBQUE7QUFESTtBQUhxQixLQUFOLENBQXZCOztBQU9BLFFBQUlnQixRQUFRLENBQUNJLE1BQVQsS0FBb0IsR0FBeEIsRUFBNkI7QUFDM0JyQixNQUFBQSxVQUFVLENBQUNDLE9BQUQsQ0FBVjtBQUNEO0FBQ0YsR0FaZ0I7O0FBQUEsa0JBQVhVLFdBQVc7QUFBQTtBQUFBO0FBQUEsR0FBakI7O0FBY0EsSUFBTVcsWUFBWSxHQUFJQyxLQUFELElBQVc7QUFDOUJBLEVBQUFBLEtBQUssQ0FBQ0MsY0FBTjtBQUNBLE1BQU1DLFlBQVksR0FBR2xDLGNBQWMsQ0FBQ0UsYUFBZixDQUE2QixPQUE3QixDQUFyQjtBQUNBLE1BQU1RLE9BQU8sR0FBR3dCLFlBQVksQ0FBQ0MsS0FBN0I7QUFDQWYsRUFBQUEsV0FBVyxDQUFDVixPQUFELENBQVg7QUFDQXdCLEVBQUFBLFlBQVksQ0FBQ0MsS0FBYixHQUFxQixFQUFyQjtBQUNELENBTkQ7O0FBUUEsU0FBU0MsSUFBVCxHQUFnQjtBQUNkcEMsRUFBQUEsY0FBYyxDQUFDcUMsZ0JBQWYsQ0FBZ0MsUUFBaEMsRUFBMENOLFlBQTFDO0FBQ0Q7O0FBQ0QsSUFBSS9CLGNBQUosRUFBb0I7QUFDbEJvQyxFQUFBQSxJQUFJO0FBQ0wiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXhpb3MgZnJvbSBcImF4aW9zXCI7XG5cbmNvbnN0IGFkZENvbW1lbnRGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNqc0FkZENvbW1lbnRcIik7XG5jb25zdCBjb21tZW50TGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjanNDb21tZW50TGlzdFwiKTtcbmNvbnN0IGNvbW1lbnROdW1iZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2pzQ29tbWVudE51bWJlclwiKTtcbmNvbnN0IGF2YXRhckVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2pzQXZhdGFyRWxlbWVudFwiKTtcblxuY29uc3QgaW5jcmVhc2VOdW1iZXIgPSAoKSA9PiB7XG4gIGNvbW1lbnROdW1iZXIuaW5uZXJIVE1MID0gcGFyc2VJbnQoY29tbWVudE51bWJlci5pbm5lckhUTUwsIDEwKSArIDE7XG59O1xuY29uc3QgYWRkQ29tbWVudCA9IChjb21tZW50KSA9PiB7XG4gIGNvbnN0IGF2YXRhclVybCA9IGF2YXRhckVsZW1lbnQuZ2V0QXR0cmlidXRlKFwic3JjXCIpO1xuICBjb25zdCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcbiAgY29uc3QgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcbiAgY29uc3Qgc3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICBpbWcuc2V0QXR0cmlidXRlKFwic3JjXCIsIGF2YXRhclVybCk7XG4gIHNwYW4uaW5uZXJIVE1MID0gY29tbWVudDtcbiAgbGkuYXBwZW5kQ2hpbGQoaW1nKTtcbiAgbGkuYXBwZW5kQ2hpbGQoc3Bhbik7XG4gIGNvbW1lbnRMaXN0LnByZXBlbmQobGkpO1xuICBpbmNyZWFzZU51bWJlcigpO1xufTtcblxuY29uc3Qgc2VuZENvbW1lbnQgPSBhc3luYyAoY29tbWVudCkgPT4ge1xuICBjb25zdCBwaG90b0lkID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLnNwbGl0KFwiL1wiKVsyXTtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBheGlvcyh7XG4gICAgdXJsOiBgL2FwaS8ke3Bob3RvSWR9L2NvbW1lbnRgLFxuICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgZGF0YToge1xuICAgICAgY29tbWVudCxcbiAgICB9LFxuICB9KTtcbiAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gMjAwKSB7XG4gICAgYWRkQ29tbWVudChjb21tZW50KTtcbiAgfVxufTtcblxuY29uc3QgaGFuZGxlU3VibWl0ID0gKGV2ZW50KSA9PiB7XG4gIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIGNvbnN0IGNvbW1lbnRJbnB1dCA9IGFkZENvbW1lbnRGb3JtLnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dFwiKTtcbiAgY29uc3QgY29tbWVudCA9IGNvbW1lbnRJbnB1dC52YWx1ZTtcbiAgc2VuZENvbW1lbnQoY29tbWVudCk7XG4gIGNvbW1lbnRJbnB1dC52YWx1ZSA9IFwiXCI7XG59O1xuXG5mdW5jdGlvbiBpbml0KCkge1xuICBhZGRDb21tZW50Rm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIGhhbmRsZVN1Ym1pdCk7XG59XG5pZiAoYWRkQ29tbWVudEZvcm0pIHtcbiAgaW5pdCgpO1xufVxuIl19
},{"axios":5}],2:[function(require,module,exports){
"use strict";

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var deleteBtns = document.querySelectorAll("#jsDeleteComment");
var selectedBtn;
var commentNumber = document.querySelector("#jsCommentNumber");

var decreaseNumber = () => {
  commentNumber.innerText = parseInt(commentNumber.innerText, 10) - 1;
};

var hideElement = () => {
  var deletedList = selectedBtn.parentNode;
  deletedList.parentNode.removeChild(deletedList);
  decreaseNumber();
};

var deleteComment = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (url) {
    var commentId = url.split("/")[2];
    var photoId = window.location.pathname.split("/")[2];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlbGV0ZUNvbW1lbnQuanMiXSwibmFtZXMiOlsiZGVsZXRlQnRucyIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvckFsbCIsInNlbGVjdGVkQnRuIiwiY29tbWVudE51bWJlciIsInF1ZXJ5U2VsZWN0b3IiLCJkZWNyZWFzZU51bWJlciIsImlubmVyVGV4dCIsInBhcnNlSW50IiwiaGlkZUVsZW1lbnQiLCJkZWxldGVkTGlzdCIsInBhcmVudE5vZGUiLCJyZW1vdmVDaGlsZCIsImRlbGV0ZUNvbW1lbnQiLCJ1cmwiLCJjb21tZW50SWQiLCJzcGxpdCIsInBob3RvSWQiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsInBhdGhuYW1lIiwicmVzcG9uc2UiLCJtZXRob2QiLCJkYXRhIiwic3RhdHVzIiwiaGFuZGxlQ2xpY2siLCJldmVudCIsInByZXZlbnREZWZhdWx0IiwiY3VycmVudFRhcmdldCIsInRhcmdldENvbW1lbnRVcmwiLCJnZXRBdHRyaWJ1dGUiLCJpbml0IiwiZm9yRWFjaCIsImVsZW0iLCJhZGRFdmVudExpc3RlbmVyIl0sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7OztBQUVBLElBQU1BLFVBQVUsR0FBR0MsUUFBUSxDQUFDQyxnQkFBVCxDQUEwQixrQkFBMUIsQ0FBbkI7QUFDQSxJQUFJQyxXQUFKO0FBQ0EsSUFBTUMsYUFBYSxHQUFHSCxRQUFRLENBQUNJLGFBQVQsQ0FBdUIsa0JBQXZCLENBQXRCOztBQUVBLElBQU1DLGNBQWMsR0FBRyxNQUFNO0FBQzNCRixFQUFBQSxhQUFhLENBQUNHLFNBQWQsR0FBMEJDLFFBQVEsQ0FBQ0osYUFBYSxDQUFDRyxTQUFmLEVBQTBCLEVBQTFCLENBQVIsR0FBd0MsQ0FBbEU7QUFDRCxDQUZEOztBQUdBLElBQU1FLFdBQVcsR0FBRyxNQUFNO0FBQ3hCLE1BQU1DLFdBQVcsR0FBR1AsV0FBVyxDQUFDUSxVQUFoQztBQUNBRCxFQUFBQSxXQUFXLENBQUNDLFVBQVosQ0FBdUJDLFdBQXZCLENBQW1DRixXQUFuQztBQUNBSixFQUFBQSxjQUFjO0FBQ2YsQ0FKRDs7QUFLQSxJQUFNTyxhQUFhO0FBQUEsK0JBQUcsV0FBT0MsR0FBUCxFQUFlO0FBQ25DLFFBQU1DLFNBQVMsR0FBR0QsR0FBRyxDQUFDRSxLQUFKLENBQVUsR0FBVixFQUFlLENBQWYsQ0FBbEI7QUFDQSxRQUFNQyxPQUFPLEdBQUdDLE1BQU0sQ0FBQ0MsUUFBUCxDQUFnQkMsUUFBaEIsQ0FBeUJKLEtBQXpCLENBQStCLEdBQS9CLEVBQW9DLENBQXBDLENBQWhCO0FBQ0EsUUFBTUssUUFBUSxTQUFTLG9CQUFNO0FBQzNCUCxNQUFBQSxHQUQyQjtBQUUzQlEsTUFBQUEsTUFBTSxFQUFFLE1BRm1CO0FBRzNCQyxNQUFBQSxJQUFJLEVBQUU7QUFDSlIsUUFBQUEsU0FESTtBQUVKRSxRQUFBQTtBQUZJO0FBSHFCLEtBQU4sQ0FBdkI7O0FBUUEsUUFBSUksUUFBUSxDQUFDRyxNQUFULEtBQW9CLEdBQXhCLEVBQTZCO0FBQzNCZixNQUFBQSxXQUFXO0FBQ1o7QUFDRixHQWRrQjs7QUFBQSxrQkFBYkksYUFBYTtBQUFBO0FBQUE7QUFBQSxHQUFuQjs7QUFlQSxJQUFNWSxXQUFXLEdBQUlDLEtBQUQsSUFBVztBQUM3QkEsRUFBQUEsS0FBSyxDQUFDQyxjQUFOO0FBQ0F4QixFQUFBQSxXQUFXLEdBQUd1QixLQUFLLENBQUNFLGFBQXBCO0FBQ0EsTUFBTUMsZ0JBQWdCLEdBQUcxQixXQUFXLENBQUMyQixZQUFaLENBQXlCLE1BQXpCLENBQXpCO0FBQ0FqQixFQUFBQSxhQUFhLENBQUNnQixnQkFBRCxDQUFiO0FBQ0QsQ0FMRDs7QUFNQSxTQUFTRSxJQUFULEdBQWdCO0FBQ2QvQixFQUFBQSxVQUFVLENBQUNnQyxPQUFYLENBQW9CQyxJQUFELElBQVVBLElBQUksQ0FBQ0MsZ0JBQUwsQ0FBc0IsT0FBdEIsRUFBK0JULFdBQS9CLENBQTdCO0FBQ0Q7O0FBQ0QsSUFBSXpCLFVBQUosRUFBZ0I7QUFDZCtCLEVBQUFBLElBQUk7QUFDTCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBheGlvcyBmcm9tIFwiYXhpb3NcIjtcblxuY29uc3QgZGVsZXRlQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIjanNEZWxldGVDb21tZW50XCIpO1xubGV0IHNlbGVjdGVkQnRuO1xuY29uc3QgY29tbWVudE51bWJlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjanNDb21tZW50TnVtYmVyXCIpO1xuXG5jb25zdCBkZWNyZWFzZU51bWJlciA9ICgpID0+IHtcbiAgY29tbWVudE51bWJlci5pbm5lclRleHQgPSBwYXJzZUludChjb21tZW50TnVtYmVyLmlubmVyVGV4dCwgMTApIC0gMTtcbn07XG5jb25zdCBoaWRlRWxlbWVudCA9ICgpID0+IHtcbiAgY29uc3QgZGVsZXRlZExpc3QgPSBzZWxlY3RlZEJ0bi5wYXJlbnROb2RlO1xuICBkZWxldGVkTGlzdC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGRlbGV0ZWRMaXN0KTtcbiAgZGVjcmVhc2VOdW1iZXIoKTtcbn07XG5jb25zdCBkZWxldGVDb21tZW50ID0gYXN5bmMgKHVybCkgPT4ge1xuICBjb25zdCBjb21tZW50SWQgPSB1cmwuc3BsaXQoXCIvXCIpWzJdO1xuICBjb25zdCBwaG90b0lkID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLnNwbGl0KFwiL1wiKVsyXTtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBheGlvcyh7XG4gICAgdXJsLFxuICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgZGF0YToge1xuICAgICAgY29tbWVudElkLFxuICAgICAgcGhvdG9JZCxcbiAgICB9LFxuICB9KTtcbiAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gMjAwKSB7XG4gICAgaGlkZUVsZW1lbnQoKTtcbiAgfVxufTtcbmNvbnN0IGhhbmRsZUNsaWNrID0gKGV2ZW50KSA9PiB7XG4gIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIHNlbGVjdGVkQnRuID0gZXZlbnQuY3VycmVudFRhcmdldDtcbiAgY29uc3QgdGFyZ2V0Q29tbWVudFVybCA9IHNlbGVjdGVkQnRuLmdldEF0dHJpYnV0ZShcImhyZWZcIik7XG4gIGRlbGV0ZUNvbW1lbnQodGFyZ2V0Q29tbWVudFVybCk7XG59O1xuZnVuY3Rpb24gaW5pdCgpIHtcbiAgZGVsZXRlQnRucy5mb3JFYWNoKChlbGVtKSA9PiBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVDbGljaykpO1xufVxuaWYgKGRlbGV0ZUJ0bnMpIHtcbiAgaW5pdCgpO1xufVxuIl19
},{"axios":5}],3:[function(require,module,exports){
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

var edit = editedComment => {
  //   currentComment = `me: ${editedComment}`;
  console.log(editIcon, currentComment, editForm); //form 없애고 span 추가

  var elem = document.createElement("span");
  elem.innerHTML = editedComment;
  selectedList.insertBefore(elem, editIcon);
  editForm.classList.remove("show-element");
  editForm.classList.add("hide-element");
};

var sendComment = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (editedComment) {
    var a = selectedList.querySelector("#jsEditComment");
    var url = a.getAttribute("href");
    var response = yield (0, _axios.default)({
      url,
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
  selectedList = event.currentTarget.parentNode;
  editForm = selectedList.querySelector("#jsEditCommentForm");
  currentComment = selectedList.querySelector("#jsCurrentComment");
  editIcon = event.currentTarget;
  toggleShowing(editForm);
  toggleShowing(currentComment);
  toggleShowing(editIcon);
  editForm.addEventListener("submit", handleSubmit);
};

function init() {
  editCommentElems.forEach(item => item.addEventListener("click", handleClick));
}

if (editCommentElems) {
  init();
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVkaXRDb21tZW50LmpzIl0sIm5hbWVzIjpbImVkaXRDb21tZW50RWxlbXMiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJzZWxlY3RlZExpc3QiLCJlZGl0Rm9ybSIsImN1cnJlbnRDb21tZW50IiwiZWRpdEljb24iLCJlZGl0IiwiZWRpdGVkQ29tbWVudCIsImNvbnNvbGUiLCJsb2ciLCJlbGVtIiwiY3JlYXRlRWxlbWVudCIsImlubmVySFRNTCIsImluc2VydEJlZm9yZSIsImNsYXNzTGlzdCIsInJlbW92ZSIsImFkZCIsInNlbmRDb21tZW50IiwiYSIsInF1ZXJ5U2VsZWN0b3IiLCJ1cmwiLCJnZXRBdHRyaWJ1dGUiLCJyZXNwb25zZSIsIm1ldGhvZCIsImRhdGEiLCJzdGF0dXMiLCJoYW5kbGVTdWJtaXQiLCJldmVudCIsInByZXZlbnREZWZhdWx0IiwiY29tbWVudElucHV0IiwidmFsdWUiLCJ0b2dnbGVTaG93aW5nIiwiY29udGFpbnMiLCJoYW5kbGVDbGljayIsImN1cnJlbnRUYXJnZXQiLCJwYXJlbnROb2RlIiwiYWRkRXZlbnRMaXN0ZW5lciIsImluaXQiLCJmb3JFYWNoIiwiaXRlbSJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7Ozs7Ozs7QUFFQSxJQUFNQSxnQkFBZ0IsR0FBR0MsUUFBUSxDQUFDQyxnQkFBVCxDQUEwQixnQkFBMUIsQ0FBekI7QUFFQSxJQUFJQyxZQUFKO0FBQ0EsSUFBSUMsUUFBSjtBQUNBLElBQUlDLGNBQUo7QUFDQSxJQUFJQyxRQUFKOztBQUVBLElBQU1DLElBQUksR0FBSUMsYUFBRCxJQUFtQjtBQUM5QjtBQUNBQyxFQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWUosUUFBWixFQUFzQkQsY0FBdEIsRUFBc0NELFFBQXRDLEVBRjhCLENBRzlCOztBQUNBLE1BQU1PLElBQUksR0FBR1YsUUFBUSxDQUFDVyxhQUFULENBQXVCLE1BQXZCLENBQWI7QUFDQUQsRUFBQUEsSUFBSSxDQUFDRSxTQUFMLEdBQWlCTCxhQUFqQjtBQUNBTCxFQUFBQSxZQUFZLENBQUNXLFlBQWIsQ0FBMEJILElBQTFCLEVBQWdDTCxRQUFoQztBQUNBRixFQUFBQSxRQUFRLENBQUNXLFNBQVQsQ0FBbUJDLE1BQW5CLENBQTBCLGNBQTFCO0FBQ0FaLEVBQUFBLFFBQVEsQ0FBQ1csU0FBVCxDQUFtQkUsR0FBbkIsQ0FBdUIsY0FBdkI7QUFDRCxDQVREOztBQVdBLElBQU1DLFdBQVc7QUFBQSwrQkFBRyxXQUFPVixhQUFQLEVBQXlCO0FBQzNDLFFBQU1XLENBQUMsR0FBR2hCLFlBQVksQ0FBQ2lCLGFBQWIsQ0FBMkIsZ0JBQTNCLENBQVY7QUFDQSxRQUFNQyxHQUFHLEdBQUdGLENBQUMsQ0FBQ0csWUFBRixDQUFlLE1BQWYsQ0FBWjtBQUNBLFFBQU1DLFFBQVEsU0FBUyxvQkFBTTtBQUMzQkYsTUFBQUEsR0FEMkI7QUFFM0JHLE1BQUFBLE1BQU0sRUFBRSxNQUZtQjtBQUczQkMsTUFBQUEsSUFBSSxFQUFFO0FBQ0pqQixRQUFBQTtBQURJO0FBSHFCLEtBQU4sQ0FBdkI7O0FBT0EsUUFBSWUsUUFBUSxDQUFDRyxNQUFULEtBQW9CLEdBQXhCLEVBQTZCO0FBQzNCbkIsTUFBQUEsSUFBSSxDQUFDQyxhQUFELENBQUo7QUFDRDtBQUNGLEdBYmdCOztBQUFBLGtCQUFYVSxXQUFXO0FBQUE7QUFBQTtBQUFBLEdBQWpCOztBQWNBLElBQU1TLFlBQVksR0FBSUMsS0FBRCxJQUFXO0FBQzlCQSxFQUFBQSxLQUFLLENBQUNDLGNBQU47QUFDQSxNQUFNQyxZQUFZLEdBQUcxQixRQUFRLENBQUNnQixhQUFULENBQXVCLE9BQXZCLENBQXJCO0FBQ0EsTUFBTVosYUFBYSxHQUFHc0IsWUFBWSxDQUFDQyxLQUFuQztBQUNBYixFQUFBQSxXQUFXLENBQUNWLGFBQUQsQ0FBWDtBQUNBc0IsRUFBQUEsWUFBWSxDQUFDQyxLQUFiLEdBQXFCLEVBQXJCO0FBQ0QsQ0FORDs7QUFRQSxJQUFNQyxhQUFhLEdBQUlyQixJQUFELElBQVU7QUFDOUIsTUFBSUEsSUFBSSxDQUFDSSxTQUFMLENBQWVrQixRQUFmLENBQXdCLGNBQXhCLENBQUosRUFBNkM7QUFDM0N0QixJQUFBQSxJQUFJLENBQUNJLFNBQUwsQ0FBZUMsTUFBZixDQUFzQixjQUF0QjtBQUNBTCxJQUFBQSxJQUFJLENBQUNJLFNBQUwsQ0FBZUUsR0FBZixDQUFtQixjQUFuQjtBQUNELEdBSEQsTUFHTyxJQUFJTixJQUFJLENBQUNJLFNBQUwsQ0FBZWtCLFFBQWYsQ0FBd0IsY0FBeEIsQ0FBSixFQUE2QztBQUNsRHRCLElBQUFBLElBQUksQ0FBQ0ksU0FBTCxDQUFlQyxNQUFmLENBQXNCLGNBQXRCO0FBQ0FMLElBQUFBLElBQUksQ0FBQ0ksU0FBTCxDQUFlRSxHQUFmLENBQW1CLGNBQW5CO0FBQ0Q7QUFDRixDQVJEOztBQVVBLElBQU1pQixXQUFXLEdBQUlOLEtBQUQsSUFBVztBQUM3QkEsRUFBQUEsS0FBSyxDQUFDQyxjQUFOO0FBQ0ExQixFQUFBQSxZQUFZLEdBQUd5QixLQUFLLENBQUNPLGFBQU4sQ0FBb0JDLFVBQW5DO0FBQ0FoQyxFQUFBQSxRQUFRLEdBQUdELFlBQVksQ0FBQ2lCLGFBQWIsQ0FBMkIsb0JBQTNCLENBQVg7QUFDQWYsRUFBQUEsY0FBYyxHQUFHRixZQUFZLENBQUNpQixhQUFiLENBQTJCLG1CQUEzQixDQUFqQjtBQUNBZCxFQUFBQSxRQUFRLEdBQUdzQixLQUFLLENBQUNPLGFBQWpCO0FBQ0FILEVBQUFBLGFBQWEsQ0FBQzVCLFFBQUQsQ0FBYjtBQUNBNEIsRUFBQUEsYUFBYSxDQUFDM0IsY0FBRCxDQUFiO0FBQ0EyQixFQUFBQSxhQUFhLENBQUMxQixRQUFELENBQWI7QUFDQUYsRUFBQUEsUUFBUSxDQUFDaUMsZ0JBQVQsQ0FBMEIsUUFBMUIsRUFBb0NWLFlBQXBDO0FBQ0QsQ0FWRDs7QUFZQSxTQUFTVyxJQUFULEdBQWdCO0FBQ2R0QyxFQUFBQSxnQkFBZ0IsQ0FBQ3VDLE9BQWpCLENBQTBCQyxJQUFELElBQ3ZCQSxJQUFJLENBQUNILGdCQUFMLENBQXNCLE9BQXRCLEVBQStCSCxXQUEvQixDQURGO0FBR0Q7O0FBQ0QsSUFBSWxDLGdCQUFKLEVBQXNCO0FBQ3BCc0MsRUFBQUEsSUFBSTtBQUNMIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGF4aW9zIGZyb20gXCJheGlvc1wiO1xuXG5jb25zdCBlZGl0Q29tbWVudEVsZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIiNqc0VkaXRDb21tZW50XCIpO1xuXG5sZXQgc2VsZWN0ZWRMaXN0O1xubGV0IGVkaXRGb3JtO1xubGV0IGN1cnJlbnRDb21tZW50O1xubGV0IGVkaXRJY29uO1xuXG5jb25zdCBlZGl0ID0gKGVkaXRlZENvbW1lbnQpID0+IHtcbiAgLy8gICBjdXJyZW50Q29tbWVudCA9IGBtZTogJHtlZGl0ZWRDb21tZW50fWA7XG4gIGNvbnNvbGUubG9nKGVkaXRJY29uLCBjdXJyZW50Q29tbWVudCwgZWRpdEZvcm0pO1xuICAvL2Zvcm0g7JeG7JWg6rOgIHNwYW4g7LaU6rCAXG4gIGNvbnN0IGVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgZWxlbS5pbm5lckhUTUwgPSBlZGl0ZWRDb21tZW50O1xuICBzZWxlY3RlZExpc3QuaW5zZXJ0QmVmb3JlKGVsZW0sIGVkaXRJY29uKTtcbiAgZWRpdEZvcm0uY2xhc3NMaXN0LnJlbW92ZShcInNob3ctZWxlbWVudFwiKTtcbiAgZWRpdEZvcm0uY2xhc3NMaXN0LmFkZChcImhpZGUtZWxlbWVudFwiKTtcbn07XG5cbmNvbnN0IHNlbmRDb21tZW50ID0gYXN5bmMgKGVkaXRlZENvbW1lbnQpID0+IHtcbiAgY29uc3QgYSA9IHNlbGVjdGVkTGlzdC5xdWVyeVNlbGVjdG9yKFwiI2pzRWRpdENvbW1lbnRcIik7XG4gIGNvbnN0IHVybCA9IGEuZ2V0QXR0cmlidXRlKFwiaHJlZlwiKTtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBheGlvcyh7XG4gICAgdXJsLFxuICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgZGF0YToge1xuICAgICAgZWRpdGVkQ29tbWVudCxcbiAgICB9LFxuICB9KTtcbiAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gMjAwKSB7XG4gICAgZWRpdChlZGl0ZWRDb21tZW50KTtcbiAgfVxufTtcbmNvbnN0IGhhbmRsZVN1Ym1pdCA9IChldmVudCkgPT4ge1xuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICBjb25zdCBjb21tZW50SW5wdXQgPSBlZGl0Rm9ybS5xdWVyeVNlbGVjdG9yKFwiaW5wdXRcIik7XG4gIGNvbnN0IGVkaXRlZENvbW1lbnQgPSBjb21tZW50SW5wdXQudmFsdWU7XG4gIHNlbmRDb21tZW50KGVkaXRlZENvbW1lbnQpO1xuICBjb21tZW50SW5wdXQudmFsdWUgPSBcIlwiO1xufTtcblxuY29uc3QgdG9nZ2xlU2hvd2luZyA9IChlbGVtKSA9PiB7XG4gIGlmIChlbGVtLmNsYXNzTGlzdC5jb250YWlucyhcInNob3ctZWxlbWVudFwiKSkge1xuICAgIGVsZW0uY2xhc3NMaXN0LnJlbW92ZShcInNob3ctZWxlbWVudFwiKTtcbiAgICBlbGVtLmNsYXNzTGlzdC5hZGQoXCJoaWRlLWVsZW1lbnRcIik7XG4gIH0gZWxzZSBpZiAoZWxlbS5jbGFzc0xpc3QuY29udGFpbnMoXCJoaWRlLWVsZW1lbnRcIikpIHtcbiAgICBlbGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRlLWVsZW1lbnRcIik7XG4gICAgZWxlbS5jbGFzc0xpc3QuYWRkKFwic2hvdy1lbGVtZW50XCIpO1xuICB9XG59O1xuXG5jb25zdCBoYW5kbGVDbGljayA9IChldmVudCkgPT4ge1xuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICBzZWxlY3RlZExpc3QgPSBldmVudC5jdXJyZW50VGFyZ2V0LnBhcmVudE5vZGU7XG4gIGVkaXRGb3JtID0gc2VsZWN0ZWRMaXN0LnF1ZXJ5U2VsZWN0b3IoXCIjanNFZGl0Q29tbWVudEZvcm1cIik7XG4gIGN1cnJlbnRDb21tZW50ID0gc2VsZWN0ZWRMaXN0LnF1ZXJ5U2VsZWN0b3IoXCIjanNDdXJyZW50Q29tbWVudFwiKTtcbiAgZWRpdEljb24gPSBldmVudC5jdXJyZW50VGFyZ2V0O1xuICB0b2dnbGVTaG93aW5nKGVkaXRGb3JtKTtcbiAgdG9nZ2xlU2hvd2luZyhjdXJyZW50Q29tbWVudCk7XG4gIHRvZ2dsZVNob3dpbmcoZWRpdEljb24pO1xuICBlZGl0Rm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIGhhbmRsZVN1Ym1pdCk7XG59O1xuXG5mdW5jdGlvbiBpbml0KCkge1xuICBlZGl0Q29tbWVudEVsZW1zLmZvckVhY2goKGl0ZW0pID0+XG4gICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlQ2xpY2spXG4gICk7XG59XG5pZiAoZWRpdENvbW1lbnRFbGVtcykge1xuICBpbml0KCk7XG59XG4iXX0=
},{"axios":5}],4:[function(require,module,exports){
"use strict";

require("./addComment");

require("./editComment");

require("./deleteComment");
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZha2VfODNmNzA0ZDAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFDQTs7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBcIi4vYWRkQ29tbWVudFwiO1xuaW1wb3J0IFwiLi9lZGl0Q29tbWVudFwiO1xuaW1wb3J0IFwiLi9kZWxldGVDb21tZW50XCI7XG4iXX0=
},{"./addComment":1,"./deleteComment":2,"./editComment":3}],5:[function(require,module,exports){
module.exports = require('./lib/axios');
},{"./lib/axios":7}],6:[function(require,module,exports){
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

},{"../core/buildFullPath":13,"../core/createError":14,"./../core/settle":18,"./../helpers/buildURL":22,"./../helpers/cookies":24,"./../helpers/isURLSameOrigin":27,"./../helpers/parseHeaders":29,"./../utils":31}],7:[function(require,module,exports){
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

},{"./cancel/Cancel":8,"./cancel/CancelToken":9,"./cancel/isCancel":10,"./core/Axios":11,"./core/mergeConfig":17,"./defaults":20,"./helpers/bind":21,"./helpers/isAxiosError":26,"./helpers/spread":30,"./utils":31}],8:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){
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

},{"./Cancel":8}],10:[function(require,module,exports){
'use strict';

module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};

},{}],11:[function(require,module,exports){
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

},{"../helpers/buildURL":22,"./../utils":31,"./InterceptorManager":12,"./dispatchRequest":15,"./mergeConfig":17}],12:[function(require,module,exports){
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

},{"./../utils":31}],13:[function(require,module,exports){
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

},{"../helpers/combineURLs":23,"../helpers/isAbsoluteURL":25}],14:[function(require,module,exports){
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

},{"./enhanceError":16}],15:[function(require,module,exports){
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

},{"../cancel/isCancel":10,"../defaults":20,"./../utils":31,"./transformData":19}],16:[function(require,module,exports){
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

},{}],17:[function(require,module,exports){
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

},{"../utils":31}],18:[function(require,module,exports){
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

},{"./createError":14}],19:[function(require,module,exports){
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

},{"./../utils":31}],20:[function(require,module,exports){
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
},{"./adapters/http":6,"./adapters/xhr":6,"./helpers/normalizeHeaderName":28,"./utils":31,"rH1JPG":32}],21:[function(require,module,exports){
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

},{}],22:[function(require,module,exports){
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

},{"./../utils":31}],23:[function(require,module,exports){
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

},{}],24:[function(require,module,exports){
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

},{"./../utils":31}],25:[function(require,module,exports){
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

},{}],26:[function(require,module,exports){
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

},{}],27:[function(require,module,exports){
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

},{"./../utils":31}],28:[function(require,module,exports){
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

},{"../utils":31}],29:[function(require,module,exports){
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

},{"./../utils":31}],30:[function(require,module,exports){
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

},{}],31:[function(require,module,exports){
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

},{"./helpers/bind":21}],32:[function(require,module,exports){
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