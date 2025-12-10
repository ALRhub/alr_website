import heroImage from './assets/hero-real.jpg';

export const SITE = {
  website: 'https://scholar-lite-demo.netlify.app/', // Replace with your actual deployed URL
  author: 'Autonomous Learning Robots Lab @ KIT',
  description: 'Autonomous Learning Robots Lab @ Karlsruhe Institute of Technology',
  title: 'Scholar-Lite',
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
    { text: 'Home', link: '/', key: 'home' },
    { text: 'Team', link: '/team', key: 'team' },
    // { text: 'Research', link: '/research', key: 'research' },
    // { text: 'Achievements', link: '/achievements', key: 'achievements' },
    { text: 'Publications', link: '/publications', key: 'publications' },
    { text: 'Software', link: '/software', key: 'software' },
    { text: 'Theses', link: '/theses', key: 'theses' },
    { text: 'Teaching', link: 'https://alr.iar.kit.edu/28.php', key: 'teaching' },
    // { text: 'Activities', link: '/activities', key: 'activities' },
  ],

  // Custom Pages (Appended after 'Join Us')
  customPages: [
    // Example: { text: 'Alumni', link: '/alumni', key: 'alumni' }
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
