'use client'

import '../styles/ProblemSolution.css'

const problems = [
  {
    title: 'Data Fragmentation',
    description: 'Property and land data are scattered across multiple sources, making decision-making inefficient.',
  },
  {
    title: 'Lack of Real-Time Valuation',
    description: 'Traditional valuation methods are outdated and can’t keep up with market trends.',
  },
  {
    title: 'Limited Access to Insights',
    description: 'Investors and companies struggle to get predictive insights for better planning.',
  },
]

export default function ProblemSolution() {
  return (
    <section className="problem-section">
      <h2 className="problem-heading">Why WealthMapsAI?</h2>
      <div className="problem-grid">
        {problems.map((item, index) => (
          <div className="problem-card" key={index}>
            <h3 className="problem-title">{item.title}</h3>
            <p className="problem-description">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
