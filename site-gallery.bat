@echo off
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
	xcopy /s/v/k/y/z "%UserProfile%\Documents\website\gallery-imgs\2048\%%f" "%UserProfile%\Documents\website\astro\public\gallery\img\%%f"
)

cd ..
cd 512
for %%f in (*.jpg) do (
	xcopy /s/v/k/y/z "%UserProfile%\Documents\website\gallery-imgs\512\%%f" "%UserProfile%\Documents\website\astro\public\gallery\thumb\%%f"
)

cd /D "%~dp0"

echo -----
echo Generating gallery subpages...
echo -----

for %%f in (..\gallery-imgs\2048\*.png) do (
	echo %%f
	call site-gallery-focus.bat "%%f" --auto
	endlocal
)

cd /D "%~dp0"

echo Site gallery updated!
pause