import { useState } from "react";

// ╔══════════════════════════════════════════════════════╗
// ║                   ⚙️  CONFIG                        ║
// ╚══════════════════════════════════════════════════════╝
const CONFIG = {
  nombre:       "Siempre Bella",
  ciudad:       "Buenos Aires",
  subtitulo:    "Salón de belleza · Turnos online",
  telegramBot:  "8730232969:AAFFafm8jeLPMmLfXObNaYlxqPzFrY0W3vM",
  telegramChat: "835919977",
};

// ── Paleta ──
const BLACK  = "#1A1A1A";
const WHITE  = "#FFFFFF";
const GRAY   = "#F4F4F4";
const BORDER = "#E8E8E8";
const MUTED  = "#999999";
const FONTS  = `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap');`;

// ── Traducciones ──
const T = {
  es: {
    flag:"🇪🇸", langName:"Español",
    bienvenido:"Bienvenido",
    elige_idioma:"Elegí tu idioma",
    paso1:"Paso 1 · Elegí tu servicio",
    paso2:"Paso 2 · Elegí tu especialista",
    paso3:"Paso 3 · Elegí fecha y hora",
    paso4:"Paso 4 · Confirmá tu turno",
    siguiente:"Siguiente →",
    volver:"← Volver",
    confirmar:"Confirmar turno",
    nombre_placeholder:"Tu nombre completo",
    telefono_placeholder:"Tu teléfono (WhatsApp)",
    turno_confirmado:"¡Turno confirmado!",
    turno_sub:"Te enviaremos los detalles por Telegram",
    nuevo_turno:"Reservar otro turno",
    disponible:"Disponible",
    ocupado:"Ocupado",
    selecciona_fecha:"Seleccioná una fecha",
    selecciona_hora:"Seleccioná un horario",
    duracion:"duración",
    min:"min",
    tu_reserva:"Tu reserva",
    servicio:"Servicio",
    especialista:"Especialista",
    fecha:"Fecha",
    hora:"Hora",
    nombre:"Nombre",
    telefono:"Teléfono",
    campo_requerido:"Completá todos los campos",
  },
  en: {
    flag:"🇬🇧", langName:"English",
    bienvenido:"Welcome",
    elige_idioma:"Choose your language",
    paso1:"Step 1 · Choose your service",
    paso2:"Step 2 · Choose your specialist",
    paso3:"Step 3 · Choose date & time",
    paso4:"Step 4 · Confirm your appointment",
    siguiente:"Next →",
    volver:"← Back",
    confirmar:"Confirm appointment",
    nombre_placeholder:"Your full name",
    telefono_placeholder:"Your phone (WhatsApp)",
    turno_confirmado:"Appointment confirmed!",
    turno_sub:"We'll send you the details via Telegram",
    nuevo_turno:"Book another appointment",
    disponible:"Available",
    ocupado:"Busy",
    selecciona_fecha:"Select a date",
    selecciona_hora:"Select a time",
    duracion:"duration",
    min:"min",
    tu_reserva:"Your booking",
    servicio:"Service",
    especialista:"Specialist",
    fecha:"Date",
    hora:"Time",
    nombre:"Name",
    telefono:"Phone",
    campo_requerido:"Please fill in all fields",
  },
  ru: {
    flag:"🇷🇺", langName:"Русский",
    bienvenido:"Добро пожаловать",
    elige_idioma:"Выберите язык",
    paso1:"Шаг 1 · Выберите услугу",
    paso2:"Шаг 2 · Выберите мастера",
    paso3:"Шаг 3 · Выберите дату и время",
    paso4:"Шаг 4 · Подтвердите запись",
    siguiente:"Далее →",
    volver:"← Назад",
    confirmar:"Подтвердить запись",
    nombre_placeholder:"Ваше полное имя",
    telefono_placeholder:"Ваш телефон (WhatsApp)",
    turno_confirmado:"Запись подтверждена!",
    turno_sub:"Мы отправим детали в Telegram",
    nuevo_turno:"Записаться снова",
    disponible:"Свободно",
    ocupado:"Занято",
    selecciona_fecha:"Выберите дату",
    selecciona_hora:"Выберите время",
    duracion:"длительность",
    min:"мин",
    tu_reserva:"Ваша запись",
    servicio:"Услуга",
    especialista:"Мастер",
    fecha:"Дата",
    hora:"Время",
    nombre:"Имя",
    telefono:"Телефон",
    campo_requerido:"Заполните все поля",
  },
};
type Lang = "es"|"en"|"ru";

