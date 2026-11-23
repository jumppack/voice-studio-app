# Voice Studio: downloads

This repository hosts the [Voice Studio website](https://jumppack.github.io/voice-studio-app/) and its downloads.

**Voice Studio** is a free desktop app for working with voices, all on your own computer: text to speech in any voice, re-voicing whole recordings, and splitting a podcast, interview or video into one track per person plus the background music.

## Download

| System | Download |
|---|---|
| macOS (Apple silicon, macOS 12 or later) | [Voice-Studio-mac-arm64.dmg](https://github.com/jumppack/voice-studio-app/releases/latest/download/Voice-Studio-mac-arm64.dmg) |
| Windows | Coming soon |
| Linux | Coming soon |

All versions are on the [Releases](https://github.com/jumppack/voice-studio-app/releases) page.

## Installing on a Mac

1. Open the `.dmg` and drag **Voice Studio** to **Applications**.
2. Open Voice Studio. It isn't signed with an Apple developer certificate yet, so macOS asks you to confirm:
   - **macOS 15 or later:** click *Done*, then go to **System Settings → Privacy & Security** and click **Open Anyway** next to Voice Studio.
   - **macOS 14 or earlier:** right-click Voice Studio, choose **Open**, then **Open** again.
3. Click **Set up**. The first time, it installs its engine (about 1 GB) and shows a notification when it's ready.
4. On the Setup page, click **Download everything** for the voice models.

No account or login is needed, and after setup everything runs offline.

## This repository

The website is plain HTML, CSS and JavaScript (`index.html`, `styles.css`, `site.js`, `assets/`), served by GitHub Pages from the `main` branch. It shows the version, size and download count from the public releases API, and uses no cookies or tracking.
