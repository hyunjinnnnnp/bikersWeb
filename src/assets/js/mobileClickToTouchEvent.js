const clickEvent = () => {
  if ("ontouchstart" in document.documentElement === true) {
    return "touchstart";
  } else {
    return "click";
  }
};

export default clickEvent();
