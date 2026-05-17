const createMailBody = ({ focus, promptLines }) =>
  `Hello DevReCon team,\n\nI would like to discuss ${focus}.\n\n${promptLines.join('\n')}\n\nRegards,\n`;

export const solutions = [
  {
    id: 'ai',
    index: '01',
    label: 'AI systems',
    title: 'AI Consultation and Applications',
    shortTitle: 'AI systems',
    preview:
      'AI should earn its place in the product. It should reduce friction, improve decisions, or create a capability people can actually use.',
    continuation:
      'We define where AI belongs, what data it needs, and whether the right path is an LLM workflow, RAG pipeline, automation layer, product feature, or a custom model.',
    serviceLine:
      'The work can cover consultation, architecture, model selection, interface planning, implementation direction, and build support when the requirement is technically justified.',
    usefulWhen: [
      'You know AI could help, but the use case needs sharper definition.',
      'You need an assistant, automation flow, document workflow, or AI powered feature.',
      'A generic API may not be enough, and a custom AI or ML path needs evaluation.',
    ],
    canBuild: [
      'LLM tools, assistants, and RAG based document systems.',
      'AI features inside dashboards, portals, and internal platforms.',
      'Custom AI or ML workflows when the problem justifies the effort.',
    ],
    subject: 'DevReCon inquiry: AI systems',
    mailBody: createMailBody({
      focus: 'an AI system or AI application requirement',
      promptLines: [
        'Project or process:',
        'What should AI help with:',
        'Existing data, files, users, or tools:',
        'Expected outcome:',
        'Timeline, if any:',
      ],
    }),
  },
  {
    id: 'software',
    index: '02',
    label: 'Software platforms',
    title: 'Custom Software Development',
    shortTitle: 'Software platforms',
    preview:
      'Software should match the way work actually happens. The system should serve the operation, not force the operation into a template.',
    continuation:
      'We study the workflow first, then shape the product structure, interface, data flow, and development path around the people who use it every day.',
    serviceLine:
      'The work can cover web applications, dashboards, portals, admin systems, internal tools, and product foundations built with maintainability in mind.',
    usefulWhen: [
      'A process is still running through spreadsheets, manual coordination, or disconnected tools.',
      'You need a portal, dashboard, internal platform, or SaaS style foundation.',
      'The product needs clear architecture without unnecessary technical confusion.',
    ],
    canBuild: [
      'Web applications, dashboards, portals, and admin systems.',
      'Internal tools for reporting, coordination, operations, and access control.',
      'Frontend, backend, deployment structure, and handover documentation.',
    ],
    subject: 'DevReCon inquiry: custom software',
    mailBody: createMailBody({
      focus: 'a custom software requirement',
      promptLines: [
        'What needs to be built:',
        'Who will use it:',
        'Current process or issue:',
        'Main features needed:',
        'Timeline, if any:',
      ],
    }),
  },
  {
    id: 'frontier-tech',
    index: '03',
    label: 'Frontier tech and IoT',
    title: 'Frontier Tech and IoT',
    shortTitle: 'Frontier tech',
    preview:
      'Some products do not live only on a screen. They involve sensors, devices, field conditions, electronics, and software behavior.',
    continuation:
      'We map the physical system and the digital layer together so the device, data, dashboard, and user experience do not become separate problems.',
    serviceLine:
      'The work can cover feasibility mapping, IoT planning, connected interfaces, prototype architecture, sensor workflows, and software plus electronics support.',
    usefulWhen: [
      'The product depends on sensors, devices, connected hardware, or physical interaction.',
      'A prototype needs software logic, dashboard access, or feasibility direction.',
      'The physical and digital sides need planning before major resources are committed.',
    ],
    canBuild: [
      'IoT workflows, connected interfaces, and monitoring dashboards.',
      'Sensor based systems and electronics integrated software.',
      'Prototype plans for research oriented or experimental technical systems.',
    ],
    subject: 'DevReCon inquiry: frontier tech and IoT',
    mailBody: createMailBody({
      focus: 'a frontier tech or IoT requirement',
      promptLines: [
        'Idea or problem:',
        'Hardware, sensor, or device details:',
        'Software, app, or dashboard needs:',
        'Current stage:',
        'Timeline, if any:',
      ],
    }),
  },
  {
    id: 'strategy',
    index: '04',
    label: 'Technical strategy',
    title: 'Technical Strategy and Deployment',
    shortTitle: 'Strategy',
    preview:
      'Some projects should not start with code. They should start with sequence, architecture, risk mapping, deployment direction, and documentation.',
    continuation:
      'We help teams decide what should be built first, what can wait, what stack fits, how the system should be hosted, and how maintenance should work.',
    serviceLine:
      'The work can cover MVP planning, architecture, product scoping, hosting direction, deployment structure, documentation, technical review, and maintenance planning.',
    usefulWhen: [
      'The idea is strong, but the technical path needs clarity.',
      'A product needs architecture, roadmap, deployment direction, or documentation before execution.',
      'An existing system needs review before expansion, rebuild, or handover.',
    ],
    canBuild: [
      'MVP plans, architecture maps, and technical documentation.',
      'Deployment, hosting, stack, vendor, and maintenance direction.',
      'Product reviews for systems that need clarity before scaling.',
    ],
    subject: 'DevReCon inquiry: technical strategy',
    mailBody: createMailBody({
      focus: 'technical strategy for a project',
      promptLines: [
        'Project context:',
        'Current stage:',
        'Main technical decision or confusion:',
        'Expected outcome from the discussion:',
        'Timeline, if any:',
      ],
    }),
  },
];

export const mixedInquiry = {
  subject: 'DevReCon inquiry: specific technical requirement',
  mailBody: createMailBody({
    focus: 'a specific technical requirement that may combine software, AI, IoT, research, or operations',
    promptLines: [
      'Brief context:',
      'What needs to be built or improved:',
      'Software, AI, IoT, or operational parts involved:',
      'Current stage:',
      'Timeline, if any:',
    ],
  }),
};
