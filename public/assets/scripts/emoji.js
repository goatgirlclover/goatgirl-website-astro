/* Modified version of https://github.com/jakejarvis/imagemoji, Licensed under MIT */

// NOTE: A lot of this logic was cherry-picked from Twitter's original script:
//   https://github.com/twitter/twemoji/blob/master/scripts/build.js
// As such...
/*! Copyright Twitter Inc. and other contributors. Licensed under MIT */

const privateMSAlt = {
    "10167a": "genderqueer pride flag",
    "10167b": "intersex pride flag",
    "10167c": "neutrois pride flag",
    "10167d": "nonbinary pride flag",
    "10167e": "pansexual pride flag",
    "10167f": "polyamory pride flag",
    "10169a": "no mentions emoji",
    "10169b": "paw emoji",
    "10169b 200d 1f308": "pride paw emoji",
    "10169c": "cat sticking tongue out emoji",
    "10169d": "neurodiversity emoji",
    "101666": "devil emoji",
    "101670": "agender pride flag",
    "101671": "aromantic pride flag",
    "101672": "asexual pride flag",
    "101673": "bear pride flag",
    "101674": "bigender pride flag",
    "101675": "bisexual pride flag",
    "101676": "demiguy pride flag",
    "101677": "demigirl pride flag",
    "101678": "deminonbinary pride flag",
    "101679": "genderfluid pride flag",
    "101680": "polysexual pride flag",
    "101682": "inverted pink triangle",
    "101683": "inverted black triangle",
    "101684": "bisexual inverted triangles",
    "101685": "labrys symbol",
    "101686": "lesbian pride flag",
    "101690": "poo on fire emoji",
    "101691": "cannabis leaf",
    "101692": "d4 dice",
    "101693": "d8 dice",
    "101694": "d10 dice",
    "101695": "d12 dice",
    "101696": "d20 dice",
    "101697": "petting emoij",
    "101698": "barking emoji",
    "101699": "no barking emoji"
}

function getEmojiAltText(emoji) {
    var code = emoji.codePointAt(0).toString(16);
    if (code in privateMSAlt) { return privateMSAlt[code]; }
    else { return emoji; }
}

function getRealEmoji(alt) {
    for (const [key, value] of Object.entries(privateMSAlt)) {
        if (value === alt) {
            return String.fromCodePoint("0x"+key);
        }
    }
    return alt; 
}

