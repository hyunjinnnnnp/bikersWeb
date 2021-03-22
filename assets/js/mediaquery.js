const mobile = window.matchMedia("(max-width: 600px)");

function handleChange(event) {
  if (event.matches) {
    console.log("SMALL");
  } else {
    console.log("BIG");
  }
}

mobile.addListener(handleChange);