// ── Servicios ──
const SERVICIOS = [
  { id:"pestanas", emoji:"💅", duracion:90,  precio:8500,
    nombre:{es:"Extensión de pestañas", en:"Eyelash extensions", ru:"Наращивание ресниц"},
    desc:{es:"Volumen y definición natural", en:"Natural volume and definition", ru:"Объём и естественная форма"} },
  { id:"coloracion", emoji:"🎨", duracion:120, precio:12000,
    nombre:{es:"Coloración", en:"Hair coloring", ru:"Окрашивание волос"},
    desc:{es:"Tinte, mechas y técnicas especiales", en:"Dye, highlights and special techniques", ru:"Тонирование, мелирование и спецтехники"} },
  { id:"corte", emoji:"✂️", duracion:45, precio:6000,
    nombre:{es:"Corte de cabello", en:"Haircut", ru:"Стрижка"},
    desc:{es:"Corte y peinado profesional", en:"Professional cut and styling", ru:"Профессиональная стрижка и укладка"} },
  { id:"infantil", emoji:"👧", duracion:30, precio:4000,
    nombre:{es:"Corte infantil", en:"Children's haircut", ru:"Детская стрижка"},
    desc:{es:"Para niños hasta 12 años", en:"For children up to 12 years", ru:"Для детей до 12 лет"} },
];

// ── Especialistas ──
const ESPECIALISTAS = [
  { id:"elvio", nombre:"Elvio", emoji:"👨‍🎨",
    especialidad:{es:"Coloración · Cortes", en:"Coloring · Cuts", ru:"Окрашивание · Стрижки"},
    servicios:["coloracion","corte","infantil"] },
  { id:"anna", nombre:"Anna", emoji:"👩‍🎨",
    especialidad:{es:"Pestañas · Coloración · Cortes", en:"Lashes · Coloring · Cuts", ru:"Ресницы · Окрашивание · Стрижки"},
    servicios:["pestanas","coloracion","corte","infantil"] },
];

// ── Генерация слотов ──
function getSlots(fecha: string, especialistaId: string): {hora:string, libre:boolean}[] {
  const horas = ["09:00","10:00","11:00","12:00","14:00","15:00","16:00","17:00","18:00"];
  // Детерминированные "занятые" на основе даты+специалиста (псевдо-случайные)
  const seed = fecha.split("").reduce((a,c)=>a+c.charCodeAt(0),0) + (especialistaId==="anna"?7:3);
  return horas.map((hora,i) => ({ hora, libre: (seed+i*3)%5 !== 0 }));
}

// ── Отправка в Telegram ──
async function sendTelegram(data: {
  servicio:string, especialista:string, fecha:string, hora:string, nombre:string, telefono:string
}) {
  const msg = `🌸 *Nueva reserva — Siempre Bella*\n\n💅 *Servicio:* ${data.servicio}\n👤 *Especialista:* ${data.especialista}\n📅 *Fecha:* ${data.fecha}\n🕐 *Hora:* ${data.hora}\n\n👤 *Cliente:* ${data.nombre}\n📱 *Teléfono:* ${data.telefono}`;
  try {
    await fetch(`https://api.telegram.org/bot${CONFIG.telegramBot}/sendMessage`, {
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify({ chat_id: CONFIG.telegramChat, text: msg, parse_mode:"Markdown" })
    });
  } catch(e) { console.log("Telegram error:", e); }
}

// ── Формат даты ──
function formatDate(dateStr:string, lang:Lang) {
  const d = new Date(dateStr+"T12:00:00");
  const opts:Intl.DateTimeFormatOptions = { weekday:"long", day:"numeric", month:"long" };
  const locale = lang==="ru"?"ru-RU":lang==="en"?"en-US":"es-AR";
  return d.toLocaleDateString(locale, opts);
}

function getDaysAhead(n:number) {
  const days = [];
  for(let i=1; i<=n; i++) {
    const d = new Date();
    d.setDate(d.getDate()+i);
    days.push(d.toISOString().split("T")[0]);
  }
  return days;
}

