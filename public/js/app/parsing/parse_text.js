//? ------------------------------------------------------------------------------------
//?
//?  /app/parsing/parse_text.js
//?  Pyro Chat
//?
//?  Developed by Robolab LLC
//?  Copyright (c) 2021 Robolab LLC. All Rights Reserved
//?     
//? ------------------------------------------------------------------------------------


/**
 * https://stackoverflow.com/questions/6899659/remove-formatting-from-a-contenteditable-div
 * @param {*} html 
 * @returns 
 */
function strip(html) {
    const div = document.createElement("div");
    div.innerHTML = html;
    
    return div.innerText;
}


/**
 * https://www.labnol.org/code/20294-regex-extract-links-javascript
 * @param {*} text 
 * @returns 
 */
function createTextLinks(text) {
    return (text || "").replace(
        /([^\S]|^)(((https?\:\/\/)|(www\.))(\S+))/gi, function(match, space, url) {
            let hyperlink = url;

            if (!hyperlink.match('^https?:\/\/')) {
                hyperlink = 'http://' + hyperlink;
            }

            return space + '<a href="' + hyperlink + '" target="_blank">' + url + '</a>';
        }
    );
}


/**
 * 
 * @param {*} text 
 * @param {*} find 
 * @param {*} replace 
 * @returns 
 */
function removeLastOf(text, find, replace) {
    let removelast = text;
    let removedlast = "";

    while (removelast.length !== 0) {
        if (removelast.endsWith(find)) {
            removedlast = removelast.slice(0, -(find.length)) + replace + removedlast;
            removelast = "";
        } else {
            removedlast = removelast.slice(-1) + removedlast;
            removelast = removelast.slice(0, -1);
        }
    }

    return removedlast;
};


/**
 * 
 * @param {*} text 
 * @returns 
 */
