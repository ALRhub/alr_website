import heroImage from './assets/hero-real.jpg';

export const SITE = {
  website: 'https://scholar-lite-demo.netlify.app/', // Replace with your actual deployed URL
  author: 'Autonomous Learning Robots Lab @ KIT',
  description: 'Robot Learning and Generative Modeling',
  title: 'Autonomous Learning Robots Lab @ KIT',
  ogImage: 'astropaper-og.jpg',
  lightAndDarkMode: true,
  postPerPage: 3,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes

  // Lab Info
  labName: 'Autonomous Learning Robots',
  university: 'Karlsruhe Institute of Technology',
  logo: '/assets/alr-logo.png', // Logo path
  avatar: '/assets/alr-logo.png', // Avatar for SEO/Schema
  email: 'gerhard.neumann@kit.edu', // Contact email for Join Us page

  // Hero Section (Home Page) - Main content does not need to be translated for 8 languages by default
  hero: {
    title: 'Autonomous Learning Robots Lab.',
    subtitle: 'We do research on robot learning.',
    action: 'View Publications', // Optional call to action text
    image: heroImage, // Hero image path
  },

  // Navigation
  nav: [
    { text: 'Home', link: '/', external: false },
    { text: 'Team', link: '/team', external: false },
    { text: 'Publications', link: '/publications', external: false },
    { text: 'Robots', link: '/robots', external: false },
    { text: 'Software', link: '/software', external: false },
    { text: 'Theses', link: '/theses', external: false },
    { text: 'Teaching', link: 'https://alr.iar.kit.edu/28.php', external: true },
  ]
};

export const LOGO_IMAGE = {
  enable: true,
  svg: true,
  width: 216,
  height: 46,
};

export const SOCIALS = [
  {
    link: 'https://github.com/fjd2004711/scholar-lite',
    active: true,
  },
];
