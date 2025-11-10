/**
 * Clipboard functions
 *
 * Dependencies:
 *   - popper.js (https://github.com/popperjs/popper-core)
 *   - clipboard.js (https://github.com/zenorocha/clipboard.js)
 */
const clipboardSelector = '.code-header-buttons>button.clipboard-btn'; // 修改选择器，添加类名区分
const foldBtnSelector = '.code-header-buttons>button.fold-btn'; // 新增折叠按钮选择器
const foldTrigger = '.code-header-fold-trigger'
const ICON_SUCCESS = 'fas fa-check';
const ICON_FOLD = 'fa-chevron-up';
const ICON_UNFOLD = 'fa-chevron-down';
const ATTR_TIMEOUT = 'timeout';
const ATTR_TITLE_SUCCEED = 'data-title-succeed';
const ATTR_TITLE_ORIGIN = 'data-bs-original-title';
const TIMEOUT = 2000; // in milliseconds

function isLocked(node) {
  if ($(node)[0].hasAttribute(ATTR_TIMEOUT)) {
    let timeout = $(node).attr(ATTR_TIMEOUT);
    if (Number(timeout) > Date.now()) {
      return true;
    }
  }
  return false;
}

function lock(node) {
  $(node).attr(ATTR_TIMEOUT, Date.now() + TIMEOUT);
}

function unlock(node) {
  $(node).removeAttr(ATTR_TIMEOUT);
}

function getIcon(btn) {
  let iconNode = $(btn).children();
  return iconNode.attr('class');
}

const ICON_DEFAULT = getIcon(clipboardSelector);

function showTooltip(btn) {
  const succeedTitle = $(btn).attr(ATTR_TITLE_SUCCEED);
  $(btn).attr(ATTR_TITLE_ORIGIN, succeedTitle).tooltip('show');
}

function hideTooltip(btn) {
  $(btn).tooltip('hide').removeAttr(ATTR_TITLE_ORIGIN);
}

function setSuccessIcon(btn) {
  let btnNode = $(btn);
  let iconNode = btnNode.children();
  iconNode.attr('class', ICON_SUCCESS);
}

function resumeIcon(btn) {
  let btnNode = $(btn);
  let iconNode = btnNode.children();
  iconNode.attr('class', ICON_DEFAULT);
}

// 新增折叠功能函数
function toggleFold(btn) {
  const $btn = $(btn);
  const $codeBlock = $btn.closest('.code-header').next();

  $codeBlock.slideToggle(200, () => {
    const isFolded = $codeBlock.is(':hidden');

    // 切换按钮图标
    $btn
      .find('i')
      .toggleClass(ICON_FOLD, !isFolded)
      .toggleClass(ICON_UNFOLD, isFolded);

    // 更新tooltip提示
    const title = isFolded ? 'Expand' : 'Collapse';
    $btn.attr(ATTR_TITLE_ORIGIN, title);

    // 保存折叠状态到本地存储
    if (typeof Storage !== 'undefined') {
      const blockId = $codeBlock.attr('id');
      if (blockId) {
        localStorage.setItem(`codeblock-${blockId}`, isFolded);
      }
    }
  });
}

// 初始化折叠状态
function initFoldState() {
  if (typeof Storage === 'undefined') return;

  $(foldBtnSelector).each(function () {
    const $btn = $(this);
    const $codeBlock = $btn.closest('.code-header').next();
    const blockId = $codeBlock.attr('id');

    if (blockId) {
      const isFolded = localStorage.getItem(`codeblock-${blockId}`) === 'true';

      if (isFolded) {
        $codeBlock.hide();
        $btn.find('i').removeClass(ICON_FOLD).addClass(ICON_UNFOLD);
        $btn.attr(ATTR_TITLE_ORIGIN, 'Expand');
      }
    }
  });
}

export function initClipboard() {
  // 给现有的复制按钮添加类名
  $(clipboardSelector).addClass('clipboard-btn');

  // 创建折叠按钮
  $(clipboardSelector).each(function () {
    const $header = $(this).parent();

    // 确保只添加一次折叠按钮
    if ($header.find(foldBtnSelector).length === 0) {
      const foldBtn = $(`
        <button class="fold-btn" ${ATTR_TITLE_ORIGIN}="Collapse">
          <i class="fas ${ICON_FOLD}"></i>
        </button>
      `);

      // 将折叠按钮插入到复制按钮前面
      foldBtn.insertBefore(this);

      // 初始化折叠按钮的tooltip
      new bootstrap.Tooltip(foldBtn[0], {
        placement: 'left'
      });
    }
  });

  // 初始化折叠状态
  initFoldState();

  // 绑定折叠按钮事件
  $(document).on('click', foldBtnSelector, function () {
    toggleFold(this);
  });

  $(document).on('click', foldTrigger, function () {
    const $foldBtn = $(this).closest('.code-header').find(foldBtnSelector);
    if ($foldBtn.length) {
      toggleFold($foldBtn);
    }
  });

  // Initial the clipboard.js object
  if ($(clipboardSelector).length) {
    const clipboard = new ClipboardJS(clipboardSelector, {
      target(trigger) {
        let codeBlock = trigger.parentNode.parentNode.nextElementSibling;
        return codeBlock.querySelector('code .rouge-code');
      }
    });

    const clipboardList = document.querySelectorAll(clipboardSelector);
    [...clipboardList].map(
      (elem) =>
        new bootstrap.Tooltip(elem, {
          placement: 'left'
        })
    );

    clipboard.on('success', (e) => {
      e.clearSelection();

      const trigger = e.trigger;
      if (isLocked(trigger)) {
        return;
      }

      setSuccessIcon(trigger);
      showTooltip(trigger);
      lock(trigger);

      setTimeout(() => {
        hideTooltip(trigger);
        resumeIcon(trigger);
        unlock(trigger);
      }, TIMEOUT);
    });
  }

  /* --- Post link sharing --- */

  const btnCopyLink = $('#copy-link');

  btnCopyLink.on('click', (e) => {
    let target = $(e.target);

    if (isLocked(target)) {
      return;
    }

    // Copy URL to clipboard
    navigator.clipboard.writeText(window.location.href).then(() => {
      const defaultTitle = target.attr(ATTR_TITLE_ORIGIN);
      const succeedTitle = target.attr(ATTR_TITLE_SUCCEED);
      // Switch tooltip title
      target.attr(ATTR_TITLE_ORIGIN, succeedTitle).tooltip('show');
      lock(target);

      setTimeout(() => {
        target.attr(ATTR_TITLE_ORIGIN, defaultTitle);
        unlock(target);
      }, TIMEOUT);
    });
  });

  btnCopyLink.on('mouseleave', function (e) {
    const target = $(e.target);
    target.tooltip('hide');
  });
}
