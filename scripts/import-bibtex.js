import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import bibtexParse from 'bibtex-parse-js';
import slugify from 'slugify';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BIB_FILE = path.join(process.cwd(), 'citations.bib');
const PUBLICATIONS_DIR = path.join(process.cwd(), 'src', 'content', 'publications');

// Remove output dir if it exists
if (!fs.existsSync(PUBLICATIONS_DIR)) {
  fs.rmSync(PUBLICATIONS_DIR, { recursive: true, force: true})
}
fs.mkdirSync(PUBLICATIONS_DIR, { recursive: true });

// Helper to decode LaTeX special characters to Unicode
function decodeLatex(str) {
  if (!str) return '';
  
  let decoded = str;

  // First replace symbols that might be used inside accents (like \i)
  const latexSymbols = {
    '\\ss': 'ß',
    '\\ae': 'æ', '\\AE': 'Æ',
    '\\aa': 'å', '\\AA': 'Å',
    '\\oe': 'œ', '\\OE': 'Œ',
    '\\o': 'ø', '\\O': 'Ø',
    '\\l': 'ł', '\\L': 'Ł',
    '\\i': 'ı', '\\j': 'ȷ',
    '\\&': '&', '\\$': '$', '\\%': '%', '\\#': '#', '\\_': '_',
    '\\textendash': '–', '\\textemdash': '—',
    '\\textcopyright': '©', '\\textregistered': '®',
    '\\dag': '†', '\\ddag': '‡',
    '\\P': '¶', '\\S': '§',
    '\\copyright': '©', '\\pounds': '£'
  };

  // Replace symbols
  for (const [tex, char] of Object.entries(latexSymbols)) {
    const pattern = tex.replace(/\\/g, '\\\\');
    // 1. Match { \symbol }
    decoded = decoded.replace(new RegExp(`\\{${pattern}\\}`, 'g'), char);
    // 2. Match \symbol (plus optional space)
    if (tex.match(/[a-zA-Z]$/)) {
        decoded = decoded.replace(new RegExp(`${pattern}\\s?`, 'g'), char);
    } else {
        decoded = decoded.replace(new RegExp(`${pattern}`, 'g'), char);
    }
  }

  // Define accent maps including dotless i (ı)
  const latexAccents = [
    { cmd: '"', map: { a: 'ä', A: 'Ä', e: 'ë', E: 'Ë', i: 'ï', I: 'Ï', o: 'ö', O: 'Ö', u: 'ü', U: 'Ü', y: 'ÿ', Y: 'Ÿ', 'ı': 'ï' } },
    { cmd: "'", map: { a: 'á', A: 'Á', e: 'é', E: 'É', i: 'í', I: 'Í', o: 'ó', O: 'Ó', u: 'ú', U: 'Ú', y: 'ý', Y: 'Ý', c: 'ć', C: 'Ć', n: 'ń', N: 'Ń', s: 'ś', S: 'Ś', z: 'ź', Z: 'Ź', 'ı': 'í' } },
    { cmd: "`", map: { a: 'à', A: 'À', e: 'è', E: 'È', i: 'ì', I: 'Ì', o: 'ò', O: 'Ò', u: 'ù', U: 'Ù', 'ı': 'ì' } },
    { cmd: "^", map: { a: 'â', A: 'Â', e: 'ê', E: 'Ê', i: 'î', I: 'Î', o: 'ô', O: 'Ô', u: 'û', U: 'Û', c: 'ĉ', C: 'Ĉ', g: 'ĝ', G: 'Ĝ', h: 'ĥ', H: 'Ĥ', j: 'ĵ', J: 'Ĵ', s: 'ŝ', S: 'Ŝ', w: 'ŵ', W: 'Ŵ', y: 'ŷ', Y: 'Ŷ', 'ı': 'î' } },
    { cmd: "~", map: { a: 'ã', A: 'Ã', n: 'ñ', N: 'Ñ', o: 'õ', O: 'Õ', u: 'ũ', U: 'Ũ', i: 'ĩ', I: 'Ĩ', 'ı': 'ĩ' } },
    { cmd: "=", map: { a: 'ā', A: 'Ā', e: 'ē', E: 'Ē', i: 'ī', I: 'Ī', o: 'ō', O: 'Ō', u: 'ū', U: 'Ū', 'ı': 'ī' } },
    { cmd: ".", map: { c: 'ċ', C: 'Ċ', e: 'ė', E: 'Ė', g: 'ġ', G: 'Ġ', I: 'İ', z: 'ż', Z: 'Ż' } },
    { cmd: "u", map: { a: 'ă', A: 'Ă', e: 'ĕ', E: 'Ĕ', g: 'ğ', G: 'Ğ', i: 'ĭ', I: 'Ĭ', o: 'ŏ', O: 'Ŏ', u: 'ŭ', U: 'Ŭ', 'ı': 'ĭ' } },
    { cmd: "v", map: { c: 'č', C: 'Č', d: 'ď', D: 'Ď', e: 'ě', E: 'Ě', l: 'ľ', L: 'Ľ', n: 'ň', N: 'Ň', r: 'ř', R: 'Ř', s: 'š', S: 'Š', t: 'ť', T: 'Ť', z: 'ž', Z: 'Ž' } },
    { cmd: "H", map: { o: 'ő', O: 'Ő', u: 'ű', U: 'Ű' } },
    { cmd: "c", map: { c: 'ç', C: 'Ç', s: 'ş', S: 'Ş', t: 'ţ', T: 'Ţ', n: 'ņ', N: 'Ņ', k: 'ķ', K: 'Ķ', g: 'ģ', G: 'Ģ', l: 'ļ', L: 'Ļ', r: 'ŗ', R: 'Ŗ' } },
    { cmd: "k", map: { a: 'ą', A: 'Ą', e: 'ę', E: 'Ę', i: 'į', I: 'Į', u: 'ų', U: 'Ų' } },
    { cmd: "r", map: { a: 'å', A: 'Å' } }
  ];

  // Replace accents
  // regex now includes \u0131 (dotless i) and \u0237 (dotless j) in capture group
  latexAccents.forEach(({ cmd, map }) => {
     const safeCmd = cmd.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
     const charClass = '[a-zA-Z\\u0131\\u0237]';
     // 1. {\cmd{c}} or {\cmd c}
     decoded = decoded.replace(new RegExp(`\\{\\\\${safeCmd}\\s*(?:\\{(${charClass})\\}|(${charClass}))\\}`, 'g'), (_, c1, c2) => map[c1 || c2] || _);
     // 2. \cmd{c} or \cmd c
     decoded = decoded.replace(new RegExp(`\\\\${safeCmd}\\s*(?:\\{(${charClass})\\}|(${charClass}))`, 'g'), (_, c1, c2) => map[c1 || c2] || _);
  });

  return decoded;
}

