// Virtual English landing — root composition
function App() {
  return (
    <React.Fragment>
      <ScrollProgress/>
      <Nav/>
      <main>
        <Hero/>
        <Problem/>
        <HowItWorks/>
        <Validation/>
        <Pricing/>
        <WhyItWorks/>
        <FAQ/>
        <Teachers/>
      </main>
      <Footer/>
      <FloatingWhatsApp/>
    </React.Fragment>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);