function parseText(text) {
    let oldtext = strip(text);
    let newtext = "";

    const markdown = {
        bold: false,
        italicized: false,
        underlined: false,
        codeblock: false,
        strikethrough: false,
        spoiler: false,
        quote: false,
        bigcodeblock: false
    };

    while (oldtext.length !== 0) {
        if (oldtext.startsWith("\\")) {
            oldtext = oldtext.slice(1);

            if (Array.isArray(/[\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}\u{1f1e6}-\u{1f1ff}\u{1f191}-\u{1f251}\u{1f004}\u{1f0cf}\u{1f170}-\u{1f171}\u{1f17e}-\u{1f17f}\u{1f18e}\u{3030}\u{2b50}\u{2b55}\u{2934}-\u{2935}\u{2b05}-\u{2b07}\u{2b1b}-\u{2b1c}\u{3297}\u{3299}\u{303d}\u{00a9}\u{00ae}\u{2122}\u{23f3}\u{24c2}\u{23e9}-\u{23ef}\u{25b6}\u{23f8}-\u{23fa}\u{200d}]*/ug.exec(oldtext)) && /[\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}\u{1f1e6}-\u{1f1ff}\u{1f191}-\u{1f251}\u{1f004}\u{1f0cf}\u{1f170}-\u{1f171}\u{1f17e}-\u{1f17f}\u{1f18e}\u{3030}\u{2b50}\u{2b55}\u{2934}-\u{2935}\u{2b05}-\u{2b07}\u{2b1b}-\u{2b1c}\u{3297}\u{3299}\u{303d}\u{00a9}\u{00ae}\u{2122}\u{23f3}\u{24c2}\u{23e9}-\u{23ef}\u{25b6}\u{23f8}-\u{23fa}\u{200d}]*/ug.exec(oldtext)[0].length !== 0) { // https://stackoverflow.com/questions/43242440/javascript-unicode-emoji-regular-expressions
                const emojiparsed = /[\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}\u{1f1e6}-\u{1f1ff}\u{1f191}-\u{1f251}\u{1f004}\u{1f0cf}\u{1f170}-\u{1f171}\u{1f17e}-\u{1f17f}\u{1f18e}\u{3030}\u{2b50}\u{2b55}\u{2934}-\u{2935}\u{2b05}-\u{2b07}\u{2b1b}-\u{2b1c}\u{3297}\u{3299}\u{303d}\u{00a9}\u{00ae}\u{2122}\u{23f3}\u{24c2}\u{23e9}-\u{23ef}\u{25b6}\u{23f8}-\u{23fa}\u{200d}]*/ug.exec(oldtext)[0];

                newtext = newtext + emojiparsed;
                oldtext = oldtext.slice(emojiparsed.length);
            } else {
                newtext = newtext + oldtext.slice(0, 1);
                oldtext = oldtext.slice(1);
            }

        } else {
            if (newtext == "" && oldtext.startsWith("> ") || oldtext.startsWith("\n> ")) {
                newtext = newtext + `<div class="blockquoteContainer-U5TVEi"><div class="blockquoteDivider-2hH8H6"></div><blockquote>`;
                oldtext = oldtext.slice(oldtext.startsWith("\n> ") ? "\n> ".length : "> ".length);
                markdown.quote = true;

            } else if (oldtext.startsWith("\n") && markdown.quote == true) {
                newtext = newtext + "</blockquote></div>"
                oldtext = oldtext.slice(1);
                markdown.quote = false;

            } else if (oldtext.startsWith("**") && !oldtext.startsWith("****")) {
                if (markdown.bold == false) {
                    markdown.bold = true;
                    newtext = newtext + "<b>";
                } else {
                    markdown.bold = false;
                    newtext = newtext + "</b>";
                }

                oldtext = oldtext.slice(2);

            } else if (oldtext.startsWith("__") && !oldtext.startsWith("____")) {
                if (markdown.underlined == false) {
                    markdown.underlined = true;
                    newtext = newtext + "<u>";
                } else {
                    markdown.underlined = false;
                    newtext = newtext + "</u>";
                }

                oldtext = oldtext.slice(2);

            } else if (oldtext.startsWith("*") && !oldtext.startsWith("**")) {
                if (markdown.italicized == false) {
                    markdown.italicized = true;
                    newtext = newtext + "<em>";
                } else {
                    markdown.italicized = false;
                    newtext = newtext + "</em>";
                }

                oldtext = oldtext.slice(1);

            } else if (oldtext.startsWith("```") && !oldtext.startsWith("``````")) {
                if (markdown.bigcodeblock == true) {
                    markdown.bigcodeblock = false;
                    newtext = newtext + `</code></pre>`;

                    oldtext = oldtext.slice(3);
                } else {
                    markdown.bigcodeblock = true;
                    newtext = newtext + `<pre><code class="scrollbarGhostHairline-1mSOM1 scrollbar-3dvm_9 hljs">`;

                    oldtext = oldtext.slice(3);

                    if (oldtext.startsWith("\n")) oldtext = oldtext.slice(1);
                }

            } else if (oldtext.startsWith("`") && !oldtext.startsWith("``")) {
                if (markdown.codeblock == false) {
                    markdown.codeblock = true;
                    newtext = newtext + "<code>";
                } else {
                    markdown.codeblock = false;
                    newtext = newtext + "</code>";
                }

                oldtext = oldtext.slice(1);

            } else if (oldtext.startsWith("~~") && !oldtext.startsWith("~~~~")) {
                if (markdown.strikethrough == false) {
                    markdown.strikethrough = true;
                    newtext = newtext + "<del>";
                } else {
                    markdown.strikethrough = false;
                    newtext = newtext + "</del>";
                }

                oldtext = oldtext.slice(2);

            } else if (oldtext.startsWith("||") && !oldtext.startsWith("||||")) {
                if (markdown.spoiler == false) {
                    markdown.spoiler = true;
                    newtext = newtext + `<span class="spoilerText-3p6IlD hidden-HHr2R9" aria-expanded="false" tabindex="0" role="button" aria-label="Spoiler"><span class="inlineContent-3ZjPuv">`
                } else {
                    markdown.spoiler = false;
                    newtext = newtext + "</span></span>";
                }
                oldtext = oldtext.slice(2);

            } else if (Array.isArray(/[\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}\u{1f1e6}-\u{1f1ff}\u{1f191}-\u{1f251}\u{1f004}\u{1f0cf}\u{1f170}-\u{1f171}\u{1f17e}-\u{1f17f}\u{1f18e}\u{3030}\u{2b50}\u{2b55}\u{2934}-\u{2935}\u{2b05}-\u{2b07}\u{2b1b}-\u{2b1c}\u{3297}\u{3299}\u{303d}\u{00a9}\u{00ae}\u{2122}\u{23f3}\u{24c2}\u{23e9}-\u{23ef}\u{25b6}\u{23f8}-\u{23fa}\u{200d}]*/ug.exec(oldtext)) && /[\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}\u{1f1e6}-\u{1f1ff}\u{1f191}-\u{1f251}\u{1f004}\u{1f0cf}\u{1f170}-\u{1f171}\u{1f17e}-\u{1f17f}\u{1f18e}\u{3030}\u{2b50}\u{2b55}\u{2934}-\u{2935}\u{2b05}-\u{2b07}\u{2b1b}-\u{2b1c}\u{3297}\u{3299}\u{303d}\u{00a9}\u{00ae}\u{2122}\u{23f3}\u{24c2}\u{23e9}-\u{23ef}\u{25b6}\u{23f8}-\u{23fa}\u{200d}]*/ug.exec(oldtext)[0].length !== 0) { // https://stackoverflow.com/questions/43242440/javascript-unicode-emoji-regular-expressions
                const emojiparsed = /[\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}\u{1f1e6}-\u{1f1ff}\u{1f191}-\u{1f251}\u{1f004}\u{1f0cf}\u{1f170}-\u{1f171}\u{1f17e}-\u{1f17f}\u{1f18e}\u{3030}\u{2b50}\u{2b55}\u{2934}-\u{2935}\u{2b05}-\u{2b07}\u{2b1b}-\u{2b1c}\u{3297}\u{3299}\u{303d}\u{00a9}\u{00ae}\u{2122}\u{23f3}\u{24c2}\u{23e9}-\u{23ef}\u{25b6}\u{23f8}-\u{23fa}\u{200d}]*/ug.exec(oldtext)[0];

                newtext = newtext + twemoji.parse(emojiparsed);
                oldtext = oldtext.slice(emojiparsed.length);

            } else if (oldtext.startsWith(":pyrodev:")) {
                newtext = newtext + `<img class="emoji" draggable="false" alt=":pyrodev:" src="https://cdn.discordapp.com/emojis/829584881461493781.png?v=1">`;
                oldtext = oldtext.slice(`:pyrodev:`.length);

            } else if (oldtext.startsWith(":firebase:")) {
                newtext = newtext + `<img class="emoji" draggable="false" alt=":firebase:" src="https://cdn.discordapp.com/emojis/811084920255807518.gif?v=1">`;
                oldtext = oldtext.slice(`:firebase:`.length);

            } else {
                newtext = newtext + oldtext.slice(0, 1);
                oldtext = oldtext.slice(1);

            }
        }
    }

    if (markdown.bold) newtext = removeLastOf(newtext, "<b>", "**");
    if (markdown.italicized) newtext = removeLastOf(newtext, "<em>", "*");
    if (markdown.underlined) newtext = removeLastOf(newtext, "<u>", "__");
    if (markdown.codeblock) newtext = removeLastOf(newtext, "<code>", "`");
    if (markdown.strikethrough) newtext = removeLastOf(newtext, "<del>", "~~");
    if (markdown.spoiler) newtext = removeLastOf(newtext, `<span class="spoilerText-3p6IlD hidden-HHr2R9" aria-expanded="false" tabindex="0" role="button" aria-label="Spoiler"><span class="inlineContent-3ZjPuv">`, "||");
    if (markdown.quote) newtext = newtext + "</blockquote></div>";
    if (markdown.bigcodeblock) newtext = removeLastOf(newtext, `<pre><code class="scrollbarGhostHairline-1mSOM1 scrollbar-3dvm_9 hljs">`, "```");

    return createTextLinks(newtext);
};