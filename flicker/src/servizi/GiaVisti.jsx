import { useState, useEffect } from "react";
import { useOnboarding } from "../context/stepContexst"; 
import { searchMovies } from "../api/tmdb";

export function StepFilmCuore() {
  
    const { onboardingData, setOnboardingData, completeOnboarding } = useOnboarding();

    const [ricerca, setRicerca] = useState("");
    const [risultatiAPI, setRisultatiAPI] = useState([]);
    
    const [filmSelezionati, setFilmSelezionati] = useState(() => {
        return onboardingData?.favoriteMovies || [];
    });

    
    useEffect(() => {
    if (ricerca.trim().length < 3) {
        setRisultatiAPI([]);
        return;
    }

    const delayDebounce = setTimeout(async () => {
        try {
            
            const filmTrovati = await searchMovies(ricerca);

            if (filmTrovati) {
                setRisultatiAPI(filmTrovati.slice(0, 5)); 
            }
        } catch (error) {
            console.error("Errore nel recupero dei film tramite servizio:", error);
        }
    }, 400); 

    return () => clearTimeout(delayDebounce);
}, [ricerca]);

    function handleAggiungiFilm(film) {
  
        if (filmSelezionati.length >= 3) return;
        if (filmSelezionati.some(f => f.id === film.id)) return;

        const filmFormattato = {
            id: film.id,
            titolo: film.title,
            anno: film.release_date ? film.release_date.split("-")[0] : "N/D",
            poster: film.poster_path ? `https://image.tmdb.org/t/p/w200${film.poster_path}` : null
        };

        setFilmSelezionati(prev => [...prev, filmFormattato]);
        setRicerca(""); 
        setRisultatiAPI([]);
    }

    function handleRimuoviFilm(idFilm) {
        setFilmSelezionati(prev => prev.filter(f => f.id !== idFilm));
    }

    function handleFine() {
   
        setOnboardingData(prev => ({ ...prev, favoriteMovies: filmSelezionati }));
        
    
        completeOnboarding();
    }

    return (
        <div className="flex flex-col items-center min-h-screen bg-[#06000c] text-white p-6 font-sans select-none">
            
           
            <div className="w-full max-w-sm mt-8 mb-6">
                <div className="flex gap-2 mb-3">
                    <div className="flex-1 h-1 bg-cyan-500/40 rounded-full"></div>
                    <div className="flex-1 h-1 bg-cyan-500/40 rounded-full"></div>
                    <div className="flex-1 h-1 bg-cyan-500/40 rounded-full"></div>
                   
                    <div className="flex-1 h-1 bg-cyan-500 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.6)]"></div>
                </div>
                
                <div className="flex justify-between items-center text-[10px] font-bold tracking-widest uppercase">
                    <span className="text-gray-500">STEP 4 / 4 • CINEMA</span>
                    <button 
                        type="button" 
                        onClick={handleFine} 
                        className="text-purple-400/80 hover:text-cyan-400 transition-colors tracking-widest font-black"
                    >
                        SALTA & FINE ✕
                    </button>
                </div>
            </div>

            
            <div className="w-full max-w-sm text-left mb-8 space-y-2">
                <h1 className="text-3xl font-bold tracking-wide leading-tight">
                    I tuoi 3 <br />
                    <span className="text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.7)]">
                        film del cuore
                    </span>
                </h1>
                <p className="text-xs text-gray-500 font-medium">
                    Aggiungi fino a 3 pellicole memorabili da mostrare sul tuo profilo.
                </p>
            </div>

            <div className="w-full max-w-sm flex-1 flex flex-col justify-between pb-6 space-y-6">
                <div className="space-y-6 relative">
                    
                    {filmSelezionati.length < 3 ? (
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-gray-500 tracking-widest uppercase">CERCA UN FILM</label>
                            <input 
                                type="text"
                                value={ricerca}
                                onChange={(e) => setRicerca(e.target.value)}
                                placeholder="Digita almeno 3 lettere... (Es. Matrix)"
                                className="w-full px-4 py-3.5 bg-[#0b0411]/60 border border-gray-800 rounded-xl text-gray-300 placeholder:text-gray-700 focus:outline-none focus:border-cyan-500 text-sm transition-colors"
                            />
                        </div>
                    ) : (
                        <p className="text-xs text-cyan-500/80 font-semibold tracking-wide text-center bg-cyan-950/20 py-2 border border-cyan-800/30 rounded-xl">
                            ✨ Hai raggiunto il massimo dei film selezionabili!
                        </p>
                    )}

                    {risultatiAPI.length > 0 && (
                        <div className="absolute left-0 right-0 top-[68px] z-50 bg-[#0b0411] border border-gray-800 rounded-xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
                               <button
                                   type="button"
                                    onClick={() => {
                                    setRisultatiAPI([]);
                                    setRicerca("");
                                    }}
                                     className="w-full text-right px-4 py-2 text-xs font-bold text-gray-500 hover:text-cyan-400"
                                    >
                                    CHIUDI ×
                                  </button> 

                            {risultatiAPI.map((film) => (
                                <button
                                    key={film.id}
                                    type="button"
                                    onClick={() => handleAggiungiFilm(film)}
                                    className="w-full text-left px-4 py-3 hover:bg-cyan-500/10 text-xs font-bold text-gray-400 hover:text-cyan-400 border-b border-gray-900 last:border-0 transition-colors flex justify-between items-center"
                                >
                                    <span>{film.title}</span>
                                    <span className="text-[10px] text-gray-600">{film.release_date ? film.release_date.split("-")[0] : ""}</span>
                                </button>
                            ))}
                        </div>
                    )}

                 
                    <div className="space-y-2 mt-4">
                        <label className="text-[10px] font-bold text-gray-500 tracking-widest uppercase block mb-1">I TUOI SELEZIONATI</label>
                        {filmSelezionati.length === 0 ? (
                            <p className="text-xs text-gray-700 italic">Nessun film ancora aggiunto...</p>
                        ) : (
                            <div className="space-y-2">
                                {filmSelezionati.map((f) => (
                                    <div key={f.id} className="flex items-center justify-between p-3 bg-[#0b0411]/40 border border-gray-900 rounded-xl">
                                        <div className="flex items-center gap-3">
                                            {f.poster ? (
                                                <img src={f.poster} alt={f.titolo} className="w-8 h-11 object-cover rounded-md" />
                                            ) : (
                                                <div className="w-8 h-11 bg-gray-900 rounded-md flex items-center justify-center text-[10px]">🎬</div>
                                            )}
                                            <div>
                                                <h4 className="text-xs font-bold tracking-wide text-gray-300">{f.titolo}</h4>
                                                <p className="text-[10px] text-gray-600 font-medium">{f.anno}</p>
                                            </div>
                                        </div>
                                        <button 
                                            type="button" 
                                            onClick={() => handleRimuoviFilm(f.id)}
                                            className="text-red-500/70 hover:text-red-500 text-xs p-2 font-bold transition-colors"
                                        >
                                            RIMUOVI
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                </div>

                <button 
                    type="button"
                    onClick={handleFine}
                    className="w-full py-4 mt-8 bg-cyan-500 hover:bg-cyan-400 text-[#06000c] shadow-[0_0_20px_rgba(34,211,238,0.4)] font-black rounded-xl text-xs tracking-widest uppercase flex items-center justify-center gap-2 transition-all"
                >
                     ENTRA IN FLICKER 
                </button>
            </div>

        </div>
    );
}