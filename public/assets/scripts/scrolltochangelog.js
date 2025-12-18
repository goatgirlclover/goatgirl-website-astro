function scrollToChangelogItem() {
  const changelogDate = new URLSearchParams(window.location.search)?.get("changelog-item")?.replace("/", "");
  if (!changelogDate) return;

  const changelogItems = document.querySelectorAll("#site-changelog li");
  for (const item of changelogItems) {
    if (item.textContent.trim().startsWith(changelogDate)) {
        item.className += " highlight-animation"
        item.scrollIntoView();
        break;
    }
  }
}

window.addEventListener("load", scrollToChangelogItem);