'use client'

import '../styles/Features.css'

const features = [
  {
    icon: '📊',
    title: 'Real-Time Property Valuation',
    description: 'AI-driven models to get instant and accurate real estate valuation.',
  },
  {
    icon: '📁',
    title: 'Unified Land Records',
    description: 'Access fragmented data from different regions in one dashboard.',
  },
  {
    icon: '📈',
    title: 'Predictive Market Insights',
    description: 'AI forecasts on property trends to guide your investment decisions.',
  },
  {
    icon: '🗺️',
    title: 'Interactive Maps',
    description: 'Explore property data visually using AI-enhanced geographic maps.',
  },
]

export default function Features() {
  return (
    <section id="features" className="features-section">
      <h2 className="features-heading">Key Features of WealthMapsAI</h2>
      <div className="features-grid">
        {features.map((feature, index) => (
          <div className="feature-card" key={index}>
            <div className="feature-icon">{feature.icon}</div>
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
