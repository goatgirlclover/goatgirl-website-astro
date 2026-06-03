/* Modified version of https://github.com/DaInfLoop/website-v4 LastFM code */

const username = "scoop9";

var canRefresh = true;
const music_status = document.getElementById("lastfm-status");
const song = document.getElementById("lastfm-song");
const image = document.querySelector("#lastfm-section .lastfm-cover");
const refresh = document.getElementById("lastfm-refresh");

const fallbackCover =
	"https://lastfm.freetls.fastly.net/i/u/300x300/c6f59c1e5e7240a4c0d427abd71f3dbb.jpg";

fetchLastFM();
refresh.style.animation = "none";

function fetchLastFM() {
	if (canRefresh) {
		canRefresh = false;
		setTimeout(function () {
			canRefresh = true;
		}, 1000);
	} else {
		return;
	}

	refresh.style.animation = "none";
	refresh.offsetHeight;
	refresh.style.animation = "spin 1s ease 1";

	music_status.textContent = "loading...";
	song.textContent = "";

	image.src = fallbackCover;
	image.setAttribute("title", "album cover: not loaded!");
	image.setAttribute("alt", "album cover: not loaded!");

	fetch(`https://lastfm-last-played.biancarosa.com.br/${username}/latest-song`)
		.then((response) => {
			if (!response.ok) {
				music_status.textContent = response.status;
				return Promise.reject("Response not ok with status " + response.status);
			} else {
				return response;
			}
		})
		.then((res) => res.json())
		.then((data) => {
			json = data;
		})
		.then(() => {
			if (json.hasOwnProperty("response")) {
				music_status.textContent = json.response;
			} else {
				const track = json.track;
				var album = track.album["#text"];

				if (track["@attr"]?.nowplaying == "true") {
					music_status.textContent = "is now listening to...";
				} else {
					music_status.textContent = "last listened to...";
				}

				song.textContent = `${track.name} - ${track.artist["#text"]}`;
				song.href = track.url;
				song.target = "_blank";

				image.src = track.image[3]["#text"] || fallbackCover;
				if (image.src === fallbackCover) {
					window
						.albumArt(track.artist["#text"], {
							track: track.name,
							size: "large",
						})
						.then((cover) => {
							image.src = cover[0] || fallbackCover;
							// album = cover[1];
						});
				}

				const alt =
					album && album.length > 0
						? (image.src === fallbackCover ? "" : "album art for ") +
							album +
							" by " +
							track.artist["#text"]
						: "cover for " + song.textContent;
				image.setAttribute("title", alt);
				image.setAttribute("alt", alt);
			}
		});
}
