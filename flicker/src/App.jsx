import { BrowserRouter,Routes, Route } from "react-router-dom";
import { OnboardingProvider } from "./context/stepContexst";
import Button from './components/InterfacciaUtente/button'
import { useState } from 'react';
import { StepGeneri } from './servizi/generi'
import { StepFilmCuore } from './servizi/GiaVisti'
import { Login } from './servizi/Login'
import { StepPiattaforme } from './servizi/piattaforme'
import { Registrazione } from './servizi/registrazione'
import { StepProfilo } from './servizi/username'
import { Home } from "./components/layout/Home";
import { Match } from "./components/layout/Match";
import { FilmCard } from "./servizi/FilmCard";
import { SerieCard } from "./servizi/SerieCard";
import { Lista } from "./servizi/Lista";
import { AccountTab } from "./servizi/accountTab";
//import { AccountTab } from "./servizi/accountTab";

function App() {
  const [userProfile, setUserProfile] = useState({})
  return (
  <OnboardingProvider>
            <div className="min-h-screen bg-[#06000c]">
                <Routes>
                  
                    <Route path="/" element={<Registrazione />} />
                    <Route path="/login" element={<Login />} />
                    
                   
                    <Route path="/onboarding/step1" element={<StepProfilo />} />
                    <Route path="/onboarding/step2" element={<StepPiattaforme />} />
                    <Route path="/onboarding/step3" element={<StepGeneri />} />
                    <Route path="/onboarding/step4" element={<StepFilmCuore />} />
                    
                   <Route path="/match" element={<Match />} />

                   <Route path="/home" element={<Home />} />

                   <Route path="/film" element={<FilmCard />} />
                   <Route path="/serie-tv" element={<SerieCard />} />
                   <Route path="/la-mia-lista" element={<Lista />} />
                   <Route path="/account" element={<AccountTab/>}> </Route>
                </Routes>
            </div>
        </OnboardingProvider>
    );
}

export default App