'use client';

import '../styles/Workflow.css';

export default function Workflow() {
  return (
    <section id="workflow" className="workflow-section">
      <h2 className="workflow-heading">AI Workflow</h2>
      <div className="workflow-steps">
        <Step text="Company Data" />
        <Arrow />
        <Step text="AI Analysis" />
        <Arrow />
        <Step text="Actionable Insights" />
      </div>
    </section>
  );
}

const Step = ({ text }) => (
  <div className="workflow-step">{text}</div>
);

const Arrow = () => (
  <span className="workflow-arrow">→</span>
);
