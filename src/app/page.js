import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import ProblemSolution from './components/ProblemSolution'
import Workflow from './components/Workflow'
import Footer from './components/Footer'
import About from './components/About'
import VantaBackground from './components/VantaBackground'


export default function Home() {
  return (
    <div style={{ background: 'linear-gradient(180deg, #0f0121, #1c003b)', color: 'white', fontFamily: 'Poppins' }}>
      <VantaBackground/>
      <Navbar />
      <Hero />
      <ProblemSolution />
      <Features />
      <Workflow />
      <About/>
      <Footer />
      
    </div>
  )
}
