import { useState } from 'react';
import {
  User, Camera, Lock, Calendar, Trash2, Bell, Globe, Shield, HelpCircle, MessageSquare, Baby, Info,
  ChevronRight, ChevronDown, Check, Plus, X, Tv,
} from 'lucide-react';
import { Navbar } from '../components/InterfacciaUtente/Navbar';
const PLATFORMS = [
  { id: 'netflix', name: 'Netflix', logo: 'N', color: '#e50914' },
  { id: 'prime', name: 'Prime Video', logo: 'P', color: '#00a8e1' },
  { id: 'disney', name: 'Disney+', logo: 'D+', color: '#113ccf' },
  { id: 'apple', name: 'Apple TV+', logo: 'A', color: '#ffffff' },
  { id: 'now', name: 'NOW', logo: 'N', color: '#00e5ff' },
  { id: 'rai', name: 'RaiPlay', logo: 'R', color: '#008cff' },
];
function SectionHeader({ label }) {
  return (
    <p style={{ fontFamily: 'monospace', fontSize: '9px', letterSpacing: '0.35em', color: '#303070', marginBottom: '8px', marginTop: '4px' }}>
      {label}
    </p>
  );
}

function SettingRow({
  icon: Icon, label, sublabel, onClick, right, danger = false, color = '#6060a0',
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 rounded-xl px-4 py-3"
      style={{ backgroundColor: '#090918', border: `1px solid ${danger ? '#ff224418' : '#1a1a35'}` }}
    >
      <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: danger ? '#ff224415' : `${color}15`, border: `1px solid ${danger ? '#ff224430' : `${color}30`}` }}>
        <Icon size={15} style={{ color: danger ? '#ff2244' : color }} />
      </div>
      <div className="flex-1 text-left">
        <p style={{ fontFamily: 'monospace', fontSize: '11px', color: danger ? '#ff4466' : '#c0c0e0', letterSpacing: '0.05em' }}>{label}</p>
        {sublabel && <p style={{ fontSize: '10px', color: '#3030a0', marginTop: '1px' }}>{sublabel}</p>}
      </div>
      {right ?? <ChevronRight size={14} style={{ color: '#2a2a5a', flexShrink: 0 }} />}
    </button>
  );
}

function ToggleRow({ icon: Icon, label, sublabel, color = '#6060a0' }) {
  const [on, setOn] = useState(true);
  return (
    <div className="w-full flex items-center gap-3 rounded-xl px-4 py-3"
      style={{ backgroundColor: '#090918', border: '1px solid #1a1a35' }}>
      <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: `${color}15`, border: `1px solid ${color}30` }}>
        <Icon size={15} style={{ color }} />
      </div>
      <div className="flex-1 text-left">
        <p style={{ fontFamily: 'monospace', fontSize: '11px', color: '#c0c0e0', letterSpacing: '0.05em' }}>{label}</p>
        {sublabel && <p style={{ fontSize: '10px', color: '#3030a0', marginTop: '1px' }}>{sublabel}</p>}
      </div>
      <button
        onClick={() => setOn((s) => !s)}
        className="flex-shrink-0 rounded-full transition-all duration-300"
        style={{
          width: '40px', height: '22px', backgroundColor: on ? '#00e5ff' : '#1a1a40',
          boxShadow: on ? '0 0 8px #00e5ff60' : 'none', position: 'relative',
        }}
      >
        <div
          className="absolute top-1 rounded-full"
          style={{ width: '14px', height: '14px', backgroundColor: on ? '#fff' : '#404070' }}
        />
      </button>
    </div>
  );
}

