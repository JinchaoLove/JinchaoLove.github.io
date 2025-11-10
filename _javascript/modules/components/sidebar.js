/**
 * Expand or close the sidebar in mobile screens.
 */

const $body = $('body');
const SIDEBAR_TOGGLE = 'sidebar-toggle';

class SidebarUtil {
  static sidebarIsToggled = false;

  static toggle() {
    if (SidebarUtil.sidebarIsToggled === false) {
      $body.attr(SIDEBAR_TOGGLE, '');
    } else {
      $body.removeAttr(SIDEBAR_TOGGLE);
    }

    SidebarUtil.sidebarIsToggled = !SidebarUtil.sidebarIsToggled;
  }
}

export function sidebarExpand() {
  $('#sidebar-trigger').on('click', SidebarUtil.toggle);
  $('#mask').on('click', SidebarUtil.toggle);
}
