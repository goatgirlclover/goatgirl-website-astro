---
title: 'how i (re)made this website'
description: 'a less-outdated explanation of how i revamped my site and migrated to Astro!'
pubDate: 'Sep 11 2025'
---

# damn, it's really been a year?
hello internet! it's clover again, with another webdev meta blog post, one full calendar year after the last!!! i bet all zero of my readers were just so impatient and excited for this one :3

no but a Lot about this site, both in terms of outward Content and my own approach in making said Content, has changed significantly in the year since i first published this thing. for starters, it's not abandoned anymore! also, that blog post is just kinda messy writing that didn't really do what i set out to do. not that *this* post does all *that* much better in that regard, but regardless, improvements were all but necessary on all counts! so, here's me again, talking about making my website again.

i originally wanted this revamped post to be more of a tutorial thing, if anybody managed to stumble upon this that wanted some pointers on how to web a site. however, that is not what this is, like, at all. it is *more* helpful, i think (specifically towards the end), but overall, this post is just gonna be poking around in my head instead, which may or may not be more fun? i *will* link to resources i think would be useful for that hypothetical person, though!
***
# v1 - the part i've already written about
when this site first went up, i also wrote up a play-by-play of how i got it working and all the resources i used. i'm gonna cover the cliffnotes here, but if you want more details on how i first started out, [that old blog post is still up!](/blog/post/how-i-made-this-website/)

i first starting coding this site sometime around September 2024, maybe a bit earlier. back then it was hosted on Neocities, and *most* of the site was handwritten HTML, with copy-pasted layouts on each page. there were two exceptions to this:
- the blog was handled entirely through Publii, essentially functioning as its own website within the website - more on the problems that came with that approach later.
- the individual art pages within the gallery were generated via very messy batch scripts written in Notepad, which essentially followed this process for each artwork i added:
	- grabbed the image's width and height using ImageMagick
	- grabbed its matching `info.txt` file stuffed within the website files
	- copy over the header and structure the rest of the site used
	- generate some badly formatted HTML, filling in the blanks based on the above info
	
having three different forms of HTML generation meant any tweaks to the site's header and structure would have to be copied to each standalone HTML file, Publii's own custom HTML system, *and* my crummy batch scripts. this sucked to do!!! and i made changes Very Often so i had to do it a lot!!!!! but i just dealt with it up until i was happy enough to make it public on September 21. this ended up working well enough for me as changes were *very* sporadic after then - i only bothered to update the site to add more artwork, or swap out my Twitter link for Bluesky when i deleted my empty account LOL

the last published update i had was December 19, at which point i stopped caring to maintain it for like 7 months... yeaaa obsessively working on my website was a phase that fizzled out long before i dropped it completely. like many things i start! back then i would start up new projects all the time only to drop them pretty quickly (note: i still do this but it is not as bad). this habit meant i burned myself out on pretty much anything i did for the longest time. the first version of this website was one of many casualties of this process, so it was left alone, public but perpetually incomplete, gathering digital dust.......
***
# v2 - moving to nekoweb
NEVERMIND it's July 2025 and it's been long enough to where i HATE the site now. it is so basic and empty and not at *all* what i truly wanted to get out of it. the header looked tacky, the styling was messy and strange, the homepage is *still* using the placeholder text from the first day i started, and worst of all, **it just wasn't very fun!!!** the obsessive webdev phase was coming on again, and this thing was in desperate need of some renovations. i found out about Nekoweb while researching alternative webhosts. i wasn't actively looking to move from Neocities (at least, right then) but it was more out of curiosity, and to hold onto if i ever wanted something on my site that static hosting couldn't allow for. i don't quite remember when i decided to switch, but i do remember why. 

i was looking through other sites for inspiration and brainstorming some stuff i could add to my own. one of the things i wanted was a microblog of sorts - a place to throw my random idle thoughts that didn't need any of the fancy stuff Publii gave me. status.cafe fit the bill pretty well![^1] there were tons of examples on Neocities using this, but i eventually stumbled upon [this article](https://maphren.neocities.org/blog/posts/19-05-2024-surfing-waves-rss-guide) explaining that use of external Javascript was pretty limited for free Neocities accounts made after 2024. oh wait, i started my site in 2024![^2] let's hold onto this whenever i hunker down and get more done besides basic layout changes. then i found even more stuff i wanted to try that might've ran into CORS(?) issues - the last.fm widget on my homepage, the Entire Concept of webrings, the guestbook i still haven't added... i say *might've* because i genuinely didn't know (and still don't?? i really don't understand most of this LOL), and was kinda afraid of trying just to find out it wasn't possible with Neocities,[^3] so moving to another webhost started to become more and more attractive of an idea...

[^1]: i still wish there was a static self-hosted solution out there. kinda like @gsarjeant/tkr, but without needing PHP support. alas!

