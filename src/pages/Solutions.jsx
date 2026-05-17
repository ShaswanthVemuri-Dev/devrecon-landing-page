import React from 'react';
import PageShell from '../components/ui/PageShell.jsx';

const Solutions = () => {
  return (
    <PageShell
      eyebrow="Solutions"
      title="Technical systems for ambitious operators."
      description="DevReCon works across AI consulting, AI applications, custom software, frontier technology, IoT, technical strategy, deployment, and maintenance."
    >
      <div className="grid md:grid-cols-3 gap-8">
        <section id="ai" className="p-8 border border-gray-100 rounded-3xl bg-white">
          <h2 className="text-2xl font-bold tracking-tight mb-4">AI Consulting and Applications</h2>
          <p className="text-gray-600 leading-loose tracking-wide font-light">
            AI strategy, AI application development, custom AI models, LLM workflows, automation, and applied machine learning systems.
          </p>
        </section>

        <section id="software" className="p-8 border border-gray-100 rounded-3xl bg-white">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Custom Software</h2>
          <p className="text-gray-600 leading-loose tracking-wide font-light">
            Web applications, dashboards, portals, business platforms, internal tools, and scalable product systems.
          </p>
        </section>

        <section id="frontier-tech" className="p-8 border border-gray-100 rounded-3xl bg-white">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Frontier Tech and IoT</h2>
          <p className="text-gray-600 leading-loose tracking-wide font-light">
            Electronics integrated software, IoT systems, connected devices, research prototypes, and physical technology systems.
          </p>
        </section>
      </div>
    </PageShell>
  );
};

export default Solutions;