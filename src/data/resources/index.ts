import type { LearningResource } from '../../types/roadmap.ts';

// Unknown cost/certificate claims stay unknown. Verified certificates carry evidence.
const referenceResources: LearningResource[] = [
  ['github-projects', 'GitHub Projects documentation', 'GitHub', 'https://docs.github.com/en/issues/planning-and-tracking-with-projects'],
  ['github-learn', 'Git and GitHub hands-on courses', 'GitHub', 'https://learn.github.com/'],
  ['mdn-html', 'HTML: Structuring the web', 'MDN Web Docs', 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content'],
  ['mdn-css', 'CSS: Styling the web', 'MDN Web Docs', 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics'],
  ['mdn-javascript', 'JavaScript Guide', 'MDN Web Docs', 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide'],
  ['webdev-html', 'Learn HTML', 'Google web.dev', 'https://web.dev/learn/html'],
  ['webdev-css', 'Learn CSS', 'Google web.dev', 'https://web.dev/learn/css'],
  ['webdev-javascript', 'Learn JavaScript', 'Google web.dev', 'https://web.dev/learn/javascript'],
  ['tailwind-docs', 'Tailwind CSS documentation', 'Tailwind Labs', 'https://tailwindcss.com/docs'],
  ['tailwind-responsive', 'Responsive design with Tailwind', 'Tailwind Labs', 'https://tailwindcss.com/docs/responsive-design'],
  ['tailwind-play', 'Tailwind Play: interactive playground', 'Tailwind Labs', 'https://play.tailwindcss.com/'],
  ['typescript-handbook', 'TypeScript Handbook', 'Microsoft', 'https://www.typescriptlang.org/docs/handbook/intro.html'],
  ['typescript-play', 'TypeScript Playground', 'Microsoft', 'https://www.typescriptlang.org/play/'],
  ['react-learn', 'Learn React', 'React', 'https://react.dev/learn'],
  ['nextjs-learn', 'Learn Next.js', 'Vercel', 'https://nextjs.org/learn'],
  ['node-learn', 'Learn Node.js', 'Node.js', 'https://nodejs.org/en/learn'],
  ['express-docs', 'Express documentation', 'Express', 'https://expressjs.com/'],
  ['postgres-tutorial', 'PostgreSQL tutorial', 'PostgreSQL', 'https://www.postgresql.org/docs/current/tutorial.html'],
  ['prisma-docs', 'Prisma ORM documentation', 'Prisma', 'https://www.prisma.io/docs'],
  ['bruno-docs', 'Bruno documentation', 'Bruno', 'https://docs.usebruno.com/'],
  ['owasp-top-ten', 'OWASP Top Ten', 'OWASP', 'https://owasp.org/www-project-top-ten/'],
  ['expo-tutorial', 'Expo tutorial', 'Expo', 'https://docs.expo.dev/tutorial/introduction/'],
  ['react-native-docs', 'React Native fundamentals', 'React Native', 'https://reactnative.dev/docs/getting-started'],
  ['vitest-guide', 'Vitest guide', 'Vitest', 'https://vitest.dev/guide/'],
  ['playwright-intro', 'Playwright introduction', 'Microsoft', 'https://playwright.dev/docs/intro'],
  ['testing-library', 'React Testing Library', 'Testing Library', 'https://testing-library.com/docs/react-testing-library/intro/'],
  ['docker-start', 'Get started with Docker', 'Docker', 'https://docs.docker.com/get-started/'],
  ['github-actions', 'GitHub Actions documentation', 'GitHub', 'https://docs.github.com/en/actions'],
  ['fso-typescript', 'Full Stack Open: TypeScript module', 'University of Helsinki', 'https://courses.mooc.fi/org/uh-cs/courses/full-stack-open-typescript'],
  ['fso-mobile', 'Full Stack Open: React Native module', 'University of Helsinki', 'https://courses.mooc.fi/org/uh-cs/courses/full-stack-open-react-native'],
  ['fso-ci', 'Full Stack Open: CI/CD module', 'University of Helsinki', 'https://courses.mooc.fi/org/uh-cs/courses/full-stack-open-continuous-integration'],
].map(([id, title, provider, url]) => ({
  id, title, provider, url,
  kind: id.startsWith('fso-') || id.startsWith('webdev-') || ['nextjs-learn', 'github-learn'].includes(id)
    ? 'course' : ['tailwind-play', 'typescript-play'].includes(id) ? 'exercise' : 'docs',
  freeToAccess: null,
  certificateStatus: 'unknown',
}));

const fccCertificates: LearningResource[] = [
  ['fcc-web-design', 'Responsive Web Design', 'responsive-web-design-v9'],
  ['fcc-javascript', 'JavaScript', 'javascript-v9'],
  ['fcc-frontend', 'Front-End Development Libraries', 'front-end-development-libraries-v9'],
  ['fcc-databases', 'Relational Databases', 'relational-databases-v9'],
  ['fcc-backend', 'Back-End Development and APIs', 'back-end-development-and-apis-v9'],
].map(([id, title, slug]) => ({
  id, title, provider: 'freeCodeCamp', url: `https://www.freecodecamp.org/learn/${slug}/`,
  kind: 'course', freeToAccess: true, certificateStatus: 'free', verifiedAt: '2026-10-23',
  verificationUrl: 'https://github.com/freeCodeCamp/freeCodeCamp/blob/main/README.md#certifications',
  certificateRequirements: 'Complete the required projects and pass the certification exam. An account is required.',
}));

export const resources: LearningResource[] = [
  ...referenceResources,
  ...fccCertificates,
  {
    id: 'fso-core', title: 'Full Stack Open: core course', provider: 'University of Helsinki',
    url: 'https://fullstackopen.com/en/', kind: 'course', freeToAccess: true,
    certificateStatus: 'free', verifiedAt: '2026-10-23',
    verificationUrl: 'https://fullstackopen.com/en/part0/general_info/',
    certificateRequirements: 'Submit enough exercises from core parts 0-5 to pass. The certificate is for the full core course, not an individual topic.',
  },
  {
    id: 'cs50-web', title: 'CS50 Web: Python and JavaScript', provider: 'Harvard CS50',
    url: 'https://cs50.harvard.edu/web/', kind: 'course', freeToAccess: true,
    certificateStatus: 'free', verifiedAt: '2026-10-23',
    verificationUrl: 'https://cs50.harvard.edu/web/certificate/',
    certificateRequirements: 'Score at least 70% on every project, including the final project. The CS50 certificate is free; the edX verified certificate is paid.',
  },
];
