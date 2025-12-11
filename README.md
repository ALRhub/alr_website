## 📁 Directory Structure
*  **Images**: Store website assets in `src/assets/images/`. Use `.webp` or optimized `.jpg` for better performance.
*   **Team Photos**: Place headshots in `src/assets/team/`. Square aspect ratio (1:1) is recommended.
*   **Content**: All editable content (News, Team, Research info) lives in `src/content/`.

## How do I add...
### ...news
Create a new page in [src/content/news](src/content/news).
You can copy an existing page, but make sure to adjust all metadata.
To keep everything sorted, prefix the page name with the current year.

### ...a new thesis topic?
Create a new page in [src/content/theses](src/content/theses).
You can copy an existing page, but make sure to adjust all metadata.
If the topic is already assigned, make sure to include `assigned: true` and set the `student` parameter.
Otherwise, don't forget to update the info as soon as the topic is assigned!

### ...a new publication?
Simply add the bibtex entry to [citations.bib](citations.bib).
If you want a shiny badge, make sure to include one of the following keywords in the `note` field (case doesn't matter, and you can also include other text):
- `best paper`
- `best student paper`
- `spotlight`
- `oral`

In case you're running a development build, make sure to run `npm run import-bibtex` to update the citations list.
Production builds run this automatically.

### ...a new team member?
Create a new page in [src/content/team](src/content/team).
You can copy an existing page, but make sure to adjust all metadata.
There are various metadata tags for external links available (`email`, `website`, `linkedin`, `github`, `twitter`, `googleScholar`).
Also remember to add a picture of you in [src/assets/avatars](src/assets/avatars).
Make sure that the image isn't too high-resolution (e.g. 512px x 512px) and ideally square.

### ...an alumnus?
Create a new page in [src/content/alumni](src/content/alumni).
You can copy an existing page, but make sure to adjust all metadata.
Esp, update the order key.
Higher keys are sorted towards the top of the alumni list.
I'd recommend to always increase this in intervals of 10 so that one can later add alumni inbetween other ones without having to change all the other alumni's order numbers.

### ...a new robot?
Create a new page in [src/content/robots](src/content/robots).
You can copy an existing page, but make sure to adjust all metadata.


## 🛠️ Development
You need `npm` to be installed.

Start the local server with hot module replacement:
```bash
npm run dev
```
Visit `http://localhost:4321`.

## Production Build
Generate the static site and search index:
```bash
npm run build
```

## Icons
We are using `astro-icon` with `tabler` icons for generic icons and `simple-icons` for brand icons.
