import React from 'react';
import PageShell from '../components/ui/PageShell.jsx';

const Company = () => {
  return (
    <PageShell
      eyebrow="Company"
      title="The company behind Engineering Clarity."
      description="This page will explain DevReCon's story, operating philosophy, talent umbrella model, founder profile, and long term vision."
    >
      <section id="talent-umbrella" className="p-8 border border-gray-100 rounded-3xl bg-white">
        <h2 className="text-2xl font-bold tracking-tight mb-4">Talent Umbrella</h2>
        <p className="text-gray-600 leading-loose tracking-wide font-light">
          DevReCon supports builders, freelancers, students, founders, and technical operators who have serious ideas but need structure, direction, documentation, development support, or operational clarity.
        </p>
      </section>
    </PageShell>
  );
};

export default Company;