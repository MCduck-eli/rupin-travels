import CulturalSupportSection from "./components/cultural-support-section";
import TravelLandingPage from "./components/travel-experence";
import MarineTeamSection from "./components/travel-landing";

export default function Page() {
    return (
        <main>
            <MarineTeamSection />
            <TravelLandingPage />
            <CulturalSupportSection />
        </main>
    );
}
