/**
 * Expand or close the sidebar in mobile screens.
 */

const $content = $('body');
const TOC_TOGGLE = 'toc-toggle';

class PanelUtil {
  static tocIsToggled = false;

  static toggle() {
    if (PanelUtil.tocIsToggled === false) {
      $content.attr(TOC_TOGGLE, '');
    } else {
      $content.removeAttr(TOC_TOGGLE);
    }

    PanelUtil.tocIsToggled = !PanelUtil.tocIsToggled;
  }
}

export function initToc() {
  if (document.querySelector('main h2, main h3')) {
    // see: https://github.com/tscanlin/tocbot#options
    tocbot.init({
      tocSelector: '#toc',
      contentSelector: '.content',
      ignoreSelector: '[data-toc-skip]',
      headingSelector: 'h2, h3, h4',
      orderedList: false,
      scrollSmooth: false
    });
  }
  $('#toc-trigger').on('click', PanelUtil.toggle);
  // reset toggle status when click any TOC titles
  $('#toc a').on('click', function () {
    if (PanelUtil.tocIsToggled) {
      PanelUtil.toggle();
    }
  });
}
