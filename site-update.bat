@echo off
echo Remember to sync the blog through Publii if you haven't!
pause

echo -----
echo Generating gallery thumbnails...
echo -----

call ..\scripts\thumb.bat
endlocal
cd /D "%~dp0"
call ..\scripts\thumb_hd.bat
endlocal
cd /D "%~dp0"

echo -----
echo Copying to local website files...
echo -----

cd ..\gallery-imgs
cd 2048
for %%f in (*.png) do (
	xcopy /s/v/k/y/z "C:\Users\Clover\Documents\website\gallery-imgs\2048\%%f" "C:\Users\Clover\Documents\website\astro\public\gallery\img\%%f"
)

cd ..
cd 512
for %%f in (*.jpg) do (
	xcopy /s/v/k/y/z "C:\Users\Clover\Documents\website\gallery-imgs\512\%%f" "C:\Users\Clover\Documents\website\astro\public\gallery\thumb\%%f"
)

cd /D "%~dp0"

echo -----
echo Generating gallery subpages...
echo -----

for %%f in (..\gallery-imgs\*.png) do (
	echo %%f
	call site-gallery-focus.bat "C:\Users\Clover\Documents\website\%%f" --auto
	endlocal
)

cd /D "%~dp0"

echo Site updated! Remember to push!
pause