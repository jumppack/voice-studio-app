// Voice Studio website: pick the right download for this computer, and show the version, size and
// download count from GitHub's public releases API (no cookies, no tracking).
(function () {
  "use strict";
  var REPO = "jumppack/voice-studio-app";
  var ua = navigator.userAgent || "", plat = (navigator.userAgentData && navigator.userAgentData.platform) || navigator.platform || "";
  var os = /Mac/i.test(plat) || /Mac OS X/i.test(ua) ? "mac" : /Win/i.test(plat) || /Windows/i.test(ua) ? "windows"
    : /Linux|X11/i.test(plat + ua) && !/Android/i.test(ua) ? "linux" : /Android|iPhone|iPad/i.test(ua) ? "mobile" : "other";
  var hero = document.getElementById("heroDownload"), heroText = document.getElementById("heroDownloadText"), note = document.getElementById("heroNote");
  var mac = document.getElementById("macLink");

  if (os === "mac") {
    hero.href = mac.href;
    heroText.textContent = "Download for Mac";
    note.textContent = "For Mac with Apple silicon (M1 or later). Free, 16 MB.";
    document.getElementById("dl-mac").classList.add("recommended");
  } else if (os === "windows" || os === "linux") {
    heroText.textContent = "See downloads";
    note.textContent = (os === "windows" ? "Windows" : "Linux") + " is coming soon. Voice Studio is available for Mac now.";
  } else if (os === "mobile") {
    heroText.textContent = "See downloads";
    note.textContent = "Voice Studio is a desktop app. Open this page on your computer to download it.";
  }

  function mb(b) { return b >= 1e6 ? Math.round(b / 1e6) + " MB" : Math.max(1, Math.round(b / 1e3)) + " KB"; }
  fetch("https://api.github.com/repos/" + REPO + "/releases", { headers: { Accept: "application/vnd.github+json" } })
    .then(function (r) { return r.ok ? r.json() : []; })
    .then(function (rels) {
      if (!rels || !rels.length) return;
      var latest = rels.filter(function (r) { return !r.draft && !r.prerelease; })[0] || rels[0];
      var total = 0;
      rels.forEach(function (r) { (r.assets || []).forEach(function (a) { total += a.download_count || 0; }); });
      var dmg = (latest.assets || []).filter(function (a) { return /mac.*\.dmg$/i.test(a.name); })[0];
      var v = (latest.tag_name || "").replace(/^v/, "");
      var date = latest.published_at ? new Date(latest.published_at).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" }) : "";
      document.getElementById("dlMeta").textContent = "Version " + v + (date ? " · released " + date : "") + " · free";
      if (dmg) {
        mac.href = dmg.browser_download_url;
        if (os === "mac") hero.href = dmg.browser_download_url;
        document.getElementById("macSize").textContent = ".dmg · " + mb(dmg.size);
      }
      if (total > 0) document.getElementById("dlCount").textContent = "Downloaded " + total.toLocaleString() + " time" + (total === 1 ? "" : "s") + ".";
    })
    .catch(function () { /* the page works without it */ });
})();
