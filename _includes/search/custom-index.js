function htmlToPlainText(htmlString) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    const textContent = getTextFromNode(doc.body);
    return textContent;
}

function isCodeBlock(node) {
    return (
        node.tagName.toLowerCase() === 'code' ||
        node.classList.contains('highlight') ||
        node.classList.contains('highlighter-{{ site.highlighter }}')
    );
}

function getTextFromNode(node) {
    let text = '';
    if (node.nodeType === Node.TEXT_NODE) {
        text += node.textContent;
    } else if (node.nodeType === Node.ELEMENT_NODE) {
        if (isCodeBlock(node)) {
            // with tag: child.outerHTML; no tag: child.textContent
            text += node.textContent;
        } else {
            Array.from(node.childNodes).forEach(child => {
                text += getTextFromNode(child);
            });
        }
    }
    return text;
}

function strip_html(htmlString) {
    // Strip HTML tags from a string
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlString;
    return tempDiv.textContent || tempDiv.innerText || '';
}

docs[i].content = htmlToPlainText(docs[i].content).trim();
// docs[i].content = strip_html(docs[i].content).trim();
