const createProductMail = ({ productName, focus }) => {
  const subject = encodeURIComponent(`DevReCon inquiry: ${productName}`);
  const body = encodeURIComponent(
    `Hello DevReCon team,\n\nI would like to discuss ${focus}.\n\nContext:\nWhat I want to understand or build:\nTimeline, if any:\nBest way to reach me:\n\nRegards,\n`
  );

  return `mailto:management@devrecon.in?subject=${subject}&body=${body}`;
};

export const products = [
  {
    id: 'mymedicals',
    index: '01',
    name: 'MyMedicals',
    category: 'Healthcare Software Ecosystem',
    status: 'Public product website',
    website: 'https://mymedicals.life/',
    visitLabel: 'Visit MyMedicals',
    mark: '/product-logos/mymedicals-mark-bw.png',
    visual: 'healthcare',
    tagline:
      'Medication routines, family awareness, and controlled care access in one healthcare software ecosystem.',
    description:
      'MyMedicals begins with the everyday pressure of care. The app focuses on reliable reminders, family sync, offline first access, and consent based sharing. The wider ecosystem is being shaped for clinical and hospital workflows without making sensitive health data noisy.',
    role:
      'DevReCon leads product architecture, application direction, technical planning, and ecosystem expansion.',
    signals: ['Reliable reminders', 'Family sync', 'QR care access', 'Offline first'],
    infographic: [
      { label: 'Reliable reminders', detail: 'Alarm style care prompts' },
      { label: 'Family sync', detail: 'Shared care awareness' },
      { label: 'QR care access', detail: 'Timed clinical visibility' },
      { label: 'Offline first', detail: 'Designed for weak signal' },
    ],
    contactHref: createProductMail({
      productName: 'MyMedicals',
      focus: 'MyMedicals or a healthcare software ecosystem requirement',
    }),
  },
  {
    id: 'mastermentor',
    index: '02',
    name: 'Master Mentor',
    category: 'Academic CMS Platform',
    status: 'Public platform website',
    website: 'https://mastermentor.academy/',
    visitLabel: 'Visit Master Mentor',
    mark: '/product-logos/mastermentor-mark-bw.png',
    visual: 'academic',
    tagline:
      'A structured academic platform for mentorship, scholarships, workshops, and student progression.',
    description:
      'Master Mentor is built for students navigating opportunity under pressure. The platform brings scholarship discovery, review workflows, resources, workshops, and mentorship coordination into a managed academic system.',
    role:
      'DevReCon handles platform execution, CMS structure, workflow design, technical operation, and product expansion.',
    signals: ['Scholarships', 'Review dropbox', 'Mentorship flow', 'Resource library'],
    infographic: [
      { label: 'Scholarships', detail: 'Curated opportunity flow' },
      { label: 'Review dropbox', detail: 'Structured document feedback' },
      { label: 'Mentorship flow', detail: 'Guided academic support' },
      { label: 'Resources', detail: 'Workshops and study material' },
    ],
    contactHref: createProductMail({
      productName: 'Master Mentor',
      focus: 'Master Mentor or an academic CMS platform requirement',
    }),
  },
];
