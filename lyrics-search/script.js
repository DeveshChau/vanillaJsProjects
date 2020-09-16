const form = document.getElementById("form");
const search = document.getElementById("search");
const apiURL = "https://api.lyrics.ovh";
const result = document.getElementById("result");
const more = document.getElementById("more");

async function searchSongs(searchTerm) {
  const res = await fetch(`${apiURL}/suggest/${searchTerm}`);
  const data = await res.json();
  showData(data);
}

function showData(data) {
  console.log(data);

  result.innerHTML = `
		<ul class="songs">
			${data.data
        .map((song) => {
          return `<li>
				<span><strong>${song.artist.name}</strong> - ${song.title}</span>
				<button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button>
			</li>`;
        })
        .join("")}
		</ul>
	`;

  if (data.prev || data.next) {
    more.innerHTML = `
			${
        data.prev
          ? `<button class="btn" onclick="getMoreSongs('${data.prev}')">Prev</button>`
          : ""
      }
			${
        data.next
          ? `<button class="btn" onclick="getMoreSongs('${data.next}')">Next</button>`
          : ""
      }
		`;
  } else {
    more.innerHTML = "";
  }
}

async function getMoreSongs(url) {
  const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
  const data = await res.json();
  showData(data);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const term = search.value.trim();
  if (!term) {
    alert("Please enter value");
  } else {
    searchSongs(term);
  }
});

async function getLyrics(artist, songTitle) {
  const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
  const data = await res.json();

  const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, "<br>");

  result.innerHTML = `<h2><strong>${artist}</strong> - ${songTitle}</h2>
  <span>${lyrics}</span>`;

  more.innerHTML = "";
}

result.addEventListener("click", (e) => {
  const clickedEl = e.target;
  if (clickedEl.tagName === "BUTTON") {
    const artist = clickedEl.getAttribute("data-artist");
    const songTitle = clickedEl.getAttribute("data-songtitle");

    getLyrics(artist, songTitle);
  }
});