[^2]: over the years i had Completely Forgotten i first made my Neocities account in June of 2023, but never did anything with it until the next year. i only found out while looking through my site history for this post! so i guess i wouldn't have been affected by this at all! Nekoweb still has other benefits over Neocities though so i'm not pressed

[^3]: this is really funny looking back. if i actually *tried* i would've learned it was in fact *very* possible!! because those restrictions did not apply to me!!!

i eventually revisited the Nekoweb website for kicks - apparently there are way less restrictions on free accounts over here. like, *much* less. the supporter tier is a good amount cheaper, too, if i ever get that domain... oh?? you can just import your Neocities .zip right on over?? 

![friendship ended with neocities. now nekoweb is my best friend](/blog/img/friendship_neko.png)

on July 26, i made a Nekoweb account! between the 26th and the 30th, i worked on restyling the site, completely changing the header formatting, adding a footer for my socials, revamping the homepage, and adding an about-me page. i also drew up a site logo and a new favicon, and wrote some OpenGraph tags on each page to replace the automatic Discord embedding Neocities had. i *also* added a custom emoji parser heavily modified from [@jakejarvis/imagemoji](https://github.com/jakejarvis/imagemoji), which i wanted since the very first version of the site, but never figured out how to do. i got pretty close to burnout here with how much time i spent working on the site, but having a fresh perspective and learning the hard way when i needed to pull back helped me narrowly avoid it this time. v2 was a *lot* more fun to make than v1. all the boring structure changes still sucked to copy over, but there was enough fun stuff i threw in that it evened out. 

v2 of the site went up on Nekoweb on the 30th! unlike last time, i actually continued to work on the site after uploading it! on the 31st i added all my art from 2025, tweaked the favicon, and ~~struggled to~~ setup [deploy2nekoweb](https://deploy.nekoweb.org/) on my page's git repo. the next day, i tweaked some of the homepage formatting and added a bunch of those fun 88x31s i saw around. the day after i gave the site its own 88x31, and the day after *that* i joined [the Chao Garden webring!](https://knoxstation.neocities.org/chaogarden) momentum slowed down but wasn't nearly as dire as the 100-to-0 i had with v1. 

as i worked on this update, though, i was starting to dislike my creation process for each part of the site. copy-pasting layout HTML was still very boring, and i forgot to transfer code to some pages pretty often. i faced quite a bit of friction with Publii's own layout generation and styling as well, not to mention the pretty unwieldy batch scripts. i at least had the foresight to use easily-editable .html files for the structure, but there were loads of bugs on both ends i somehow never ran into before that i needed to fix. 

Publii in general was a struggle to work with for my site. writing posts themselves was easy, but getting them out in a way i liked was less so. my weird organization meant previews in the app were unstyled, and there was a lot of extra stuff i just didn't need. like, i'm the only author on the site, i don't need an author page??? nor do i need a unique 404 page??? i'm sure a lot of it is using a heavily modified Simple theme instead of a more...well, simple one, but overall the site-within-a-site approach my Publii setup operated under wasn't really working for me. part of me will miss its WYSIWYG editor, but overall, it seems better suited for driving a full site that exists as a blog and little else, at least from my experience.

come August 11, after a week away from the site, i decided to look into whether a static site generator would be the answer to my problems. layout templates were very attractive as a concept, as were the prospects of simplifying the gallery generation and potentially replacing Publii for something better suited for my needs. *but* my small-brained self also needed something that wasn't very complicated at all. something that i wouldn't need to learn much new syntax for, something i had a great amount of control over, and something that kept the generated HTML simple and clean. 

there's probably quite a few solutions that would have met my needs. i have seen 11ty and zonelets come up enough times to assume they're pretty popular! but i had been lurking in the Nekoweb Discord server for a bit by then, and [Astro](https://astro.build/) had come up a couple times. there's apparently [some sort of plugin](https://github.com/indiefellas/astro-adapter-nekoweb) that functions similarly to deploy2nekoweb, so that would transfer pretty well. there's a *bit* of terminal work but i'm pretty comfortable with that, and it doesn't seem super involved... oh, [this jbcarreon123 guy](https://jbc.lol/) made a tutorial tailored to beginners using Nekoweb? sweet! maybe this is really worth looking into... oh?? i can drive the whole blog with pure markdown files??? 

![friendship ended with publii. now astro is my best friend](/blog/img/friendship_astro.png)
***
# v3 - moving to Astro
Astro is a Javascript static site generator[^4] with a good amount of flexibility. once i got it installed, it was real easy to migrate my main pages over using a shared layout, making tweaking the layout on every page tons easier. using [the aforementioned tutorial by jb](https://jbc.lol/tutorials/astro/) and the Astro docs, i was able to get most of my site transferred in under a couple hours (and a lot of that time was only spent fixing some install issues i had). i spent quite a lot of time looking into Astro's "content collections" system for the gallery, but in the end i just decided to tweak my batch scripts to copy to different directories and use a new Astro layout instead. this allowed me to keep the `info.txt` format i already established which was nice! 

[^4]: apparently Astro can do plenty more than generate static sites, but *i'm* using it to generate a static site, so it is a static site generator to me and little else

for reference, here's the HTML-generating code of the old version of the artwork-page generator script:
```batch
type head.html>>index.html
echo ^<div id="gallery-focus"^> >> index.html
echo ^<div class="focus-header"^> >> index.html
echo ^<a tabindex=0 href="/gallery" class="gallery-back"^>^<h2^>back to gallery^</h2^>^</a^> >> index.html
echo ^</div^> >> index.html
echo ^<div class="focus-container"^> >> index.html
echo ^<a tabindex=0 href="/gallery/img/!filename!.png" target="_blank" rel="noopener noreferrer" class="art"^> >> index.html
echo ^<img src="/gallery/img/!filename!.png" loading="lazy" alt="!alttext!"^>^</a^> >> index.html
echo ^<div class="info"^> >> index.html
echo ^<h1 class="title"^>!title!^</h1^> >> index.html
echo ^<p class="desc"^>!desc!^</p^> >> index.html
echo ^</div^> >> index.html
echo ^</div^> >> index.html
echo ^<div class="focus-footer"^> >> index.html
echo ^</div^> >> index.html
echo ^</div^> >> index.html 
type foot.html>>index.html
```

and here's the new code:
```batch
setlocal disabledelayedexpansion
echo --- >> index.html
echo import GalleryFocus from "../../../layouts/gallery-focus.astro"; >> index.html
echo --- >> index.html
setlocal enabledelayedexpansion

echo ^<GalleryFocus title=`!title! - goatgirlclover` description=`!desc!` image=`/gallery/img/!filename!.png` alt=`!alttext!` width=`!W!` height=`!H!`^>^</GalleryFocus^> >> index.html
```

*way* cleaner, right?? while i would like to integrate the page generation directly into Astro instead of using these scripts sometime, the script itself is tons faster now, and changing any formatting will be *so much easier*. i shouldn't have to touch these scripts at all for any future maintenance! 

meanwhile, Astro has [a pretty good blog example](https://github.com/withastro/astro/tree/main/examples/blog) in their Github. i looked into this before for the gallery before, but that example code was a lot easier to understand and transfer to an Actual Blog than an abstract set of images (who knew?). a huge benefit of this is that i have full control over how the pages themselves are generated. my Publii setup did a lot more automatically for me (which in many ways was my own fault), but for my site i very much prefer working within my own layouts. it also shared layout files with the rest of the site rather than being its own bespoke Thing, which is just objectively way cleaner. another benefit is that since these posts are just markdown converted into HTML by Astro, i can use any markdown editor i want! i already had a kitted out Obsidian setup (complete with Syncthing!) long before i revisited this site, so now i get to draft blog posts anywhere i want using my favorite text editor!!! 

while i got everything moved, i planned to finally publish all these changes along with posting this blog post. migrating to Astro and improving my site overall was smooth sailing, but then school started and promptly kicked my ass, so it took quite a while to have the spare time (and energy) to get this blog post done. in that meantime, though, i *did* find time to update the styling Even More in some subtle ways to make the whole thing considerably cleaner. now we've got way less drop shadows, way *more* dotted lines, and an image background instead of expensive CSS! it's even animated if you so choose! yay!!!

overall the friction of updating this site has dramatically decreased. with so much of the tedium removed, now i get to Just Have Fun working on this thing! there are some improvements i would like to make to this process, though, mostly for the gallery. as mentioned, i eventually wanna have the individual art pages generated through Astro instead of a separate script. the gallery index page itself is just as manual to update as it was before, but i'd like to automate this away too if i can figure it out! some pagination on both would be really nice as well. with the transfer to astro, the only thing i really lost was live preview from within VSCode, but by now though my workflow has fully adjusted to just tabbing in and out of Firefox.

i don't want to *just* metapost about this site, though! with both the first blog post and this one, i wanted them to be vaguely helpful for somebody who happened to stumble upon this and wanted some reference on getting a site done. i well and above lost that plot for the first post, but i still have some chance to save it here!!
***
# SSGs are cool
i very much enjoy working with Astro! while writing this blog post, i've discovered quite a few cool things with Astro i've added to my site. blog posts have a table of contents and navbar now, and i've also got some PostCSS plugins to improve older browser support![^5] i'm still learning my way around but so far it seems pretty powerful with how much it can handle. it was confusing to start a lot of this stuff, but working away at it got me pretty far! it feels like i'm learning website-making all over again. the only real hiccup i've had is with scripting, at least following the Astro Way of scripting - some of my Javascript only works if i don't let Astro process it, and `onclick` apparently isn't supported, at least in the usual way? so i've just left the Javascript side of things identical to the v2 site for now. (admittedly some of the Javascript is pretty cursed, though, so i'm not shocked)

[^5]: the dream is having this site perfectly functional on both my 3DS and my Vita. being able to improve support for these two while only having to write modern CSS is pretty great!

if somehow this post has convinced YOU 🫵 to consider Astro for your website(s), [the twice-aforementioned and extremely useful jb tutorial](https://jbc.lol/tutorials/astro/) is a good start, but i also have some suggestions:
- consider other options too!!! i picked Astro because it's easy and its structure (usually) makes sense to me, but there may be something out there that you click with better. i've got no recommendations for alternatives though, Astro is all i've ever tried LOL
- if you want a simple example to look over, [check out my site's repo over on Github!](https://github.com/goatgirlclover/goatgirl-website-astro) feel free to snatch whatever snippets you like :)
	- some code is modified from others' code, licensed and thereby released through MIT - more info in the repo's license and on [my links page](/links)
- maybe this is basic ass info i just wasn't privy to, but if you're looking to use VSCode locally with the Astro extension like i do, make sure to open your site as a folder rather than working on the individual files!! i got quite a few syntax errors from individual editing that i tried and failed to fix, but they all Disappeared when working within the Astro folder instead
	- it's also useful for using the VSCode terminal to build/test your site!
	- ALSO apparently you can replace Live Preview with the Simple Browser, if that helps your workflow! not *as* convenient as the former, but not too bad. personally i tend to just throw Firefox and VSCode side-by-side, if anything
## these other things are cool, too
- [32bit.cafe. like, all of it](https://32bit.cafe/cyowebsite/)
- [this flexbox cheatsheet](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) saved my life time and time again. most of this site is flexboxes. i absolutely adore them <3
- [mozilla's CSS docs](https://developer.mozilla.org/en-US/docs/Web/CSS) and [w3school's HTML docs/tutorials](https://www.w3schools.com/Html/html_intro.asp) were also referenced many many many times
- web accessibility is awesome. there are many many things you can find about this, but i will just recommend using semantic HTML and [occasionally using this thing](https://www.ssa.gov/accessibility/andi/help/howtouse.html) to check your work
- EVERYBODY ELSE'S WEBSITES. they're so many cool ones out there!!!!! i've linked to some i particularly like or was inspired by in [my links page](/links) :)

eventually i'll have a dedicated spot in my links page for stuff like this. for now i will just gather up more and more cool things...
***
# i love my internet house
not to get into manifesto territory, but there is something extremely comfortable about having something on the public internet that is just Yours. like, obviously i am beholden to whatever Nekoweb wants to do with my content, but the content is still Mine in a different way than Capital-P Posting online really allows for, and the whole thing feels a lot more intimate. when i started working on this website, i wasn't trying to escape modern social media, or return to an era of the web i was Not Even Alive For. i am still on social media, and my site is styled relatively modern! i just wanted something other people could see that was Mine, in as many senses of the word as possible. and i think with all these updates, i've gotten a lot closer to that! :D

i've got a pretty comfortable setup here, so i think i can finally focus on adding more content! the gallery will ofc be updated in sync with my Bluesky, and i do still plan to give it an RSS feed down the line! my status.cafe has been going pretty steady as well - it's nice to vomit out thoughts every once in a while. very much intending to keep this blog more active, too - hopefully the next post isn't yet another meta post about the damn site itself 😭 posts will still be pretty sporadic but, like, not as much of a gap between this post and the last, ideally LOL

here are some topics that are safe to expect from this blog:
- thoughts on video games i feel like writing about! for example, i've started playing through the Kingdom Hearts series recently - i will probably post about them as i go through them! stuff about Sonic will probably end up here, too
	- other media may also be written about but tbh 90% of the new Media i experience these days is video games, so it's going to be mostly video games :)
- the rare life story that's funny/interesting enough to throw up here, instead of posting about on Bluesky or something
- stuff about my own characters/projects?? whenever i can get something off the ground LOL
- miscellaneous random bullshit! anything that i feel justifies longform writing, or just fun/funny stuff

check out [this blog's RSS feed](/blog/feed.xml) if you wanna keep up with all this! as for the rest of the site, i'm not totally sure. i still want to improve the gallery, but in terms of Content, all i could think of for now is a better about me page, more links to cool things, and showing off my growing plush collection LOL. i'd also like a page explaining my OCs and worlds once i've got all that tied down. i've still got school to worry about, but junk like that will be trinkling in whenever i make the time. i don't think this thing will ever be "done," though - i personally prefer the perpetual state of incompleteness we've had so far! 

that's all i've got to say for now though! take care, dearest reader 👋

\- clover