import GrainOverlay from "./components/GrainOverlay";
import Hero from "./components/Hero";
import MarqueeTicker from "./components/MarqueeTicker";
import Offer from "./components/Offer";
import SMPInfo from "./components/SMPInfo";
import ApplicationForm from "./components/ApplicationForm";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <GrainOverlay />
      <main>
        <Hero />
        <MarqueeTicker />
        <Offer />
        <SMPInfo />
        <ApplicationForm />
      </main>
      <Footer />
    </>
  );
}
