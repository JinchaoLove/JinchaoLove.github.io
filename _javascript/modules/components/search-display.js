/**
 * This script make #search-result-wrapper switch to unloaded or shown automatically.
 */
const $btnSbTrigger = $('#sidebar-trigger');
const $content = $('#main-wrapper>.container-fluid>.row');
const $topbarTitle = $('#topbar-title');
const $breadcrumb = $('#breadcrumb');
const $btnSearchTrigger = $('#search-trigger');
const $btnCancel = $('#search-cancel');
const $searchBox = $('#search-box');
const $search = $('search');
const $input = $('#search-input');
const $hints = $('#search-hints');
const $resultWrapper = $('#search-result-wrapper');
const $results = $('#search-results');
const $viewport = $('html,body');

// class names
const C_LOADED = 'loaded';
const C_UNLOADED = 'unloaded';
const C_FOCUS = 'input-focus';
const C_FLEX = 'd-flex';

class ScrollBlocker {
  static offset = 0;
  static resultVisible = false;

  static on() {
    ScrollBlocker.offset = window.scrollY;
    $viewport.scrollTop(0);
  }

  static off() {
    $viewport.scrollTop(ScrollBlocker.offset);
  }
}

/*--- Actions in mobile screens (Sidebar hidden) ---*/
class MobileSearchBar {
  static on() {
    // $btnSbTrigger.addClass(C_UNLOADED);
    $topbarTitle.addClass(C_UNLOADED);
    $breadcrumb.addClass(C_UNLOADED);
    $btnSearchTrigger.addClass(C_UNLOADED);
    $searchBox.addClass(C_FLEX);
    $search.addClass(C_FLEX);
    $btnCancel.addClass(C_FLEX);
  }

  static off() {
    // $btnSbTrigger.removeClass(C_UNLOADED);
    $topbarTitle.removeClass(C_UNLOADED);
    $breadcrumb.removeClass(C_UNLOADED);
    $btnSearchTrigger.removeClass(C_UNLOADED);
    $searchBox.removeClass(C_FLEX);
    $search.removeClass(C_FLEX);
    $btnCancel.removeClass(C_FLEX);
  }
}

class ResultSwitch {
  static on() {
    $searchBox.addClass(C_FLEX);
    if (!ScrollBlocker.resultVisible) {
      // the block method must be called before $(#main-wrapper>.container) unloaded.
      ScrollBlocker.on();
      $resultWrapper.removeClass(C_UNLOADED);
      $content.addClass(C_UNLOADED);
      ScrollBlocker.resultVisible = true;
    }
  }

  static off() {
    $searchBox.removeClass(C_FLEX);
    if (ScrollBlocker.resultVisible) {
      $results.empty();
      if ($hints.hasClass(C_UNLOADED)) {
        $hints.removeClass(C_UNLOADED);
      }
      $resultWrapper.addClass(C_UNLOADED);
      $content.removeClass(C_UNLOADED);

      // now the release method must be called after $(#main-wrapper>.container) display
      ScrollBlocker.off();

      $input.val('');
      ScrollBlocker.resultVisible = false;
    }
  }
}

function isMobileView() {
  return $btnCancel.hasClass(C_FLEX);
}

export function displaySearch() {
  $btnSearchTrigger.on('click', function () {
    MobileSearchBar.on();
    ResultSwitch.on();
    $input.trigger('focus');
  });

  $btnCancel.on('click', function () {
    MobileSearchBar.off();
    ResultSwitch.off();
  });

  $input.on('focus', function () {
    $search.addClass(C_FOCUS);
  });

  $input.on('focusout', function () {
    $search.removeClass(C_FOCUS);
  });

  $input.on('input', () => {
    if ($input.val() === '') {
      if (isMobileView()) {
        $hints.removeClass(C_UNLOADED);
      } else {
        ResultSwitch.off();
      }
    } else {
      ResultSwitch.on();
      if (isMobileView()) {
        $hints.addClass(C_UNLOADED);
      }
    }
  });

  // close and jump after clicking one result
  $(document).on('click', '.search-result', function () {
    MobileSearchBar.off();
    ResultSwitch.off();
  });
}
