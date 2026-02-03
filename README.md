## 📁 Directory Structure
* **Images**: Store website assets in `src/assets/<papers, avatars, ...>`. Use `.webp` or optimized `.jpg` for better performance.
*  **Content**: All editable content (News, Team, Research info) lives in `src/content/`.

## Workflow
If you want to change something, ideally create a pull request with your changes.
The CI pipeline will automatically check whether the website still builds.
If you are sure your change is good, you can merge the PR on your own.
**All pushes to `main` are immediately deployed to the live website via Github pages, so be careful with pushing to `main`.**

## How do I add...
### ...news?
Create a new page in [src/content/news](src/content/news).
You can copy an existing page, but make sure to adjust all metadata.
To keep everything sorted, prefix the page name with the current year.
If you add values to the `areas` array, the news will automatically appear on the respective subpages, in addtition to the landing page.
Add `robots` for the robots page, and/or the id(s) of research groups (right now, `reinforcement_learning`, `imitation_learning`, `ml_for_simulation`, `generative_modeling`).
If you don't add any areas, the news will only appear on the landing page.

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

You can add the id(s) of research groups (right now, `reinforcement_learning`, `imitation_learning`, `ml_for_simulation`, `generative_modeling`) to the `areas` array to make the publication automatically appear on the respective research group subpages.
The publication will always be added to the publications page.

In case you're running a development build, make sure to run `npm run import-bibtex` to update the citations list.
Production builds run this automatically.

**Important**: Never edit the generated yaml files! They will be overwritten by `import-bibtex`. Always edit the bibtex file.

### ...a new team member?
Create a new page in [src/content/team](src/content/team).
You can copy an existing page, but make sure to adjust all metadata.
The `role` field is a string enum and needs to be one of
```
Professor
Secretary
IT Administrator
Postdoc
PhD Student
Off-Campus PhD Student
Master Student
Bachelor Student
Hiwi
```
If you are an off-campus (external) student, please also add your external affiliations to `extra_affiliations`.

Optionally, you can add the date (year or month and year) when you joined in the `joinedIn` field.
It will be formatted as `Joined in {joinedIn}`.

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
You need `npm` (version >= 18.20) to be installed 

Note: The default version on Ubuntu 22.04 is too old! You will need [nvm](https://github.com/nvm-sh/nvm).
After installing nvm, run
```
nvm install 20.0
nvm use 20.0
```

To install the website dependencies, run
```
npm i
```
once in the root directory of the repository.

Then start the local server with hot module replacement:
```bash
npm run dev
```
Visit `http://localhost:4321`.

## Production Build
Generate the static site:
```bash
npm run build
```

## Icons
We use `astro-icon` with `tabler` for generic icons and `simple-icons` for brand icons.

## OpenGraph Thumbnails
Thumbnails for OpenGraph (ie, the image that you see when you link to the page on Slack) are generated automatically in `og/[...slug].png.ts`.
