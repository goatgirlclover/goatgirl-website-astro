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

const hoofEmojis = ["1f4aa", "1f44a", "1f44b", "1f44c", "1f44d", "1f44e", "1f44f", "1f64c", "1f64f", "1f90c", "1f91b", "1f91c", "1f91d", "1f446", "1f447", "1f448", "1f449", "1f450", "1f485", "1f590", "1f595", "1f596", "1f918", "1f919", "1f91a", "1f91e", "1f932", "1f933", "261d", "270a", "270b", "270c"]
const pawEmojis = ["270d"];
const modifiers = ["􁘀", "􁘁", "􁘂", "􁘃", "􁘄", "􁘅", "􁘆", "􁘇", "􁘈", "􁘉", "􁘊", "􁘋", "􁘌", "􁘍", "􁘎", "􁘏", "􁘐", "􁘑", "􁘒", "􁘓", "􁘔", "􁘕", "􁘖", "􁘗", "􁘘", "􁘙", "􁘚", "􁘛", "􁘜", "􁘝", "􁘞", "􁘟", "􁘠", "􁘡", "􁘢", "􁘣", "􁘤", "􁘥", "􁘦", "􁘧", "􁘨", "􁘩", "􁘪", "􁘫", "􁘬", "🏿", "🏾", "🏽", "🏼", "🏻", "􁙐", "􁙑", "􁙒"];
const modifierCSS = ".emojiText::after { display: inline; } .emojiText.hoof::after { content: '􁙒􁘨'; } .emojiText.paw::after { content: '􁙐􁘈'; }"

function parseEmoji(text) {
    var r = String.raw;
    var regexPartial = r`(\p{Emoji}|[\uE000-\uF8FF\u{F0000}-\u{FFFFD}\u{100000}-\u{10FFFD}])(?:\p{EMod}|[\u{E0020}-\u{E007E}]+\u{E007F}|\uFE0F?\u20E3?)`;
    var regex = RegExp(r`\p{RI}{2}|(?![#*\d](?!\uFE0F?\u20E3))${regexPartial}(?:\u200D${regexPartial})*`, 'gu');

    return text.replaceAll("↩", "↩️").replaceAll(regex, function(emoji) {
        var code = emoji.codePointAt(0).toString(16);
        var classN = "emojiText";
        var title = code in privateMSAlt ? ' aria-label="' + privateMSAlt[code] + '"' : '';
        if (hoofEmojis.indexOf(code) !== -1) { classN += " hoof" }
        if (pawEmojis.indexOf(code) !== -1) { classN += " paw" }
        return '<span class="' + classN + '"' + title + '>' + emoji + '</span>';
    });
}

function parseEmojiInDocument() {
    var ignoreNodes = []
    document.body.querySelectorAll(".emojiText").forEach(node => { 
        var iter = document.createTreeWalker(node, NodeFilter.SHOW_TEXT);
        while (iter.nextNode()) {
            ignoreNodes.push(iter.currentNode);
        }
    });
    
    const children = [];
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
        if (ignoreNodes.indexOf(walker.currentNode) === -1) { 
            children.push(walker.currentNode); 
        }
    };

    children.forEach(child => {
        var div = document.createElement('div');
        child.parentNode.insertBefore(div, child);
        div.insertAdjacentHTML('afterend', parseEmoji(child.textContent));
        div.remove();
        child.remove();
    });
}

document.addEventListener("DOMContentLoaded", () => {
    parseEmojiInDocument();
    
    const callback = (mutationList, observer) => { 
        observer.disconnect(); 
        parseEmojiInDocument();
        observer.observe(document.body, options);
    }

    const observer = new MutationObserver(callback);
    const options = { attributes: false, childList: true, subtree: true };
    observer.observe(document.body, options);
});

function addModifierCSS() {
    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    if (style.styleSheet) {
        style.styleSheet.cssText = modifierCSS;
    } else {
        style.appendChild(document.createTextNode(modifierCSS));
    }
    head.appendChild(style);
}

if (sessionStorage.getItem("loadedMSEmojiFont") === "true") {
    addModifierCSS();
} else {
    document.fonts.addEventListener("loadingdone", () => {
        document.fonts.forEach(async font => {
            if (font.family.indexOf("MutantStandardEmoji") !== -1) {
                if (font.status == "loaded") {
                    addModifierCSS();
                    sessionStorage.setItem("loadedMSEmojiFont", "true");
                }
            }
        });
    });
}

