document.addEventListener("DOMContentLoaded", () => {
  const wrappedImgs = document.querySelectorAll(".img-wrap > img");
  let loaded = 0;

  const checkAll = () => {
    loaded++;
    if (loaded === wrappedImgs.length) {
      document
        .querySelectorAll(".img-wrap")
        .forEach((wrap) => wrap.classList.remove("img-wrap"));
    }
  };

  wrappedImgs.forEach((img) => {
    if (img.complete) checkAll();
    else img.onload = checkAll;
  });
});
