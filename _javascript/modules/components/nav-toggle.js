// show or hide blog navigation blocks
export function navToggle() {
  const buttons = document.querySelectorAll('.nav-icon');
  const contents = document.querySelectorAll('.nav-contents > div');

  // Hide all content divs initially
  contents.forEach((content) => (content.style.display = 'none'));

  function showContent(id) {
    contents.forEach((content) => {
      if (content.classList.contains(id)) {
        content.style.display =
          content.style.display === 'none' ? 'block' : 'none';
      } else {
        content.style.display = 'none';
      }
    });
  }

  buttons.forEach((button) => {
    button.addEventListener('mouseenter', function () {
      const id = this.id.replace('nav-', 'nav-');
      showContent(id);
    });
  });
}
