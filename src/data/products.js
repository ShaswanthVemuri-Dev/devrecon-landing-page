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
    category: 'Healthcare Product Ecosystem',
    status: 'Healthcare ecosystem',
    website: 'https://mymedicals.life/',
    visitLabel: 'Visit MyMedicals',
    mark: '/product-logos/mymedicals-mark-bw.png',
    tagline:
      'An appointment to adherence healthcare ecosystem that connects prescriptions, records, reports, medicines, and reminders.',
    description:
      'MyMedicals connects the patient side and hospital side of care in one product workflow. Doctors can issue prescriptions through the hospital management portal, patients can view and manage their medical context in the mobile application, authorized users can access shared records, lab technicians can upload reports, and prescribed medicines can move into scheduled reminders automatically. The product is designed around continuity: the medical journey should flow from consultation to records to medicines to adherence tracking without forcing patients or care teams to rebuild context at every step.',
    infographic: {
      eyebrow: 'Care continuity',
      headline: 'From appointment to adherence',
      caption:
        'A single healthcare flow where clinical action becomes patient routine without breaking context.',
      flow: ['Appointment', 'Prescription', 'Adherence'],
    },
    contactHref: createProductMail({
      productName: 'MyMedicals',
      focus: 'MyMedicals or a healthcare product ecosystem requirement',
    }),
  },
  {
    id: 'mastermentor',
    index: '02',
    name: 'Master Mentor',
    category: 'Academic CMS Platform',
    status: 'Academic platform',
    website: 'https://mastermentor.academy/',
    visitLabel: 'Visit Master Mentor',
    mark: '/product-logos/mastermentor-mark-bw.png',
    tagline:
      'A structured academic product that brings scholarships, reviews, resources, and mentorship into one controlled student workflow.',
    description:
      'Master Mentor organizes the academic progression workflow students normally manage across scattered links, documents, emails, and informal advice. The platform brings scholarship discovery, review dropbox submissions, curated resources, and mentorship into one workspace so students can move from finding an opportunity to preparing material to getting feedback with less friction. Its core idea is not more content, but structured academic movement.',
    infographic: {
      eyebrow: 'Academic progression',
      headline: 'From discovery to guided progress',
      caption:
        'A clear student workflow where opportunities, review, resources, and mentorship move in one direction.',
      flow: ['Discover', 'Review', 'Mentor'],
    },
    contactHref: createProductMail({
      productName: 'Master Mentor',
      focus: 'Master Mentor or an academic CMS platform requirement',
    }),
  },
];