// ===================== APP =====================
export default function App() {
  const [lang, setLang] = useState<Lang>("es");
  const [langSelected, setLangSelected] = useState(false);
  const [langAnim, setLangAnim] = useState(false);
  const [step, setStep] = useState(1);
  const [servicioId, setServicioId] = useState("");
  const [especialistaId, setEspecialistaId] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  const t = T[lang];
  const servicio = SERVICIOS.find(s=>s.id===servicioId);
  const especialista = ESPECIALISTAS.find(e=>e.id===especialistaId);
  const dias = getDaysAhead(14);
  const slots = fecha && especialistaId ? getSlots(fecha, especialistaId) : [];

  function chooseLang(l:Lang) {
    setLang(l); setLangAnim(true);
    setTimeout(()=>{ setLangSelected(true); window.scrollTo(0,0); }, 400);
  }

  async function handleConfirmar() {
    if(!nombre.trim() || !telefono.trim()) { setError(t.campo_requerido); return; }
    setError(""); setSending(true);
    await sendTelegram({
      servicio: servicio?.nombre[lang] ?? servicioId,
      especialista: especialista?.nombre ?? especialistaId,
      fecha: formatDate(fecha, lang),
      hora,
      nombre: nombre.trim(),
      telefono: telefono.trim(),
    });
    setSending(false);
    setEnviado(true);
  }

  function reset() {
    setStep(1); setServicioId(""); setEspecialistaId("");
    setFecha(""); setHora(""); setNombre(""); setTelefono("");
    setEnviado(false); setError("");
  }

  // ── Стиль ──
  const S = {
    page: { background:WHITE, fontFamily:"'DM Sans',sans-serif", fontWeight:300, color:BLACK, minHeight:"100vh", maxWidth:480, margin:"0 auto", width:"100%", overflowX:"hidden" as const },
    stripe: { height:3, background:BLACK },
    topbar: { display:"flex", justifyContent:"space-between", alignItems:"center", padding:"12px 20px", borderBottom:`1px solid ${BORDER}`, background:WHITE },
    langBtn: { background:"transparent", border:`1px solid ${BORDER}`, color:MUTED, padding:"5px 12px", cursor:"pointer", fontFamily:"inherit", fontSize:10, display:"flex", alignItems:"center", gap:6, letterSpacing:0.5 },
    hero: { padding:"36px 24px 28px", borderBottom:`1px solid ${BORDER}`, background:WHITE },
    heroSup: { fontSize:9, letterSpacing:5, color:MUTED, textTransform:"uppercase" as const, marginBottom:8 },
    heroTitle: { fontFamily:"'Playfair Display',serif", fontSize:64, fontWeight:400, color:BLACK, lineHeight:0.88, marginBottom:14 },
    heroTags: { display:"flex", gap:6 },
    heroTag: { fontSize:8, letterSpacing:2, color:MUTED, border:`1px solid ${BORDER}`, padding:"3px 8px", textTransform:"uppercase" as const },
    body: { padding:"24px 20px" },
    stepLabel: { fontSize:8, letterSpacing:4, color:MUTED, textTransform:"uppercase" as const, marginBottom:18 },
    card: { background:WHITE, border:`1px solid ${BORDER}`, padding:"14px 16px", marginBottom:8, cursor:"pointer", display:"flex", alignItems:"center", gap:12, transition:"all 0.15s" },
    cardActive: { background:GRAY, border:`1px solid ${BLACK}` },
    cardEmoji: { fontSize:22, flexShrink:0, width:40, textAlign:"center" as const },
    cardInfo: { flex:1, minWidth:0 },
    cardNombre: { fontFamily:"'Playfair Display',serif", fontSize:16, color:BLACK, marginBottom:2 },
    cardDesc: { fontSize:11, color:MUTED },
    cardRight: { textAlign:"right" as const, flexShrink:0 },
    cardPrice: { fontFamily:"'Playfair Display',serif", fontSize:16, color:BLACK },
    cardDur: { fontSize:9, color:MUTED, letterSpacing:1 },
    btn: { width:"100%", padding:"14px", background:BLACK, color:WHITE, border:"none", fontSize:9, letterSpacing:4, textTransform:"uppercase" as const, cursor:"pointer", fontFamily:"inherit", marginTop:16 },
    btnBack: { background:"transparent", color:MUTED, border:`1px solid ${BORDER}`, marginTop:8 },
    input: { width:"100%", padding:"12px 14px", border:`1px solid ${BORDER}`, background:WHITE, color:BLACK, fontSize:13, fontFamily:"inherit", outline:"none", marginBottom:10, boxSizing:"border-box" as const },
    inputFocus: { border:`1px solid ${BLACK}` },
    summaryRow: { display:"flex", justifyContent:"space-between", alignItems:"baseline", padding:"10px 0", borderBottom:`1px solid ${BORDER}` },
    summaryLabel: { fontSize:9, letterSpacing:3, color:MUTED, textTransform:"uppercase" as const },
    summaryVal: { fontFamily:"'Playfair Display',serif", fontSize:14, color:BLACK },
    error: { fontSize:11, color:"#c0392b", marginBottom:8, letterSpacing:0.5 },
    calGrid: { display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:4, marginBottom:16 },
    dayBtn: (active:boolean) => ({ padding:"8px 4px", textAlign:"center" as const, border:`1px solid ${active?BLACK:BORDER}`, background:active?BLACK:WHITE, color:active?WHITE:BLACK, fontSize:11, cursor:"pointer", fontFamily:"inherit", fontWeight:active?500:300 }),
    dayLabel: { fontSize:8, color:MUTED, textAlign:"center" as const, letterSpacing:1 },
    slotGrid: { display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:6 },
    slot: (libre:boolean, active:boolean) => ({ padding:"10px 6px", textAlign:"center" as const, border:`1px solid ${active?BLACK:libre?BORDER:"#F0F0F0"}`, background:active?BLACK:libre?WHITE:GRAY, color:active?WHITE:libre?BLACK:MUTED, fontSize:12, cursor:libre?"pointer":"not-allowed", fontFamily:"inherit" }),
    specCard: { border:`1px solid ${BORDER}`, padding:"16px", marginBottom:8, cursor:"pointer", display:"flex", alignItems:"center", gap:14 },
    specActive: { border:`1px solid ${BLACK}`, background:GRAY },
    specAvatar: { width:48, height:48, borderRadius:"50%", background:GRAY, display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, flexShrink:0 },
    specName: { fontFamily:"'Playfair Display',serif", fontSize:18, color:BLACK, marginBottom:3 },
    specSpec: { fontSize:11, color:MUTED },
    successBox: { textAlign:"center" as const, padding:"48px 20px" },
    successEmoji: { fontSize:56, marginBottom:16 },
    successTitle: { fontFamily:"'Playfair Display',serif", fontSize:28, color:BLACK, marginBottom:8 },
    successSub: { fontSize:12, color:MUTED, letterSpacing:0.5, marginBottom:24 },
  };

  // ── PANTALLA IDIOMA ──
  if(!langSelected) {
    const LANGS:[Lang,string][] = [["es","Bienvenido"],["en","Welcome"],["ru","Добро пожаловать"]];
    return(
      <div style={{...S.page, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"32px 24px", position:"fixed", inset:0}}>
        <style>{`${FONTS} @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}`}</style>
        <div style={{height:3, background:BLACK, position:"absolute", top:0, left:0, right:0}}/>
        <div style={{textAlign:"center", marginBottom:36, opacity:langAnim?0:1, transition:"opacity 0.3s"}}>
          <div style={S.heroSup}>{CONFIG.ciudad}</div>
          <div style={{...S.heroTitle, fontSize:60}}>{CONFIG.nombre}</div>
          <div style={{display:"flex", gap:8, justifyContent:"center", marginBottom:10}}>
            <div style={S.heroTag}>Salón de belleza</div>
            <div style={S.heroTag}>Turnos online</div>
          </div>
          <div style={{fontSize:9, letterSpacing:3, color:MUTED, textTransform:"uppercase"}}>Elegí tu idioma · Choose your language</div>
        </div>
        <div style={{width:"100%", maxWidth:360, display:"flex", flexDirection:"column", gap:8, opacity:langAnim?0:1, transition:"opacity 0.3s"}}>
          {LANGS.map(([code,sub],i)=>(
            <button key={code} onClick={()=>chooseLang(code)} style={{padding:"14px 20px", background:WHITE, border:`1px solid ${BORDER}`, cursor:"pointer", fontFamily:"inherit", display:"flex", alignItems:"center", gap:14, animation:`fadeUp 0.4s ease ${i*0.08}s both`, boxShadow:`0 1px 6px rgba(0,0,0,0.05)`}}>
              <span style={{fontSize:26}}>{T[code].flag}</span>
              <div style={{flex:1, textAlign:"left"}}>
                <div style={{fontSize:14, color:BLACK}}>{T[code].langName}</div>
                <div style={{fontSize:11, color:MUTED, fontStyle:"italic", fontFamily:"'Playfair Display',serif"}}>{sub}</div>
              </div>
              <span style={{color:MUTED, fontSize:16}}>›</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // ── CONFIRMADO ──
  if(enviado) return(
    <div style={S.page}>
      <style>{FONTS}</style>
      <div style={S.stripe}/>
      <div style={S.successBox}>
        <div style={S.successEmoji}>✨</div>
        <div style={S.successTitle}>{t.turno_confirmado}</div>
        <div style={S.successSub}>{t.turno_sub}</div>
        {/* Резюме */}
        <div style={{border:`1px solid ${BORDER}`, padding:"16px", marginBottom:20, textAlign:"left"}}>
          {[
            [t.servicio, servicio?.nombre[lang]],
            [t.especialista, especialista?.nombre],
            [t.fecha, formatDate(fecha,lang)],
            [t.hora, hora],
            [t.nombre, nombre],
            [t.telefono, telefono],
          ].map(([label,val])=>(
            <div key={label} style={S.summaryRow}>
              <div style={S.summaryLabel}>{label}</div>
              <div style={S.summaryVal}>{val}</div>
            </div>
          ))}
        </div>
        <button onClick={reset} style={{...S.btn, marginTop:0}}>{t.nuevo_turno}</button>
      </div>
    </div>
  );

  return(
    <div style={S.page}>
      <style>{`${FONTS}*{box-sizing:border-box;margin:0;padding:0;}::-webkit-scrollbar{display:none;}html,body,#root{overflow-x:hidden;width:100%;}`}</style>
      <div style={S.stripe}/>

      {/* TOPBAR */}
      <div style={S.topbar}>
        <button onClick={()=>setLangSelected(false)} style={S.langBtn}>
          <span>{T[lang].flag}</span><span>{T[lang].langName}</span>
        </button>
        <div style={{fontFamily:"'Playfair Display',serif", fontSize:13, fontStyle:"italic", color:MUTED}}>Siempre Bella</div>
        <div style={{width:80}}/>
      </div>

      {/* HERO */}
      <div style={S.hero}>
        <div style={S.heroSup}>{CONFIG.ciudad} · {CONFIG.subtitulo}</div>
        <div style={S.heroTitle}>{CONFIG.nombre}</div>
        <div style={S.heroTags}>
          <div style={S.heroTag}>Turnos online</div>
          <div style={S.heroTag}>Beauty & Care</div>
        </div>
      </div>

      {/* PROGRESS BAR */}
      <div style={{display:"flex", background:GRAY, height:3}}>
        {[1,2,3,4].map(s=>(
          <div key={s} style={{flex:1, background:s<=step?BLACK:"transparent", transition:"background 0.3s", marginRight:s<4?1:0}}/>
        ))}
      </div>

      <div style={S.body}>

        {/* ── PASO 1: SERVICIO ── */}
        {step===1 && <>
          <div style={S.stepLabel}>{t.paso1}</div>
          {SERVICIOS.map(sv=>(
            <div key={sv.id} onClick={()=>setServicioId(sv.id)}
              style={{...S.card, ...(servicioId===sv.id?S.cardActive:{})}}>
              <div style={S.cardEmoji}>{sv.emoji}</div>
              <div style={S.cardInfo}>
                <div style={S.cardNombre}>{sv.nombre[lang]}</div>
                <div style={S.cardDesc}>{sv.desc[lang]}</div>
              </div>
              <div style={S.cardRight}>
                <div style={S.cardPrice}>${sv.precio.toLocaleString("es-AR")}</div>
                <div style={S.cardDur}>{sv.duracion} {t.min}</div>
              </div>
            </div>
          ))}
          <button onClick={()=>servicioId && setStep(2)} style={{...S.btn, opacity:servicioId?1:0.4}}>{t.siguiente}</button>
        </>}

        {/* ── PASO 2: ESPECIALISTA ── */}
        {step===2 && <>
          <div style={S.stepLabel}>{t.paso2}</div>
          {ESPECIALISTAS.filter(e=>e.servicios.includes(servicioId)).map(esp=>(
            <div key={esp.id} onClick={()=>setEspecialistaId(esp.id)}
              style={{...S.specCard, ...(especialistaId===esp.id?S.specActive:{})}}>
              <div style={S.specAvatar}>{esp.emoji}</div>
              <div>
                <div style={S.specName}>{esp.nombre}</div>
                <div style={S.specSpec}>{esp.especialidad[lang]}</div>
              </div>
              {especialistaId===esp.id && <div style={{marginLeft:"auto", fontSize:18}}>✓</div>}
            </div>
          ))}
          <button onClick={()=>especialistaId && setStep(3)} style={{...S.btn, opacity:especialistaId?1:0.4}}>{t.siguiente}</button>
          <button onClick={()=>setStep(1)} style={{...S.btn, ...S.btnBack}}>{t.volver}</button>
        </>}

        {/* ── PASO 3: FECHA Y HORA ── */}
        {step===3 && <>
          <div style={S.stepLabel}>{t.paso3}</div>

          {/* Días недели header */}
          <div style={{display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:4, marginBottom:4}}>
            {(lang==="ru"?["Пн","Вт","Ср","Чт","Пт","Сб","Вс"]:lang==="en"?["Mo","Tu","We","Th","Fr","Sa","Su"]:["Lu","Ma","Mi","Ju","Vi","Sá","Do"]).map(d=>(
              <div key={d} style={S.dayLabel}>{d}</div>
            ))}
          </div>

          {/* Calendario */}
          <div style={S.calGrid}>
            {/* Пустые ячейки для выравнивания */}
            {Array.from({length: new Date(dias[0]).getDay()===0?6:new Date(dias[0]).getDay()-1}).map((_,i)=>(
              <div key={"e"+i}/>
            ))}
            {dias.map(d=>{
              const dd = new Date(d+"T12:00:00");
              const dayNum = dd.getDate();
              const active = d===fecha;
              return(
                <button key={d} onClick={()=>{setFecha(d);setHora("");}}
                  style={S.dayBtn(active)}>
                  {dayNum}
                </button>
              );
            })}
          </div>

          {/* Slots */}
          {fecha && <>
            <div style={{fontSize:9, letterSpacing:3, color:MUTED, textTransform:"uppercase", marginBottom:12}}>{t.selecciona_hora}</div>
            <div style={S.slotGrid}>
              {slots.map(sl=>(
                <button key={sl.hora} disabled={!sl.libre} onClick={()=>sl.libre && setHora(sl.hora)}
                  style={S.slot(sl.libre, hora===sl.hora)}>
                  {sl.hora}
                </button>
              ))}
            </div>
          </>}

          <button onClick={()=>fecha && hora && setStep(4)} style={{...S.btn, opacity:fecha&&hora?1:0.4}}>{t.siguiente}</button>
          <button onClick={()=>{setStep(2);setFecha("");setHora("");}} style={{...S.btn, ...S.btnBack}}>{t.volver}</button>
        </>}

        {/* ── PASO 4: CONFIRMACIÓN ── */}
        {step===4 && <>
          <div style={S.stepLabel}>{t.paso4}</div>

          {/* Resumen */}
          <div style={{border:`1px solid ${BORDER}`, padding:"16px", marginBottom:20}}>
            <div style={{fontSize:9, letterSpacing:3, color:MUTED, textTransform:"uppercase", marginBottom:12}}>{t.tu_reserva}</div>
            {[
              [t.servicio, servicio?.nombre[lang]],
              [t.especialista, especialista?.nombre],
              [t.fecha, formatDate(fecha,lang)],
              [t.hora, hora],
            ].map(([label,val])=>(
              <div key={label} style={S.summaryRow}>
                <div style={S.summaryLabel}>{label}</div>
                <div style={S.summaryVal}>{val}</div>
              </div>
            ))}
          </div>

          {/* Данные клиента */}
          <input value={nombre} onChange={e=>setNombre(e.target.value)}
            placeholder={t.nombre_placeholder} style={S.input}/>
          <input value={telefono} onChange={e=>setTelefono(e.target.value)}
            placeholder={t.telefono_placeholder} style={S.input} type="tel"/>

          {error && <div style={S.error}>{error}</div>}

          <button onClick={handleConfirmar} disabled={sending}
            style={{...S.btn, opacity:sending?0.6:1}}>
            {sending?"..." : t.confirmar}
          </button>
          <button onClick={()=>setStep(3)} style={{...S.btn, ...S.btnBack}}>{t.volver}</button>
        </>}

      </div>
    </div>
  );
}
