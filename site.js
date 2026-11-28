// Voice Studio website: pick the right download for this computer, and show the version, size and
// download count from GitHub's public releases API (no cookies, no tracking).
(function () {
  "use strict";
  var REPO = "jumppack/voice-studio-app";
  var ua = navigator.userAgent || "", plat = (navigator.userAgentData && navigator.userAgentData.platform) || navigator.platform || "";
  var os = /Mac/i.test(plat) || /Mac OS X/i.test(ua) ? "mac" : /Win/i.test(plat) || /Windows/i.test(ua) ? "windows"
    : /Linux|X11/i.test(plat + ua) && !/Android/i.test(ua) ? "linux" : /Android|iPhone|iPad/i.test(ua) ? "mobile" : "other";
  var hero = document.getElementById("heroDownload"), heroText = document.getElementById("heroDownloadText"), note = document.getElementById("heroNote");
  var mac = document.getElementById("macLink"), lin = document.getElementById("linuxLink"), win = document.getElementById("windowsLink");

  if (os === "mac") {
    hero.href = mac.href;
    heroText.textContent = "Download for Mac";
    note.textContent = "For Mac with Apple silicon (M1 or later). Free, 16 MB.";
    document.getElementById("dl-mac").classList.add("recommended");
  } else if (os === "linux") {
    hero.href = lin.href;
    heroText.textContent = "Download for Linux";
    note.textContent = "For 64-bit Linux. Free, 17 MB.";
    document.getElementById("dl-linux").classList.add("recommended");
  } else if (os === "windows") {
    hero.href = win.href;
    heroText.textContent = "Download for Windows";
    note.textContent = "For Windows 10 and 11, 64-bit. Free, 15 MB.";
    document.getElementById("dl-windows").classList.add("recommended");
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
      var tgz = (latest.assets || []).filter(function (a) { return /linux.*\.tar\.gz$/i.test(a.name); })[0];
      if (tgz) {
        lin.href = tgz.browser_download_url;
        if (os === "linux") hero.href = tgz.browser_download_url;
        document.getElementById("linuxSize").textContent = ".tar.gz · " + mb(tgz.size);
      }
      var zip = (latest.assets || []).filter(function (a) { return /windows.*\.zip$/i.test(a.name); })[0];
      if (zip) {
        win.href = zip.browser_download_url;
        if (os === "windows") hero.href = zip.browser_download_url;
        document.getElementById("windowsSize").textContent = ".zip · " + mb(zip.size);
      }
      if (dmg) {
        mac.href = dmg.browser_download_url;
        if (os === "mac") hero.href = dmg.browser_download_url;
        document.getElementById("macSize").textContent = ".dmg · " + mb(dmg.size);
      }
      if (total > 0) document.getElementById("dlCount").textContent = "Downloaded " + total.toLocaleString() + " time" + (total === 1 ? "" : "s") + ".";
    })
    .catch(function () { /* the page works without it */ });
})();
