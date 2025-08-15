---
title: 'how i made this website'
description: 'a (now-outdated) explanation of how i first created this site with Neocities'
pubDate: 'Sep 18 2024'
updatedDate: 'Aug 1 2025'
---

**note:** this blog post is pretty old!!! i wrote it when this site was still on neocities and had next to no javascript!!! i plan to rewrite it soon with updated info and a more tutorial-like direction. whenever i get around to that, it'll be linked here!

* * *

hello! i am clover of goatgirlclover on goatgirl dot neocities nekoweb dot com!! sometimes i draw furries, sometimes i play/mod/make think about making video games, and sometimes i dedicate absurd amounts of time to random projects such as this website right here! 

this site has a blog with zero (real) posts as of writing! i wanted to get a post in there, and i wanted to talk about all the junk i did to get this working, so i'm going to do both! maybe someone out there would find all this interesting but really i just want an excuse to talk about the cursed batch scripts i wrote for this thing :3 

* * *

for starters, this website is hosted for free by Neocities Nekoweb (if you couldn't tell by the URL)! i also used these tools/resources - i talk about some of them a bit more further on:

*   [the Neocities CLI](https://neocities.org/cli) for easy upload from local files straight to the site
    *   edit 7/31/2025: nowadays i use [deploy2nekoweb](https://deploy.nekoweb.org/)!
*   [Publii](https://getpublii.com) for the blog section
*   [ImageMagick](https://imagemagick.org/index.php) on Windows for local image/thumbnail handling
*   [32bit.cafe](https://32bit.cafe), mostly as inspiration to finally make this thing

this site also uses (a modified version of) [normalize.css](https://necolas.github.io/normalize.css/) for consistent formatting and [prism.js](https://prismjs.com) for code highlighting (exclusively for the blog). 

* * *

i started with figuring out a solid look for the site. it would've been a good idea to doodle some mockups, but instead i just dove head first into HTML and CSS! i had a bit of an understanding of these from Discord client modding, but for the most part i learned as i went and Googled many many things. the goat up there caused me a LOT of trouble!!

the hearts pattern background over there is 100% CSS. [i got the code from yoksel on Codepen](https://codepen.io/yoksel/pen/AMMzMa), converted it to pure CSS, and worked backwards from there to put the calculations and variables back in. i also modified it a bit to keep it centered on the window, so it stays balanced on mobile. i'll probably replace it sometime with something i drew instead, but for now it looks nice!

i also put the dark/light mode toggle in the header. i used :has() selectors in CSS to change around the background/text color variables when an invisible checkbox is ticked. i wrote searched Google for a script that could save the checkbox's status and keep it checked between pages, so the theme sticks around. besides prism.js, which is only loaded on blog pages, this is currently the sole Javascript across the entire site! eventually i'll trade out the text label for a nice little icon. maybe i'll have even done it by the time i publish this blog post! who knows!!

just kidding. me from the future knows. i did do it before i published this. isn't it nice! and little!

* * *

okay, fun stuff! next up was the art gallery! this was the main reason for this site's entire existence so i put most of my effort here. a lot of my time working on the gallery was spent figuring out how i wanted to generate the smaller thumbnails. i started with using ImageMagick locally from the command line to resize them to around 512x512 (which may be a bit overkill, but it's still a lot smaller than the full-res files). 

handling transparency was trickier! a lot of my art, especially the older stuff, is single characters on transparent backgrounds. at first i just saved the thumbnails as .pngs, but the filesize seemed too large, so i instead generated _slightly_ compressed .jpgs and replaced all transparency with the default (dark mode) page background color.

after getting the grid formatting for the page done (which was quite a bit tricky - stackoverflow was my best friend) i then decided that this solution was ugly actually! i wanted to make them all consistently square, but no solid color backgrounds really worked for me...

so i ended up spending two full days on a messy batch script instead! ImageMagick comes in again here. now i could get unique background colors for each artwork based on the average color of the artwork itself! the important part of the script looks a little like this:

```batch
for %%f in (*.png) do (
    magick %%f -scale 1x1\! -alpha off %%~nf_a.png
    magick %%f %%~nf_a.png -resize %%[fx:u.w]x%%[fx:u.h]! -brightness-contrast -25X-20 %%~nf_b.png
    magick %%~nf_b-1.png %%f -gravity center -composite %%~nf_avg.png
        
    magick %%~nf_avg.png -alpha remove -alpha off -resize "%%[fx:min(w,h)<=512 ? w : ( w>h ? (w/h*512) : 512) ]" -quality 95 "512/%%~nf.jpg"
    
    del %%~nf_avg.png 
    del %%~nf_b-0.png
    del %%~nf_b-1.png 
    del %%~nf_a.png
)
```

what all this does is essentially:

*   scale down each image to a 1x1 pixel (getting its average color)
*   resize the single pixel to be the size of the original image, and put some effects on it so the artwork still pops  
    *   fun fact, with the way it's written this part also resizes a copy of the original image to...the exact same size it was already, and desaturates the hell out of it for good measure. this is a useless and slow step but writing it this way Worked so i'm not fixing it!!
*   combine this new image with the original and resize it all to fit into 512x512 while keeping its aspect ratio
*   clear out all the junk we made in the process

this results in a very nice set of thumbnails that i am quite pleased with 😌 throw some simple CSS animations on top of that and the gallery's all done!

* * *

...well, the main part of the gallery at least. there are also unique pages for each artwork that give a little bit of extra info about them! or just have a silly caption. you can see them by clicking on any artwork in the gallery!

Neocities hosts static sites only, so i needed individual .html files for every artwork. doing this manually would have been awful, so i needed to figure out a way to automate things. my first thought was to use some sort of static site generator, but all of them seemed to have way too much going on for what i needed, or require lots of extra work to get what i wanted out of them.

so i spent another few days writing yet another batch script that goes over each image, prompts me for the info, and generates all the HTML for me! it's extremely messy, but it works extremely well!!

here's a sample of the important bits if you're curious (note that i started this post quite a while ago and have since rewritten this a bunch):

```batch
del index.html
copy NUL index.html

echo ^<!DOCTYPE html^> >> index.html
echo ^<html lang="en"^> >> index.html
echo ^<head^> >> index.html
echo ^<title^>!title! - goatgirlclover^</title^> >> index.html

echo ^<meta property="og:title" content="!title! - goatgirlclover"^> >> index.html
echo ^<meta property="og:description" content="!desc!"^> >> index.html
echo ^<meta property="og:type" content="website"^> >> index.html
echo ^<meta property="og:url" content="!site!"^> >> index.html
echo ^<meta property="og:image" content=!site!/gallery/img/!filename!.png"^> >> index.html
echo ^<meta property="og:image:type" content="image/png"^> >> index.html
REM (we do basically this same thing again for Twitter's embed properties)

type head.html>>index.html
echo ^<div id="gallery-focus"^> >> index.html
echo 	^<div class="focus-header"^> >> index.html
echo 		^<a tabindex=0 href="/gallery" class="gallery-back"^>^<h2^>back to gallery^</h2^>^</a^> >> index.html
echo 	^</div^> >> index.html
echo 	^<div class="focus-container"^> >> index.html
echo 		^<a tabindex=0 href="/gallery/img/!filename!.png" target="_blank" rel="noopener noreferrer" class="art"^> >> index.html
echo 			^<img src="/gallery/img/!filename!.png" loading="lazy" alt="!alttext!"^>^</a^> >> index.html
echo 		^<div class="info"^> >> index.html
echo 			^<h1 class="title"^>!title!^</h1^> >> index.html
echo 			^<p class="desc"^>!desc!^</p^> >> index.html
echo 		^</div^> >> index.html
echo 	^</div^> >> index.html
echo 	^<div class="focus-footer"^> >> index.html
echo 	^</div^> >> index.html
echo ^</div^> >> index.html
type foot.html>>index.html
```

does this count as me coding a static site generator? in batch of all things? i'm going to say it does because it's funny to say that!

now all i have to do to update these pages is run this script on an artwork, plug in some basic info, and upload it to Neocities. it even generates a proper Discord embed! it saves the info in an .txt file paired with the new HTML, which is also referenced in the full script to autofill the relevant data, in case i need to regenerate any of these pages for whatever reason. 

there's also a prompt for a date for the artwork (as in when it was added to the site, not when it was drawn). this was meant for an RSS feed for the gallery, but i have yet to get that set up. i'll probably write another weird script for generating RSS that uses it. adding images to the main gallery page is still manual, but it's very quick so i don't mind.

the formatting of the pages themselves ended up being pretty simple once i figured out how to get what i wanted! the image is automatically sized so it can be viewed in full on most window sizes, and the rest of the page wraps around it. this setup lets the info show up on the right side of the image if there's enough room, filling up otherwise empty space. [this flexbox cheatsheet](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) was very useful here (and for the header)!

* * *

lastly, the blog! this was actually implemented between doing the main gallery and the individual artwork pages, but it flows better to lie and say i did it last. this is implemented through Publii, and i followed [this guide](https://cania.zone/blog/how-to-use-publii-to-make-a-blog-on-neocities-without-writing-html-and-minimal-css.html) to get it all set up (i skipped the CyberDuck bits and upload all the blog files through the [Neocities CLI](https://neocities.org/cli) instead - you won't need supporter this way).

theming was the only issue after initial setup, as i very much wanted the blog to match the aesthetic of the rest of the site. rather than learning Publii's own theming system and making it work for me, i just gutted the included Simple theme, took out everything i didn't want, and made it follow my site's style.css. i also used its Custom HTML feature to make sure everything was structured the same as all the other pages. now i can blog in a fairly nice app thing instead of worrying about HTML! 

* * *

all these puzzle pieces together result in a nice little place on the web all to myself! i'm very happy with where everything is for now, but there's still improvements to be made:

*   no images across the gallery have alt text right now. this isn't ideal but writing it out for each artwork will be very time consuming, so i haven't gotten around to it yet, sorry! 
*   the gallery page itself is still a manual effort. again, it's not a huge one so i don't mind, but in the future it'd be nice to have it all be handled in a one-click script.
*   the home and links page are both pretty basic currently - i'd like to soup them up in the future but i also barely know what to put there???
*   the blog formatting is _rough_ and will definitely require tweaking as i go
*   i _really_ want to give the me in the header some animations when you click on her. but that's complicated to do!

i'll use this site primarily to store my art - blog posts will likely end up being more rare. maybe if you like my stuff you can check in every once in a while and see what i'm up to!? or you can [follow me on whichever social media i got that you can tolerate the most](/links/) (@goatgirlclover everywhere). 

you can also [follow this blog's RSS feed](/blog/feed.xml) if you wish! (i think it's actually Atom but i'm going to call it RSS) i've no idea how or how well it works, it's all handled through Publii, but if you're into RSSing it's there! the gallery will have its own feed once i wrap my mind around all that.

or you can do none of these things! that's cool too!

i've run out of things to say though! hopefully all this rambling was enjoyable to read!

\- clover