! function(d, u) {
    "object" == typeof exports && "undefined" != typeof module ? u(exports) : "function" == typeof define && define.amd ? define(["exports"], u) : u((d || self).imagemoji = {})
}(this, function(d) {
    // allows for legal emoji, ZWJ emoji patterns, and private-use Mutant Standarad emoji (ex. pet)
        var r = String.raw,
        exyz = r`(\p{Emoji}|[\uE000-\uF8FF\u{F0000}-\u{FFFFD}\u{100000}-\u{10FFFD}])(?:\p{EMod}|[\u{E0020}-\u{E007E}]+\u{E007F}|\uFE0F?\u20E3?)`,
        u = RegExp(r`\p{RI}{2}|(?![#*\d](?!\uFE0F?\u20E3))${exyz}(?:\u200D${exyz})*`, 'gu'),

        f = String.fromCharCode(0x200d),
        c = /^(?:style|script|noscript|iframe|noframes|select|textarea)$/,
        e = function(d, u) {
            return document.createTextNode(u ? d.replace(/\ufe0f/g, "") : d)
        },
        b = function(d, u) {
            void 0 === u && (u = "-"), d.indexOf(f) < 0 && (d = d.replace(/\ufe0f/g, ""));
            for (var c = [], e = 0, b = 0, a = 0; a < d.length;) e = d.charCodeAt(a++), b ? (c.push((65536 + (b - 55296 << 10) + (e - 56320)).toString(16)), b = 0) : e > 55296 && e <= 56319 ? b = e : c.push(e.toString(16));
            return c.join(u)
        },
        a = function d(u, f) {
            void 0 === f && (f = []);
            for (var e = u.childNodes, b = e.length; b--;) {
                var a = e[b],
                    t = a.nodeType;
                3 === t ? f.push(a) : 1 !== t || "ownerSVGElement" in a || c.test(a.nodeName.toLowerCase()) || d(a, f)
            }
            return f
        },
        t = function(d, f) {
            for (var c = a(d, []), t = c.length; t--;) {
                for (var n, r = !1, o = document.createDocumentFragment(), i = c[t], l = i.nodeValue || "", s = void 0, p = 0; s = u.exec(l);) {
                    var h = s.index;
                    h !== p && o.appendChild(e(l.slice(p, h), !0));
                    var g = s[0],
                        m = b(g),
                        v = f(m);
                    if (p = h + g.length, m && v) {
                        var C = document.createElement("object");

                        C.setAttributeNS(null, "class", "emoji");
                        C.setAttributeNS(null, "draggable", "false"), 
                        C.setAttributeNS(null, "data", v); 
                        C.setAttributeNS(null, "width", "16");
                        C.setAttributeNS(null, "height", "16");
                        C.setAttributeNS(null, "tabindex", "-1");
                        
                        var E = document.createElement("span");
                        E.setAttributeNS(null, "class", "emoji-spacer");
                        E.setAttributeNS(null, "data-emoji", getEmojiAltText(g));
                        E.setAttributeNS(null, "title", getEmojiAltText(g));
                        E.setAttributeNS(null, "aria-label", getEmojiAltText(g));
                        E.setAttributeNS(null, "hidden", "");
                        E.setAttributeNS(null, "tabindex", "-1");

                        E.appendChild(C);
                        E.appendChild(document.createTextNode(" "));
                        
                        C.onload = function() {
                            // Modify SVG styling so emojis appear uncropped
                            var svgDoc = this.contentDocument;
                            
                            var svgElement = svgDoc.getElementsByTagName("svg")[0];
                            svgElement.setAttribute("viewBox", "-48 -48 128 128");
                            
                            var styleElement = svgDoc.createElementNS("http://www.w3.org/2000/svg", "style");
                            styleElement.textContent = "svg, g { overflow: visible !important; clip-path: none !important; }"; // add whatever you need here
                            svgElement.appendChild(styleElement);

                            this.setAttributeNS(null, "style", "transform: scale(4);")
                        }

                        C.onerror = function() {
                            this.parentNode && this.parentNode.replaceChild(e(this.parentNode.getAttributeNS(null, "data-emoji"), !1), this)
                        }, r = !0, o.appendChild(E)
                    } else o.appendChild(e(g, !1))
                }
                r && (p < l.length && o.appendChild(e(l.slice(p), !0)), null == (n = i.parentNode) || n.replaceChild(o, i))
            }
            return d
        },
        n = function(d) {
            return "https://twemoji.maxcdn.com/v/latest/svg/" + d + ".svg"
        };
    d.parse = function(d, f) {
        return f = "function" == typeof f ? f : n, "string" == typeof d ? (c = f, d.replace(u, function(d) {
            var u = b(d),
                f = c(u);
            return u && f ? '<img class="emoji" draggable="false" alt="' + d + '" src="' + f + '"/>' : d
        })) : t(d, f);
        var c
    }
});

// Actually running the script
document.addEventListener("DOMContentLoaded", () => {
    imagemoji.parse(document.body, (icon) => `/assets/mutantstandard/emoji/${icon}.svg`);

    const targetNode = document.body;
    const config = { attributes: false, childList: true, subtree: true };
    const callback = (mutationList, observer) => {
        imagemoji.parse(document.body, (icon) => `/assets/mutantstandard/emoji/${icon}.svg`);
    };
    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
});

// Allow copy text with replaced emojis 
function recursiveSearchForText(node, text = "") {
    if (node.nodeType === Node.TEXT_NODE) {
        const cleanedText = node.nodeValue.replace(/\s+/g, ' ');
        if (cleanedText !== '') { text += cleanedText; }  
    } else if (node.nodeType === Node.ELEMENT_NODE) {
        if (node.className === "emoji-spacer") {
            text += getRealEmoji(node.getAttribute("data-emoji"));
        } else {
            for (const child of node.childNodes) {
                text = recursiveSearchForText(child, text);
            }
        }
    }
    return text;
}

addEventListener('copy', event => {
    let selection = document.getSelection(),
        range = selection.getRangeAt(0),
        contents = range.cloneContents(),
        copiedText = '';
    
    if (range.startContainer == range.endContainer 
        && range.startContainer.parentNode && range.startContainer.parentNode.nodeType === Node.ELEMENT_NODE
        && range.startContainer.parentNode.className === "emoji-spacer") {
        copiedText = getRealEmoji(range.startContainer.parentNode.getAttribute("data-emoji"));
    } else {
        for (let node of contents.childNodes.values()) {
            copiedText += recursiveSearchForText(node); 
        }
    }

    event.clipboardData.setData('text/plain', copiedText);
    event.preventDefault();
    console.log(`Text copied: '${copiedText}'`);
});
