@echo off
setlocal enabledelayedexpansion

set "workingdir=%UserProfile%\Documents\website\scripts\"
set "uploaddir=%UserProfile%\Documents\website\astro\public\"
set "pagedir=%UserProfile%\Documents\website\astro\src\pages\gallery\view\"
set "gallerydir=!uploaddir!gallery\view\"

cd %workingdir%  

set "filename=%~n1"
echo !filename!

set "auto=false"
if "%~2"=="--auto" (
	set "auto=true"
)

set "title="MM/DD/YYYY Name""
set "desc="keep lowercase, except for I""
set "postdate=%date% %time:~0,-3%"
set "alttext=PLACEHOLDER"

set "num=0"

set filedir=!gallerydir!!filename!
setlocal disabledelayedexpansion
set infodir=%filedir%.txt
echo %infodir%

for /f "tokens=1-2" %%i in ('magick identify -ping -format "%%w %%h" %1') do set W=%%i & set H=%%j
set "W=%W: =%"
set "H=%H: =%"
echo Width: %W%
echo Height: %H%

if not exist %infodir% (
	if "%~2"=="--auto" (
		echo Automatic, but no info.txt. Will prompt for info...
		set "auto=false"
	)
)

if exist %infodir% (

	setlocal disabledelayedexpansion
	for /F "delims=" %%c in (%infodir%) do ( 
		setlocal enabledelayedexpansion
		if !num!==0 ( 
			setlocal disabledelayedexpansion
			set "title=%%c"
			setlocal enabledelayedexpansion
		)
		
		set "num=1"
	)

	setlocal disabledelayedexpansion
	for /F "skip=1 delims=" %%c in (%infodir%) do ( 
		setlocal enabledelayedexpansion
		if !num!==1 ( 
			setlocal disabledelayedexpansion
			set "desc=%%c"
			setlocal enabledelayedexpansion
		)
		set "num=2"
	)

	setlocal disabledelayedexpansion
	for /F "skip=2 delims=" %%c in (%infodir%) do ( 
		setlocal enabledelayedexpansion
		if !num!==2 ( 
			setlocal disabledelayedexpansion
			set "postdate=%%c"
			setlocal enabledelayedexpansion
		)
		set "num=3"
	)

	setlocal disabledelayedexpansion
	for /F "skip=3 delims=" %%c in (%infodir%) do ( 
		setlocal enabledelayedexpansion
		if !num!==3 ( 
			setlocal disabledelayedexpansion
			set "alttext=%%c"
			setlocal enabledelayedexpansion
		)
		set "num=4"
	)
)

setlocal enabledelayedexpansion

if not "%auto%"=="true" (
set /p "choice=Enter the title of the artwork (!title!): "
if not "!choice!"=="" set "title=!choice!"
set /p "choice1=Enter the work's description (!desc!): "
if not "!choice1!"=="" set "desc=!choice1!"
set /p "choice2=RFC 2822 date for RSS (!postdate!): "
if not "!choice2!"=="" set "postdate=!choice2!"
set /p "choice3=Image alt text (!alttext!): "
if not "!choice3!"=="" set "alttext=!choice3!"


)

echo Title: "!title!"
echo Description: "!desc!"
echo Date: "!postdate!"
echo Alt: "!alttext!"

del !gallerydir!!filename!.txt
copy NUL !gallerydir!!filename!.txt
echo !title!>>!gallerydir!!filename!.txt
echo !desc!>>!gallerydir!!filename!.txt
echo !postdate!>>!gallerydir!!filename!.txt
echo !alttext!>>!gallerydir!!filename!.txt

del index.html
copy NUL index.html

setlocal disabledelayedexpansion
echo --- >> index.html
echo import GalleryFocus from "../../../layouts/gallery-focus.astro"; >> index.html
echo --- >> index.html
setlocal enabledelayedexpansion

echo ^<GalleryFocus title=`!title! - goatgirlclover` description=`!desc!` image=`/gallery/img/!filename!.png` alt=`!alttext!` width=`!W!` height=`!H!`^>^</GalleryFocus^> >> index.html

setlocal enabledelayedexpansion
copy index.html "!pagedir!!filename!.astro"
del index.html
endlocal
echo -----
goto :eof

:trim 
SetLocal EnableDelayedExpansion
set "Params=%*"
for /f "tokens=1*" %%a in ("!Params!") do EndLocal & set "%1=%%b"
exit /b