/**
 * hidden / open for abstract, bibtex and video
 */
export function bibToggle() {
  function toggleElements(clickedClass, elementsToHide) {
    $(`button.${clickedClass}`).click(function () {
      // Toggle hidden/open classes on the button's child <i> elements
      $(this).find('i').toggleClass('open hidden');

      // Reset other buttons' icons to default state
      elementsToHide.forEach((elementClass) => {
        $(this)
          .parent() // Match content container level
          .find(`button.${elementClass}`) // Correct selector
          .each(function () {
            // Explicitly set icon states
            $(this).find('.fa-sort').addClass('open').removeClass('hidden');
            $(this).find('.fa-times').addClass('hidden').removeClass('open');
          });
      });

      // Toggle classes on the content div in parents
      const elementToOpen = $(this)
        .parent()
        .parent()
        .find(`div.${clickedClass}`);
      elementToOpen.toggleClass('open hidden');

      // Handle other content types to ensure only one content is open
      elementsToHide.forEach((elementClass) => {
        const elementToHide = $(this)
          .parent()
          .parent()
          .find(`.${elementClass}.open`);
        elementToHide.toggleClass('open hidden');
      });
    });
  }

  toggleElements('abstract', ['bibtex', 'video']);
  toggleElements('bibtex', ['abstract', 'video']);
  toggleElements('video', ['abstract', 'bibtex']);
}
