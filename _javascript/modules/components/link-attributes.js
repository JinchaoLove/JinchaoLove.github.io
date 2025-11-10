/* Modify all external links
 * rel: external nofollow noopener noreferrer
 * target: _blank
 */

export function standardLinks() {
  var links = document.getElementsByTagName('a');

  for (var i = 0; i < links.length; i++) {
    var link = links[i];
    var href = link.getAttribute('href');

    // Skip if has 'link-attr-ignore' or no 'href' attribute
    if (link.hasAttribute('link-attr-ignore') || !href) {
      continue;
    }

    // Show the url when hover
    setIfEmpty(link, 'title', href);

    // Check if the link is external
    if (isExternalLink(href)) {
      // Make all external urls open in new tab
      setIfEmpty(link, 'target', '_blank');
      // Add rel=... for security reasons
      setIfEmpty(link, 'rel', 'external nofollow noopener noreferrer');
    }
  }
}

function setIfEmpty(element, attrName, attrValue) {
  if (!element.hasAttribute(attrName)) {
    element.setAttribute(attrName, attrValue);
  }
}

function isExternalLink(url) {
  return (
    !url.startsWith(window.location.origin) &&
    !url.startsWith('/') &&
    !url.startsWith('#')
  );
}