// Helper to clean BibTeX strings (remove braces)
function cleanString(str) {
  if (!str) return '';
  const decoded = decodeLatex(str);
  return decoded.replace(/[{}]/g, '').trim();
}

// Helper to parse authors
function parseAuthors(authorStr) {
  if (!authorStr) return [];
  return authorStr.split(' and ').map(name => {
    const cleanName = cleanString(name);
    // Handle "Last, First" format
    if (cleanName.includes(',')) {
      const parts = cleanName.split(',').map(p => p.trim());
      return `${parts[1]} ${parts[0]}`;
    }
    return cleanName;
  });
}

// Main function
function importBibtex() {
  if (!fs.existsSync(BIB_FILE)) {
    console.error(`Error: BibTeX file not found at ${BIB_FILE}`);
    console.log('Please place your "citations.bib" file in the project root.');
    process.exit(1);
  }

  const bibContent = fs.readFileSync(BIB_FILE, 'utf-8');
  const parsed = bibtexParse.toJSON(bibContent);

  console.log(`Found ${parsed.length} entries. Processing...`);

  let count = 0;
  parsed.forEach(entry => {
    const tags = entry.entryTags;
    
    // Basic validation
    if (!tags.title || !tags.year) {
      console.warn(`Skipping entry ${entry.citationKey}: Missing title or year.`);
      return;
    }

    let type = 'paper';

    const title = cleanString(tags.title);
    const year = parseInt(tags.year, 10);
    const authors = parseAuthors(tags.author);
    // For books, publisher is often the venue equivalent
    let venue = cleanString(tags.booktitle || tags.journal || tags.school || tags.publisher || tags.howpublished || tags.organization || tags.institution || '');
    const description = "";

    // normalize arxiv names
    if (venue.includes("arXiv preprint")) {
      venue = "Preprint"
    }

    // normalize some venue names
    if (venue.toLowerCase().includes("International Conference on Learning Representations".toLowerCase())) {
      venue = "ICLR"
    }
    if (venue.toLowerCase().includes("International Conference for Learning Representations".toLowerCase())) {
      venue = "ICLR"
    }
    if (venue.toLowerCase().includes("International Conference on Machine Learning".toLowerCase())) {
      venue = "ICML"
    }
    if (venue.toLowerCase().includes("International Conference for Machine Learning".toLowerCase())) {
      venue = "ICML"
    }
    if (venue.toLowerCase().includes("Neural Information Processing Systems".toLowerCase())) {
      venue = "NeurIPS"
    }
    if (venue.toLowerCase().includes("Transactions on Machine Learning Research".toLowerCase())) {
      venue = "TMLR"
    }
    if (venue.toLowerCase().includes("Transactions for Machine Learning Research".toLowerCase())) {
      venue = "TMLR"
    }
    if (venue.toLowerCase().includes("International Conference on Intelligent Robots and Systems".toLowerCase())) {
      venue = "IROS"
    }
    if (venue.toLowerCase().includes("Conference on Robot Learning".toLowerCase())) {
      venue = "CORL"
    }
    if (venue.toLowerCase().includes("Computer Vision and Pattern Recognition".toLowerCase())) {
      venue = "CVPR"
    }
    if (venue.toLowerCase().includes("Conference on Robotics and Automation".toLowerCase())) {
      venue = "ICRA"
    }
    if (venue.toLowerCase().includes("Journal of Machine Learning Research".toLowerCase())) {
      venue = "JMLR"
    }
    
    // Extract additional fields
    // Cover image
    let cover = cleanString(tags.cover || '');
    const DEFAULT_COVER = '../../assets/papers/paper-vision.jpg';
    
    // Validate cover image existence
    if (cover) {
      cover = "../../assets/papers/" + cover
      // Resolve path relative to src/content/publications
      // ../../assets/xxx.jpg -> src/assets/xxx.jpg
      const relativeToRoot = cover.replace('../../', 'src/');
      const absolutePath = path.join(process.cwd(), relativeToRoot);
      
      if (!fs.existsSync(absolutePath)) {
        console.error(`Error: Cover image not found at ${absolutePath}. Using default.`);
        return
      }
    } else {
      cover = DEFAULT_COVER;
    }
    
    // PDF link
    let pdf = cleanString(tags.pdf || tags.file || tags.url || '');
    if (pdf.startsWith(':')) {
      const parts = pdf.split(':');
      if (parts.length >= 2 && parts[1].trim() !== '') {
        pdf = parts[1];
      }
    }
    
    const code = cleanString(tags.code || tags.code_url || tags.github || tags.repository || '');
    const website = cleanString(tags.website || tags.webpage || tags.project || '');
    const slides = cleanString(tags.slides || tags.presentation || tags.ppt || '');
    const video = cleanString(tags.video || tags.recording || '');
    const demo = cleanString(tags.demo || '');
    const areaStr = cleanString(tags.area || tags.areas || '');
    const areas = areaStr ? areaStr.split(',').map(a => a.trim()).filter(a => a) : [];

    // Badges parsing
    const badges = [];
    const award = cleanString(tags.award || tags.honor || '');
    if (award) {
      badges.push({ text: award, type: 'gold' });
    }

    const doi = cleanString(tags.doi || '');
    
    const note = cleanString(tags.note || tags.keywords || '');

    if (note.toLowerCase().includes('best paper') && !award.toLowerCase().includes('best paper')) {
       badges.push({ text: 'Best Paper', type: 'gold' });
    }
    if (note.toLowerCase().includes('oral')) {
       badges.push({ text: 'Oral', type: 'red' });
    }
    if (note.toLowerCase().includes('spotlight')) {
       badges.push({ text: 'Spotlight', type: 'blue' });
    }
    if (note.toLowerCase().includes('best student paper')) {
      badges.push({ text: 'Best Student Paper', type: 'gold' });
    }

    // Generate filename: year-firstAuthor-titleSlug
    const firstAuthor = authors.length > 0 ? authors[0].split(' ').pop() : 'unknown';
    const titleSlug = slugify(title, { lower: true, strict: true }).slice(0, 30);
    const filename = `${year}-${firstAuthor}-${titleSlug}.md`;
    const filePath = path.join(PUBLICATIONS_DIR, filename);

    // Determine featured status
    let isFeatured = false;
    if (tags.featured === 'true' || note.toLowerCase().includes('featured') || note.toLowerCase().includes('selected')) {
      isFeatured = true;
    }
    // Check existing file to preserve manual edits
    if (fs.existsSync(filePath)) {
      try {
        const existingContent = fs.readFileSync(filePath, 'utf-8');
        if (/featured:\s*true/.test(existingContent)) {
          isFeatured = true;
        }
      } catch (e) {
        console.warn(`Warning: Could not read existing file ${filePath}`);
      }
    }
    
    const frontmatter = [
      '---',
      `title: "${title.replace(/"/g, '\\"')}"`,
      `authors: [${authors.map(a => `"${a}"`).join(', ')}]`,
      `year: ${year}`,
      `venue: "${venue.replace(/"/g, '\\"')}"`,
      `type: "${type}"`,
      `cover: "${cover}"`,
      'links:',
      `  pdf: "${pdf}"`,
      `  code: "${code}"`,
      `  website: "${website}"`,
      `  demo: "${demo}"`,
      `  slides: "${slides}"`,
      `  video: "${video}"`,
      doi ? `doi: "${doi}"` : '',
      award ? `award: "${award.replace(/"/g, '\\"')}"` : '',
      badges.length > 0 ? 'badges:' : '',
      ...badges.map(b => `  - { text: "${b.text}", type: "${b.type}" }`),
      `description: "${description.replace(/"/g, '\\"')}"`,
      `featured: ${isFeatured}`,
      `areas: [${areas.map(a => `"${a.replace(/"/g, '\\"')}"`).join(', ')}]`,
      '---',
      '',
      description
    ].filter(line => line !== '').join('\n');

    fs.writeFileSync(filePath, frontmatter);
    console.log(`Generated: ${filename} in publications`);
    count++;
  });

  console.log(`\nSuccessfully imported ${count} entries.`);
}

importBibtex();
