// https://github.com/just-the-docs/just-the-docs/blob/01719a8/assets/js/just-the-docs.js
(function (jtd, undefined) {

  // Event handling

  jtd.addEvent = function(el, type, handler) {
    if (el.attachEvent) el.attachEvent('on'+type, handler); else el.addEventListener(type, handler);
  }
  jtd.removeEvent = function(el, type, handler) {
    if (el.detachEvent) el.detachEvent('on'+type, handler); else el.removeEventListener(type, handler);
  }
  jtd.onReady = function(ready) {
    // in case the document is already rendered
    if (document.readyState!='loading') ready();
    // modern browsers
    else if (document.addEventListener) document.addEventListener('DOMContentLoaded', ready);
    // IE <= 8
    else document.attachEvent('onreadystatechange', function(){
        if (document.readyState=='complete') ready();
    });
  }

  // Site search

  function initSearch() {
    var request = new XMLHttpRequest();
    request.open('GET', '/assets/js/data/search.json', true);

    request.onload = function(){
      if (request.status >= 200 && request.status < 400) {
        var docs = JSON.parse(request.responseText);

        lunr.tokenizer.separator = /[\s/]+/

        var index = lunr(function(){
          this.ref('id');
          this.field('title', { boost: 200 });
          this.field('content', { boost: 2 });
          this.field('relUrl');
          this.metadataWhitelist = ['position']

          var uniqueItems = new Set();
          for (var i in docs) {
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
        node.classList.contains('highlighter-rouge')
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

            // Avoid duplicated items
            var itemKey;
              itemKey = `${docs[i].url}-${docs[i].relUrl}`; // -${docs[i].title}-${docs[i].content}
            if (!uniqueItems.has(itemKey)) {
              uniqueItems.add(itemKey);
              // Add index
              this.add({
                id: i,
                title: docs[i].title,
                content: docs[i].content,
                relUrl: docs[i].relUrl
              });
            }
          }
        });

        searchLoaded(index, docs);
      } else {
        console.log('Error loading ajax request. Request status:' + request.status);
      }
    };

    request.onerror = function(){
      console.log('There was a connection error');
    };

    request.send();
  }

  function searchLoaded(index, docs) {
    const noResultsText = 'Oops! No results found.';

    var index = index;
    var docs = docs;
    var searchInput = document.getElementById('search-input');
    var searchResults = document.getElementById('search-results');
    var suggestionsList = document.getElementById('suggestions');
    var bntSearch = document.getElementById('search-trigger');
    var btnCancel = document.getElementById('search-cancel');

    var currentInput;
    var currentSearchIndex = 0;

    function showSearch() {
      bntSearch.click();
    }

    function hideSearch() {
      btnCancel.click();
    }
      // add event listener on ctrl + <shortcut_key> for showing the search input
      jtd.addEvent(document, 'keydown', function (e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
          e.preventDefault();
          showSearch();
        }
        if (e.key == 'Escape') {
          e.preventDefault();
          hideSearch();
        }
      });

    function update() {
      currentSearchIndex++;

      var input = searchInput.value.trim().toLowerCase();
      suggestionsList.textContent = '';  // Clear the datalist content
      showSearch();
      // scroll search input into view, workaround for iOS Safari
      window.scroll(0, -1);
      setTimeout(function(){ window.scroll(0, 0); }, 0);
      if (input === currentInput) {
        return;
      }
      currentInput = input;
      searchResults.textContent = '';
      if (input === '') {
        return;
      }

      var results = index.query(function (query) {
        var tokens = lunr.tokenizer(input)
        query.term(tokens, {
          boost: 10
        });
        query.term(tokens, {
          wildcard: lunr.Query.wildcard.TRAILING
        });
      });

      if ((results.length == 0) && (input.length > 2)) {
        var tokens = lunr.tokenizer(input).filter(function(token, i) {
          return token.str.length < 20;
        })
        if (tokens.length > 0) {
          results = index.query(function (query) {
            query.term(tokens, {
              editDistance: Math.round(Math.sqrt(input.length / 2 - 1))
            });
          });
        }
      }

      if (results.length == 0) {
        var noResultsDiv = document.createElement('div');
        noResultsDiv.classList.add('search-no-result');
        noResultsDiv.innerText = noResultsText;
        searchResults.appendChild(noResultsDiv);

      } else {
        // Auto-completion
        var uniqueSuggestions = new Set();
        var inputWords = input.split(" ").filter(word => word.trim() !== "");

        results.forEach(function (result) {
          var doc = docs[result.ref];

          inputWords.forEach(function (inputWord) {
            var regex = new RegExp('\\b' + inputWord + '\\w*\\b', 'gi');
            var combinedContent = doc.title.toLowerCase() + ' ' + doc.doc.toLowerCase();
            var matches = combinedContent.match(regex);

            if (matches) {
              matches.forEach(function (match) {
                uniqueSuggestions.add(match);
              });
            }
          });
        });

        // Limit the number of suggestions to 5
        var suggestions = Array.from(uniqueSuggestions).slice(0, 5);
        suggestions.forEach(function (suggestion) {
          var option = document.createElement('option');
          option.value = suggestion;
          suggestionsList.appendChild(option);
        });

        // Add searched results
        var resultsList = document.createElement('ul');
        resultsList.classList.add('search-results-list');
        searchResults.appendChild(resultsList);

        addResults(resultsList, results, 0, 10, 100, currentSearchIndex);
      }

      function addResults(resultsList, results, start, batchSize, batchMillis, searchIndex) {
        if (searchIndex != currentSearchIndex) {
          return;
        }
        for (var i = start; i < (start + batchSize); i++) {
          if (i == results.length) {
            return;
          }
          addResult(resultsList, results[i]);
        }
        setTimeout(function() {
          addResults(resultsList, results, start + batchSize, batchSize, batchMillis, searchIndex);
        }, batchMillis);
      }

      function addResult(resultsList, result) {
        // The content are plain text except code blocks, HTML language in code blocks should not be rendered.
        // Therefore, we use `textContent` instead of `innerHTML` to not be rendered.
        var doc = docs[result.ref];

        var resultsListItem = document.createElement('li');
        resultsListItem.classList.add('search-results-list-item');
        resultsList.appendChild(resultsListItem);

        var resultLink = document.createElement('a');
        resultLink.classList.add('search-result');
        // resultLink.classList.add('anchor');
        resultLink.setAttribute('href', doc.url);
        resultsListItem.appendChild(resultLink);

        var resultTitle = document.createElement('div');
        resultTitle.classList.add('search-result-title');
        resultLink.appendChild(resultTitle);

        var resultDoc = document.createElement('div');
        resultDoc.classList.add('search-result-doc');
        resultDoc.innerHTML = '<i class="fa fa-caret-right fa-xs" aria-hidden="true"></i>&nbsp;';
        resultTitle.appendChild(resultDoc);

        var resultDocTitle = document.createElement('div');
        resultDocTitle.classList.add('search-result-doc-title');
        resultDocTitle.textContent = doc.doc;
        resultDoc.appendChild(resultDocTitle);
        var resultDocOrSection = resultDocTitle;

        if (doc.doc != doc.title) {
          resultDoc.classList.add('search-result-doc-parent');
          var resultSection = document.createElement('div');
          resultSection.classList.add('search-result-section');
          resultSection.textContent = "#" + doc.title;
          resultTitle.appendChild(resultSection);
          resultDocOrSection = resultSection;
        }

        var metadata = result.matchData.metadata;
        var titlePositions = [];
        var contentPositions = [];
        for (var j in metadata) {
          var meta = metadata[j];
          if (meta.title) {
            var positions = meta.title.position;
            for (var k in positions) {
              titlePositions.push(positions[k]);
            }
          }
          if (meta.content) {
            var positions = meta.content.position;
            for (var k in positions) {
              var position = positions[k];
              var previewStart = position[0];
              var previewEnd = position[0] + position[1];
              var ellipsesBefore = true;
              var ellipsesAfter = true;
              for (var k = 0; k < 6; k++) {
                var nextSpace = doc.content.lastIndexOf(' ', previewStart - 2);
                var nextDot = doc.content.lastIndexOf('. ', previewStart - 2);
                if ((nextDot >= 0) && (nextDot > nextSpace)) {
                  previewStart = nextDot + 1;
                  ellipsesBefore = false;
                  break;
                }
                if (nextSpace < 0) {
                  previewStart = 0;
                  ellipsesBefore = false;
                  break;
                }
                previewStart = nextSpace + 1;
              }
              for (var k = 0; k < 6; k++) {
                var nextSpace = doc.content.indexOf(' ', previewEnd + 1);
                var nextDot = doc.content.indexOf('. ', previewEnd + 1);
                if ((nextDot >= 0) && (nextDot < nextSpace)) {
                  previewEnd = nextDot;
                  ellipsesAfter = false;
                  break;
                }
                if (nextSpace < 0) {
                  previewEnd = doc.content.length;
                  ellipsesAfter = false;
                  break;
                }
                previewEnd = nextSpace;
              }
              contentPositions.push({
                highlight: position,
                previewStart: previewStart, previewEnd: previewEnd,
                ellipsesBefore: ellipsesBefore, ellipsesAfter: ellipsesAfter
              });
            }
          }
        }

        if (titlePositions.length > 0) {
          titlePositions.sort(function(p1, p2){ return p1[0] - p2[0] });
          resultDocOrSection.textContent = '';
          addHighlightedText(resultDocOrSection, doc.title, 0, doc.title.length, titlePositions);
        }

        if (contentPositions.length > 0) {
          contentPositions.sort(function(p1, p2){ return p1.highlight[0] - p2.highlight[0] });
          var contentPosition = contentPositions[0];
          var previewPosition = {
            highlight: [contentPosition.highlight],
            previewStart: contentPosition.previewStart, previewEnd: contentPosition.previewEnd,
            ellipsesBefore: contentPosition.ellipsesBefore, ellipsesAfter: contentPosition.ellipsesAfter
          };
          var previewPositions = [previewPosition];
          for (var j = 1; j < contentPositions.length; j++) {
            contentPosition = contentPositions[j];
            if (previewPosition.previewEnd < contentPosition.previewStart) {
              previewPosition = {
                highlight: [contentPosition.highlight],
                previewStart: contentPosition.previewStart, previewEnd: contentPosition.previewEnd,
                ellipsesBefore: contentPosition.ellipsesBefore, ellipsesAfter: contentPosition.ellipsesAfter
              }
              previewPositions.push(previewPosition);
            } else {
              previewPosition.highlight.push(contentPosition.highlight);
              previewPosition.previewEnd = contentPosition.previewEnd;
              previewPosition.ellipsesAfter = contentPosition.ellipsesAfter;
            }
          }

          var resultPreviews = document.createElement('div');
          resultPreviews.classList.add('search-result-previews');
          resultLink.appendChild(resultPreviews);

          var content = doc.content;
          for (var j = 0; j < Math.min(previewPositions.length, 2); j++) {
            var position = previewPositions[j];

            var resultPreview = document.createElement('div');
            resultPreview.classList.add('search-result-preview');
            resultPreviews.appendChild(resultPreview);

            if (position.ellipsesBefore) {
              resultPreview.appendChild(document.createTextNode('... '));
            }
            addHighlightedText(resultPreview, content, position.previewStart, position.previewEnd, position.highlight);
            if (position.ellipsesAfter) {
              resultPreview.appendChild(document.createTextNode(' ...'));
            }
          }
        }
        var resultRelUrl = document.createElement('span');
        resultRelUrl.classList.add('search-result-rel-url');
        resultRelUrl.innerHTML = '<i class="fa fa-external-link fa-xs" aria-hidden="true"></i>&nbsp;' + doc.relUrl;
        resultTitle.appendChild(resultRelUrl);
      }

      function addHighlightedText(parent, text, start, end, positions) {
        var index = start;
        for (var i in positions) {
          var position = positions[i];
          var span = document.createElement('span');
          span.textContent = text.substring(index, position[0]);
          parent.appendChild(span);
          index = position[0] + position[1];
          var highlight = document.createElement('span');
          highlight.classList.add('search-result-highlight');
          highlight.textContent = text.substring(position[0], index);
          parent.appendChild(highlight);
        }
        var span = document.createElement('span');
        span.textContent = text.substring(index, end);
        parent.appendChild(span);
      }
    }

    jtd.addEvent(searchInput, 'focus', function(){
      setTimeout(update, 0);
    });

    jtd.addEvent(searchInput, 'keyup', function(e){
      switch (e.keyCode) {
        case 27: // When esc key is pressed, hide the results and clear the field
          searchInput.value = '';
          searchInput.trigger('focusout');
          hideSearch();
          break;
        case 38: // arrow up
        case 40: // arrow down
        case 13: // enter
          e.preventDefault();
          return;
      }
      update();
    });

    jtd.addEvent(searchInput, 'keydown', function(e){
      switch (e.keyCode) {
        case 38: // arrow up
          e.preventDefault();
          var active = document.querySelector('.search-result.active');
          if (active) {
            active.classList.remove('active');
            if (active.parentElement.previousSibling) {
              var previous = active.parentElement.previousSibling.querySelector('.search-result');
              previous.classList.add('active');
              previous.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }
          return;
        case 40: // arrow down
          e.preventDefault();
          var active = document.querySelector('.search-result.active');
          if (active) {
            if (active.parentElement.nextSibling) {
              var next = active.parentElement.nextSibling.querySelector('.search-result');
              active.classList.remove('active');
              next.classList.add('active');
              next.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          } else {
            var next = document.querySelector('.search-result');
            if (next) {
              next.classList.add('active');
              next.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }
          return;
        case 13: // enter
          e.preventDefault();
          var active = document.querySelector('.search-result.active');
          if (active) {
            active.click();
          } else {
            var first = document.querySelector('.search-result');
            if (first) {
              first.click();
            }
          }
          return;
      }
    });
  }


  // Document ready

  jtd.onReady(function(){
    initSearch();
  });

})(window.jtd = window.jtd || {});