// Edit nickname modal
function EditModal({ title, value, onSave, onClose }) {
  const [val, setVal] = useState(value);
  return (
    <div className="absolute inset-0 z-50 flex items-end" style={{ backgroundColor: '#000000a0' }} onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full rounded-t-3xl p-5"
        style={{ backgroundColor: '#080818', border: '1px solid #1a1a40' }}
      >
        <div className="flex items-center justify-between mb-4">
          <p style={{ fontFamily: 'monospace', fontSize: '12px', letterSpacing: '0.2em', color: '#a0a0e0' }}>{title.toUpperCase()}</p>
          <button onClick={onClose}><X size={16} style={{ color: '#5050a0' }} /></button>
        </div>
        <input
          type="text" value={val} onChange={(e) => setVal(e.target.value)}
          autoFocus
          className="w-full rounded-xl px-4 mb-4 outline-none"
          style={{ height: '50px', backgroundColor: '#0a0a20', border: '1px solid #00e5ff40', fontSize: '16px', color: '#c0c0e0', fontFamily: 'monospace' }}
        />
        <button onClick={() => { onSave(val); onClose(); }}
          className="w-full flex items-center justify-center gap-2 rounded-xl py-3"
          style={{ backgroundColor: '#00e5ff', fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.2em', color: '#020214', fontWeight: 900 }}
        >
          <Check size={14} /> SALVA
        </button>
      </div>
    </div>
  );
}

export function AccountTab({ userData = {} }) {
  const safeUserData = {
    name: 'Federico',
    surname: '',
    platforms: [],
    dob: 'Non impostata',
    ...userData,
  };

  const [nickname, setNickname] = useState(`${safeUserData.name} ${safeUserData.surname}`.trim());
  const [platforms, setPlatforms] = useState(safeUserData.platforms || []);
  const [showNickEdit, setShowNickEdit] = useState(false);
  const [showPlatformEdit, setShowPlatformEdit] = useState(false);
  const [showDeactivate, setShowDeactivate] = useState(false);

  const togglePlatform = (id) =>
    setPlatforms((prev) => prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]);

  const userPlatforms = PLATFORMS.filter((p) => platforms.includes(p.id));

  return (
    <div className="pb-8 flex flex-col h-full relative" style={{ backgroundColor: '#050510' }}>
      {/* Header */}
      <div className="px-5 pt-14 pb-3 flex-shrink-0">
        <div className="flex items-center gap-2 mb-1">
         <span className="font-mono text-lg font-bold text-[#00e5ff]">FLICKER</span>
          <span style={{ fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.3em', color: '#303070' }}>ACCOUNT</span>
        </div>
        <div className="h-px" style={{ backgroundColor: '#00e5ff', boxShadow: '0 0 6px #00e5ff', marginTop: '8px' }} />
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8" style={{ scrollbarWidth: 'none' }}>

        {/* ── PROFILE SECTION ── */}
        <SectionHeader label="PROFILO" />

        {/* Avatar + name */}
        <div className="flex items-center gap-4 mb-4 p-4 rounded-2xl" style={{ backgroundColor: '#080818', border: '1px solid #1a1a40' }}>
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: '#0d1a2e', border: '2px solid #00e5ff', boxShadow: '0 0 12px #00e5ff40' }}>
              <User size={28} style={{ color: '#00e5ff' }} />
            </div>
            <button
              className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-full flex items-center justify-center"
              style={{ backgroundColor: '#00e5ff', boxShadow: '0 0 8px #00e5ff60' }}
            >
              <Camera size={11} style={{ color: '#020214' }} />
            </button>
          </div>
          <div>
            <p style={{ fontFamily: 'monospace', fontSize: '14px', fontWeight: 900, color: '#e0e0ff', letterSpacing: '0.05em' }}>{nickname}</p>
            <p style={{ fontFamily: 'monospace', fontSize: '9px', color: '#303070', letterSpacing: '0.15em', marginTop: '3px' }}>
              {safeUserData.dob || '—'}
            </p>
            <div className="flex gap-1 mt-2">
              {userPlatforms.slice(0, 3).map((p) => (
                <span key={p.id} className="w-5 h-5 rounded flex items-center justify-center" style={{ backgroundColor: `${p.color}25`, fontSize: '8px', fontFamily: 'monospace', color: p.color, fontWeight: 900 }}>
                  {p.logo}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 mb-5">
          <SettingRow icon={User} label="Modifica Nickname" sublabel={nickname} onClick={() => setShowNickEdit(true)} color="#00e5ff" />
          <SettingRow icon={Lock} label="Modifica Password" sublabel="Cambia la password di accesso" color="#00e5ff" />
          <SettingRow icon={Calendar} label="Data di Nascita" sublabel={safeUserData.dob || 'Non impostata'} color="#00e5ff" />
          <SettingRow icon={Trash2} label="Disattiva Account" danger onClick={() => setShowDeactivate(true)} />
        </div>

        {/* ── PLATFORMS ── */}
        <SectionHeader label="PIATTAFORME" />
        <div className="mb-3 p-3 rounded-2xl" style={{ backgroundColor: '#080818', border: '1px solid #1a1a40' }}>
          <div className="flex flex-wrap gap-2 mb-3">
            {userPlatforms.map((p) => (
              <div key={p.id} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl" style={{ backgroundColor: `${p.color}18`, border: `1px solid ${p.color}40` }}>
                <span style={{ fontFamily: 'monospace', fontSize: '9px', fontWeight: 900, color: p.color }}>{p.logo}</span>
                <span style={{ fontSize: '10px', color: '#a0a0c0' }}>{p.name}</span>
              </div>
            ))}
          </div>
          <button onClick={() => setShowPlatformEdit(true)}
            className="w-full flex items-center justify-center gap-2 rounded-xl py-2"
            style={{ backgroundColor: '#0a0a20', border: '1px dashed #2a2a60', fontFamily: 'monospace', fontSize: '9px', letterSpacing: '0.2em', color: '#4040a0' }}>
            <Plus size={12} style={{ color: '#4040a0' }} />
            GESTISCI PIATTAFORME
          </button>
        </div>
        <div className="h-px mb-5" style={{ backgroundColor: '#0e0e28' }} />

        {/* ── NOTIFICATIONS ── */}
        <SectionHeader label="NOTIFICHE" />
        <div className="flex flex-col gap-2 mb-5">
          <ToggleRow icon={Bell} label="Notifiche Match" sublabel="Quando un amico fa match con te" color="#bf40ff" />
          <ToggleRow icon={Bell} label="Nuovi Consigli" sublabel="Film e serie per te ogni settimana" color="#bf40ff" />
          <ToggleRow icon={Bell} label="Aggiornamenti App" color="#bf40ff" />
        </div>
        <div className="h-px mb-5" style={{ backgroundColor: '#0e0e28' }} />

        {/* ── GENERAL ── */}
        <SectionHeader label="GENERALI" />
        <div className="flex flex-col gap-2 mb-5">
          <SettingRow icon={Globe} label="Lingua" sublabel="Italiano" color="#00e5ff"
            right={<span style={{ fontFamily: 'monospace', fontSize: '10px', color: '#00e5ff' }}>IT</span>}
          />
          <SettingRow icon={Shield} label="Autorizzazioni" sublabel="Fotocamera, notifiche, posizione" color="#ffcc00" />
          <SettingRow icon={HelpCircle} label="Aiuto" sublabel="FAQ e guide" color="#00ff88" />
          <SettingRow icon={MessageSquare} label="Feedback" sublabel="Suggerisci miglioramenti" color="#00ff88" />
          <SettingRow icon={Baby} label="Controllo Parentale" sublabel="Limita contenuti per età" color="#ff8800" />
          <SettingRow icon={Info} label="Info App" sublabel="v1.0.0 · Flicker" color="#6060a0" />
        </div>
      </div>

      {/* ── Modals ── */}
      <>
        {showNickEdit && (
          <EditModal key="nick" title="Modifica Nickname" value={nickname} onSave={setNickname} onClose={() => setShowNickEdit(false)} />
        )}

        {showPlatformEdit && (
          <div key="platform"
            className="absolute inset-0 z-50 flex items-end" style={{ backgroundColor: '#000000a0' }}
            onClick={() => setShowPlatformEdit(false)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="w-full rounded-t-3xl p-5"
              style={{ backgroundColor: '#080818', border: '1px solid #1a1a40', maxHeight: '70vh', overflowY: 'auto' }}
            >
              <div className="flex items-center justify-between mb-4">
                <p style={{ fontFamily: 'monospace', fontSize: '12px', letterSpacing: '0.2em', color: '#a0a0e0' }}>GESTISCI PIATTAFORME</p>
                <button onClick={() => setShowPlatformEdit(false)}><X size={16} style={{ color: '#5050a0' }} /></button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {PLATFORMS.map((p) => {
                  const active = platforms.includes(p.id);
                  return (
                    <button key={p.id} onClick={() => togglePlatform(p.id)}
                      className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 relative"
                      style={{ backgroundColor: active ? `${p.color}18` : '#0a0a1e', border: `1.5px solid ${active ? p.color : '#1a1a40'}`, transition: 'all 0.2s' }}
                    >
                      <span className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${p.color}25`, color: p.color, fontFamily: 'monospace', fontSize: '10px', fontWeight: 900 }}>{p.logo}</span>
                      <span style={{ fontSize: '10px', color: active ? '#e0e0ff' : '#404090', fontFamily: 'monospace' }}>{p.name}</span>
                      {active && <div className="absolute top-1.5 right-1.5 w-3.5 h-3.5 rounded-full flex items-center justify-center" style={{ backgroundColor: p.color }}><Check size={8} style={{ color: '#000' }} /></div>}
                    </button>
                  );
                })}
              </div>
              <button onClick={() => setShowPlatformEdit(false)}
                className="w-full mt-4 rounded-xl py-3 flex items-center justify-center"
                style={{ backgroundColor: '#00e5ff', fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.2em', color: '#020214', fontWeight: 900 }}>
                <Check size={14} style={{ marginRight: '6px' }} /> SALVA
              </button>
            </div>
          </div>
        )}

        {showDeactivate && (
          <div key="deact"
            className="absolute inset-0 z-50 flex items-center justify-center px-6" style={{ backgroundColor: '#000000b0' }}
          >
            <div
              className="w-full rounded-2xl p-6"
              style={{ backgroundColor: '#080818', border: '1px solid #ff224440' }}
            >
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#ff224418', border: '1px solid #ff224440' }}>
                <Trash2 size={22} style={{ color: '#ff2244' }} />
              </div>
              <h3 style={{ fontFamily: 'monospace', fontSize: '14px', fontWeight: 900, color: '#ff4466', letterSpacing: '0.1em', textAlign: 'center' }}>DISATTIVA ACCOUNT</h3>
              <p style={{ fontSize: '12px', color: '#5050a0', lineHeight: 1.6, textAlign: 'center', marginTop: '8px' }}>
                Sei sicuro? Questa azione disattiverà il tuo account. Potrai riattivarlo accedendo nuovamente.
              </p>
              <div className="flex gap-3 mt-5">
                <button onClick={() => setShowDeactivate(false)}
                  className="flex-1 rounded-xl py-3" style={{ backgroundColor: '#0a0a20', border: '1px solid #1a1a40', fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.15em', color: '#5050a0' }}>
                  ANNULLA
                </button>
                <button
                  className="flex-1 rounded-xl py-3" style={{ backgroundColor: '#ff224420', border: '1px solid #ff2244', fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.15em', color: '#ff4466', boxShadow: '0 0 12px #ff224430' }}>
                  DISATTIVA
                </button>
              </div>
            </div>
          </div>
        )}
      </>
      <Navbar></Navbar>
    </div>
  );
}
