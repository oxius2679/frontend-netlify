/* ============================================================================
 * SERVANT LEADERSHIP OS  ·  v20.0 "MERIDIAN"
 * Executive Leadership Intelligence Layer
 * ----------------------------------------------------------------------------
 * Sucesor de Human Impact Leadership v16.1.
 * Mantiene EL MISMO contrato de integración con el sistema principal:
 *   · Lee  window.projects[] → project.tasks[] → task.assignee/status/...
 *   · Claves localStorage heredadas: hil_skills_data, hil_coaching_sessions,
 *     preferredLanguage, projects
 *   · Expone window.openHumanImpactLeadership() y window.closeHIL()
 *   · Inyecta su botón en el sidebar y devuelve el control vía showView()
 *
 * NOVEDAD METODOLÓGICA (lo importante, no lo cosmético):
 *   El modelo v16.1 calculaba el "Índice de Liderazgo de Servicio" a partir de
 *   la tasa de finalización de tareas. Eso NO mide liderazgo de servicio: mide
 *   productividad individual. Un líder que completa el 100% de sus tareas puede
 *   ser un pésimo líder servidor (acapara, no delega, crea dependencia).
 *
 *   El liderazgo de servicio es un constructo de PERCEPCIÓN: se mide con los
 *   seguidores evaluando al líder (Liden et al. 2008, SL-28/SL-7;
 *   van Dierendonck & Nuijten 2011, SLS de 8 dimensiones; síntesis en
 *   Eva, Robin, Sendjaya, van Dierendonck & Liden 2019, Leadership Quarterly).
 *
 *   Por eso este módulo separa DOS capas de evidencia y nunca las confunde:
 *     Capa A · TELEMETRÍA CONDUCTUAL  (derivada de tus proyectos, es un PROXY)
 *     Capa B · PERCEPCIÓN 360°        (instrumento SLS-8, es la MEDIDA real)
 *   y muestra siempre un indicador de confianza de la evidencia.
 * ============================================================================ */
(function () {
'use strict';

if (window.__SLOS_LOADED__) { console.warn('[SLOS] Ya cargado — se omite doble inicialización.'); return; }
window.__SLOS_LOADED__ = true;

console.log('%c SERVANT LEADERSHIP OS v20.0 ', 'background:linear-gradient(90deg,#c9a227,#f3dfa2);color:#0a0a0f;font-weight:700;padding:2px 6px;border-radius:3px');

/* ==========================================================================
 * 1 · CONFIGURACIÓN
 * ========================================================================== */
const CFG = {
    VERSION: '20.0',
    CODENAME: 'MERIDIAN',
    API_URL: 'https://mi-sistema-proyectos-backend-4.onrender.com',
    STORAGE: {
        SKILLS:      'hil_skills_data',          // heredado v16.1
        SESSIONS:    'hil_coaching_sessions',    // heredado v16.1
        PREFS:       'hil_preferences',          // heredado v16.1
        PERCEPTION:  'slos_perception_360',      // nuevo · capa B
        EXPERIMENTS: 'slos_experiments',         // nuevo · prácticas deliberadas
        SNAPSHOTS:   'slos_snapshots',           // nuevo · series temporales
        STORIES:     'slos_stories'              // nuevo · narrativa de servicio
    },
    CDN: {
        FA:    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css',
        JSPDF: 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
        AUTOT: 'https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.8.2/jspdf.plugin.autotable.min.js',
        FONTS: 'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter+Tight:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap'
    },
    // Umbrales de confianza de evidencia (nº de evaluadores 360 por líder)
    CONFIDENCE: { NONE: 0, LOW: 1, MEDIUM: 3, HIGH: 5 }
};

const RM = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* --------------------------------------------------------------------------
 * Acceso seguro a localStorage.
 * Safari y algunas configuraciones de Chrome lanzan SecurityError al acceder
 * a localStorage desde file:// o con cookies bloqueadas. Sin esta protección
 * el módulo entero moriría en silencio. Si no hay almacén, usamos memoria:
 * el sistema funciona igual, pero los datos no sobreviven a la recarga.
 * ------------------------------------------------------------------------ */
const LS = (function () {
    var mem = {}, ok = false;
    try {
        var k = '__slos_probe__';
        window.localStorage.setItem(k, '1');
        window.localStorage.removeItem(k);
        ok = true;
    } catch (e) {
        console.warn('[SLOS] localStorage no disponible — los datos no persistirán entre recargas.');
    }
    return {
        available: ok,
        get: function (k) {
            try { return ok ? window.localStorage.getItem(k) : (mem[k] !== undefined ? mem[k] : null); }
            catch (e) { return mem[k] !== undefined ? mem[k] : null; }
        },
        set: function (k, v) {
            try { if (ok) window.localStorage.setItem(k, v); else mem[k] = v; }
            catch (e) { mem[k] = v; }
        },
        remove: function (k) {
            try { if (ok) window.localStorage.removeItem(k); else delete mem[k]; }
            catch (e) { delete mem[k]; }
        }
    };
})();

/* ==========================================================================
 * 2 · MODELO CIENTÍFICO
 * --------------------------------------------------------------------------
 * SLS-8  van Dierendonck & Nuijten (2011) — Servant Leadership Survey.
 *        8 dimensiones, 30 ítems, validada en 8 muestras (n=1571, NL/UK) y
 *        replicada en versiones alemana, italiana y subsahariana.
 * SL-7   Liden, Wayne, Zhao & Henderson (2008) — 7 factores desde 9 dimensiones,
 *        validada por CFA, con contribución incremental sobre liderazgo
 *        transformacional y LMX.
 * Spears (1998) — 10 características derivadas de Greenleaf (1970/1977).
 *        Valor conceptual e histórico; sin validación psicométrica. Se conserva
 *        como capa de lenguaje ejecutivo, no como instrumento de medida.
 * ========================================================================== */

// --- SLS-8 · el instrumento operativo del sistema ---------------------------
const SLS8 = [
    { key:'empowerment',    es:'Empoderamiento',   en:'Empowerment',    icon:'fa-seedling',
      load:0.90, weight:0.16,
      defEs:'Facilitar la autodirección, la toma de decisiones y el desarrollo autónomo de las personas.',
      defEn:'Enabling self-direction, decision-making and autonomous development in others.',
      items:[
        {es:'Mi líder me da la información que necesito para hacer bien mi trabajo.', en:'My leader gives me the information I need to do my work well.'},
        {es:'Mi líder me anima a usar mis propios criterios para resolver problemas.', en:'My leader encourages me to use my own judgement to solve problems.'},
        {es:'Mi líder me ofrece oportunidades para desarrollar nuevas capacidades.',   en:'My leader offers me opportunities to develop new skills.'}
      ] },
    { key:'standing_back',  es:'Dar un paso atrás', en:'Standing back', icon:'fa-arrow-left-long',
      load:0.90, weight:0.14,
      defEs:'Ceder el protagonismo y el mérito; priorizar el interés del equipo sobre el propio reconocimiento.',
      defEn:'Stepping out of the spotlight and giving credit; team interest before personal recognition.',
      items:[
        {es:'Mi líder no busca reconocimiento por el trabajo que hacemos.',       en:'My leader does not seek credit for the work we do.'},
        {es:'Mi líder se mantiene en segundo plano y cede el mérito al equipo.',  en:'My leader keeps in the background and gives credit to the team.'}
      ] },
    { key:'stewardship',    es:'Administración responsable', en:'Stewardship', icon:'fa-shield-heart',
      load:0.93, weight:0.14,
      defEs:'Asumir la responsabilidad del bien común y del largo plazo por encima del interés inmediato.',
      defEn:'Taking responsibility for the common good and the long term over immediate interest.',
      items:[
        {es:'Mi líder da prioridad al interés general por encima del suyo propio.', en:'My leader prioritises the common good over personal interest.'},
        {es:'Mi líder actúa pensando en el largo plazo de la organización.',        en:'My leader acts with the long-term organisation in mind.'}
      ] },
    { key:'humility',       es:'Humildad',         en:'Humility',       icon:'fa-hands-praying',
      load:0.93, weight:0.13,
      defEs:'Reconocer los límites propios, pedir ayuda y aprender de las contribuciones ajenas.',
      defEn:'Acknowledging one\u2019s limits, asking for help and learning from others\u2019 contributions.',
      items:[
        {es:'Mi líder aprende de las críticas y admite sus errores.',        en:'My leader learns from criticism and admits mistakes.'},
        {es:'Mi líder busca activamente el conocimiento del equipo.',        en:'My leader actively seeks the team\u2019s knowledge.'}
      ] },
    { key:'authenticity',   es:'Autenticidad',     en:'Authenticity',   icon:'fa-fingerprint',
      load:0.82, weight:0.12,
      defEs:'Coherencia entre valores declarados, palabra y conducta observable.',
      defEn:'Consistency between stated values, word and observable conduct.',
      items:[
        {es:'Mi líder es coherente entre lo que dice y lo que hace.',    en:'My leader is consistent between what they say and do.'},
        {es:'Mi líder muestra sus verdaderas opiniones y sentimientos.', en:'My leader shows their true opinions and feelings.'}
      ] },
    { key:'forgiveness',    es:'Aceptación interpersonal', en:'Interpersonal acceptance', icon:'fa-handshake-angle',
      load:0.60, weight:0.11,
      defEs:'Comprender la perspectiva ajena y permitir la recuperación tras el error sin castigo simbólico.',
      defEn:'Understanding others\u2019 perspective and allowing recovery after error without symbolic punishment.',
      items:[
        {es:'Mi líder mantiene una actitud constructiva tras un conflicto.', en:'My leader keeps a constructive attitude after conflict.'},
        {es:'Mi líder entiende cuando cometo un error y me ayuda a repararlo.', en:'My leader understands my mistakes and helps me repair them.'}
      ] },
    { key:'courage',        es:'Coraje',           en:'Courage',        icon:'fa-bolt',
      load:0.58, weight:0.10,
      defEs:'Asumir riesgos, desafiar convenciones y sostener conversaciones difíciles.',
      defEn:'Taking risks, challenging conventions and holding difficult conversations.',
      items:[
        {es:'Mi líder asume riesgos y hace cosas de forma diferente.', en:'My leader takes risks and does things differently.'},
        {es:'Mi líder plantea las conversaciones incómodas a tiempo.', en:'My leader raises uncomfortable conversations on time.'}
      ] },
    { key:'accountability', es:'Rendición de cuentas', en:'Accountability', icon:'fa-scale-balanced',
      load:0.17, weight:0.10,
      defEs:'Hacer responsables a las personas de resultados que sí controlan. Nota: en la validación original esta dimensión carga bajo en el factor de segundo orden (.17) — se interpreta como complemento, no como núcleo del servicio.',
      defEn:'Holding people accountable for results they control. Note: in the original validation this dimension loads low on the second-order factor (.17) — treat it as a complement, not the core of service.',
      items:[
        {es:'Mi líder me hace responsable del trabajo que controlo.', en:'My leader holds me accountable for work I control.'},
        {es:'Mi líder fija estándares claros y exigentes.',           en:'My leader sets clear, demanding standards.'}
      ] }
];

// --- SL-7 · Liden et al. (2008) — capa complementaria de lectura ejecutiva ---
const SL7 = [
    { key:'conceptual',   es:'Habilidad conceptual',      en:'Conceptual skills',      icon:'fa-diagram-project' },
    { key:'empowering',   es:'Empoderar',                 en:'Empowering',             icon:'fa-key' },
    { key:'growth',       es:'Hacer crecer y triunfar',   en:'Helping others grow',    icon:'fa-arrow-trend-up' },
    { key:'first',        es:'Poner al equipo primero',   en:'Putting others first',   icon:'fa-users' },
    { key:'ethical',      es:'Conducta ética',            en:'Behaving ethically',     icon:'fa-scroll' },
    { key:'healing',      es:'Sanación emocional',        en:'Emotional healing',      icon:'fa-heart-pulse' },
    { key:'community',    es:'Valor para la comunidad',   en:'Value for community',    icon:'fa-globe' }
];

// --- Spears (1998) · capa heredada, lenguaje de board ----------------------
const SPEARS10 = [
    {es:'Escucha',            en:'Listening'},        {es:'Empatía',        en:'Empathy'},
    {es:'Sanación',           en:'Healing'},          {es:'Conciencia',     en:'Awareness'},
    {es:'Persuasión',         en:'Persuasion'},       {es:'Conceptualización', en:'Conceptualization'},
    {es:'Previsión',          en:'Foresight'},        {es:'Administración', en:'Stewardship'},
    {es:'Compromiso con el crecimiento', en:'Commitment to growth'},
    {es:'Construcción de comunidad',     en:'Building community'}
];

// --- Telemetría conductual · Capa A (proxies, NO medida del constructo) -----
const BEHAVIOR_SIGNALS = [
    { key:'delegation', es:'Amplitud de delegación', en:'Delegation breadth', icon:'fa-share-nodes',
      proxyFor:'empowerment',
      es_how:'Entropía de Shannon de la distribución de tareas entre personas, normalizada. Alta = el trabajo circula; baja = se concentra.',
      en_how:'Normalised Shannon entropy of task distribution across people. High = work circulates; low = it concentrates.' },
    { key:'spotlight', es:'Cesión de protagonismo', en:'Spotlight yielding', icon:'fa-arrow-left-long',
      proxyFor:'standing_back',
      es_how:'1 − (cuota de tareas del líder dentro de sus propios proyectos). Alto = el equipo entrega, el líder habilita.',
      en_how:'1 − (leader\u2019s share of tasks within their own projects). High = the team ships, the leader enables.' },
    { key:'equity', es:'Equidad de carga', en:'Load equity', icon:'fa-scale-unbalanced-flip',
      proxyFor:'stewardship',
      es_how:'1 − coeficiente de Gini de la carga de tareas. Detecta al equipo que se sostiene quemando a una sola persona.',
      en_how:'1 − Gini coefficient of task load. Detects teams sustained by burning one single person.' },
    { key:'followthrough', es:'Cumplimiento', en:'Follow-through', icon:'fa-circle-check',
      proxyFor:'accountability',
      es_how:'Completadas / (completadas + vencidas), ajustado por precisión de estimación temporal.',
      en_how:'Completed / (completed + overdue), adjusted by time-estimation accuracy.' },
    { key:'growthsurface', es:'Superficie de crecimiento', en:'Growth surface', icon:'fa-seedling',
      proxyFor:'empowerment',
      es_how:'Nº de categorías de competencia distintas que cada persona ha tocado. Mide exposición a trabajo que enseña.',
      en_how:'Number of distinct competency categories each person has touched. Measures exposure to work that teaches.' },
    { key:'resilience', es:'Resiliencia estructural', en:'Structural resilience', icon:'fa-cubes-stacked',
      proxyFor:'stewardship',
      es_how:'1 − concentración de capacidad en la persona top (factor bus). Mide si la organización sobrevive a una baja.',
      en_how:'1 − capability concentration in the top person (bus factor). Measures survival of a single departure.' }
];

// --- Modelo de madurez ------------------------------------------------------
const MATURITY = [
    { lvl:1, es:'Explorador',  en:'Explorer',     range:[0,44],  icon:'fa-compass',
      es_d:'Intención declarada, conducta aún inconsistente.', en_d:'Stated intent, behaviour still inconsistent.' },
    { lvl:2, es:'Practicante', en:'Practitioner', range:[45,62], icon:'fa-repeat',
      es_d:'Conductas de servicio consistentes en su equipo directo.', en_d:'Consistent serving behaviours within the direct team.' },
    { lvl:3, es:'Constructor', en:'Builder',      range:[63,78], icon:'fa-trowel-bricks',
      es_d:'Crea capacidad de equipo: el equipo rinde sin él en la sala.', en_d:'Builds team capability: the team performs without them in the room.' },
    { lvl:4, es:'Multiplicador', en:'Multiplier', range:[79,89], icon:'fa-diagram-successor',
      es_d:'Desarrolla líderes que a su vez desarrollan a otros.', en_d:'Develops leaders who in turn develop others.' },
    { lvl:5, es:'Legado',      en:'Legacy',       range:[90,100], icon:'fa-monument',
      es_d:'La capacidad creada sobrevive a su mandato y es transferible.', en_d:'Created capability outlives the tenure and is transferable.' }
];

// --- Biblioteca de experimentos conductuales (práctica deliberada) ----------
const EXPERIMENT_LIBRARY = [
    { id:'ask-before-advising', dim:'empowerment', days:14,
      es:'Preguntar antes de aconsejar', en:'Ask before advising',
      es_d:'Durante 14 días, formula tres preguntas abiertas antes de ofrecer cualquier solución.',
      en_d:'For 14 days, ask three open questions before offering any solution.',
      es_m:'Nº de decisiones que el equipo cerró sin escalar.', en_m:'Decisions the team closed without escalating.' },
    { id:'decision-transfer', dim:'empowerment', days:30,
      es:'Transferencia de decisiones', en:'Decision transfer',
      es_d:'Lista las decisiones que sigues tomando tú. Transfiere una por semana con criterio explícito, no con permiso.',
      en_d:'List the decisions you still make. Transfer one per week with explicit criteria, not permission.',
      es_m:'Tiempo medio de ciclo de decisión.', en_m:'Median decision cycle time.' },
    { id:'credit-inversion', dim:'standing_back', days:21,
      es:'Inversión del mérito', en:'Credit inversion',
      es_d:'En cada foro externo, nombra a la persona que hizo el trabajo antes de describir el resultado.',
      en_d:'In every external forum, name the person who did the work before describing the result.',
      es_m:'Menciones nominales por reunión de dirección.', en_m:'Named mentions per leadership meeting.' },
    { id:'listening-tour', dim:'humility', days:30,
      es:'Ronda de escucha', en:'Listening tour',
      es_d:'Una conversación de 30 min con 12 personas sin agenda propia. Solo tomas notas y devuelves temas.',
      en_d:'A 30-min conversation with 12 people with no agenda of your own. You only take notes and reflect themes back.',
      es_m:'Temas recurrentes identificados y devueltos.', en_m:'Recurring themes identified and reflected back.' },
    { id:'error-amnesty', dim:'forgiveness', days:30,
      es:'Amnistía del error', en:'Error amnesty',
      es_d:'Abre cada retrospectiva contando un error propio antes de revisar los del equipo.',
      en_d:'Open every retrospective with one of your own mistakes before reviewing the team\u2019s.',
      es_m:'Nº de errores reportados voluntariamente.', en_m:'Voluntarily reported errors.' },
    { id:'successor-shadow', dim:'stewardship', days:60,
      es:'Sombra de sucesión', en:'Successor shadowing',
      es_d:'Un sucesor te acompaña en todas las reuniones de nivel superior y dirige una de cada tres.',
      en_d:'A successor joins every senior meeting with you and leads one in three.',
      es_m:'Nivel de preparación del sucesor (0-100).', en_m:'Successor readiness (0-100).' },
    { id:'hard-conversation', dim:'courage', days:14,
      es:'La conversación pendiente', en:'The pending conversation',
      es_d:'Identifica la conversación que llevas más tiempo evitando. Agéndala en 72 horas.',
      en_d:'Identify the conversation you have avoided longest. Schedule it within 72 hours.',
      es_m:'Días de latencia entre detección y conversación.', en_m:'Latency days between detection and conversation.' },
    { id:'load-rebalance', dim:'stewardship', days:21,
      es:'Reequilibrio de carga', en:'Load rebalance',
      es_d:'Redistribuye el 30% de la carga de la persona más saturada antes de aceptar trabajo nuevo.',
      en_d:'Redistribute 30% of the most saturated person\u2019s load before accepting new work.',
      es_m:'Coeficiente de Gini de carga del equipo.', en_m:'Team load Gini coefficient.' }
];

// --- Biblioteca ejecutiva ---------------------------------------------------
const LIBRARY = [
    { t:'Servant Leadership', a:'Robert K. Greenleaf', y:1977, dim:'stewardship', tier:'Fuente primaria',
      es:'El texto fundacional. Introduce el test central: ¿las personas servidas crecen, se vuelven más libres y más propensas a servir?',
      en:'The founding text. Introduces the core test: do those served grow, become freer and more likely themselves to serve?' },
    { t:'Servant Leadership: A systematic review and call for future research', a:'Eva, Robin, Sendjaya, van Dierendonck & Liden', y:2019, dim:'all', tier:'Revisión académica',
      es:'Revisión de 285 artículos en 20 años. Evalúa 16 instrumentos de medida y define la red nomológica del constructo. Punto de partida obligado para medir en serio.',
      en:'Review of 285 articles across 20 years. Evaluates 16 measurement instruments and maps the construct\u2019s nomological network.' },
    { t:'The Servant Leadership Survey (SLS)', a:'van Dierendonck & Nuijten', y:2011, dim:'all', tier:'Instrumento',
      es:'Las 8 dimensiones y 30 ítems que operan este sistema. Validado sobre 1571 personas en NL y UK.',
      en:'The 8 dimensions and 30 items powering this system. Validated on 1,571 people across NL and UK.' },
    { t:'Servant leadership: a meta-analytic examination', a:'Lee, Lyubovnikova, Tian & Knight', y:2020, dim:'all', tier:'Meta-análisis',
      es:'Establece la contribución incremental sobre liderazgo transformacional y LMX, y los mecanismos mediadores.',
      en:'Establishes incremental contribution over transformational leadership and LMX, plus mediating mechanisms.' },
    { t:'The Fearless Organization', a:'Amy C. Edmondson', y:2018, dim:'forgiveness', tier:'Práctica',
      es:'Seguridad psicológica: el mecanismo por el que el liderazgo de servicio se convierte en voz, aprendizaje y creatividad.',
      en:'Psychological safety: the mechanism turning servant leadership into voice, learning and creativity.' },
    { t:'Multipliers', a:'Liz Wiseman', y:2010, dim:'empowerment', tier:'Práctica',
      es:'La distinción operativa entre líderes que amplifican la inteligencia ajena y los que la consumen.',
      en:'The operational distinction between leaders who amplify others\u2019 intelligence and those who consume it.' },
    { t:'Leaders Eat Last', a:'Simon Sinek', y:2014, dim:'stewardship', tier:'Divulgación',
      es:'El círculo de seguridad como traducción ejecutiva del deber de protección.',
      en:'The circle of safety as an executive translation of the duty of protection.' },
    { t:'Dare to Lead', a:'Brené Brown', y:2018, dim:'courage', tier:'Práctica',
      es:'Coraje operacionalizado: conversaciones difíciles, vulnerabilidad y reparación.',
      en:'Courage operationalised: hard conversations, vulnerability and repair.' },
    { t:'Radical Candor', a:'Kim Scott', y:2017, dim:'accountability', tier:'Práctica',
      es:'Exigencia directa con cuidado personal: resuelve el falso dilema entre servir y exigir.',
      en:'Challenge directly while caring personally: resolves the false trade-off between serving and demanding.' },
    { t:'Humble Inquiry', a:'Edgar H. Schein', y:2013, dim:'humility', tier:'Práctica',
      es:'El arte de preguntar en lugar de decir. Manual corto y directo para la dimensión de humildad.',
      en:'The art of asking instead of telling. A short, direct manual for the humility dimension.' }
];

/* ==========================================================================
 * 3 · INTERNACIONALIZACIÓN
 * ========================================================================== */
const I18N = {
es: {
  brand:'SERVANT LCC', brandSub:'Inteligencia de Liderazgo',
  navExec:'Ejecutivo', navLead:'Liderazgo', navPeople:'Personas y cultura', navAction:'Acción',
  vDash:'Centro de mando', vOrg:'Organización', vLeaders:'Líderes', vMirror:'Espejo 360°',
  vMaturity:'Madurez', vVoice:'Voz del equipo', vGrowth:'Crecimiento', vStories:'Historias de servicio',
  vExperiments:'Experimentos', vCoach:'Copiloto', vMethod:'Metodología',
  search:'Buscar líder, equipo…', exportBrief:'Informe ejecutivo', newExperiment:'Nuevo experimento',
  connected:'Conectado', demoMode:'Datos de demostración',
  heroBadge:'Vista ejecutiva', heroTitle:'Centro de mando de liderazgo de servicio',
  heroQuote:'El objetivo no es crear seguidores. Es crear líderes que ya no te necesiten.',
  heroLead:'Vista integrada de conducta de liderazgo, experiencia de las personas, capacidad de los equipos e impacto organizativo.',
  viewBrief:'Ver el informe ejecutivo',
  // Evidencia
  evidence:'Evidencia', evNone:'Solo telemetría', evLow:'Evidencia baja', evMed:'Evidencia media', evHigh:'Evidencia alta',
  evNoneD:'Sin evaluaciones 360°. Los índices mostrados son proxies conductuales derivados de tus proyectos, no una medida del constructo.',
  evLowD:'1–2 evaluadores por líder. Suficiente para orientar conversaciones, insuficiente para decisiones de talento.',
  evMedD:'3–4 evaluadores por líder. Base razonable para planes de desarrollo individuales.',
  evHighD:'5 o más evaluadores por líder. Base sólida para decisiones de sucesión y promoción.',
  runAssessment:'Lanzar evaluación 360°',
  // KPI
  kSLI:'Índice SLI', kSLIs:'Compuesto 8 dimensiones', kBPI:'Índice conductual', kBPIs:'Proxy · telemetría',
  kTrust:'Confianza', kTrusts:'Aceptación + autenticidad', kGrowth:'Crecimiento', kGrowths:'Desarrollo de personas',
  kAutonomy:'Autonomía', kAutonomys:'Empoderamiento percibido', kLeverage:'Apalancamiento', kLeverages:'Capacidad multiplicada',
  kLeaders:'Líderes', kLeaderss:'En el portafolio', kDependency:'Dependencia', kDependencys:'Riesgo de concentración',
  kSessions:'Sesiones', kSessionss:'Coaching programado', kExperiments:'Experimentos', kExperimentss:'Prácticas activas',
  kResponses:'Respuestas', kResponsess:'Evaluaciones 360°', kSuccessors:'Sucesores', kSuccessorss:'Preparados',
  // Secciones
  sSignal:'Señal de liderazgo', sSignalSub:'Índice compuesto y sus componentes',
  sDims:'Las 8 dimensiones', sDimsSub:'van Dierendonck & Nuijten (2011) · agregado organizativo',
  sTelemetry:'Telemetría conductual', sTelemetrySub:'Derivada de tus proyectos · proxies, no medida del constructo',
  sEvolution:'Evolución', sEvolutionSub:'Instantáneas históricas del índice',
  sChain:'Señal → Historia → Acción', sChainSub:'La capa que convierte datos en decisiones',
  sImpact:'Impacto en personas y negocio', sImpactSub:'Relación observada, no causalidad demostrada',
  sHeatmap:'Mapa de calor por proyecto', sPriorities:'Prioridades ejecutivas',
  sPortfolio:'Portafolio de liderazgo', sMirror:'Percepción cruzada',
  sMatrix:'Matriz de madurez', sVoice:'Lo que dice el equipo',
  sNetwork:'Red de crecimiento', sJourney:'Trayectoria de liderazgo',
  sMethod:'Fundamento metodológico', sLibrary:'Biblioteca ejecutiva',
  // Tabla
  thLeader:'Líder', thArchetype:'Arquetipo', thSLI:'SLI', thTrust:'Confianza', thGrowth:'Crecimiento',
  thDependency:'Dependencia', thTrend:'Tendencia', thEvidence:'Evidencia', thActions:'Acciones',
  thDimension:'Dimensión', thSelf:'Auto', thTeam:'Equipo', thPeers:'Pares', thManager:'Superior', thGap:'Brecha',
  // Acciones
  save:'Guardar', cancel:'Cancelar', close:'Cerrar', start:'Iniciar', add:'Añadir', create:'Crear',
  schedule:'Programar sesión', profile:'Ver perfil', assess:'Evaluar', focus:'Enfocar', clear:'Limpiar',
  all:'Todos', allLeaders:'Todos los líderes', selectLeader:'Seleccionar líder',
  // Estados
  loading:'Cargando…', empty:'Sin datos todavía', noLeaders:'No hay líderes que mostrar',
  noLeadersD:'Asigna tareas a personas en tus proyectos y aparecerán aquí automáticamente.',
  noPerception:'Percepción 360° no capturada',
  noPerceptionD:'Este panel necesita evaluaciones de los seguidores. Sin ellas solo puedo mostrarte proxies conductuales.',
  // Coach
  coachTitle:'Tu brief semanal de liderazgo', coachSub:'Convierte señales en conversaciones y experimentos. No sustituye el juicio humano.',
  cThings:'Tres cosas que tu equipo te está diciendo', cBehavior:'Una conducta', cConversation:'Una conversación', cStop:'Algo que dejar de hacer',
  guardrails:'Guardarraíles de gobernanza', gHuman:'Humano en el bucle', gHumanD:'Las recomendaciones no son decisiones.',
  gPrivacy:'Privacidad por diseño', gPrivacyD:'Datos mínimos, agregados y bajo control del usuario.',
  gTrace:'Trazabilidad', gTraceD:'Cada insight debe poder rastrearse hasta su señal de origen.',
  gLimits:'Límites declarados', gLimitsD:'El sistema declara cuándo no tiene evidencia suficiente.',
  // Varios
  archetype:'Arquetipo', dominant:'Dominante', weakest:'Más débil', proxyFor:'Proxy de',
  howCalc:'Cómo se calcula', priority:'Prioridad', active:'Activo', completed:'Completado',
  days:'días', people:'personas', tasks:'tareas', projects:'proyectos', leaders:'líderes',
  cmdPalette:'Comandos', cmdHint:'para comandos', selfPerception:'Autopercepción', teamPerception:'Percepción del equipo',
  blindSpot:'Punto ciego', blindSpotD:'Diferencia entre cómo te ves y cómo te ven.',
  copyBrief:'Copiar en texto', exportJSON:'Exportar datos', print:'Imprimir', voice:'Voz', speed:'Velocidad',
  // Lector narrativo
  nxEyebrow:'Guion narrado', nxTitle:'El informe, leído en voz alta',
  nxLead:'Siete capítulos construidos con los datos que hay ahora mismo en tu sistema. Pensado para escucharse entero mientras vas de camino a la reunión.',
  nxChapters:'Capítulos', nxPlay:'Reproducir', nxPause:'Pausar', nxResume:'Continuar',
  nxPrev:'Capítulo anterior', nxNext:'Capítulo siguiente', nxStop:'Detener',
  nxProfile:'Perfil de voz', nxExec:'Ejecutivo', nxNarr:'Narrador', nxBrief:'Briefing',
  nxSpeed:'Velocidad', nxMute:'Silenciar', nxUnmute:'Activar sonido',
  nxDownTxt:'Guion en .txt', nxDownMd:'Guion en .md',
  nxNoVoice:'Este navegador no ofrece síntesis de voz. El guion se puede leer y descargar igualmente.',
  nxDisclaimer:'El guion se genera a partir de los datos registrados en el sistema en el momento de abrirlo. Describe lo que hay anotado, y el trabajo de servicio que nadie anota queda fuera. La lectura sigue siendo tuya.',
  nxRecorded:'Historias registradas a mano', nxOf:'de', nxChapter:'Capítulo',
  // Informe ejecutivo
  rpEyebrow:'Informe ejecutivo', rpConfidential:'Documento interno · difusión restringida',
  rpIndex:'Índice del documento', rpCover:'Portada', rpChapter:'Capítulo',
  rpAnnexN:'A', rpAnnexT:'Anexo · glosario y referencias',
  rpGlossary:'Glosario', rpRefs:'Referencias', rpMethod:'Nota metodológica',
  rpFigure:'Figura', rpTable:'Tabla', rpAction:'Acción', rpPage:'Página', rpOf:'de',
  rpDate:'Fecha', rpInstrument:'Instrumento', rpSource:'Origen de los datos', rpVersion:'Versión',
  rpOpen:'Abrir informe', rpHtml:'Descargar en HTML', rpCloseR:'Cerrar el informe',
  rpGenerating:'Generando el documento…',
  rpNoChart:'Este navegador no ha permitido incrustar la figura en el PDF. La tabla contigua contiene los mismos datos.',
  rpC1:'Dónde está la organización', rpC2:'Calidad de la evidencia',
  rpC3:'El reparto de la carga', rpC4:'Cómo se compone el índice conductual',
  rpC5:'Lo que ve el equipo', rpC6:'El portafolio, líder a líder',
  rpC7:'Trayectoria', rpC8:'Hallazgos prioritarios', rpC9:'Decisiones del próximo ciclo'
},
en: {
  brand:'SERVANT LCC', brandSub:'Leadership Intelligence',
  navExec:'Executive', navLead:'Leadership', navPeople:'People & culture', navAction:'Action',
  vDash:'Command Center', vOrg:'Organization', vLeaders:'Leaders', vMirror:'360° Mirror',
  vMaturity:'Maturity', vVoice:'Employee Voice', vGrowth:'People Growth', vStories:'Stories of Service',
  vExperiments:'Experiments', vCoach:'Copilot', vMethod:'Methodology',
  search:'Search leader, team…', exportBrief:'Executive report', newExperiment:'New experiment',
  connected:'Connected', demoMode:'Demonstration data',
  heroBadge:'Executive view', heroTitle:'Servant Leadership Command Center',
  heroQuote:'The goal is not to create followers. It is to create leaders who no longer need you.',
  heroLead:'An integrated view of leadership behaviour, people experience, team capability and organisational impact.',
  viewBrief:'Read the executive report',
  evidence:'Evidence', evNone:'Telemetry only', evLow:'Low evidence', evMed:'Medium evidence', evHigh:'High evidence',
  evNoneD:'No 360° assessments. The indices shown are behavioural proxies derived from your projects, not a measure of the construct.',
  evLowD:'1–2 raters per leader. Enough to guide conversations, not enough for talent decisions.',
  evMedD:'3–4 raters per leader. Reasonable basis for individual development plans.',
  evHighD:'5 or more raters per leader. Solid basis for succession and promotion decisions.',
  runAssessment:'Launch 360° assessment',
  kSLI:'SLI Index', kSLIs:'8-dimension composite', kBPI:'Behavioural index', kBPIs:'Proxy · telemetry',
  kTrust:'Trust', kTrusts:'Acceptance + authenticity', kGrowth:'Growth', kGrowths:'People development',
  kAutonomy:'Autonomy', kAutonomys:'Perceived empowerment', kLeverage:'Leverage', kLeverages:'Multiplied capability',
  kLeaders:'Leaders', kLeaderss:'In portfolio', kDependency:'Dependency', kDependencys:'Concentration risk',
  kSessions:'Sessions', kSessionss:'Coaching scheduled', kExperiments:'Experiments', kExperimentss:'Active practices',
  kResponses:'Responses', kResponsess:'360° assessments', kSuccessors:'Successors', kSuccessorss:'Ready',
  sSignal:'Leadership signal', sSignalSub:'Composite index and its components',
  sDims:'The 8 dimensions', sDimsSub:'van Dierendonck & Nuijten (2011) · organisational aggregate',
  sTelemetry:'Behavioural telemetry', sTelemetrySub:'Derived from your projects · proxies, not construct measures',
  sEvolution:'Evolution', sEvolutionSub:'Historical index snapshots',
  sChain:'Signal → Story → Action', sChainSub:'The layer that turns data into decisions',
  sImpact:'People & business impact', sImpactSub:'Observed relationship, not demonstrated causality',
  sHeatmap:'Project heatmap', sPriorities:'Executive priorities',
  sPortfolio:'Leadership portfolio', sMirror:'Cross-perception',
  sMatrix:'Maturity matrix', sVoice:'What people are saying',
  sNetwork:'Growth network', sJourney:'Leadership journey',
  sMethod:'Methodological foundation', sLibrary:'Executive library',
  thLeader:'Leader', thArchetype:'Archetype', thSLI:'SLI', thTrust:'Trust', thGrowth:'Growth',
  thDependency:'Dependency', thTrend:'Trend', thEvidence:'Evidence', thActions:'Actions',
  thDimension:'Dimension', thSelf:'Self', thTeam:'Team', thPeers:'Peers', thManager:'Manager', thGap:'Gap',
  save:'Save', cancel:'Cancel', close:'Close', start:'Start', add:'Add', create:'Create',
  schedule:'Schedule session', profile:'View profile', assess:'Assess', focus:'Focus', clear:'Clear',
  all:'All', allLeaders:'All leaders', selectLeader:'Select leader',
  loading:'Loading…', empty:'No data yet', noLeaders:'No leaders to show',
  noLeadersD:'Assign tasks to people in your projects and they will appear here automatically.',
  noPerception:'360° perception not captured',
  noPerceptionD:'This panel needs follower assessments. Without them I can only show behavioural proxies.',
  coachTitle:'Your weekly leadership brief', coachSub:'Turns signals into conversations and experiments. It does not replace human judgement.',
  cThings:'Three things your team is telling you', cBehavior:'One behaviour', cConversation:'One conversation', cStop:'One thing to stop',
  guardrails:'Governance guardrails', gHuman:'Human in the loop', gHumanD:'Recommendations are not decisions.',
  gPrivacy:'Privacy by design', gPrivacyD:'Minimal, aggregated data under user control.',
  gTrace:'Traceability', gTraceD:'Every insight must be traceable to its source signal.',
  gLimits:'Declared limits', gLimitsD:'The system states when it lacks sufficient evidence.',
  archetype:'Archetype', dominant:'Dominant', weakest:'Weakest', proxyFor:'Proxy for',
  howCalc:'How it is calculated', priority:'Priority', active:'Active', completed:'Completed',
  days:'days', people:'people', tasks:'tasks', projects:'projects', leaders:'leaders',
  cmdPalette:'Commands', cmdHint:'for commands', selfPerception:'Self-perception', teamPerception:'Team perception',
  blindSpot:'Blind spot', blindSpotD:'The gap between how you see yourself and how others see you.',
  copyBrief:'Copy as text', exportJSON:'Export data', print:'Print', voice:'Voice', speed:'Speed',
  nxEyebrow:'Narrated script', nxTitle:'The report, read aloud',
  nxLead:'Seven chapters built from the data sitting in your system right now. Meant to be heard end to end on your way to the meeting.',
  nxChapters:'Chapters', nxPlay:'Play', nxPause:'Pause', nxResume:'Resume',
  nxPrev:'Previous chapter', nxNext:'Next chapter', nxStop:'Stop',
  nxProfile:'Voice profile', nxExec:'Executive', nxNarr:'Narrator', nxBrief:'Briefing',
  nxSpeed:'Speed', nxMute:'Mute', nxUnmute:'Unmute',
  nxDownTxt:'Script as .txt', nxDownMd:'Script as .md',
  nxNoVoice:'This browser offers no speech synthesis. The script can still be read and downloaded.',
  nxDisclaimer:'The script is generated from the data recorded in the system at the moment you open it. It describes what has been logged, and the serving work nobody logs stays outside. The reading is still yours.',
  nxRecorded:'Manually recorded stories', nxOf:'of', nxChapter:'Chapter',
  rpEyebrow:'Executive report', rpConfidential:'Internal document · restricted circulation',
  rpIndex:'Document index', rpCover:'Cover', rpChapter:'Chapter',
  rpAnnexN:'A', rpAnnexT:'Annex · glossary and references',
  rpGlossary:'Glossary', rpRefs:'References', rpMethod:'Methodological note',
  rpFigure:'Figure', rpTable:'Table', rpAction:'Action', rpPage:'Page', rpOf:'of',
  rpDate:'Date', rpInstrument:'Instrument', rpSource:'Data source', rpVersion:'Version',
  rpOpen:'Open report', rpHtml:'Download as HTML', rpCloseR:'Close the report',
  rpGenerating:'Generating the document…',
  rpNoChart:'This browser did not allow embedding the figure in the PDF. The adjacent table holds the same data.',
  rpC1:'Where the organisation stands', rpC2:'Evidence quality',
  rpC3:'How load is distributed', rpC4:'How the behavioural index is composed',
  rpC5:'What the team sees', rpC6:'The portfolio, leader by leader',
  rpC7:'Trajectory', rpC8:'Priority findings', rpC9:'Next-cycle decisions'
}
};

const ARCHETYPES = {
  multiplier: { es:'El Multiplicador', en:'The Multiplier', icon:'fa-diagram-successor' },
  developer:  { es:'El Desarrollador', en:'The Developer',  icon:'fa-seedling' },
  steward:    { es:'El Custodio',      en:'The Steward',    icon:'fa-shield-heart' },
  listener:   { es:'El Escucha',       en:'The Listener',   icon:'fa-ear-listen' },
  builder:    { es:'El Constructor',   en:'The Builder',    icon:'fa-trowel-bricks' },
  operator:   { es:'El Operador',      en:'The Operator',   icon:'fa-gears' },
  explorer:   { es:'El Explorador',    en:'The Explorer',   icon:'fa-compass' },
  hoarder:    { es:'El Cuello de Botella', en:'The Bottleneck', icon:'fa-hourglass-half' }
};

/* ==========================================================================
 * 4 · ESTADO
 * ========================================================================== */
const S = {
  lang: (LS.get('preferredLanguage') || 'es').startsWith('en') ? 'en' : 'es',
  view: 'dashboard',
  leaders: [],
  filtered: [],
  focus: 'all',
  query: '',
  sessions: [],
  perception: {},
  experiments: [],
  snapshots: [],
  stories: [],
  org: null,
  demo: false,
  mounted: false
};

const T = () => I18N[S.lang];
const L = (o, f) => (o ? (o[S.lang] !== undefined ? o[S.lang] : o[f === undefined ? 'es' : f]) : '');

/* ==========================================================================
 * 5 · SISTEMA DE DISEÑO · CSS 2026
 * Técnicas: @property, oklch(), color-mix(), container queries, :has(),
 * View Transitions API, scroll-driven animations, linear() spring easing,
 * text-wrap:balance, glassmorphism con contexto de orbe, textura de ruido.
 * ========================================================================== */
function injectStyles() {
  if (document.getElementById('slos-styles')) return;

  if (!document.querySelector('link[href*="Instrument+Serif"]')) {
    const pre1 = document.createElement('link'); pre1.rel='preconnect'; pre1.href='https://fonts.googleapis.com';
    const pre2 = document.createElement('link'); pre2.rel='preconnect'; pre2.href='https://fonts.gstatic.com'; pre2.crossOrigin='';
    const f = document.createElement('link'); f.rel='stylesheet'; f.href = CFG.CDN.FONTS;
    document.head.append(pre1, pre2, f);
  }

  const st = document.createElement('style');
  st.id = 'slos-styles';
  st.textContent = `
#slos-root{
  /* ---- Base obsidiana ---- */
  --bg:        oklch(14% 0.018 265);
  --bg-deep:   oklch(11% 0.016 265);
  --surface:   oklch(18% 0.020 262);
  --surface-2: oklch(21% 0.022 262);
  --glass:     oklch(24% 0.024 262 / 0.44);
  --line:      oklch(100% 0 0 / 0.075);
  --line-2:    oklch(100% 0 0 / 0.13);
  --line-3:    oklch(100% 0 0 / 0.22);

  /* ---- Bandas de referencia de los gráficos. Neutras a propósito: el
         color nunca puede ser lo que distingue una banda de otra. ---- */
  --band-1:    oklch(100% 0 0 / 0.05);
  --band-2:    oklch(100% 0 0 / 0.085);
  --band-3:    oklch(100% 0 0 / 0.12);
  --band-4:    oklch(100% 0 0 / 0.16);

  /* ---- Tipografía ---- */
  --ink:       oklch(96% 0.006 250);
  --ink-2:     oklch(72% 0.014 250);
  --ink-3:     oklch(56% 0.016 252);
  --ink-4:     oklch(42% 0.016 254);

  /* ---- Acentos. Cinco y no más: el oro es la marca, el teal es la señal de
         dato, y verde/ámbar/rojo son exclusivamente estado. Si hiciera falta
         un sexto color, el problema estaría en la jerarquía. ---- */
  --gold:      oklch(80% 0.115 88);
  --gold-hi:   oklch(90% 0.085 92);
  --gold-dim:  oklch(80% 0.115 88 / 0.14);
  --teal:      oklch(84% 0.115 178);
  --teal-dim:  oklch(84% 0.115 178 / 0.13);
  --green:     oklch(80% 0.135 155);
  --amber:     oklch(83% 0.135 78);
  --red:       oklch(70% 0.165 20);

  /* ---- Rejilla base 8. Todo espaciado sale de aquí, sin excepciones. ---- */
  --s0:4px;  --s1:8px;  --s2:16px; --s3:24px;
  --s4:32px; --s5:40px; --s6:48px; --s7:64px; --s8:80px;

  /* ---- Jerarquía tipográfica: exactamente cinco niveles. ---- */
  --fs-display:clamp(1.75rem,3.2cqi,2.75rem); /* 1 · el dato protagonista */
  --fs-title:1.375rem;                        /* 2 · títulos de sección     */
  --fs-lead:0.9375rem;                        /* 3 · entradillas y subtotal */
  --fs-body:0.8125rem;                        /* 4 · cuerpo                 */
  --fs-micro:0.6875rem;                       /* 5 · etiquetas y notas      */

  --r-sm:8px; --r:12px; --r-lg:20px; --r-xl:28px;
  --shadow:   0 1px 2px oklch(0% 0 0/.4), 0 12px 34px -12px oklch(0% 0 0/.55);
  --shadow-lg:0 2px 6px oklch(0% 0 0/.45), 0 34px 70px -22px oklch(0% 0 0/.75);

  /* ---- Movimiento. Microinteracciones dentro de 160–420ms; solo la entrada
         de vista pasa de ahí, y se queda muy por debajo de 800ms. ---- */
  --ease:  cubic-bezier(.16,1,.3,1);
  --ease-in: cubic-bezier(.7,0,.84,0);
  --spring: linear(0, .402 12%, .8 24%, 1.02 34%, 1.06 42%, 1.01 56%, .997 72%, 1);
  --t-1:160ms; --t-2:220ms; --t-3:300ms; --t-4:420ms; --t-view:620ms;
  --t-fast:var(--t-1); --t:var(--t-3); --t-slow:var(--t-4);

  --sidebar:248px;

  position:fixed; inset:0; z-index:2147483000;
  overflow:hidden;
  font-family:'Inter Tight',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;
  font-size:var(--fs-body); line-height:1.55; color:var(--ink);
  background:var(--bg-deep);
  -webkit-font-smoothing:antialiased; text-rendering:optimizeLegibility;
  font-variant-numeric:tabular-nums;
  animation:slos-boot var(--t-view) var(--ease) both;
}
@keyframes slos-boot{from{opacity:0;transform:scale(.985)}}

#slos-root *,#slos-root *::before,#slos-root *::after{box-sizing:border-box}
#slos-root button,#slos-root input,#slos-root select,#slos-root textarea{font:inherit;color:inherit}
#slos-root h1,#slos-root h2,#slos-root h3,#slos-root h4,#slos-root p{margin:0}
#slos-root a{color:var(--teal);text-decoration:none}

/* ---------- Fondo: aurora + malla + ruido ---------- */
.slos-bg{position:absolute;inset:0;z-index:0;pointer-events:none;overflow:hidden}
/* Fondo estático. Nada dentro del área de contenido se mueve en bucle. */
.slos-bg::before{
  content:'';position:absolute;inset:-30%;
  background:
    radial-gradient(ellipse 46% 38% at 18% 12%, oklch(80% 0.115 88 / .10), transparent 68%),
    radial-gradient(ellipse 40% 44% at 84% 26%, oklch(84% 0.115 178 / .07), transparent 66%);
  filter:blur(14px);
}
.slos-bg::after{
  content:'';position:absolute;inset:0;opacity:.5;mix-blend-mode:overlay;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.32'/%3E%3C/svg%3E");
}

/* ---------- Layout ---------- */
.slos-app{position:relative;z-index:1;display:flex;height:100%;}

/* ---------- Sidebar ---------- */
.slos-side{
  width:var(--sidebar);flex:none;height:100%;overflow-y:auto;overscroll-behavior:contain;
  padding:20px 14px 26px;
  background:oklch(12% 0.016 265 / .74);
  backdrop-filter:blur(26px) saturate(170%);-webkit-backdrop-filter:blur(26px) saturate(170%);
  border-right:1px solid var(--line);
}
.slos-brand{display:flex;gap:11px;align-items:center;margin:2px 6px 24px}
.slos-mark{
  width:40px;height:40px;flex:none;border-radius:12px;display:grid;place-items:center;
  color:oklch(16% 0.02 265);font-weight:800;font-size:var(--fs-lead);letter-spacing:-.03em;
  background:linear-gradient(145deg, var(--gold-hi), var(--gold) 62%, var(--teal));
  box-shadow:0 6px 20px oklch(80% 0.115 88 / .22);
}
.slos-brand strong{display:block;font-size:13px;letter-spacing:.14em;font-weight:600}
.slos-brand small{display:block;color:var(--ink-3);font-size:10px;letter-spacing:.04em}

.slos-nav-sec{margin:20px 10px 6px;font-size:9.5px;letter-spacing:.16em;text-transform:uppercase;color:var(--ink-4);font-weight:600}
.slos-nav button{
  width:100%;display:flex;align-items:center;gap:10px;border:0;background:transparent;
  color:var(--ink-2);text-align:left;padding:9px 11px;border-radius:10px;margin:1px 0;
  cursor:pointer;font-size:12.5px;position:relative;
  transition:background var(--t-fast) var(--ease),color var(--t-fast) var(--ease),transform var(--t-fast) var(--ease);
}
.slos-nav button i{width:15px;text-align:center;font-size:12px;color:var(--ink-4);transition:color var(--t-fast)}
.slos-nav button:hover{background:oklch(100% 0 0/.045);color:var(--ink);transform:translateX(2px)}
.slos-nav button.on{background:color-mix(in oklch, var(--gold) 12%, transparent);color:var(--ink);font-weight:600}
.slos-nav button.on i{color:var(--gold)}
.slos-nav button.on::before{
  content:'';position:absolute;left:-14px;top:50%;translate:0 -50%;width:3px;height:18px;
  border-radius:0 3px 3px 0;background:linear-gradient(var(--gold),var(--teal));
}
.slos-side-foot{margin:22px 10px 0;padding-top:16px;border-top:1px solid var(--line);font-size:10px;color:var(--ink-4);line-height:1.6}

/* ---------- Main ---------- */
.slos-main{flex:1;height:100%;overflow-y:auto;overscroll-behavior:contain;scroll-behavior:smooth;padding:20px 26px 70px;container-type:inline-size}
.slos-main::-webkit-scrollbar,.slos-side::-webkit-scrollbar{width:9px}
.slos-main::-webkit-scrollbar-track,.slos-side::-webkit-scrollbar-track{background:transparent}
.slos-main::-webkit-scrollbar-thumb,.slos-side::-webkit-scrollbar-thumb{background:oklch(100% 0 0/.1);border-radius:99px;border:3px solid transparent;background-clip:padding-box}
.slos-main::-webkit-scrollbar-thumb:hover{background:oklch(100% 0 0/.2);background-clip:padding-box}

/* ---------- Topbar ---------- */
.slos-top{
  display:flex;justify-content:space-between;align-items:center;gap:14px;flex-wrap:wrap;
  padding:10px 16px;margin-bottom:20px;border-radius:var(--r-lg);
  background:var(--glass);backdrop-filter:blur(22px) saturate(160%);-webkit-backdrop-filter:blur(22px) saturate(160%);
  border:1px solid var(--line);box-shadow:var(--shadow);
  position:sticky;top:-2px;z-index:20;
}
.slos-crumb{font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-4)}
.slos-crumb b{color:var(--ink-2);font-weight:600}
.slos-top-r{display:flex;align-items:center;gap:8px;flex-wrap:wrap}

/* ---------- Controles ---------- */
.slos-in{
  background:oklch(12% .015 265/.7);border:1px solid var(--line);color:var(--ink);
  border-radius:var(--r-sm);padding:8px 11px;font-size:12.5px;outline:none;
  transition:border-color var(--t-fast),box-shadow var(--t-fast);
}
.slos-in:focus-visible{border-color:color-mix(in oklch,var(--gold) 55%,transparent);box-shadow:0 0 0 3px var(--gold-dim)}
.slos-in::placeholder{color:var(--ink-4)}
select.slos-in{cursor:pointer}
.slos-search{width:min(230px,42vw)}

.slos-btn{
  display:inline-flex;align-items:center;gap:7px;cursor:pointer;white-space:nowrap;
  border:1px solid var(--line-2);background:oklch(100% 0 0/.035);color:var(--ink-2);
  padding:8px 13px;border-radius:var(--r-sm);font-size:12px;font-weight:500;
  transition:background var(--t-fast) var(--ease),color var(--t-fast),transform var(--t-fast) var(--ease),border-color var(--t-fast);
}
.slos-btn:hover{background:oklch(100% 0 0/.075);color:var(--ink);transform:translateY(-1px)}
.slos-btn:active{transform:translateY(0) scale(.98)}
.slos-btn:focus-visible{outline:2px solid var(--gold);outline-offset:2px}
.slos-btn.gold{
  background:linear-gradient(135deg,var(--gold),var(--gold-hi));color:oklch(16% .02 265);
  border-color:transparent;font-weight:650;box-shadow:0 6px 20px oklch(80% .115 88/.22);
}
.slos-btn.gold:hover{box-shadow:0 12px 32px oklch(80% .115 88/.34)}
.slos-btn.teal{background:color-mix(in oklch,var(--teal) 16%,transparent);border-color:color-mix(in oklch,var(--teal) 34%,transparent);color:var(--teal)}
.slos-btn.icon{padding:8px;width:32px;height:32px;justify-content:center}
.slos-kbd{font-family:'JetBrains Mono',monospace;font-size:9.5px;padding:2px 5px;border-radius:4px;background:oklch(100% 0 0/.08);border:1px solid var(--line);color:var(--ink-3)}

/* ---------- Tarjetas ---------- */
.slos-card{
  position:relative;padding:18px;border-radius:var(--r);
  background:linear-gradient(158deg, oklch(20% .021 262/.94), oklch(15% .018 264/.94));
  border:1px solid var(--line);box-shadow:var(--shadow);
  transition:border-color var(--t) var(--ease),transform var(--t) var(--ease),box-shadow var(--t) var(--ease);
  overflow:hidden;
}
/* Foco puntual siguiendo el cursor */
.slos-card::before{
  content:'';position:absolute;inset:0;pointer-events:none;opacity:0;
  background:radial-gradient(340px circle at var(--mx,50%) var(--my,50%), oklch(100% 0 0/.055), transparent 62%);
  transition:opacity var(--t) var(--ease);
}
.slos-card:hover::before{opacity:1}
.slos-card:hover{border-color:var(--line-2);transform:translateY(-2px);box-shadow:var(--shadow-lg)}
.slos-card.accent{border-color:color-mix(in oklch,var(--gold) 26%,transparent);box-shadow:0 0 44px oklch(80% .115 88/.07),var(--shadow)}
.slos-card.ai{
  border-color:color-mix(in oklch,var(--teal) 24%,transparent);
  background:linear-gradient(150deg, oklch(24% .04 200/.5), oklch(16% .02 250/.94));
}
.slos-card.flat{background:oklch(100% 0 0/.025)}

.slos-hero{padding:26px 28px}
.slos-hero h1{
  font-family:'Instrument Serif',Georgia,serif;font-weight:400;
  font-size:clamp(1.8rem,3.2cqi,2.9rem);line-height:1.06;letter-spacing:-.02em;margin:10px 0 8px;
  text-wrap:balance;
  background:linear-gradient(96deg,var(--ink) 12%,var(--gold-hi) 96%);
  -webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;
}
.slos-hero .q{font-family:'Instrument Serif',Georgia,serif;font-style:italic;font-size:clamp(1rem,1.5cqi,1.28rem);color:var(--gold-hi);max-width:60ch;text-wrap:pretty;margin-bottom:10px}
.slos-hero p{color:var(--ink-2);max-width:72ch;text-wrap:pretty}
.slos-hero-flex{display:flex;justify-content:space-between;gap:28px;align-items:center;flex-wrap:wrap}

/* ---------- Tipografía UI ---------- */
.slos-eyebrow{
  display:inline-flex;align-items:center;gap:6px;padding:4px 10px;border-radius:99px;
  font-size:9.5px;font-weight:700;letter-spacing:.13em;text-transform:uppercase;
  background:var(--gold-dim);color:var(--gold-hi);border:1px solid color-mix(in oklch,var(--gold) 22%,transparent);
}
.slos-eyebrow.teal{background:var(--teal-dim);color:var(--teal);border-color:color-mix(in oklch,var(--teal) 22%,transparent)}
.slos-sec{display:flex;justify-content:space-between;align-items:flex-end;gap:16px;margin:30px 0 13px;flex-wrap:wrap}
.slos-sec h2{font-family:'Instrument Serif',Georgia,serif;font-weight:400;font-size:1.42rem;letter-spacing:-.01em}
.slos-sub{color:var(--ink-3);font-size:11.5px;margin-top:2px;text-wrap:pretty}
.slos-card h3{font-size:13.5px;font-weight:600;letter-spacing:-.005em}
.slos-note{font-size:10.5px;color:var(--ink-4);line-height:1.6;text-wrap:pretty}

/* ---------- Grid ---------- */
.slos-g{display:grid;gap:13px}
.slos-g2{grid-template-columns:repeat(2,minmax(0,1fr))}
.slos-g3{grid-template-columns:repeat(3,minmax(0,1fr))}
.slos-g4{grid-template-columns:repeat(4,minmax(0,1fr))}
.slos-g6{grid-template-columns:repeat(6,minmax(0,1fr))}
.slos-g-side{grid-template-columns:minmax(0,1.55fr) minmax(0,1fr)}
@container (max-width:1180px){ .slos-g6{grid-template-columns:repeat(3,minmax(0,1fr))} .slos-g4{grid-template-columns:repeat(2,minmax(0,1fr))} .slos-g-side{grid-template-columns:1fr} }
@container (max-width:820px){ .slos-g3,.slos-g2{grid-template-columns:1fr} .slos-g6{grid-template-columns:repeat(2,minmax(0,1fr))} }

/* ---------- KPI ---------- */
.slos-kpi{padding:15px 16px;display:flex;flex-direction:column;gap:3px;min-height:118px;justify-content:center}
.slos-kpi .lbl{color:var(--ink-3);font-size:10.5px;letter-spacing:.06em;text-transform:uppercase;font-weight:600;display:flex;align-items:center;gap:6px}
.slos-kpi .lbl i{color:var(--ink-4);font-size:10px}
.slos-kpi .val{font-size:2rem;font-weight:700;letter-spacing:-.045em;line-height:1.05;margin:5px 0 1px;font-variant-numeric:tabular-nums}
.slos-kpi .val small{font-size:.85rem;color:var(--ink-3);font-weight:500;letter-spacing:0}
.slos-kpi .sub{font-size:10px;color:var(--ink-4)}
.slos-kpi.hl .val{background:linear-gradient(96deg,var(--gold-hi),var(--teal));-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}
.slos-up{color:var(--green)} .slos-warn{color:var(--amber)} .slos-down{color:var(--red)} .slos-flat{color:var(--ink-3)}

/* ---------- Barras de dimensión ---------- */
.slos-dim{margin:11px 0}
.slos-dim-h{display:flex;justify-content:space-between;align-items:baseline;gap:10px;margin-bottom:5px;font-size:12px}
.slos-dim-h .n{display:flex;align-items:center;gap:7px;color:var(--ink-2)}
.slos-dim-h .n i{color:var(--ink-4);font-size:11px;width:13px;text-align:center}
.slos-dim-h .v{font-weight:700;font-family:'JetBrains Mono',monospace;font-size:12px}
.slos-bar{height:6px;border-radius:99px;background:var(--line);overflow:hidden;position:relative}
.slos-bar i{
  display:block;height:100%;border-radius:99px;width:0;
  background:linear-gradient(90deg,var(--teal),var(--gold));
  transition:width var(--t-view) var(--ease);
}
.slos-bar i.lo{background:linear-gradient(90deg,var(--red),var(--amber))}
.slos-bar i.mid{background:linear-gradient(90deg,var(--amber),var(--gold))}
.slos-bar.ghost i{background:oklch(100% 0 0/.14)}
.slos-bar .mark{position:absolute;top:-3px;width:2px;height:12px;background:oklch(100% 0 0/.42);border-radius:2px}

/* ---------- Chips / pills ---------- */
.slos-pill{display:inline-flex;align-items:center;gap:5px;padding:3px 8px;border-radius:6px;font-size:10px;font-weight:600;background:var(--line);color:var(--ink-2);border:1px solid var(--line)}
.slos-pill.g{background:color-mix(in oklch,var(--green) 15%,transparent);color:var(--green);border-color:transparent}
.slos-pill.a{background:color-mix(in oklch,var(--amber) 15%,transparent);color:var(--amber);border-color:transparent}
.slos-pill.r{background:color-mix(in oklch,var(--red) 15%,transparent);color:var(--red);border-color:transparent}
.slos-pill.t{background:var(--teal-dim);color:var(--teal);border-color:transparent}
.slos-pill.gd{background:var(--gold-dim);color:var(--gold-hi);border-color:transparent}

/* ---------- Tabla ---------- */
.slos-tw{overflow-x:auto;margin:0 -4px}
.slos-t{width:100%;border-collapse:collapse;min-width:680px}
.slos-t th{
  text-align:left;padding:9px 8px;font-size:9.5px;letter-spacing:.1em;text-transform:uppercase;
  color:var(--ink-4);font-weight:700;border-bottom:1px solid var(--line-2);position:sticky;top:0;
  background:oklch(16% .018 264/.92);backdrop-filter:blur(8px);
}
.slos-t td{padding:11px 8px;font-size:12px;border-bottom:1px solid var(--line);vertical-align:middle}
.slos-t tbody tr{transition:background var(--t-fast) var(--ease)}
.slos-t tbody tr:hover{background:oklch(100% 0 0/.032)}
.slos-t tbody tr:last-child td{border-bottom:0}
.slos-av{
  width:30px;height:30px;flex:none;border-radius:9px;display:grid;place-items:center;
  font-size:10.5px;font-weight:700;letter-spacing:-.02em;color:oklch(16% .02 265);
  background:linear-gradient(140deg,var(--gold),var(--teal));
}
.slos-who{display:flex;align-items:center;gap:9px}
.slos-who .nm{font-weight:600;font-size:12.5px}
.slos-who .mt{font-size:9.5px;color:var(--ink-4)}
.slos-num{font-family:'JetBrains Mono',monospace;font-weight:700}

/* ---------- Heatmap ---------- */
.slos-heat{display:grid;font-size:11px;min-width:640px}
.slos-heat>div{padding:8px 7px;border-right:1px solid var(--line);border-bottom:1px solid var(--line)}
.slos-heat .hd{color:var(--ink-4);font-weight:700;font-size:9.5px;letter-spacing:.08em;text-transform:uppercase}
.slos-hi{display:block;border-radius:6px;padding:5px 4px;text-align:center;font-weight:700;font-family:'JetBrains Mono',monospace;font-size:11px}

/* ---------- Timeline ---------- */
.slos-tl{display:flex;margin-top:18px}
.slos-tl-i{flex:1;position:relative;padding:0 6px}
.slos-tl-i:before{content:'';position:absolute;top:9px;left:0;right:0;height:2px;background:oklch(100% 0 0/.1)}
.slos-tl-i:first-child:before{left:50%} .slos-tl-i:last-child:before{right:50%}
.slos-tl-i.done:before{background:linear-gradient(90deg,var(--teal),var(--gold))}
.slos-tl-d{width:18px;height:18px;border:4px solid var(--bg);background:oklch(100% 0 0/.18);border-radius:50%;position:relative;z-index:1;margin:auto}
.slos-tl-i.done .slos-tl-d{background:var(--gold);box-shadow:0 0 0 4px var(--gold-dim)}
.slos-tl-i strong{display:block;text-align:center;margin-top:8px;font-size:10.5px}
.slos-tl-i span{display:block;text-align:center;color:var(--ink-4);font-size:9px;margin-top:2px}

/* ---------- Historia ---------- */
.slos-story{position:relative;padding-left:17px}
.slos-story:before{content:'';position:absolute;left:0;top:2px;bottom:2px;width:2px;border-radius:2px;background:linear-gradient(var(--gold),transparent)}
.slos-story .big{font-family:'Instrument Serif',Georgia,serif;font-size:1.25rem;margin:6px 0 8px;text-wrap:balance}
.slos-story blockquote{margin:11px 0;padding:11px 14px;background:oklch(100% 0 0/.032);border-radius:10px;color:var(--ink-2);font-style:italic;border-left:2px solid var(--gold-dim)}
.slos-meta{display:flex;gap:6px;flex-wrap:wrap;margin:9px 0}

/* ---------- Experimentos ---------- */
.slos-exp{display:flex;justify-content:space-between;gap:14px;align-items:center;padding:12px 0;border-bottom:1px solid var(--line)}
.slos-exp:last-child{border-bottom:0}
.slos-exp .ti{font-weight:650;font-size:13px}
.slos-exp .mt{font-size:10.5px;color:var(--ink-4);margin-top:3px}

/* ---------- Estado vacío ---------- */
.slos-empty{text-align:center;padding:34px 18px;color:var(--ink-3)}
.slos-empty i{font-size:2rem;opacity:.24;display:block;margin-bottom:12px}
.slos-empty h4{font-size:13px;color:var(--ink-2);margin-bottom:5px;font-weight:600}
.slos-empty p{font-size:11.5px;max-width:46ch;margin:0 auto;text-wrap:pretty}

/* ---------- Skeleton ---------- */
.slos-sk{border-radius:8px;background:linear-gradient(90deg,oklch(100% 0 0/.045) 25%,oklch(100% 0 0/.09) 50%,oklch(100% 0 0/.045) 75%);background-size:200% 100%;animation:slos-shim 1.5s linear infinite}
@keyframes slos-shim{to{background-position:-200% 0}}

/* ---------- Revelado al hacer scroll ----------------------------------------
 * Camino base: IntersectionObserver añade .in. Donde el navegador soporta
 * animaciones ligadas al scroll, toman el relevo y el observador se vuelve
 * redundante sin estorbar. Solo se animan opacity y transform.
 * -------------------------------------------------------------------------- */
[data-rv]{opacity:0;transform:translateY(22px);transition:opacity var(--t-slow) var(--ease),transform var(--t-slow) var(--ease)}
[data-rv].in{opacity:1;transform:none}
@keyframes slos-reveal{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:none}}
@supports (animation-timeline:view()){
  @media (prefers-reduced-motion:no-preference){
    [data-rv]{
      animation:slos-reveal linear both;
      animation-timeline:view();
      animation-range:entry 6% cover 20%;
      transition:none;
    }
    /* El retardo escalonado deja de tener sentido si manda el scroll. */
    [data-rv][data-d]{animation-delay:0s}
  }
}
[data-rv][data-d="1"]{transition-delay:60ms}[data-rv][data-d="2"]{transition-delay:120ms}
[data-rv][data-d="3"]{transition-delay:180ms}[data-rv][data-d="4"]{transition-delay:240ms}
[data-rv][data-d="5"]{transition-delay:300ms}[data-rv][data-d="6"]{transition-delay:360ms}

/* ---------- Modal ---------- */
.slos-ov{position:fixed;inset:0;background:oklch(6% .01 265/.72);backdrop-filter:blur(9px);z-index:2147483100;display:none;place-items:center;padding:20px}
.slos-ov.on{display:grid;animation:slos-fade 220ms var(--ease)}
@keyframes slos-fade{from{opacity:0}}
.slos-modal{
  width:min(720px,94vw);max-height:86vh;overflow-y:auto;padding:26px;border-radius:var(--r-lg);
  background:linear-gradient(158deg,oklch(21% .022 262),oklch(15% .018 264));
  border:1px solid var(--line-2);box-shadow:0 40px 110px oklch(0% 0 0/.8);
  animation:slos-pop 340ms var(--ease);
}
@keyframes slos-pop{from{opacity:0;transform:translateY(22px) scale(.97)}}
.slos-modal h2{font-family:'Instrument Serif',Georgia,serif;font-weight:400;font-size:1.5rem;margin-bottom:6px;text-wrap:balance}
.slos-modal label{display:block;font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-4);font-weight:700;margin:15px 0 5px}
.slos-modal .slos-in,.slos-modal textarea.slos-in{width:100%}
.slos-modal textarea{resize:vertical;min-height:70px;font-family:inherit}
.slos-acts{display:flex;justify-content:flex-end;gap:9px;margin-top:22px;flex-wrap:wrap}

/* ---------- Paleta de comandos ---------- */
.slos-cmd{position:fixed;inset:0;z-index:2147483200;display:none;justify-content:center;align-items:flex-start;padding-top:14vh;background:oklch(6% .01 265/.6);backdrop-filter:blur(7px)}
.slos-cmd.on{display:flex;animation:slos-fade 160ms var(--ease)}
.slos-cmd-box{width:min(560px,92vw);border-radius:var(--r-lg);overflow:hidden;background:oklch(19% .02 262/.98);border:1px solid var(--line-2);box-shadow:0 40px 110px oklch(0% 0 0/.8);animation:slos-pop 260ms var(--ease)}
.slos-cmd-box input{width:100%;border:0;background:transparent;padding:16px 18px;font-size:14.5px;outline:none;border-bottom:1px solid var(--line)}
.slos-cmd-list{max-height:340px;overflow-y:auto;padding:6px}
.slos-cmd-list button{width:100%;display:flex;align-items:center;gap:11px;border:0;background:transparent;color:var(--ink-2);padding:10px 12px;border-radius:9px;cursor:pointer;text-align:left;font-size:12.5px}
.slos-cmd-list button i{width:16px;text-align:center;color:var(--ink-4)}
.slos-cmd-list button.sel,.slos-cmd-list button:hover{background:var(--gold-dim);color:var(--ink)}
.slos-cmd-list button.sel i{color:var(--gold)}
.slos-cmd-list .k{margin-left:auto;font-size:9px;color:var(--ink-4);letter-spacing:.08em;text-transform:uppercase}

/* ---------- Toast ---------- */
.slos-toasts{position:fixed;right:20px;bottom:20px;z-index:2147483300;display:flex;flex-direction:column;gap:8px;align-items:flex-end}
.slos-toast{
  display:flex;align-items:center;gap:9px;padding:11px 15px;border-radius:11px;font-size:12.5px;font-weight:500;
  background:oklch(22% .022 262/.97);border:1px solid var(--line-2);box-shadow:var(--shadow-lg);color:var(--ink);
  animation:slos-toast-in 380ms var(--ease);max-width:340px;
}
.slos-toast i{color:var(--gold)}
.slos-toast.out{animation:slos-toast-out 280ms var(--ease-in) forwards}
@keyframes slos-toast-in{from{opacity:0;transform:translateX(26px) scale(.96)}}
@keyframes slos-toast-out{to{opacity:0;transform:translateX(26px) scale(.96)}}

/* ---------- Vistas + View Transitions ---------- */
.slos-view{display:none}
.slos-view.on{display:block;animation:slos-view-in var(--t-4) var(--ease)}
@keyframes slos-view-in{from{opacity:0;transform:translateY(14px)}}

/* ---------- Anillo SVG ---------- */
.slos-ring-w{position:relative;display:grid;place-items:center;flex:none}
.slos-ring-v{position:absolute;text-align:center;pointer-events:none}
.slos-ring-v b{display:block;font-size:2.5rem;font-weight:700;letter-spacing:-.05em;line-height:1;font-variant-numeric:tabular-nums}
.slos-ring-v span{display:block;font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:var(--ink-4);margin-top:3px}
.slos-arc{stroke-linecap:round;transition:stroke-dashoffset var(--t-view) var(--ease)}

/* ---------- Tooltip nativo mejorado ---------- */
.slos-help{cursor:help;color:var(--ink-4);font-size:10px;margin-left:4px}
.slos-help:hover{color:var(--gold)}

/* ---------- Gráficos ------------------------------------------------------ */
.slos-chart{width:100%}
.slos-chart svg{display:block;overflow:visible}
.slos-chart svg g:hover rect[fill="transparent"]{fill:oklch(100% 0 0/.03)}
.slos-legend{
  display:flex;gap:var(--s2);flex-wrap:wrap;align-items:center;
  margin-top:var(--s2);padding-top:var(--s1);border-top:1px solid var(--line);
  font-size:var(--fs-micro);color:var(--ink-3);
}
.slos-legend span{display:inline-flex;align-items:center;gap:var(--s0)}
.slos-legend i{width:11px;height:11px;flex:none;border-radius:50%;display:inline-block}
.slos-legend i.k-dot{background:var(--teal)}
.slos-legend i.k-ring{background:transparent;border:2.5px solid var(--gold)}
.slos-legend i.k-solid{border-radius:2px;background:var(--gold)}
.slos-legend i.k-dash{border-radius:2px;background:transparent;border:1.5px dashed var(--teal)}

/* Small multiples: misma escala, misma caja, un líder por celda. */
.slos-sm-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:var(--s2)}
@container (max-width:900px){.slos-sm-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
.slos-sm{margin:0;text-align:center}
.slos-sm svg{max-width:104px;margin:0 auto}
.slos-sm figcaption{margin-top:var(--s0);line-height:1.3}
.slos-sm figcaption strong{display:block;font-size:var(--fs-micro);font-weight:600;
  overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.slos-sm figcaption span{font-size:var(--fs-micro);color:var(--ink-3)}

/* ---------- Tabla de datos ------------------------------------------------ */
.slos-tbl{--rowpad:var(--s2)}
.slos-tbl.dense{--rowpad:var(--s0)}
.slos-tbl-bar{display:flex;justify-content:space-between;align-items:center;gap:var(--s2);margin-bottom:var(--s1)}
.slos-tbl-scroll{max-height:min(56vh,520px);overflow:auto;overscroll-behavior:contain;border-radius:var(--r-sm)}
.slos-t2{width:100%;border-collapse:separate;border-spacing:0;min-width:660px}
.slos-t2 th{
  position:sticky;top:0;z-index:2;text-align:left;white-space:nowrap;cursor:pointer;
  padding:var(--s1) var(--s1);font-size:var(--fs-micro);letter-spacing:.1em;text-transform:uppercase;
  color:var(--ink-4);font-weight:700;background:oklch(16% .018 264);
  border-bottom:1px solid var(--line-2);
  transition:color var(--t-1) var(--ease);
}
.slos-t2 th:hover{color:var(--ink-2)}
.slos-t2 th:focus-visible{outline:2px solid var(--gold);outline-offset:-2px}
.slos-t2 th.num{text-align:right}
.slos-t2 th .sortmark{font-style:normal;margin-left:var(--s0);color:var(--gold);font-size:var(--fs-micro)}
.slos-t2 td{
  position:relative;padding:var(--rowpad) var(--s1);font-size:var(--fs-body);
  border-bottom:1px solid var(--line);vertical-align:middle;
  transition:padding var(--t-1) var(--ease);
}
.slos-t2 td.num{text-align:right;font-variant-numeric:tabular-nums;font-family:'JetBrains Mono',monospace}
.slos-t2 tbody tr{transition:background var(--t-1) var(--ease)}
.slos-t2 tbody tr:hover{background:oklch(100% 0 0/.03)}
.slos-t2 td>span{position:relative;z-index:1}
/* Microbarra embebida: contexto sin robar una columna. */
.slos-cellbar{
  position:absolute;left:0;top:50%;translate:0 -50%;height:calc(100% - 8px);
  background:var(--teal-dim);border-radius:0 3px 3px 0;pointer-events:none;
}
.slos-t2 tfoot td{
  position:sticky;bottom:0;background:oklch(17% .019 263);
  border-top:1px solid var(--line-2);border-bottom:0;
  font-weight:700;color:var(--ink-2);font-size:var(--fs-micro);
  letter-spacing:.06em;text-transform:uppercase;
}
.slos-t2 tfoot td.num{font-size:var(--fs-body);letter-spacing:0;text-transform:none}

/* ---------- Lector narrativo ----------------------------------------------
 * Única zona del sistema donde el cuerpo de texto es serif y grande. Aquí no
 * se escanea, se lee. Todo lo demás cede ante la columna de texto.
 * ------------------------------------------------------------------------ */
.slos-nx{display:grid;grid-template-columns:186px minmax(0,1fr);gap:var(--s6);align-items:start;margin-top:var(--s4)}
@container (max-width:940px){.slos-nx{grid-template-columns:1fr;gap:var(--s3)}}

.slos-nx-toc{position:sticky;top:var(--s7);display:flex;flex-direction:column;gap:1px}
.slos-nx-toc>span{font-size:var(--fs-micro);letter-spacing:.16em;text-transform:uppercase;color:var(--ink-4);font-weight:600;margin-bottom:var(--s1)}
.slos-nx-toc button{
  display:flex;gap:var(--s1);align-items:baseline;border:0;background:transparent;cursor:pointer;
  color:var(--ink-4);text-align:left;padding:var(--s1) var(--s1) var(--s1) 0;font-size:var(--fs-micro);
  border-left:2px solid transparent;padding-left:var(--s2);line-height:1.4;
  transition:color var(--t-1) var(--ease),border-color var(--t-1) var(--ease);
}
.slos-nx-toc button:hover{color:var(--ink-2)}
.slos-nx-toc button.on{color:var(--ink);border-left-color:var(--gold);font-weight:600}
.slos-nx-toc button:focus-visible{outline:2px solid var(--gold);outline-offset:2px}
.slos-nx-toc button b{font-family:'JetBrains Mono',monospace;font-weight:500;opacity:.55;font-size:var(--fs-micro)}
@container (max-width:940px){
  .slos-nx-toc{position:static;flex-direction:row;overflow-x:auto;gap:var(--s0);padding-bottom:var(--s0)}
  .slos-nx-toc>span{display:none}
  .slos-nx-toc button{border-left:0;border-bottom:2px solid transparent;padding:var(--s1);white-space:nowrap}
  .slos-nx-toc button.on{border-left-color:transparent;border-bottom-color:var(--gold)}
}

.slos-nx-doc{max-width:68ch}
.slos-nx-ch{padding:var(--s6) 0;border-top:1px solid var(--line);scroll-margin-top:var(--s7)}
.slos-nx-ch:first-child{border-top:0;padding-top:var(--s1)}
.slos-nx-ch-h{display:flex;justify-content:space-between;align-items:flex-start;gap:var(--s3);margin-bottom:var(--s3)}
.slos-nx-ch-h h3{
  font-size:var(--fs-micro);letter-spacing:.16em;text-transform:uppercase;
  color:var(--ink-4);font-weight:700;
}
.slos-nx-ch-h h3 b{color:var(--gold);font-family:'JetBrains Mono',monospace;font-weight:500;margin-right:var(--s1)}
.slos-nx-ch.on .slos-nx-ch-h h3{color:var(--ink-2)}
.slos-nx-fig{flex:none;opacity:.9}

.slos-nx-p{
  font-family:'Instrument Serif',Georgia,serif;
  font-size:var(--fs-title);line-height:1.58;letter-spacing:.004em;
  color:var(--ink-3);text-wrap:pretty;
  transition:color var(--t-2) var(--ease);
}
.slos-nx-ch.on .slos-nx-p{color:var(--ink)}
.slos-nx-s{transition:color var(--t-1) var(--ease)}
.slos-nx-s.on{color:var(--gold-hi)}
.slos-nx-doc mark{background:var(--gold-dim);color:var(--ink);border-radius:3px;padding:0 3px;margin:0 -3px}

/* Barra de controles: fina, fija y sin cromo innecesario. */
.slos-nx-bar{
  position:sticky;top:var(--s6);z-index:12;margin-bottom:var(--s2);
  padding:var(--s1) var(--s2);border-radius:var(--r);
  background:oklch(15% .018 264/.94);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);
  border:1px solid var(--line);
  display:flex;align-items:center;gap:var(--s1);flex-wrap:wrap;
}
.slos-nx-bar .sep{flex:1}
.slos-nx-bar label{font-size:var(--fs-micro);color:var(--ink-4);letter-spacing:.08em;text-transform:uppercase;font-weight:600}
.slos-nx-bar input[type=range]{width:88px;accent-color:var(--gold);cursor:pointer}
.slos-nx-prog{height:2px;border-radius:2px;background:oklch(100% 0 0/.09);overflow:hidden;margin-bottom:var(--s3)}
.slos-nx-prog i{display:block;height:100%;width:0;background:linear-gradient(90deg,var(--teal),var(--gold));transition:width var(--t-2) linear}
.slos-nx-count{font-family:'JetBrains Mono',monospace;font-size:var(--fs-micro);color:var(--ink-4)}

/* ---------- Informe ejecutivo ---------------------------------------------
 * Lectura larga en pantalla: columna medida, índice lateral que sigue al
 * lector y una hoja por capítulo. Es el único sitio del sistema, junto al
 * lector narrado, donde la interfaz se aparta para que quede el texto.
 * ------------------------------------------------------------------------ */
.slos-rp{position:fixed;inset:0;z-index:2147483150;display:none;background:var(--bg-deep)}
.slos-rp.on{display:grid;grid-template-rows:auto minmax(0,1fr);animation:slos-fade var(--t-2) var(--ease)}
.slos-rp-top{display:flex;align-items:center;gap:var(--s1);padding:var(--s2) var(--s3);
  border-bottom:1px solid var(--line);flex-wrap:wrap;background:var(--bg)}
.slos-rp-id{min-width:0;flex:1;margin-right:var(--s2)}
.slos-rp-id strong{display:block;font-family:'Instrument Serif',Georgia,serif;font-weight:400;
  font-size:var(--fs-lead);line-height:1.2;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.slos-rp-id span{font-size:var(--fs-micro);color:var(--ink-4);letter-spacing:.07em}
.slos-rp-body{display:grid;grid-template-columns:244px minmax(0,1fr);min-height:0}
.slos-rp-nav{border-right:1px solid var(--line);overflow-y:auto;padding:var(--s4) var(--s2);
  display:flex;flex-direction:column;gap:2px}
.slos-rp-nav button{display:flex;gap:var(--s2);align-items:flex-start;width:100%;text-align:left;
  border:0;background:transparent;color:var(--ink-3);padding:var(--s1);border-radius:var(--r-sm);
  cursor:pointer;font-size:var(--fs-body);line-height:1.4;
  transition:color var(--t-1) var(--ease),background var(--t-1) var(--ease)}
.slos-rp-nav button .n{font-family:'JetBrains Mono',monospace;font-size:var(--fs-micro);
  color:var(--ink-4);flex:none;padding-top:2px;min-width:16px}
.slos-rp-nav button:hover{color:var(--ink-2);background:oklch(100% 0 0/.03)}
.slos-rp-nav button.on{color:var(--ink);background:var(--gold-dim)}
.slos-rp-nav button.on .n{color:var(--gold)}
.slos-rp-nav button:focus-visible{outline:2px solid var(--gold);outline-offset:-2px}
.slos-rp-doc{overflow-y:auto;overscroll-behavior:contain;padding:0 var(--s4) var(--s8)}
@media (prefers-reduced-motion:no-preference){.slos-rp-doc{scroll-behavior:smooth}}
.slos-rp-doc:focus-visible{outline:none}

/* La hoja. Un capítulo por bloque, separados por filete y no por tarjeta. */
.slos-rp-ch{max-width:76ch;margin:0 auto;padding:var(--s7) 0 var(--s6);
  border-bottom:1px solid var(--line);scroll-margin-top:var(--s3)}
.slos-rp-ch:last-child{border-bottom:0}
.slos-rp-ch-h{margin-bottom:var(--s3)}
.slos-rp-num{display:block;font-size:var(--fs-micro);letter-spacing:.17em;text-transform:uppercase;
  color:var(--gold);font-weight:700;margin-bottom:var(--s1)}
.slos-rp-ch h2{font-family:'Instrument Serif',Georgia,serif;font-weight:400;
  font-size:var(--fs-title);line-height:1.16;text-wrap:balance;max-width:22ch}
.slos-rp-ch h3{font-size:var(--fs-micro);letter-spacing:.14em;text-transform:uppercase;
  color:var(--ink-4);font-weight:700;margin:var(--s5) 0 var(--s2)}
.slos-rp-ch p{font-size:var(--fs-lead);line-height:1.72;color:var(--ink-2);
  margin-bottom:var(--s2);max-width:62ch;text-wrap:pretty}
.slos-rp-thesis{font-weight:600;color:var(--ink);margin-bottom:var(--s3)!important;
  padding-left:var(--s2);border-left:2px solid var(--gold)}

/* Portada */
.slos-rp-cover{padding-top:var(--s8);border-bottom:1px solid var(--line-2)}
.slos-rp-cover h1{font-family:'Instrument Serif',Georgia,serif;font-weight:400;
  font-size:var(--fs-display);line-height:1.08;letter-spacing:-.015em;
  text-wrap:balance;max-width:16ch;margin:var(--s2) 0 var(--s2)}
.slos-rp-sub{color:var(--ink-3);margin-bottom:var(--s6)!important}
.slos-rp-meta{display:grid;grid-template-columns:max-content minmax(0,1fr);gap:var(--s1) var(--s4);
  border-top:1px solid var(--line);padding-top:var(--s3);max-width:56ch}
.slos-rp-meta dt{font-size:var(--fs-micro);letter-spacing:.12em;text-transform:uppercase;
  color:var(--ink-4);font-weight:700;padding-top:2px}
.slos-rp-meta dd{margin:0;font-size:var(--fs-body);color:var(--ink-2)}
.slos-rp-conf{margin-top:var(--s5)!important;font-size:var(--fs-micro)!important;
  color:var(--ink-4)!important;letter-spacing:.06em}

/* Figuras y tablas del documento */
.slos-rp-block{margin:var(--s4) 0 var(--s5);break-inside:avoid}
.slos-rp-svg{padding:var(--s2) 0}
.slos-rp-svg svg{max-width:620px}
.slos-rp-block figcaption{font-size:var(--fs-body);line-height:1.6;color:var(--ink-3);
  margin-top:var(--s1);max-width:62ch;text-wrap:pretty}
.slos-rp-block figcaption b{color:var(--ink-2);font-weight:600}
.slos-rp-note{color:var(--ink-4)}
.slos-rp-tw{overflow-x:auto;overscroll-behavior-x:contain}
.slos-rp-t{width:100%;border-collapse:collapse;font-size:var(--fs-body);margin-top:var(--s2)}
.slos-rp-t th{text-align:left;padding:var(--s1);border-bottom:1px solid var(--ink-4);
  font-size:var(--fs-micro);letter-spacing:.1em;text-transform:uppercase;
  color:var(--ink-3);font-weight:700;white-space:nowrap}
.slos-rp-t td{padding:var(--s1);border-bottom:1px solid var(--line);vertical-align:top}
.slos-rp-t th.num,.slos-rp-t td.num{text-align:right;white-space:nowrap;
  font-variant-numeric:tabular-nums;font-family:'JetBrains Mono',monospace}
.slos-rp-t tfoot td{border-top:1px solid var(--ink-4);border-bottom:0;
  font-weight:700;color:var(--ink)}

/* Hallazgos numerados */
.slos-rp-find{list-style:none;padding:0;margin:0 0 var(--s2);counter-reset:rpf}
.slos-rp-find li{counter-increment:rpf;position:relative;padding:var(--s3) 0 var(--s3) var(--s5);
  border-top:1px solid var(--line);break-inside:avoid}
.slos-rp-find li::before{content:counter(rpf,decimal-leading-zero);position:absolute;left:0;
  top:calc(var(--s3) + 3px);font-family:'JetBrains Mono',monospace;font-size:var(--fs-micro);
  font-weight:700;color:var(--gold)}
.slos-rp-find-h{margin-bottom:var(--s1)}
.slos-rp-find-h b{display:block;font-size:var(--fs-lead);font-weight:600;color:var(--ink);
  line-height:1.4;text-wrap:pretty}
.slos-rp-pr{display:inline-block;font-size:var(--fs-micro);letter-spacing:.12em;
  text-transform:uppercase;color:var(--ink-4);font-weight:700;margin-bottom:var(--s0);
  border:1px solid var(--line-2);border-radius:var(--r-sm);padding:1px 6px}
.slos-rp-act span{font-size:var(--fs-micro);letter-spacing:.12em;text-transform:uppercase;
  color:var(--gold);font-weight:700;margin-right:var(--s0)}
.slos-rp-ref{font-size:var(--fs-body)!important;color:var(--ink-4)!important;margin-bottom:0!important}

/* Anexo */
.slos-rp-gl{margin:0 0 var(--s2);max-width:62ch}
.slos-rp-gl dt{font-weight:600;color:var(--ink);font-size:var(--fs-lead);margin-top:var(--s2)}
.slos-rp-gl dd{margin:var(--s0) 0 0;font-size:var(--fs-lead);line-height:1.68;color:var(--ink-2)}
.slos-rp-refs{padding-left:var(--s3);max-width:62ch;font-size:var(--fs-body);color:var(--ink-2)}
.slos-rp-refs li{margin-bottom:var(--s1);line-height:1.6}
.slos-rp-method{border-left:2px solid var(--gold);padding-left:var(--s2);color:var(--ink-3)!important}

/* La superposición cuelga de #slos-root, fuera del contenedor de consulta de
   .slos-main, así que aquí el punto de ruptura va por viewport. */
@media (max-width:820px){
  .slos-rp-body{grid-template-columns:minmax(0,1fr)}
  .slos-rp-nav{display:none}
  .slos-rp-doc{padding:0 var(--s2) var(--s7)}
}

/* ---------- Responsive ---------- */
@media (max-width:900px){
  #slos-root{--sidebar:100%}
  .slos-app{flex-direction:column}
  .slos-side{width:100%;height:auto;max-height:none;padding:14px;border-right:0;border-bottom:1px solid var(--line)}
  .slos-brand{margin-bottom:12px}
  .slos-nav{display:flex;gap:5px;overflow-x:auto;padding-bottom:4px}
  .slos-nav-sec,.slos-side-foot{display:none}
  .slos-nav button{width:auto;min-width:max-content;margin:0}
  .slos-nav button.on::before{display:none}
  .slos-main{padding:14px 15px 60px}
  .slos-hero-flex{flex-direction:column;align-items:flex-start}
  .slos-top{position:static}
}

/* ---------- Accesibilidad ---------- */
@media (prefers-reduced-motion:reduce){
  #slos-root *,#slos-root *::before,#slos-root *::after{
    animation-duration:.01ms!important;animation-iteration-count:1!important;
    transition-duration:.01ms!important;scroll-behavior:auto!important;
  }
  [data-rv]{opacity:1;transform:none}
}
@media print{
  #slos-root{position:static;height:auto;overflow:visible;background:#fff;color:#000}
  .slos-side,.slos-top,.slos-bg,.slos-toasts{display:none!important}
  .slos-view{display:block!important}
  .slos-card{break-inside:avoid;border:1px solid #ccc;background:#fff;color:#000}

  /* Reentintado. Los gráficos se dibujan con variables, así que cambiando las
     variables el mismo SVG sale legible sobre papel blanco. Ninguna serie
     depende del color para distinguirse: relleno frente a contorno, trazo
     continuo frente a discontinuo. */
  #slos-root{
    --bg:#fff;--bg-deep:#fff;--surface:#fff;--surface-2:#fff;
    --ink:#14161c;--ink-2:#33373f;--ink-3:#5a5f68;--ink-4:#7b818b;
    --line:#dcdee3;--line-2:#c6c9d0;--line-3:#9aa0a8;
    --band-1:#f0f0ee;--band-2:#e2e2df;--band-3:#d2d2ce;--band-4:#c0c0bb;
    --teal:#1d5266;--teal-dim:#cfe0e6;--gold:#8a6a1e;--gold-hi:#a4842f;--gold-dim:#eadfc4;
    --green:#2f5c3a;--amber:#7d6216;--red:#8f2f26;
  }

  /* Con el informe abierto se imprime el informe y nada más. */
  #slos-root.rp-on .slos-app,#slos-root.rp-on .slos-rp-top,#slos-root.rp-on .slos-rp-nav{display:none!important}
  #slos-root.rp-on .slos-rp{position:static;display:block;background:#fff}
  #slos-root.rp-on .slos-rp-body{display:block}
  #slos-root.rp-on .slos-rp-doc{overflow:visible;padding:0}
  #slos-root.rp-on .slos-rp-ch{max-width:none;border-bottom:0;padding:0 0 12mm;break-before:page}
  #slos-root.rp-on .slos-rp-cover{break-before:auto;min-height:150mm}
  #slos-root.rp-on .slos-rp-ch p{max-width:none;color:#33373f}
  .slos-rp-block,.slos-rp-find li,.slos-rp-t tr{break-inside:avoid}
  .slos-rp-ch h2,.slos-rp-ch h3,.slos-rp-thesis{break-after:avoid}
}
`;
// Añadir estilos personalizados para el menú lateral
st.textContent += `
  /* === ESTILOS MEJORADOS PARA EL MENÚ LATERAL === */
  #slos-root .slos-nav button {
    background: transparent !important;
    color: oklch(78% 0.02 250) !important;
    border-radius: 10px !important;
    padding: 10px 14px !important;
    margin: 2px 0 !important;
    font-weight: 500 !important;
    transition: all 0.25s cubic-bezier(.16,1,.3,1) !important;
    position: relative !important;
    overflow: hidden !important;
  }
  #slos-root .slos-nav button::before {
    content: '' !important;
    position: absolute !important;
    inset: 0 !important;
    background: linear-gradient(135deg, rgba(255,107,107,0.15), rgba(78,205,196,0.15)) !important;
    opacity: 0 !important;
    transition: opacity 0.3s ease !important;
    border-radius: 10px !important;
  }
  #slos-root .slos-nav button:hover {
    color: #fff !important;
    transform: translateX(4px) !important;
    background: transparent !important;
  }
  #slos-root .slos-nav button:hover::before {
    opacity: 1 !important;
  }
  #slos-root .slos-nav button i {
    color: oklch(60% 0.025 252) !important;
    transition: color 0.3s ease, transform 0.3s ease !important;
    font-size: 14px !important;
  }
  #slos-root .slos-nav button:hover i {
    color: #FF6B6B !important;
    transform: scale(1.15) !important;
  }
  #slos-root .slos-nav button.on {
    background: linear-gradient(135deg, rgba(255,107,107,0.25), rgba(78,205,196,0.25)) !important;
    color: #fff !important;
    font-weight: 600 !important;
    box-shadow: 0 4px 15px rgba(255,107,107,0.2) !important;
    border: 1px solid rgba(255,255,255,0.1) !important;
  }
  #slos-root .slos-nav button.on::before {
    opacity: 1 !important;
  }
  #slos-root .slos-nav button.on i {
    color: #FF6B6B !important;
  }
  #slos-root .slos-nav button.on::after {
    content: '' !important;
    position: absolute !important;
    left: -2px !important;
    top: 50% !important;
    transform: translateY(-50%) !important;
    width: 4px !important;
    height: 24px !important;
    background: linear-gradient(180deg, #FF6B6B, #4ECDC4) !important;
    border-radius: 0 4px 4px 0 !important;
  }

/* ===== BARRA SUPERIOR (TOPBAR) VIVA ===== */
#slos-root .slos-top {
  background: linear-gradient(135deg, rgba(255,107,107,0.08), rgba(78,205,196,0.08)) !important;
  backdrop-filter: blur(20px) saturate(180%) !important;
  -webkit-backdrop-filter: blur(20px) saturate(180%) !important;
  border: 1px solid rgba(255,107,107,0.2) !important;
  box-shadow: 0 8px 32px rgba(255,107,107,0.08), 0 2px 8px rgba(0,0,0,0.2) !important;
  border-radius: 16px !important;
  padding: 12px 20px !important;
}

/* Breadcrumb: SERVANT LCC / Líderes */
#slos-root .slos-crumb {
  color: oklch(70% 0.03 250) !important;
  font-weight: 500 !important;
  letter-spacing: 0.08em !important;
}
#slos-root .slos-crumb b {
  color: #fff !important;
  background: linear-gradient(135deg, #FF6B6B, #4ECDC4) !important;
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
  background-clip: text !important;
  font-weight: 700 !important;
}

/* Input de búsqueda */
#slos-root .slos-search {
  background: rgba(255,255,255,0.06) !important;
  border: 1px solid rgba(255,255,255,0.12) !important;
  color: #fff !important;
  border-radius: 10px !important;
  padding: 8px 14px !important;
  font-size: 12.5px !important;
  transition: all 0.3s ease !important;
}
#slos-root .slos-search:focus {
  border-color: #FF6B6B !important;
  box-shadow: 0 0 0 3px rgba(255,107,107,0.15) !important;
  background: rgba(255,255,255,0.10) !important;
}
#slos-root .slos-search::placeholder {
  color: oklch(60% 0.02 250) !important;
}

/* Botones de la topbar (normales) */
#slos-root .slos-top .slos-btn:not(.gold):not(.teal) {
  background: rgba(255,255,255,0.05) !important;
  border: 1px solid rgba(255,255,255,0.08) !important;
  color: oklch(80% 0.02 250) !important;
  border-radius: 10px !important;
  padding: 8px 14px !important;
  transition: all 0.25s ease !important;
}
#slos-root .slos-top .slos-btn:not(.gold):not(.teal):hover {
  background: rgba(255,107,107,0.12) !important;
  border-color: rgba(255,107,107,0.3) !important;
  color: #fff !important;
  transform: translateY(-2px) !important;
  box-shadow: 0 6px 20px rgba(255,107,107,0.15) !important;
}
#slos-root .slos-top .slos-btn:not(.gold):not(.teal) i {
  color: #FF6B6B !important;
}

/* Botón "Informe ejecutivo" */
#slos-root .slos-btn#slos-brief {
  background: rgba(78,205,196,0.12) !important;
  border: 1px solid rgba(78,205,196,0.3) !important;
  color: #4ECDC4 !important;
}
#slos-root .slos-btn#slos-brief:hover {
  background: rgba(78,205,196,0.25) !important;
  border-color: #4ECDC4 !important;
  color: #fff !important;
  box-shadow: 0 6px 20px rgba(78,205,196,0.25) !important;
}
#slos-root .slos-btn#slos-brief i {
  color: #4ECDC4 !important;
}

/* Botón "Nuevo experimento" (gold) */
#slos-root .slos-btn.gold {
  background: linear-gradient(135deg, #FF6B6B, #FF8E8E) !important;
  color: #fff !important;
  border: none !important;
  box-shadow: 0 6px 20px rgba(255,107,107,0.35) !important;
  font-weight: 600 !important;
  padding: 8px 18px !important;
  border-radius: 10px !important;
  transition: all 0.3s ease !important;
}
#slos-root .slos-btn.gold:hover {
  transform: translateY(-3px) !important;
  box-shadow: 0 12px 30px rgba(255,107,107,0.5) !important;
}
#slos-root .slos-btn.gold i {
  color: #fff !important;
}

/* Botón de idioma (EN/ES) */
#slos-root .slos-btn#slos-lang {
  background: rgba(255,255,255,0.06) !important;
  border: 1px solid rgba(255,255,255,0.08) !important;
  color: oklch(80% 0.02 250) !important;
}
#slos-root .slos-btn#slos-lang:hover {
  background: rgba(255,107,107,0.12) !important;
  border-color: rgba(255,107,107,0.3) !important;
  color: #fff !important;
}
#slos-root .slos-btn#slos-lang i {
  color: #4ECDC4 !important;
}

/* Botón ⌘K (comandos) */
#slos-root .slos-btn#slos-cmd-btn .slos-kbd {
  background: rgba(255,255,255,0.08) !important;
  border: 1px solid rgba(255,255,255,0.1) !important;
  color: oklch(70% 0.02 250) !important;
  padding: 2px 8px !important;
  border-radius: 6px !important;
  font-size: 9px !important;
}
#slos-root .slos-btn#slos-cmd-btn:hover .slos-kbd {
  background: rgba(255,107,107,0.15) !important;
  border-color: #FF6B6B !important;
  color: #fff !important;
}

/* Botón cerrar (X) */
#slos-root .slos-btn.icon#slos-close {
  background: rgba(255,255,255,0.05) !important;
  border: 1px solid rgba(255,255,255,0.08) !important;
  color: oklch(60% 0.02 250) !important;
  border-radius: 10px !important;
  padding: 8px !important;
  width: 36px !important;
  height: 36px !important;
}
#slos-root .slos-btn.icon#slos-close:hover {
  background: rgba(255,107,107,0.15) !important;
  border-color: #FF6B6B !important;
  color: #FF6B6B !important;
  transform: rotate(90deg) scale(1.1) !important;
}


`;


  document.head.appendChild(st);
}

/* ==========================================================================
 * 6 · UTILIDADES MATEMÁTICAS
 * ========================================================================== */
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const round = (v, d) => { const p = Math.pow(10, d || 0); return Math.round(v * p) / p; };
const mean  = a => a.length ? a.reduce((x, y) => x + y, 0) / a.length : 0;
const sum   = a => a.reduce((x, y) => x + y, 0);

/** Entropía de Shannon normalizada (0-1). 1 = distribución perfectamente repartida. */
function normEntropy(counts) {
  const tot = sum(counts);
  if (tot <= 0 || counts.length < 2) return 0;
  let h = 0;
  counts.forEach(c => { if (c > 0) { const p = c / tot; h -= p * Math.log2(p); } });
  return clamp(h / Math.log2(counts.length), 0, 1);
}

/** Coeficiente de Gini (0 = igualdad total, 1 = una sola persona lo tiene todo). */
function gini(values) {
  const v = values.filter(x => x >= 0).slice().sort((a, b) => a - b);
  const n = v.length, tot = sum(v);
  if (n < 2 || tot === 0) return 0;
  let acc = 0;
  for (let i = 0; i < n; i++) acc += (2 * (i + 1) - n - 1) * v[i];
  return clamp(acc / (n * tot), 0, 1);
}

/** Concentración de capacidad en la persona top (proxy de factor bus). */
function topConcentration(values) {
  const tot = sum(values);
  return tot > 0 ? clamp(Math.max.apply(null, values) / tot, 0, 1) : 0;
}

const initials = n => String(n || '?').trim().split(/\s+/).map(w => w[0] || '').join('').toUpperCase().slice(0, 2);
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const uid = () => 'x' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
const store = {
  get(k, d) { try { const v = LS.get(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
  set(k, v) { try { LS.set(k, JSON.stringify(v)); return true; } catch (e) { console.warn('[SLOS] storage', e); return false; } }
};

/* ==========================================================================
 * 7 · CAPA DE DATOS
 * Mantiene el contrato de v16.1: window.projects → project.tasks → task.assignee
 * ========================================================================== */
const SKILL_MAP = {
  'Leadership':             ['liderar','liderazgo','lead','leader','equipo','team','gestión','gestion','manage','coordinar','coordinate','dirigir','delegar','delegate'],
  'Emotional Intelligence': ['empatía','empatia','empathy','emocional','emotional','escuchar','listen','feedback','1:1','one-on-one','conflicto','conflict'],
  'Communication':          ['comunicar','communicate','presentar','present','hablar','speak','escribir','write','documento','document','reunión','reunion','meeting','demo'],
  'Decision Making':        ['decisión','decision','analizar','analyze','evaluar','evaluate','revisión','revision','review','priorizar','prioritize','trade-off'],
  'Team Management':        ['asignar','assign','seguimiento','follow','sprint','agile','scrum','planning','retro','backlog','onboarding','mentor'],
  'Innovation':             ['innovar','innovate','crear','create','diseñar','disenar','design','mejorar','improve','optimizar','optimize','prototipo','prototype','ia','ai','automatizar','automate']
};
const CATS = Object.keys(SKILL_MAP);

function readProjects() {
  let p = window.projects;
  if (!Array.isArray(p) || !p.length) p = store.get('projects', []);
  if (!Array.isArray(p)) p = [];
  return p;
}

/** Genera un conjunto de demostración claramente etiquetado. */
function demoProjects() {
  const names = ['María García','James Wilson','Aisha Khan','Daniel Costa','Sofía Martín','Leo Rossi','Nora Chen','Omar Haddad'];
  const st = ['completed','completed','completed','inprogress','pending','overdue'];
  const verbs = {
    'Leadership':['Coordinar equipo de','Dirigir el comité de','Delegar la gestión de'],
    'Emotional Intelligence':['Sesión 1:1 de feedback con','Escuchar y resolver conflicto en','Acompañamiento emocional en'],
    'Communication':['Presentar resultados de','Documentar el proceso de','Reunión de alineación sobre'],
    'Decision Making':['Evaluar alternativas de','Revisión crítica de','Priorizar el backlog de'],
    'Team Management':['Planning del sprint de','Onboarding de nuevo perfil en','Seguimiento semanal de'],
    'Innovation':['Prototipo de','Optimizar el flujo de','Automatizar el proceso de']
  };
  const areas = ['Producto','Operaciones','Ventas','Soporte','Finanzas'];
  const projs = ['Expansión EMEA','Plataforma Núcleo','Programa de Talento','Excelencia Operativa'];
  const out = [];
  let seed = 7;
  const rnd = () => (seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648;
  projs.forEach((pn, pi) => {
    const tasks = [];
    const n = 22 + Math.floor(rnd() * 14);
    for (let i = 0; i < n; i++) {
      const cat = CATS[Math.floor(rnd() * CATS.length)];
      // Distribución deliberadamente desigual: revela problemas reales de carga.
      const bias = [0, 0, 1, 1, 1, 2, 3, 3, 4, 5, 6, 7];
      const who = names[bias[Math.floor(rnd() * bias.length)]];
      const est = 2 + Math.floor(rnd() * 12);
      tasks.push({
        id: uid(),
        name: verbs[cat][Math.floor(rnd() * 3)] + ' ' + areas[Math.floor(rnd() * areas.length)],
        description: 'Trabajo de ' + cat.toLowerCase() + ' en el marco de ' + pn + '.',
        assignee: who,
        status: st[Math.floor(rnd() * st.length)],
        estimatedTime: est,
        timeLogged: Math.max(0, est + Math.floor((rnd() - 0.45) * 7)),
        startDate: new Date(Date.now() - Math.floor(rnd() * 260) * 864e5).toISOString()
      });
    }
    out.push({ id: 'demo-' + pi, name: pn, tasks: tasks });
  });
  return out;
}

/**
 * Extrae líderes desde los proyectos del sistema principal.
 * Compatible con la estructura de v16.1 (misma lectura de campos).
 */
function extractLeaders(projects) {
  const map = new Map();
  const custom = store.get(CFG.STORAGE.SKILLS, {}) || {};

  projects.forEach(project => {
    const tasks = Array.isArray(project.tasks) ? project.tasks : [];
    tasks.forEach(task => {
      const who = String(task.assignee || '').trim();
      if (!who || /^(sin asignar|unassigned|n\/a|-)$/i.test(who)) return;

      if (!map.has(who)) map.set(who, {
        name: who, tasks: 0, completed: 0, inProgress: 0, overdue: 0, pending: 0,
        estimated: 0, logged: 0, skills: [], cats: new Set(), role: 'Team Member',
        projects: new Set(), first: null, last: null
      });

      const m = map.get(who);
      m.tasks++;
      m.projects.add(project.name || project.id || '—');
      m.estimated += Number(task.estimatedTime) || 0;
      m.logged    += Number(task.timeLogged)   || 0;

      const s = String(task.status || '').toLowerCase();
      if (/^(completed|completado|done|finalizado)$/.test(s))            m.completed++;
      else if (/^(inprogress|in progress|en progreso|doing)$/.test(s))    m.inProgress++;
      else if (/^(overdue|rezagado|retrasado|late|vencido)$/.test(s))     m.overdue++;
      else                                                               m.pending++;

      const d = task.startDate ? new Date(task.startDate) : null;
      if (d && !isNaN(d)) {
        if (!m.first || d < m.first) m.first = d;
        if (!m.last  || d > m.last)  m.last  = d;
      }

      const txt = ((task.name || '') + ' ' + (task.description || '')).toLowerCase();
      CATS.forEach(cat => {
        if (SKILL_MAP[cat].some(k => txt.includes(k))) m.cats.add(cat);
      });
    });
  });

  // Competencias: derivadas del trabajo real + registradas manualmente (v16.1)
  map.forEach((m, name) => {
    const rate = m.tasks ? m.completed / m.tasks : 0;
    const lvl = rate >= .8 ? 5 : rate >= .6 ? 4 : rate >= .4 ? 3 : rate >= .2 ? 2 : 1;
    m.skills = Array.from(m.cats).map(c => ({ name: c, level: lvl, category: c, auto: true }));
    (custom[name] || []).forEach(sk => {
      if (!m.skills.some(x => x.name === sk.name && !x.auto)) m.skills.push(Object.assign({}, sk, { auto: false }));
    });
  });

  const arr = Array.from(map.values()).sort((a, b) => b.tasks - a.tasks);
  arr.forEach((m, i) => {
    const rate = m.tasks ? m.completed / m.tasks : 0;
    if (i === 0 && m.tasks >= 5)                    m.role = 'Team Lead';
    else if (rate >= .9 && m.tasks >= 3)            m.role = 'Senior';
    else if (m.overdue > 0 && rate < .3)            m.role = 'Needs Support';
    else if (m.cats.size >= 3)                      m.role = 'Specialist';
    m.projects = Array.from(m.projects);
    m.cats = Array.from(m.cats);
  });
  return arr;
}

/* ==========================================================================
 * 8 · MOTOR DE MÉTRICAS
 * --------------------------------------------------------------------------
 * CAPA A · telemetría conductual → proxies (indicativo)
 * CAPA B · percepción 360° SLS-8 → medida del constructo (concluyente)
 * Nunca se mezclan sin declarar el nivel de confianza resultante.
 * ========================================================================== */

/** Señales conductuales de toda la organización, a partir de los proyectos. */
function computeOrgTelemetry(leaders, projects) {
  const loads = leaders.map(l => l.tasks);
  const totalTasks = sum(loads);
  const done = sum(leaders.map(l => l.completed));
  const late = sum(leaders.map(l => l.overdue));

  const delegation = normEntropy(loads);                      // Empoderamiento (proxy)
  const equity     = 1 - gini(loads);                          // Administración (proxy)
  const resilience = 1 - topConcentration(loads);              // Administración (proxy)
  const follow     = (done + late) > 0 ? done / (done + late) : 0;

  // Precisión de estimación: penaliza tanto sobreestimar como subestimar.
  const est = sum(leaders.map(l => l.estimated)), log = sum(leaders.map(l => l.logged));
  const accuracy = est > 0 ? clamp(1 - Math.abs(log - est) / est, 0, 1) : 0.5;
  const followthrough = clamp(follow * 0.75 + accuracy * 0.25, 0, 1);

  // Cesión de protagonismo: cuota de tareas de la persona con más carga.
  const spotlight = 1 - topConcentration(loads);

  // Superficie de crecimiento: exposición media a categorías distintas.
  const growthsurface = leaders.length ? clamp(mean(leaders.map(l => l.cats.length / CATS.length)), 0, 1) : 0;

  return {
    delegation, spotlight, equity, followthrough, growthsurface, resilience,
    totalTasks, done, late,
    completion: totalTasks ? done / totalTasks : 0,
    giniLoad: gini(loads),
    busFactor: topConcentration(loads),
    projects: projects.length,
    people: leaders.length
  };
}

/** Señales conductuales de un individuo, relativas a su equipo. */
function computeLeaderTelemetry(l, org, leaders) {
  const rate = l.tasks ? l.completed / l.tasks : 0;
  const share = org.totalTasks ? l.tasks / org.totalTasks : 0;
  const fair = leaders.length ? 1 / leaders.length : 1;

  // Cesión de protagonismo: penaliza acaparar muy por encima de su cuota justa.
  const spotlight = clamp(1 - Math.max(0, (share - fair)) / Math.max(fair, .0001) * 0.5, 0, 1);
  const followthrough = clamp((l.completed + l.overdue) > 0 ? l.completed / (l.completed + l.overdue) : rate, 0, 1);
  const accuracy = l.estimated > 0 ? clamp(1 - Math.abs(l.logged - l.estimated) / l.estimated, 0, 1) : .5;
  const breadth = clamp(l.cats.length / CATS.length, 0, 1);
  const reach = clamp(l.projects.length / Math.max(1, org.projects), 0, 1);
  const overloaded = share > fair * 2.1;

  return {
    delegation: clamp(spotlight * .6 + reach * .4, 0, 1),
    spotlight,
    equity: clamp(1 - Math.abs(share - fair) / Math.max(fair, .0001) * .5, 0, 1),
    followthrough: clamp(followthrough * .78 + accuracy * .22, 0, 1),
    growthsurface: breadth,
    resilience: clamp(1 - share, 0, 1),
    share, fair, rate, overloaded, accuracy
  };
}

/** Índice conductual (BPI 0-100). Explícitamente NO es el SLI. */
function behaviouralIndex(tel) {
  const w = { delegation:.22, spotlight:.20, equity:.16, followthrough:.16, growthsurface:.14, resilience:.12 };
  let v = 0; Object.keys(w).forEach(k => v += (tel[k] || 0) * w[k]);
  return clamp(Math.round(v * 100), 0, 100);
}

/* --- Capa B · percepción 360° --------------------------------------------- */

/** Estructura: { "Nombre": [ {source:'team'|'self'|'peer'|'manager', scores:{dim:1-6}, at:iso} ] } */
function loadPerception() { return store.get(CFG.STORAGE.PERCEPTION, {}) || {}; }
function savePerception(p) { store.set(CFG.STORAGE.PERCEPTION, p); }

function perceptionFor(name) {
  const all = S.perception[name];
  return Array.isArray(all) ? all : [];
}

/** Media por dimensión y fuente. Devuelve null si no hay datos. */
function perceptionScores(name) {
  const raters = perceptionFor(name);
  if (!raters.length) return null;
  const bySrc = { self:[], team:[], peer:[], manager:[] };
  raters.forEach(r => { if (bySrc[r.source]) bySrc[r.source].push(r); });

  const dims = {};
  SLS8.forEach(d => {
    const per = {};
    Object.keys(bySrc).forEach(src => {
      const vals = bySrc[src].map(r => r.scores && r.scores[d.key]).filter(v => typeof v === 'number');
      per[src] = vals.length ? mean(vals) : null;
    });
    // "Otros" = todo lo que no es autoevaluación (el estándar en 360°)
    const others = raters.filter(r => r.source !== 'self')
                         .map(r => r.scores && r.scores[d.key]).filter(v => typeof v === 'number');
    per.others = others.length ? mean(others) : null;
    per.gap = (per.self != null && per.others != null) ? round(per.self - per.others, 2) : null;
    dims[d.key] = per;
  });

  const externals = raters.filter(r => r.source !== 'self').length;
  return { dims, raters: raters.length, externals, bySrc };
}

/** SLI 0-100 desde percepción (escala Likert 1-6 → 0-100, ponderada SLS-8). */
function perceptionIndex(ps) {
  if (!ps) return null;
  let acc = 0, wtot = 0;
  SLS8.forEach(d => {
    const v = ps.dims[d.key].others != null ? ps.dims[d.key].others : ps.dims[d.key].self;
    if (v != null) { acc += ((v - 1) / 5) * d.weight; wtot += d.weight; }
  });
  return wtot > 0 ? clamp(Math.round(acc / wtot * 100), 0, 100) : null;
}

/** Nivel de confianza de la evidencia disponible. */
function confidenceOf(externals) {
  if (externals >= CFG.CONFIDENCE.HIGH)   return { k:'high',   pct:100, label:'evHigh', desc:'evHighD', color:'g' };
  if (externals >= CFG.CONFIDENCE.MEDIUM) return { k:'medium', pct:72,  label:'evMed',  desc:'evMedD',  color:'t' };
  if (externals >= CFG.CONFIDENCE.LOW)    return { k:'low',    pct:38,  label:'evLow',  desc:'evLowD',  color:'a' };
  return { k:'none', pct:12, label:'evNone', desc:'evNoneD', color:'r' };
}

/** Índice compuesto. Si hay percepción, manda la percepción. */
function compositeIndex(bpi, pIdx, externals) {
  if (pIdx == null) return { value: bpi, kind: 'bpi' };
  // El peso de la telemetría decae a medida que llega evidencia perceptual real.
  const wTel = externals >= CFG.CONFIDENCE.HIGH ? 0.15 : externals >= CFG.CONFIDENCE.MEDIUM ? 0.25 : 0.40;
  return { value: clamp(Math.round(pIdx * (1 - wTel) + bpi * wTel), 0, 100), kind: 'sli' };
}

/** Arquetipo derivado del perfil de señales. */
function archetypeOf(tel, ps, idx) {
  if (tel.overloaded && tel.delegation < .45)                 return 'hoarder';
  if (ps) {
    const d = ps.dims;
    const g = k => d[k] && d[k].others != null ? d[k].others : (d[k] && d[k].self) || 0;
    const top = SLS8.map(x => ({ k:x.key, v:g(x.key) })).sort((a,b) => b.v - a.v)[0];
    if (idx >= 79 && g('empowerment') >= 4.6)                 return 'multiplier';
    if (top.k === 'empowerment')                              return 'developer';
    if (top.k === 'stewardship')                              return 'steward';
    if (top.k === 'humility')                                 return 'listener';
    if (top.k === 'courage')                                  return 'explorer';
  }
  if (tel.delegation >= .7 && tel.growthsurface >= .6)        return 'multiplier';
  if (tel.growthsurface >= .6)                                return 'developer';
  if (tel.equity >= .75 && tel.resilience >= .7)              return 'steward';
  if (tel.followthrough >= .8)                                return 'builder';
  if (tel.delegation >= .5)                                   return 'operator';
  return 'explorer';
}

function maturityOf(idx) {
  return MATURITY.find(m => idx >= m.range[0] && idx <= m.range[1]) || MATURITY[0];
}

/** Construye el perfil completo de cada líder. */
function buildProfiles(leaders, org) {
  return leaders.map(l => {
    const tel = computeLeaderTelemetry(l, org, leaders);
    const bpi = behaviouralIndex(tel);
    const ps  = perceptionScores(l.name);
    const pIdx = perceptionIndex(ps);
    const externals = ps ? ps.externals : 0;
    const comp = compositeIndex(bpi, pIdx, externals);
    const conf = confidenceOf(externals);

    // Dimensiones mostradas: percepción si existe, si no proxy conductual mapeado.
    const dims = {};
    SLS8.forEach(d => {
      if (ps && ps.dims[d.key].others != null)      dims[d.key] = { v: Math.round((ps.dims[d.key].others - 1) / 5 * 100), real: true };
      else if (ps && ps.dims[d.key].self != null)   dims[d.key] = { v: Math.round((ps.dims[d.key].self - 1) / 5 * 100), real: true, selfOnly: true };
      else {
        const sig = BEHAVIOR_SIGNALS.filter(s => s.proxyFor === d.key);
        const v = sig.length ? mean(sig.map(s => tel[s.key] || 0)) : (bpi / 100);
        dims[d.key] = { v: Math.round(v * 100), real: false };
      }
    });

    const sorted = SLS8.map(d => ({ key: d.key, v: dims[d.key].v })).sort((a, b) => b.v - a.v);

    return Object.assign({}, l, {
      tel, bpi, ps, pIdx, externals, conf,
      index: comp.value, indexKind: comp.kind,
      dims, strongest: sorted[0], weakest: sorted[sorted.length - 1],
      archetype: archetypeOf(tel, ps, comp.value),
      maturity: maturityOf(comp.value),
      trust:   Math.round((dims.forgiveness.v + dims.authenticity.v) / 2),
      growth:  Math.round((dims.empowerment.v + dims.humility.v) / 2),
      autonomy: dims.empowerment.v,
      dependency: Math.round(tel.share * 100)
    });
  });
}

/* ==========================================================================
 * 9 · MOTOR DE INSIGHTS · Señal → Historia → Acción
 * ========================================================================== */
function generateInsights(profiles, org) {
  const es = S.lang === 'es';
  const out = [];
  if (!profiles.length) return out;

  const avg = mean(profiles.map(p => p.index));
  const anyPerception = profiles.some(p => p.externals > 0);

  // 0 · El insight más importante: falta de evidencia.
  if (!anyPerception) {
    out.push({
      p:'high', dim:'all', icon:'fa-triangle-exclamation',
      signal: es ? 'Cero evaluaciones 360° registradas' : 'Zero 360° assessments recorded',
      story:  es ? 'Todo lo que ves ahora son proxies derivados de la ejecución de tareas. El liderazgo de servicio es un constructo de percepción: solo los seguidores pueden medirlo. Sin ellos, el sistema orienta pero no concluye.'
                 : 'Everything you see now are proxies derived from task execution. Servant leadership is a perception construct: only followers can measure it. Without them, the system orients but does not conclude.',
      action: es ? 'Lanza el instrumento SLS-8 con al menos 3 evaluadores por líder antes de tomar cualquier decisión de talento.'
                 : 'Launch the SLS-8 instrument with at least 3 raters per leader before any talent decision.',
      cta:'assessment', ref:'van Dierendonck & Nuijten (2011) · Eva et al. (2019)'
    });
  }

  // 1 · Concentración de carga → riesgo estructural
  if (org.busFactor > 0.34 && profiles.length >= 3) {
    const top = profiles.slice().sort((a, b) => b.tasks - a.tasks)[0];
    out.push({
      p:'high', dim:'stewardship', icon:'fa-cubes-stacked',
      signal: es ? `El ${Math.round(org.busFactor*100)}% de la carga recae en una sola persona`
                 : `${Math.round(org.busFactor*100)}% of the load sits on a single person`,
      story:  es ? `${top.name} concentra ${top.tasks} de ${org.totalTasks} tareas. Esto se lee como alto rendimiento, pero es deuda organizativa: la capacidad no está distribuida y una sola baja detiene la operación.`
                 : `${top.name} concentrates ${top.tasks} of ${org.totalTasks} tasks. It reads as high performance, but it is organisational debt: capability is not distributed and one departure stops operations.`,
      action: es ? `Experimento "Reequilibrio de carga": redistribuir el 30% de la carga de ${top.name} antes de aceptar trabajo nuevo. 21 días.`
                 : `"Load rebalance" experiment: redistribute 30% of ${top.name}'s load before accepting new work. 21 days.`,
      cta:'experiment:load-rebalance', ref:'Stewardship · SLS-8'
    });
  }

  // 2 · Baja delegación → cuello de botella
  if (org.delegation < 0.55 && profiles.length >= 3) {
    out.push({
      p:'high', dim:'empowerment', icon:'fa-hourglass-half',
      signal: es ? `Amplitud de delegación en ${Math.round(org.delegation*100)}/100`
                 : `Delegation breadth at ${Math.round(org.delegation*100)}/100`,
      story:  es ? 'El trabajo circula poco entre personas. Cuando la delegación es baja, la autonomía percibida cae y con ella el compromiso; es el mecanismo mediador mejor documentado del liderazgo de servicio.'
                 : 'Work barely circulates between people. When delegation is low, perceived autonomy drops and commitment with it; this is the best-documented mediating mechanism of servant leadership.',
      action: es ? 'Experimento "Transferencia de decisiones": listar las decisiones que sigues tomando tú y transferir una por semana con criterio explícito, no con permiso.'
                 : '"Decision transfer" experiment: list the decisions you still make and transfer one per week with explicit criteria, not permission.',
      cta:'experiment:decision-transfer', ref:'Empowerment · Liden et al. (2008)'
    });
  }

  // 3 · Inequidad de carga
  if (org.giniLoad > 0.42) {
    out.push({
      p:'medium', dim:'stewardship', icon:'fa-scale-unbalanced-flip',
      // Coma decimal en español: este texto acaba impreso dentro del informe.
      signal: es ? `Gini de carga en ${round(org.giniLoad,2).toFixed(2).split('.').join(',')}`
                 : `Load Gini at ${round(org.giniLoad,2).toFixed(2)}`,
      story:  es ? 'La carga está mal repartida. El equipo se sostiene sobre pocas personas, lo que suele preceder al desgaste y a la rotación lamentada.'
                 : 'Load is poorly distributed. The team rests on few people, which usually precedes burnout and regretted attrition.',
      action: es ? 'Revisar la asignación en el próximo planning con el reparto visible en pantalla.'
                 : 'Review assignment in the next planning with the distribution visible on screen.',
      ref:'Load equity · proxy'
    });
  }

  // 4 · Cumplimiento bajo
  if (org.completion < 0.5 && org.totalTasks > 8) {
    out.push({
      p:'medium', dim:'accountability', icon:'fa-circle-exclamation',
      signal: es ? `Cumplimiento del ${Math.round(org.completion*100)}% sobre ${org.totalTasks} tareas`
                 : `${Math.round(org.completion*100)}% completion across ${org.totalTasks} tasks`,
      story:  es ? 'Hay más compromiso adquirido que capacidad de entrega. En liderazgo de servicio esto erosiona la confianza más rápido que un mal resultado: se rompe la fiabilidad.'
                 : 'There is more commitment taken on than delivery capacity. In servant leadership this erodes trust faster than a bad result: reliability breaks.',
      action: es ? 'Congelar la entrada de trabajo nuevo un ciclo y cerrar el backlog vencido antes de comprometer nada más.'
                 : 'Freeze new work intake for one cycle and close the overdue backlog before committing to anything else.',
      ref:'Accountability · SLS-8'
    });
  }

  // 5 · Puntos ciegos individuales (solo con percepción real)
  profiles.forEach(p => {
    if (!p.ps) return;
    SLS8.forEach(d => {
      const g = p.ps.dims[d.key].gap;
      if (g != null && g >= 0.9) {
        out.push({
          p:'high', dim:d.key, icon:'fa-eye-slash', leader:p.name,
          signal: es ? `Punto ciego de ${p.name} en ${d.es}` : `${p.name} blind spot in ${d.en}`,
          story:  es ? `Se autoevalúa ${round(g,1)} puntos por encima de como le ve su equipo. La brecha auto-otros es el predictor individual más accionable de una evaluación 360°.`
                     : `Self-rating is ${round(g,1)} points above how the team sees them. The self-other gap is the most actionable individual predictor in a 360°.`,
          action: es ? `Devolver el dato en un 1:1, sin defenderlo, y elegir un experimento de la dimensión "${d.es}".`
                     : `Share the data in a 1:1, without defending it, and pick an experiment from the "${d.en}" dimension.`,
          ref:'Self-other agreement'
        });
      }
    });
  });

  // 6 · Talento a punto de multiplicar
  profiles.filter(p => p.index >= 75 && p.maturity.lvl >= 3).slice(0, 2).forEach(p => {
    out.push({
      p:'low', dim:'empowerment', icon:'fa-diagram-successor', leader:p.name,
      signal: es ? `${p.name} en nivel ${L(p.maturity)}` : `${p.name} at ${L(p.maturity)} level`,
      story:  es ? 'Ya crea capacidad en su equipo. El siguiente salto no es más responsabilidad operativa: es desarrollar a otros que desarrollen.'
                 : 'Already builds capability in their team. The next leap is not more operational responsibility: it is developing others who develop.',
      action: es ? 'Asignar 2-3 líderes junior en mentoría formal y un sucesor en sombra durante 60 días.'
                 : 'Assign 2-3 junior leaders in formal mentoring plus a shadowing successor for 60 days.',
      cta:'experiment:successor-shadow', ref:'Maturity model'
    });
  });

  // 7 · Índice global bajo
  if (avg < 55) {
    out.push({
      p:'high', dim:'all', icon:'fa-chart-line',
      signal: es ? `Índice medio de la organización en ${Math.round(avg)}/100` : `Organisation mean index at ${Math.round(avg)}/100`,
      story:  es ? 'El agregado está por debajo del umbral en el que las conductas de servicio empiezan a producir efectos medibles sobre compromiso y voz.'
                 : 'The aggregate sits below the threshold where serving behaviours start producing measurable effects on engagement and voice.',
      action: es ? 'Programa de 90 días: diagnóstico SLS-8, un experimento conductual por líder y revisión mensual con datos, no con opiniones.'
                 : '90-day programme: SLS-8 diagnosis, one behavioural experiment per leader and monthly review with data, not opinions.',
      ref:'Lee et al. (2020) meta-analysis'
    });
  }

  const rank = { high:0, medium:1, low:2 };
  return out.sort((a, b) => rank[a.p] - rank[b.p]);
}

/* ==========================================================================
 * 10 · PRIMITIVAS DE INTERFAZ
 * ========================================================================== */
const $  = (s, r) => (r || document).querySelector(s);
const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
const root = () => document.getElementById('slos-root');

function toast(msg, icon) {
  let box = $('.slos-toasts', root());
  if (!box) { box = document.createElement('div'); box.className = 'slos-toasts'; root().appendChild(box); }
  const el = document.createElement('div');
  el.className = 'slos-toast';
  el.innerHTML = `<i class="fas ${icon || 'fa-circle-check'}"></i><span>${esc(msg)}</span>`;
  box.appendChild(el);
  setTimeout(() => { el.classList.add('out'); setTimeout(() => el.remove(), 300); }, 2800);
}

function modal(html) {
  const ov = $('#slos-modal', root());
  $('#slos-modal-body', root()).innerHTML = html;
  ov.classList.add('on');
  const f = ov.querySelector('input,select,textarea,button');
  if (f) setTimeout(() => f.focus(), 60);
}
function closeModal() { const ov = $('#slos-modal', root()); if (ov) ov.classList.remove('on'); }

/** Contador animado con easing cúbico. */
function countUp(el) {
  const target = parseFloat(el.dataset.count);
  if (isNaN(target)) return;
  const dec = parseInt(el.dataset.dec || '0', 10);
  const suf = el.dataset.suf || '', pre = el.dataset.pre || '';
  if (RM) { el.textContent = pre + target.toFixed(dec) + suf; return; }
  const dur = 1100, t0 = performance.now();
  (function tick(now) {
    const p = Math.min((now - t0) / dur, 1);
    const e = 1 - Math.pow(1 - p, 3);
    el.textContent = pre + (target * e).toFixed(dec) + suf;
    if (p < 1) requestAnimationFrame(tick);
  })(t0);
}

let RV_OBS = null;
function observeReveals(scope) {
  if (!RV_OBS) {
    RV_OBS = new IntersectionObserver(es => {
      es.forEach(e => {
        if (!e.isIntersecting) return;
        e.target.classList.add('in');
        $$('[data-count]', e.target).forEach(countUp);
        $$('.slos-bar i[data-w]', e.target).forEach(b => { b.style.width = b.dataset.w + '%'; });
        $$('.slos-arc[data-off]', e.target).forEach(a => { a.style.strokeDashoffset = a.dataset.off; });
        RV_OBS.unobserve(e.target);
      });
    }, { threshold: .12, rootMargin: '0px 0px -40px 0px', root: $('.slos-main', root()) });
  }
  $$('[data-rv]', scope).forEach(el => RV_OBS.observe(el));
  // Elementos ya visibles al montar
  requestAnimationFrame(() => {
    $$('[data-rv]', scope).forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight) {
        el.classList.add('in');
        $$('[data-count]', el).forEach(countUp);
        $$('.slos-bar i[data-w]', el).forEach(b => { b.style.width = b.dataset.w + '%'; });
        $$('.slos-arc[data-off]', el).forEach(a => { a.style.strokeDashoffset = a.dataset.off; });
      }
    });
  });
}

/** Foco puntual que sigue al cursor sobre las tarjetas. */
function bindSpotlight(scope) {
  if (RM) return;
  $$('.slos-card', scope).forEach(c => {
    if (c.__sl) return; c.__sl = true;
    c.addEventListener('pointermove', e => {
      const r = c.getBoundingClientRect();
      c.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
      c.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
    }, { passive: true });
  });
}

/* ==========================================================================
 * 11 · VISUALIZACIONES SVG NATIVAS (sin dependencias)
 * ========================================================================== */

/** Anillo de índice con arco animado y marcas de umbral de madurez. */
function svgRing(value, label, size) {
  const s = size || 168, c = s / 2, r = c - 13, C = 2 * Math.PI * r;
  const off = C * (1 - clamp(value, 0, 100) / 100);
  const col = value >= 79 ? 'var(--gold)' : value >= 63 ? 'var(--teal)' : value >= 45 ? 'var(--amber)' : 'var(--red)';
  const ticks = MATURITY.slice(0, 4).map(m => {
    const a = (m.range[1] / 100) * 2 * Math.PI - Math.PI / 2;
    return `<line x1="${c + Math.cos(a) * (r - 7)}" y1="${c + Math.sin(a) * (r - 7)}" x2="${c + Math.cos(a) * (r + 7)}" y2="${c + Math.sin(a) * (r + 7)}" stroke="var(--line-3)" stroke-width="1.5"/>`;
  }).join('');
  return `<div class="slos-ring-w" style="width:${s}px;height:${s}px">
    <svg width="${s}" height="${s}" viewBox="0 0 ${s} ${s}" aria-hidden="true">
      <defs><linearGradient id="slosG${Math.round(value)}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${col}"/><stop offset="100%" stop-color="var(--gold-hi)"/>
      </linearGradient></defs>
      <circle cx="${c}" cy="${c}" r="${r}" fill="none" stroke="var(--line)" stroke-width="9"/>
      ${ticks}
      <circle class="slos-arc" cx="${c}" cy="${c}" r="${r}" fill="none"
        stroke="url(#slosG${Math.round(value)})" stroke-width="9"
        stroke-dasharray="${C}" stroke-dashoffset="${C}" data-off="${off}"
        transform="rotate(-90 ${c} ${c})"/>
    </svg>
    <div class="slos-ring-v"><b data-count="${value}">0</b><span>${esc(label)}</span></div>
  </div>`;
}

/** Radar octogonal de las 8 dimensiones SLS. */
function svgRadar(dims, size, who) {
const es = S.lang === 'es';
const base = size || 300;
// viewBox con margen horizontal y vertical real: antes era cuadrado y justo,
// y las etiquetas laterales (anchor start/end) se cortaban en el borde.
const W = base + 170, H = base + 80;
const c = W / 2, cy = H / 2;
const R = base / 2 - 46;
const n = SLS8.length;
const pt = (i, v) => {
const a = (i / n) * 2 * Math.PI - Math.PI / 2;
return [c + Math.cos(a) * R * v, cy + Math.sin(a) * R * v];
};
// Tooltip individual de cada vértice: nombre, valor, evidencia y definición.
// Salta al pasar por el punto o por su etiqueta (misma info en ambos).
const tipOf = d => {
const x = dims[d.key] || { v: 0 };
const ev = x.real
? (es ? 'medido con percepción 360°' : 'measured with 360° perception')
: (es ? 'estimado por proxy conductual (~)' : 'estimated by behavioural proxy (~)');
return L(d) + ' · ' + x.v + '/100 · ' + ev + '\n' + (es ? d.defEs : d.defEn);
};
const grid = [.25, .5, .75, 1].map(g =>
`<polygon points="${Array.from({length:n},(_, i) => pt(i, g).join(',')).join(' ')}" fill="none" stroke="var(--line)" stroke-width="1"/>`
).join('');
const spokes = Array.from({length:n},(_, i) => {
const p = pt(i, 1);
return `<line x1="${c}" y1="${cy}" x2="${p[0]}" y2="${p[1]}" stroke="var(--band-1)"/>`;
}).join('');
const vals = SLS8.map((d, i) => pt(i, clamp((dims[d.key] ? dims[d.key].v : 0) / 100, .04, 1)));
const poly = vals.map(p => p.join(',')).join(' ');
// Puntos: el círculo invisible (r=9) amplía la zona de hover del tooltip.
const dots = vals.map((p, i) => {
const d = SLS8[i];
const real = !!(dims[d.key] && dims[d.key].real);
return `<g style="cursor:help"><title>${esc(tipOf(d))}</title>
<circle cx="${round(p[0],1)}" cy="${round(p[1],1)}" r="9" fill="transparent"/>
<circle cx="${round(p[0],1)}" cy="${round(p[1],1)}" r="3" fill="${real ? 'var(--gold)' : 'var(--teal)'}"/>
</g>`;
}).join('');
// Nombre COMPLETO (sin slice) y envuelto en máx. dos líneas equilibradas,
// para que quepan "Administración responsable" o "Interpersonal acceptance".
const wrap2 = text => {
if (text.length <= 13) return [text];
const w = text.split(/\s+/);
if (w.length < 2) return [text];
let best = null;
for (let i = 1; i < w.length; i++) {
const l1 = w.slice(0, i).join(' '), l2 = w.slice(i).join(' ');
const df = Math.abs(l1.length - l2.length);
if (!best || df < best.d) best = { l1: l1, l2: l2, d: df };
}
return [best.l1, best.l2];
};
// Las etiquetas llevan el mismo tooltip que su vértice.
const labels = SLS8.map((d, i) => {
const a = (i / n) * 2 * Math.PI - Math.PI / 2;
const cos = Math.cos(a), sin = Math.sin(a);
const lx = round(c + cos * (R + 24), 1), ly = round(cy + sin * (R + 24), 1);
const anc = Math.abs(cos) < .32 ? 'middle' : (cos > 0 ? 'start' : 'end');
const lines = wrap2(L(d));
const lh = 10;
const y0 = sin > .32 ? ly + 10 : sin < -.32 ? ly - 4 - (lines.length - 1) * lh : ly + 3;
const tsp = lines.map((ln, k) => `<tspan x="${lx}" y="${round(y0 + k * lh, 1)}">${esc(ln)}</tspan>`).join('');
return `<g style="cursor:help"><title>${esc(tipOf(d))}</title>
<text text-anchor="${anc}" font-size="9" fill="var(--ink-3)" font-family="Inter Tight,sans-serif">${tsp}</text>
</g>`;
}).join('');
const anyReal = SLS8.some(d => dims[d.key] && dims[d.key].real);
const best = SLS8.map(d => ({ d, v: dims[d.key] ? dims[d.key].v : 0 })).sort((a, b) => b.v - a.v);
const al = (who ? who + ' · ' : '') + (es
? `Perfil octogonal de las ocho dimensiones. Más alta: ${L(best[0].d)} con ${best[0].v}. Más baja: ${L(best[best.length-1].d)} con ${best[best.length-1].v}. ${anyReal ? 'Valores medidos con percepción 360°.' : 'Valores estimados por proxy conductual.'}`
: `Octagonal profile across the eight dimensions. Highest: ${L(best[0].d)} at ${best[0].v}. Lowest: ${L(best[best.length-1].d)} at ${best[best.length-1].v}. ${anyReal ? 'Values measured with 360° perception.' : 'Values estimated by behavioural proxy.'}`);
return `<svg viewBox="0 0 ${W} ${H}" width="100%" style="max-width:${W}px;display:block;margin:auto" role="img" aria-label="${esc(al)}">
<title>${esc(al)}</title>
${grid}${spokes}
<polygon points="${poly}" fill="oklch(80% .115 88/.16)" stroke="var(--gold)" stroke-width="1.8" stroke-linejoin="round"/>
${dots}${labels}
</svg>`;
}/* ==========================================================================
 * 11.b · REPERTORIO GRÁFICO
 * --------------------------------------------------------------------------
 * SVG escrito a mano, sin librerías. Repertorio tomado del Visual Vocabulary
 * del Financial Times: cada forma responde a una pregunta distinta.
 *
 * Reglas comunes a todos: viewBox para que escalen solos, role="img" con
 * aria-label descriptivo, <title> en cada marca para el tooltip del navegador,
 * ejes etiquetados, y ni sombras ni degradados dentro del área de datos. Nada
 * depende del color para entenderse: forma, posición y etiqueta bastan, que es
 * la condición para que el informe funcione impreso en blanco y negro.
 * ========================================================================== */

const AXIS = 'var(--ink-4)';
const GRID = 'var(--line)';
const MONO = 'JetBrains Mono,monospace';
const SANS = 'Inter Tight,sans-serif';

const txt = (x, y, s, o) => {
  const p = o || {};
  return `<text x="${round(x,1)}" y="${round(y,1)}"${p.anchor ? ` text-anchor="${p.anchor}"` : ''} font-size="${p.size || 9}" fill="${p.fill || AXIS}" font-family="${p.mono ? MONO : SANS}"${p.weight ? ` font-weight="${p.weight}"` : ''}>${esc(s)}</text>`;
};

/* ---------- Dumbbell · autopercepción frente a percepción del equipo ------
 * El gráfico más importante del sistema: hace visible de un vistazo dónde y
 * cuánto se desvía la lectura propia de la del equipo.
 * ------------------------------------------------------------------------ */
function svgDumbbell(ps, opts) {
  const o = opts || {};
  const es = S.lang === 'es';
  const rows = SLS8.map(d => ({
    d,
    self: ps && ps.dims[d.key] ? ps.dims[d.key].self : null,
    others: ps && ps.dims[d.key] ? ps.dims[d.key].others : null
  })).filter(r => r.self != null || r.others != null);

  if (!rows.length) {
    return `<div class="slos-empty"><i class="fas fa-circle-half-stroke"></i>
      <h4>${esc(T().noPerception)}</h4><p>${esc(T().noPerceptionD)}</p></div>`;
  }

  const LBL = 148, PAD = 20, ROW = 30;
  const W = 560, H = PAD + rows.length * ROW + 42;
  const x0 = LBL, x1 = W - PAD;
  const sx = v => x0 + (clamp(v, 1, 6) - 1) / 5 * (x1 - x0);

  const grid = [1, 2, 3, 4, 5, 6].map(g =>
    `<line x1="${round(sx(g),1)}" y1="${PAD - 8}" x2="${round(sx(g),1)}" y2="${PAD + rows.length * ROW}" stroke="${GRID}" stroke-width="1"/>` +
    txt(sx(g), PAD + rows.length * ROW + 16, String(g), { anchor: 'middle', mono: true })
  ).join('');

  const marks = rows.map((r, i) => {
    const y = PAD + i * ROW + ROW / 2;
    const gapTxt = (r.self != null && r.others != null)
      ? ((r.self - r.others > 0 ? '+' : '') + round(r.self - r.others, 1))
      : '—';
    const tip = es
      ? `${L(r.d)} · auto ${r.self != null ? round(r.self,1) : '—'} · equipo ${r.others != null ? round(r.others,1) : '—'} · brecha ${gapTxt}`
      : `${L(r.d)} · self ${r.self != null ? round(r.self,1) : '—'} · team ${r.others != null ? round(r.others,1) : '—'} · gap ${gapTxt}`;
    let m = `<g><title>${esc(tip)}</title>`;
    m += `<rect x="0" y="${y - ROW/2}" width="${W}" height="${ROW}" fill="transparent"/>`;
    m += txt(LBL - 12, y + 3, L(r.d), { anchor: 'end', size: 10, fill: 'var(--ink-2)' });
    if (r.self != null && r.others != null) {
      m += `<line x1="${round(sx(r.self),1)}" y1="${y}" x2="${round(sx(r.others),1)}" y2="${y}" stroke="var(--line-3)" stroke-width="2.5" stroke-linecap="round"/>`;
    }
    // Relleno = equipo. Contorno = autoevaluación. Se distinguen sin color.
    if (r.others != null) m += `<circle cx="${round(sx(r.others),1)}" cy="${y}" r="5.5" fill="var(--teal)"/>`;
    if (r.self != null)   m += `<circle cx="${round(sx(r.self),1)}" cy="${y}" r="5.5" fill="var(--bg)" stroke="var(--gold)" stroke-width="2.5"/>`;
    m += txt(x1 + 2, y + 3, gapTxt, { anchor: 'start', size: 9, mono: true, fill: 'var(--ink-3)' });
    return m + '</g>';
  }).join('');

  const label = es
    ? `Brecha entre autopercepción y percepción del equipo en las ocho dimensiones, escala 1 a 6`
    : `Gap between self-perception and team perception across the eight dimensions, scale 1 to 6`;

  return `<div class="slos-chart">
    <svg viewBox="0 0 ${W + 26} ${H}" width="100%" role="img" aria-label="${esc(label)}">
      <title>${esc(label)}</title>
      ${grid}${marks}
      ${txt(x0, H - 6, es ? 'Nunca' : 'Never', { size: 8.5 })}
      ${txt(x1, H - 6, es ? 'Siempre' : 'Always', { anchor: 'end', size: 8.5 })}
    </svg>
    <div class="slos-legend">
      <span><i class="k-ring"></i>${esc(T().selfPerception)}</span>
      <span><i class="k-dot"></i>${esc(T().teamPerception)}</span>
      <span class="slos-note">${esc(es ? 'Brecha = auto − equipo' : 'Gap = self − team')}</span>
    </div>
  </div>`;
}

/* ---------- Curva de Lorenz · desigualdad de carga -----------------------
* Explica visualmente lo que un coeficiente de Gini dice en un número: cuánto
* se separa el reparto real del reparto perfectamente igualitario.
* Cada punto de la curva conserva a su persona y dispara un tooltip propio.
* ------------------------------------------------------------------------ */
function svgLorenz(values, names) {
const es = S.lang === 'es';
// Empareja cada valor con su nombre ANTES de filtrar y ordenar: así cada
// punto de la curva sabe a quién pertenece y el tooltip nunca se desalinea.
const pairs = (values || [])
.map((x, i) => ({ x: Number(x) || 0, name: names && names[i] != null ? String(names[i]) : '' }))
.filter(p => p.x > 0)
.sort((a, b) => a.x - b.x);
if (pairs.length < 2) {
return `<div class="slos-empty"><i class="fas fa-chart-area"></i><h4>${esc(T().empty)}</h4>
<p>${esc(es ? 'Hacen falta al menos dos personas con carga para dibujar el reparto.' : 'At least two people with load are needed to draw the distribution.')}</p></div>`;
}
const tot = sum(pairs.map(p => p.x)), n = pairs.length;
const pts = [[0, 0]];
let acc = 0;
pairs.forEach((p, i) => { acc += p.x; pts.push([(i + 1) / n, acc / tot]); });
const P = 34, W = 340, H = 300;
const px = t => P + t * (W - P - 14);
const py = t => H - P - t * (H - P - 18);
const poly = pts.map(p => round(px(p[0]),1) + ',' + round(py(p[1]),1)).join(' ');
const area = `${round(px(0),1)},${round(py(0),1)} ${poly} ${round(px(1),1)},${round(py(0),1)}`;
const g = gini(pairs.map(p => p.x));
const grid = [0, .25, .5, .75, 1].map(t =>
`<line x1="${round(px(0),1)}" y1="${round(py(t),1)}" x2="${round(px(1),1)}" y2="${round(py(t),1)}" stroke="${GRID}"/>` +
txt(P - 6, py(t) + 3, Math.round(t * 100), { anchor: 'end', size: 8, mono: true })
).join('');
// Tooltip por punto: quién es, qué carga lleva y cuánto acumula el tramo bajo.
const dots = pts.slice(1).map((p, i) => {
const per = pairs[i];
const share = tot ? Math.round(per.x / tot * 100) : 0;
const cumP = Math.round(p[0] * 100), cumL = Math.round(p[1] * 100);
const tip = es
? `${per.name} · ${per.x} ${per.x === 1 ? 'tarea' : 'tareas'} (${share}% del total) · el ${cumP}% de las personas acumula el ${cumL}% de la carga`
: `${per.name} · ${per.x} ${per.x === 1 ? 'task' : 'tasks'} (${share}% of total) · bottom ${cumP}% of people carry ${cumL}% of the load`;
return `<g style="cursor:help"><title>${esc(tip)}</title>
<circle cx="${round(px(p[0]),1)}" cy="${round(py(p[1]),1)}" r="8" fill="transparent"/>
<circle cx="${round(px(p[0]),1)}" cy="${round(py(p[1]),1)}" r="2.6" fill="var(--teal)"/></g>`;
}).join('');
const label = es
? `Curva de Lorenz del reparto de carga. Coeficiente de Gini ${round(g,2)} sobre 1. Cuanto más se aleja la curva de la diagonal, más desigual es el reparto.`
: `Lorenz curve of load distribution. Gini coefficient ${round(g,2)} out of 1. The further the curve sits from the diagonal, the more unequal the split.`;
return `<div class="slos-chart">
<svg viewBox="0 0 ${W} ${H}" width="100%" style="max-width:${W}px" role="img" aria-label="${esc(label)}">
<title>${esc(label)}</title>
${grid}
<polygon points="${area}" fill="var(--gold-dim)"/>
<line x1="${round(px(0),1)}" y1="${round(py(0),1)}" x2="${round(px(1),1)}" y2="${round(py(1),1)}"
stroke="var(--ink-3)" stroke-width="1.5" stroke-dasharray="4 4"/>
<polyline points="${poly}" fill="none" stroke="var(--teal)" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round"/>
${dots}
<line x1="${round(px(0),1)}" y1="${round(py(0),1)}" x2="${round(px(1),1)}" y2="${round(py(0),1)}" stroke="${AXIS}"/>
<line x1="${round(px(0),1)}" y1="${round(py(0),1)}" x2="${round(px(0),1)}" y2="${round(py(1),1)}" stroke="${AXIS}"/>
${txt(px(.5), H - 8, es ? '% acumulado de personas' : '% of people, cumulative', { anchor: 'middle', size: 8.5 })}
${txt(px(.52), py(.52) - 6, es ? 'Reparto igualitario' : 'Equal split', { size: 8, fill: 'var(--ink-3)' })}
</svg>
<div class="slos-legend">
<span class="slos-num">Gini ${round(g, 2)}</span>
<span class="slos-note">${esc(es ? 'El área sombreada es la desigualdad · pasa el cursor por los puntos' : 'The shaded area is the inequality · hover the points')}</span>
</div>
</div>`;
}
/* ---------- Waterfall · descomposición del índice ------------------------- */
function svgWaterfall(parts, total, label) {
  const es = S.lang === 'es';
  if (!parts || !parts.length) return `<div class="slos-empty"><i class="fas fa-chart-column"></i><h4>${esc(T().empty)}</h4></div>`;
  const P = 30, W = 560, H = 250, base = H - 46;
  const max = Math.max(total, sum(parts.map(p => p.v))) || 1;
  const sy = val => base - (val / max) * (base - 24);
  const cw = (W - P - 14) / (parts.length + 1);
  let acc = 0;

  const bars = parts.map((p, i) => {
    const x = P + i * cw + cw * 0.16;
    const w = cw * 0.68;
    const y0 = sy(acc), y1 = sy(acc + p.v);
    acc += p.v;
    const tip = `${p.label} · ${round(p.v, 1)} ${es ? 'puntos del índice' : 'index points'} (${Math.round(p.w * 100)}%)`;
    return `<g><title>${esc(tip)}</title>
      <rect x="${round(x,1)}" y="${round(y1,1)}" width="${round(w,1)}" height="${round(Math.max(1, y0 - y1),1)}" fill="var(--teal)" opacity=".82"/>
      ${i < parts.length ? `<line x1="${round(x,1)}" y1="${round(y1,1)}" x2="${round(x + cw,1)}" y2="${round(y1,1)}" stroke="${GRID}" stroke-dasharray="3 3"/>` : ''}
      ${txt(x + w / 2, y1 - 5, '+' + round(p.v, 1), { anchor: 'middle', size: 8.5, mono: true, fill: 'var(--ink-2)' })}
      ${txt(x + w / 2, base + 14, p.short, { anchor: 'middle', size: 8 })}
      ${txt(x + w / 2, base + 25, Math.round(p.w * 100) + '%', { anchor: 'middle', size: 7.5, mono: true })}
    </g>`;
  }).join('');

  const tx = P + parts.length * cw + cw * 0.16, tw = cw * 0.68;
  const totalBar = `<g><title>${esc((es ? 'Índice compuesto ' : 'Composite index ') + Math.round(total))}</title>
    <rect x="${round(tx,1)}" y="${round(sy(total),1)}" width="${round(tw,1)}" height="${round(base - sy(total),1)}" fill="var(--gold)"/>
    ${txt(tx + tw / 2, sy(total) - 5, Math.round(total), { anchor: 'middle', size: 10, mono: true, weight: '700', fill: 'var(--gold-hi)' })}
    ${txt(tx + tw / 2, base + 14, es ? 'Índice' : 'Index', { anchor: 'middle', size: 8, weight: '700' })}
  </g>`;

  // `label` nombra qué índice se descompone, no sustituye a la descripción:
  // un lector de pantalla necesita la frase entera, no una etiqueta suelta.
  const subject = label || (es ? 'el índice' : 'the index');
  const al = es
    ? `Descomposición de ${subject} en sus componentes ponderados, hasta un total de ${Math.round(total)} sobre 100`
    : `Breakdown of ${subject} into its weighted components, totalling ${Math.round(total)} out of 100`;

  return `<div class="slos-chart">
    <svg viewBox="0 0 ${W} ${H}" width="100%" role="img" aria-label="${esc(al)}">
      <title>${esc(al)}</title>
      <line x1="${P}" y1="${base}" x2="${W - 14}" y2="${base}" stroke="${AXIS}"/>
      ${bars}${totalBar}
      ${txt(P - 6, 28, Math.round(max), { anchor: 'end', size: 8, mono: true })}
      ${txt(P - 6, base + 3, '0', { anchor: 'end', size: 8, mono: true })}
    </svg>
  </div>`;
}

/* ---------- Bullet · valor, objetivo y bandas de referencia ---------------- */
function svgBullet(value, target, label, bands) {
  const es = S.lang === 'es';
  const B = bands || [45, 63, 79];
  const W = 268, H = 46, y = 16, h = 13;
  const sx = v => 4 + clamp(v, 0, 100) / 100 * (W - 8);
  const shades = ['var(--band-1)', 'var(--band-2)', 'var(--band-3)', 'var(--band-4)'];
  const edges = [0].concat(B, [100]);
  const bandRects = edges.slice(0, -1).map((e, i) =>
    `<rect x="${round(sx(e),1)}" y="${y}" width="${round(sx(edges[i+1]) - sx(e),1)}" height="${h}" fill="${shades[i]}"/>`
  ).join('');
  const al = `${label} · ${Math.round(value)}${es ? ' sobre 100, objetivo ' : ' out of 100, target ' }${Math.round(target)}`;
  return `<div class="slos-chart">
    <svg viewBox="0 0 ${W} ${H}" width="100%" style="max-width:${W}px" role="img" aria-label="${esc(al)}">
      <title>${esc(al)}</title>
      ${bandRects}
      <rect x="${round(sx(0),1)}" y="${y + 4}" width="${round(sx(value) - sx(0),1)}" height="${h - 8}" fill="var(--teal)"/>
      <line x1="${round(sx(target),1)}" y1="${y - 4}" x2="${round(sx(target),1)}" y2="${y + h + 4}" stroke="var(--gold-hi)" stroke-width="2.5"/>
      ${txt(4, 11, label, { size: 9, fill: 'var(--ink-2)' })}
      ${txt(W - 4, 11, Math.round(value), { anchor: 'end', size: 10, mono: true, weight: '700', fill: 'var(--ink)' })}
      ${B.map(b => txt(sx(b), H - 3, b, { anchor: 'middle', size: 7.5, mono: true })).join('')}
      ${txt(round(sx(target),1), H - 3, (es ? 'obj ' : 'tgt ') + Math.round(target), { anchor: 'middle', size: 7.5, mono: true, fill: 'var(--gold-hi)' })}
    </svg>
  </div>`;
}

/* ---------- Small multiples · un miniradar por líder, misma escala -------- */
function svgSmallMultiples(profiles, max) {
  const es = S.lang === 'es';
  const list = (profiles || []).slice(0, max || 8);
  if (!list.length) return `<div class="slos-empty"><i class="fas fa-users-slash"></i><h4>${esc(T().noLeaders)}</h4></div>`;
  const S1 = 104, c = S1 / 2, R = c - 12, n = SLS8.length;
  const pt = (i, v) => {
    const a = (i / n) * 2 * Math.PI - Math.PI / 2;
    return [round(c + Math.cos(a) * R * v, 1), round(c + Math.sin(a) * R * v, 1)];
  };
  const ring = g => `<polygon points="${Array.from({length:n},(_, i) => pt(i, g).join(',')).join(' ')}" fill="none" stroke="${GRID}"/>`;

  const cells = list.map(p => {
    const vals = SLS8.map((d, i) => pt(i, clamp(p.dims[d.key].v / 100, .04, 1)));
    const real = p.externals > 0;
    const tip = `${p.name} · ${p.index}${real ? ' (SLI)' : ' (BPI ~)'} · ${L(ARCHETYPES[p.archetype])}`;
    return `<figure class="slos-sm">
      <svg viewBox="0 0 ${S1} ${S1}" width="100%" role="img" aria-label="${esc(tip)}">
        <title>${esc(tip)}</title>
        ${ring(.5)}${ring(1)}
        <polygon points="${vals.map(v => v.join(',')).join(' ')}"
          fill="${real ? 'oklch(80% .115 88/.20)' : 'oklch(84% .115 178/.14)'}"
          stroke="${real ? 'var(--gold)' : 'var(--teal)'}"
          stroke-width="1.6" stroke-linejoin="round" ${real ? '' : 'stroke-dasharray="3 2"'}/>
      </svg>
      <figcaption>
        <strong>${esc(p.name)}</strong>
        <span class="slos-num">${p.index}${real ? '' : ' ~'}</span>
      </figcaption>
    </figure>`;
  }).join('');

  return `<div class="slos-sm-grid">${cells}</div>
    <div class="slos-legend">
      <span><i class="k-solid"></i>${esc(es ? 'Medido con 360°' : 'Measured with 360°')}</span>
      <span><i class="k-dash"></i>${esc(es ? 'Estimado por proxy (~)' : 'Estimated by proxy (~)')}</span>
      <span class="slos-note">${esc(es ? 'Misma escala en los ocho ejes' : 'Same scale on all eight axes')}</span>
    </div>`;
}

/* ---------- Slope · evolución entre dos instantáneas ---------------------- */
function svgSlope(snapA, snapB) {
  const es = S.lang === 'es';
  const a = snapA && snapA.byLeader, b = snapB && snapB.byLeader;
  const names = a && b ? Object.keys(b).filter(k => a[k] != null) : [];
  if (!names.length) {
    return `<div class="slos-empty"><i class="fas fa-chart-line"></i>
      <h4>${esc(es ? 'Hace falta una segunda instantánea' : 'A second snapshot is needed')}</h4>
      <p>${esc(es ? 'El sistema registra una instantánea por día de uso. Con dos ya puede dibujar quién sube y quién baja.' : 'The system records one snapshot per day of use. With two it can already draw who rises and who falls.')}</p></div>`;
  }
  const W = 480, H = 300, P = 26, xL = 128, xR = W - 128;
  const all = names.map(k => a[k]).concat(names.map(k => b[k]));
  const mn = Math.min.apply(null, all), mx = Math.max.apply(null, all);
  const rg = (mx - mn) || 1;
  const sy = v => P + (1 - (v - mn) / rg) * (H - P * 2 - 20);

  const lines = names.map(k => {
    const y1 = sy(a[k]), y2 = sy(b[k]);
    const up = b[k] - a[k];
    const tip = `${k} · ${a[k]} → ${b[k]} (${up > 0 ? '+' : ''}${up})`;
    return `<g><title>${esc(tip)}</title>
      <line x1="${xL}" y1="${round(y1,1)}" x2="${xR}" y2="${round(y2,1)}"
        stroke="${up >= 0 ? 'var(--teal)' : 'var(--red)'}" stroke-width="${Math.abs(up) >= 4 ? 2.2 : 1.2}" opacity=".85"/>
      <circle cx="${xL}" cy="${round(y1,1)}" r="3" fill="var(--ink-3)"/>
      <circle cx="${xR}" cy="${round(y2,1)}" r="3.4" fill="${up >= 0 ? 'var(--teal)' : 'var(--red)'}"/>
      ${txt(xL - 8, y1 + 3, k + ' ' + a[k], { anchor: 'end', size: 9 })}
      ${txt(xR + 8, y2 + 3, b[k] + (up ? (up > 0 ? ' ▲' : ' ▼') : ' ='), { size: 9, mono: true, fill: 'var(--ink-2)' })}
    </g>`;
  }).join('');

  const fd = d => new Date(d).toLocaleDateString(S.lang === 'es' ? 'es-ES' : 'en-GB', { day: '2-digit', month: 'short' });
  const al = es
    ? `Evolución del índice de cada líder entre el ${fd(snapA.at)} y el ${fd(snapB.at)}`
    : `Index evolution per leader between ${fd(snapA.at)} and ${fd(snapB.at)}`;

  return `<div class="slos-chart">
    <svg viewBox="0 0 ${W} ${H}" width="100%" role="img" aria-label="${esc(al)}">
      <title>${esc(al)}</title>
      <line x1="${xL}" y1="${P - 10}" x2="${xL}" y2="${H - P - 10}" stroke="${GRID}"/>
      <line x1="${xR}" y1="${P - 10}" x2="${xR}" y2="${H - P - 10}" stroke="${GRID}"/>
      ${lines}
      ${txt(xL, H - 8, fd(snapA.at), { anchor: 'middle', size: 9, weight: '700' })}
      ${txt(xR, H - 8, fd(snapB.at), { anchor: 'middle', size: 9, weight: '700' })}
    </svg>
  </div>`;
}

/* ---------- Columnas · serie del índice, ahora en SVG de verdad ----------- */
function svgColumns(series, labels) {
  const es = S.lang === 'es';
  if (!series || !series.length) {
    return `<div class="slos-empty"><i class="fas fa-chart-column"></i><h4>${esc(T().empty)}</h4>
      <p>${esc(es ? 'Las instantáneas se registran automáticamente cada vez que abres el sistema.' : 'Snapshots are recorded automatically each time you open the system.')}</p></div>`;
  }
  const W = 560, H = 210, P = 30, base = H - 34;
  const mx = Math.max.apply(null, series.concat([1]));
  const cw = (W - P - 12) / series.length;
  const sy = v => base - (v / mx) * (base - 26);

  const bars = series.map((v, i) => {
    const x = P + i * cw + cw * 0.2, w = cw * 0.6;
    return `<g><title>${esc((labels[i] || '') + ' · ' + Math.round(v))}</title>
      <rect x="${round(x,1)}" y="${round(sy(v),1)}" width="${round(w,1)}" height="${round(Math.max(2, base - sy(v)),1)}" fill="var(--teal)" opacity=".85"/>
      ${txt(x + w / 2, sy(v) - 5, Math.round(v), { anchor: 'middle', size: 9, mono: true, fill: 'var(--ink-2)' })}
      ${txt(x + w / 2, base + 14, labels[i] || '', { anchor: 'middle', size: 8 })}
    </g>`;
  }).join('');

  const al = es
    ? `Índice medio en las últimas ${series.length} instantáneas, de ${Math.round(series[0])} a ${Math.round(series[series.length-1])}`
    : `Mean index across the last ${series.length} snapshots, from ${Math.round(series[0])} to ${Math.round(series[series.length-1])}`;

  return `<div class="slos-chart">
    <svg viewBox="0 0 ${W} ${H}" width="100%" role="img" aria-label="${esc(al)}">
      <title>${esc(al)}</title>
      <line x1="${P}" y1="${base}" x2="${W - 12}" y2="${base}" stroke="${AXIS}"/>
      ${[0, .5, 1].map(g => `<line x1="${P}" y1="${round(sy(mx*g),1)}" x2="${W-12}" y2="${round(sy(mx*g),1)}" stroke="${GRID}"/>` + txt(P - 6, sy(mx*g) + 3, Math.round(mx*g), { anchor: 'end', size: 8, mono: true })).join('')}
      ${bars}
    </svg>
  </div>`;
}

/* ==========================================================================
 * 11.c · TABLA DE DATOS
 * --------------------------------------------------------------------------
 * Un único componente para todas las tablas del sistema: encabezado fijo al
 * hacer scroll dentro del propio contenedor, ordenación por columna con
 * indicador de dirección, cifras tabulares alineadas a la derecha, microbarras
 * en celda, fila de medias diferenciada y densidad conmutable.
 * ========================================================================== */
const TABLES = {};

/**
 * cols: [{ key, label, align, num, bar, fmt(row), sortVal(row) }]
 * rows: array de objetos
 * summary: { label, cells:{key:valor} }
 */
function dataTable(cfg) {
  TABLES[cfg.id] = Object.assign({ sort: null, dense: false }, TABLES[cfg.id], cfg);
  return renderTable(cfg.id);
}

function sortedRows(t) {
  if (!t.sort) return t.rows.slice();
  const col = t.cols.filter(c => c.key === t.sort.key)[0];
  if (!col) return t.rows.slice();
  const val = r => (col.sortVal ? col.sortVal(r) : r[col.key]);
  return t.rows.slice().sort((a, b) => {
    const x = val(a), y = val(b);
    const c = (typeof x === 'number' && typeof y === 'number') ? x - y : String(x).localeCompare(String(y));
    return t.sort.dir === 'asc' ? c : -c;
  });
}

function renderTable(id) {
  const t = TABLES[id];
  if (!t) return '';
  const es = S.lang === 'es';
  const rows = sortedRows(t);

  const head = t.cols.map(c => {
    const on = t.sort && t.sort.key === c.key;
    const dir = on ? (t.sort.dir === 'asc' ? '↑' : '↓') : '';
    return `<th class="${c.num ? 'num' : ''}" data-sortk="${esc(id)}|${esc(c.key)}"
      aria-sort="${on ? (t.sort.dir === 'asc' ? 'ascending' : 'descending') : 'none'}"
      title="${esc(es ? 'Ordenar por ' + c.label : 'Sort by ' + c.label)}">
      <span>${esc(c.label)}<i class="sortmark">${dir}</i></span></th>`;
  }).join('');

  const body = rows.map(r => `<tr>${t.cols.map(c => {
    const raw = c.fmt ? c.fmt(r) : esc(r[c.key] == null ? '—' : r[c.key]);
    const bar = c.bar ? `<i class="slos-cellbar" style="width:${clamp(Number(c.bar(r)) || 0, 0, 100)}%"></i>` : '';
    return `<td class="${c.num ? 'num' : ''}">${bar}<span>${raw}</span></td>`;
  }).join('')}</tr>`).join('');

  const foot = t.summary ? `<tfoot><tr>${t.cols.map((c, i) => {
    const v = i === 0 ? t.summary.label : (t.summary.cells[c.key] != null ? t.summary.cells[c.key] : '');
    return `<td class="${c.num ? 'num' : ''}">${v}</td>`;
  }).join('')}</tr></tfoot>` : '';

  return `<div class="slos-tbl ${t.dense ? 'dense' : ''}" id="tbl-${esc(id)}">
    <div class="slos-tbl-bar">
      <span class="slos-note">${rows.length} ${esc(t.unit || (es ? 'filas' : 'rows'))}</span>
      <button class="slos-btn" data-density="${esc(id)}" aria-pressed="${t.dense}">
        <i class="fas fa-${t.dense ? 'up-right-and-down-left-from-center' : 'down-left-and-up-right-to-center'}"></i>
        ${esc(t.dense ? (es ? 'Cómoda' : 'Comfortable') : (es ? 'Compacta' : 'Compact'))}
      </button>
    </div>
    <div class="slos-tbl-scroll">
      <table class="slos-t2">
        <thead><tr>${head}</tr></thead>
        <tbody>${body}</tbody>
        ${foot}
      </table>
    </div>
  </div>`;
}

/** Repinta una tabla en su sitio, sin volver a renderizar la vista entera. */
function refreshTable(id) {
  const el = $('#tbl-' + id, root());
  if (!el) return;
  const tmp = document.createElement('div');
  tmp.innerHTML = renderTable(id);
  el.replaceWith(tmp.firstElementChild);
}

const heatClass = v => v >= 78 ? 'g' : v >= 62 ? 't' : v >= 48 ? 'a' : 'r';
function heatCell(v) {
  const map = { g:'var(--green)', t:'var(--teal)', a:'var(--amber)', r:'var(--red)' };
  const c = map[heatClass(v)];
  return `<span class="slos-hi" style="background:color-mix(in oklch, ${c} 17%, transparent);color:${c}">${Math.round(v)}</span>`;
}

function dimBar(labelHtml, v, real) {
  const cls = v >= 63 ? '' : v >= 45 ? 'mid' : 'lo';
  return `<div class="slos-dim">
    <div class="slos-dim-h">
      <span class="n">${labelHtml}</span>
      <span class="v" style="color:${v>=79?'var(--gold-hi)':v>=63?'var(--teal)':v>=45?'var(--amber)':'var(--red)'}">${Math.round(v)}${real ? '' : '<span style="color:var(--ink-4);font-size:9px;font-family:Inter Tight"> ~</span>'}</span>
    </div>
    <div class="slos-bar${real ? '' : ' ghost'}"><i class="${cls}" data-w="${clamp(v,0,100)}"></i></div>
  </div>`;
}

function evidenceChip(conf) {
  return `<span class="slos-pill ${conf.color}" title="${esc(T()[conf.desc])}"><i class="fas fa-shield-halved"></i> ${esc(T()[conf.label])}</span>`;
}

/* ==========================================================================
 * 12 · ESTRUCTURA DE LA APLICACIÓN
 * ========================================================================== */
const VIEWS = [
  { id:'dashboard',   sec:'navExec',   key:'vDash',        icon:'fa-gauge-high' },
  { id:'organization',sec:'navExec',   key:'vOrg',         icon:'fa-sitemap' },
  { id:'leaders',     sec:'navLead',   key:'vLeaders',     icon:'fa-user-tie' },
  { id:'mirror',      sec:'navLead',   key:'vMirror',      icon:'fa-circle-half-stroke' },
  { id:'maturity',    sec:'navLead',   key:'vMaturity',    icon:'fa-layer-group' },
  { id:'voice',       sec:'navPeople', key:'vVoice',       icon:'fa-comment-dots' },
  { id:'growth',      sec:'navPeople', key:'vGrowth',      icon:'fa-arrow-trend-up' },
  { id:'stories',     sec:'navPeople', key:'vStories',     icon:'fa-book-open' },
  { id:'experiments', sec:'navAction', key:'vExperiments', icon:'fa-flask' },
  { id:'coach',       sec:'navAction', key:'vCoach',       icon:'fa-wand-magic-sparkles' },
  { id:'method',      sec:'navAction', key:'vMethod',      icon:'fa-book-atlas' }
];

function shellHTML() {
  const t = T();
  let nav = '', lastSec = '';
  VIEWS.forEach(v => {
    if (v.sec !== lastSec) { nav += `<div class="slos-nav-sec">${esc(t[v.sec])}</div>`; lastSec = v.sec; }
    nav += `<button data-view="${v.id}" class="${v.id === S.view ? 'on' : ''}"><i class="fas ${v.icon}"></i><span>${esc(t[v.key])}</span></button>`;
  });

  return `
  <div class="slos-bg" aria-hidden="true"></div>
  <div class="slos-app">
    <aside class="slos-side">
      <div class="slos-brand">
<div class="slos-mark" style="width:auto;height:52px;overflow:hidden;background:transparent;padding:0">
<img src="imagen.png" alt="Logotipo" style="display:block;height:52px;width:auto;object-fit:contain;border-radius:12px">
</div>
<div style="text-align: center;">
<strong style="font-size: 22px; display: block; line-height: 1.2;">${esc(t.brand)}</strong>
<small style="font-size: 13px; display: block; letter-spacing: 0.04em;">${esc(t.brandSub)}</small>
</div>
</div>
<nav class="slos-nav" aria-label="${esc(t.brand)}">${nav}</nav>
<div class="slos-side-foot">
  <div style="margin-bottom:7px"><span class="slos-pill ${S.demo ? 'a' : 'g'}"><i class="fas fa-circle" style="font-size:6px"></i> ${esc(S.demo ? t.demoMode : t.connected)}</span></div>
  v${CFG.VERSION} · ${CFG.CODENAME}<br>
  <span style="opacity:.75">SLS-8 · van Dierendonck &amp; Nuijten (2011)</span>
</div>
    </aside>

    <main class="slos-main" id="slos-main">
      <div class="slos-top">
        <div class="slos-crumb">${esc(t.brand)} / <b id="slos-crumb">${esc(t.vDash)}</b></div>
        <div class="slos-top-r">
          <input id="slos-q" class="slos-in slos-search" placeholder="${esc(t.search)}" aria-label="${esc(t.search)}">
          <button class="slos-btn" id="slos-cmd-btn"><i class="fas fa-terminal"></i> <span class="slos-kbd">⌘K</span></button>
          <button class="slos-btn" id="slos-lang" title="ES / EN"><i class="fas fa-language"></i> ${S.lang.toUpperCase()}</button>
          <button class="slos-btn" id="slos-brief"><i class="fas fa-file-lines"></i> ${esc(t.exportBrief)}</button>
          <button class="slos-btn gold" id="slos-new-exp"><i class="fas fa-plus"></i> ${esc(t.newExperiment)}</button>
          <button class="slos-btn icon" id="slos-close" title="${esc(t.close)}" aria-label="${esc(t.close)}"><i class="fas fa-xmark"></i></button>
        </div>
      </div>
      <div id="slos-views"></div>
    </main>
  </div>

  <div class="slos-ov" id="slos-modal" role="dialog" aria-modal="true">
    <div class="slos-modal"><div id="slos-modal-body"></div></div>
  </div>

  <div class="slos-cmd" id="slos-cmd">
    <div class="slos-cmd-box">
      <input id="slos-cmd-in" placeholder="${esc(t.cmdPalette)}…" aria-label="${esc(t.cmdPalette)}">
      <div class="slos-cmd-list" id="slos-cmd-list"></div>
    </div>
  </div>

  <div class="slos-rp" id="slos-report" role="dialog" aria-modal="true" aria-labelledby="slos-rp-title">
    <div class="slos-rp-top">
      <div class="slos-rp-id"><strong id="slos-rp-title"></strong><span id="slos-rp-date"></span></div>
      <button class="slos-btn" data-act="rp-print"><i class="fas fa-print"></i> ${esc(t.print)}</button>
      <button class="slos-btn" data-act="rp-copy"><i class="fas fa-copy"></i> ${esc(t.copyBrief)}</button>
      <button class="slos-btn" data-act="rp-html"><i class="fas fa-file-code"></i> ${esc(t.rpHtml)}</button>
      <button class="slos-btn gold" data-act="export-pdf"><i class="fas fa-file-pdf"></i> PDF</button>
      <button class="slos-btn icon" id="slos-rp-close" data-act="rp-close" title="${esc(t.rpCloseR)}" aria-label="${esc(t.rpCloseR)}"><i class="fas fa-xmark"></i></button>
    </div>
    <div class="slos-rp-body">
      <nav class="slos-rp-nav" id="slos-rp-index" aria-label="${esc(t.rpIndex)}"></nav>
      <div class="slos-rp-doc" id="slos-rp-doc" tabindex="-1"></div>
    </div>
  </div>

  <div class="slos-toasts"></div>`;
}

/* ==========================================================================
 * 13 · VISTAS
 * ========================================================================== */
const R = {};

function hero(badge, title, quote, lead, right, cls) {
  return `<div class="slos-card slos-hero ${cls || ''}" data-rv>
    <div class="slos-hero-flex">
      <div style="flex:1;min-width:min(100%,330px)">
        <span class="slos-eyebrow">${badge}</span>
        <h1>${esc(title)}</h1>
        ${quote ? `<p class="q">“${esc(quote)}”</p>` : ''}
        ${lead ? `<p>${lead}</p>` : ''}
      </div>
      ${right || ''}
    </div>
  </div>`;
}
const sec = (h2, sub, extra) => `<div class="slos-sec" data-rv><div><h2>${esc(h2)}</h2>${sub ? `<div class="slos-sub">${sub}</div>` : ''}</div>${extra || ''}</div>`;
const kpi = (lbl, val, sub, opt) => {
  const o = opt || {};
  // view-transition-name hace que el KPI compartido entre vistas se desplace
  // en lugar de desaparecer y reaparecer. El navegador se encarga del resto.
  const vt = o.vt ? ` style="view-transition-name:slos-kpi-${esc(o.vt)}"` : '';
  return `<div class="slos-card slos-kpi ${o.hl ? 'hl' : ''}"${vt} data-rv data-d="${o.d || 1}">
    <div class="lbl">${o.icon ? `<i class="fas ${o.icon}"></i>` : ''}${esc(lbl)}</div>
    <div class="val">${o.raw ? val : `<span data-count="${val}" data-dec="${o.dec || 0}" data-suf="${o.suf || ''}" data-pre="${o.pre || ''}">0</span>`}${o.unit ? `<small>${o.unit}</small>` : ''}</div>
    <div class="sub ${o.cls || ''}">${sub || ''}</div>
  </div>`;
};

/* ---------- 13.1 · Centro de mando --------------------------------------- */
R.dashboard = () => {
  const t = T(), es = S.lang === 'es', P = S.filtered, org = S.org;
  if (!P.length) return emptyState();

  const avg = Math.round(mean(P.map(p => p.index)));
  const anyReal = P.some(p => p.externals > 0);
  const conf = confidenceOf(Math.round(mean(P.map(p => p.externals))));
  const trust = Math.round(mean(P.map(p => p.trust)));
  const growth = Math.round(mean(P.map(p => p.growth)));
  const auto = Math.round(mean(P.map(p => p.autonomy)));
  const lev = Math.round(mean(P.map(p => p.dims.standing_back.v)));

  const orgDims = {};
  SLS8.forEach(d => orgDims[d.key] = { v: Math.round(mean(P.map(p => p.dims[d.key].v))), real: anyReal });

  const insights = generateInsights(P, org);
  const chain = insights.slice(0, 3);
  const snaps = S.snapshots.slice(-8);

  return `
  ${hero(`<i class="fas fa-crown"></i> ${esc(t.heroBadge)}`, t.heroTitle, t.heroQuote,
    esc(t.heroLead) + `<div style="margin-top:15px;display:flex;gap:8px;flex-wrap:wrap">
      ${evidenceChip(conf)}
      <span class="slos-pill t"><i class="fas fa-users"></i> ${P.length} ${esc(t.leaders)}</span>
      <span class="slos-pill"><i class="fas fa-folder-open"></i> ${org.projects} ${esc(t.projects)}</span>
      <span class="slos-pill"><i class="fas fa-list-check"></i> ${org.totalTasks} ${esc(t.tasks)}</span>
    </div>
    <div style="margin-top:15px;display:flex;gap:9px;flex-wrap:wrap">
      <button class="slos-btn gold" data-act="brief"><i class="fas fa-file-lines"></i> ${esc(t.viewBrief)}</button>
      ${!anyReal ? `<button class="slos-btn teal" data-act="assess"><i class="fas fa-clipboard-question"></i> ${esc(t.runAssessment)}</button>` : ''}
    </div>`,
    `<div style="display:flex;flex-direction:column;align-items:center;gap:9px">
      ${svgRing(avg, anyReal ? 'SLI' : 'BPI', 176)}
      <div class="slos-note" style="text-align:center;max-width:180px">${esc(anyReal ? t.kSLIs : t.kBPIs)}</div>
    </div>`)}

  ${!anyReal ? `<div class="slos-card accent" data-rv style="margin-top:14px;display:flex;gap:14px;align-items:flex-start">
    <i class="fas fa-triangle-exclamation" style="color:var(--amber);font-size:1.15rem;margin-top:2px"></i>
    <div>
      <h3 style="margin-bottom:5px">${esc(es ? 'Estás viendo proxies, no una medida de liderazgo de servicio' : 'You are seeing proxies, not a servant leadership measure')}</h3>
      <p class="slos-note">${esc(t.evNoneD)}</p>
      <button class="slos-btn teal" data-act="assess" style="margin-top:11px"><i class="fas fa-clipboard-question"></i> ${esc(t.runAssessment)}</button>
    </div>
  </div>` : ''}

  ${sec(t.sSignal, esc(anyReal ? t.sSignalSub : t.kBPIs), `<span class="slos-eyebrow teal">${anyReal ? 'SLS-8' : 'PROXY'}</span>`)}
  <div class="slos-g slos-g4">
    ${kpi(t.kTrust, trust, esc(t.kTrusts), { icon:'fa-handshake', unit:'/100', hl:true, d:1, vt:'trust' })}
    ${kpi(t.kGrowth, growth, esc(t.kGrowths), { icon:'fa-seedling', unit:'/100', d:2, vt:'growth' })}
    ${kpi(t.kAutonomy, auto, esc(t.kAutonomys), { icon:'fa-key', unit:'/100', d:3, vt:'autonomy' })}
    ${kpi(t.kLeverage, lev, esc(t.kLeverages), { icon:'fa-arrow-left-long', unit:'/100', d:4, vt:'leverage' })}
  </div>

  ${sec(t.sDims, t.sDimsSub)}
  <div class="slos-g slos-g-side">
    <div class="slos-card" data-rv>
      ${SLS8.map(d => dimBar(`<i class="fas ${d.icon}"></i>${esc(L(d))}<i class="fas fa-circle-info slos-help" title="${esc(S.lang === 'es' ? d.defEs : d.defEn)}"></i>`, orgDims[d.key].v, anyReal)).join('')}
      <p class="slos-note" style="margin-top:13px">${esc(es
        ? 'Las 8 dimensiones proceden del Servant Leadership Survey (van Dierendonck & Nuijten, 2011), validado sobre 1.571 personas. El símbolo ~ indica valor estimado por proxy conductual, no medido.'
        : 'The 8 dimensions come from the Servant Leadership Survey (van Dierendonck & Nuijten, 2011), validated on 1,571 people. The ~ symbol marks a value estimated by behavioural proxy, not measured.')}</p>
    </div>
    <div class="slos-card" data-rv data-d="2">
      <h3 style="margin-bottom:10px">${esc(es ? 'Perfil octogonal' : 'Octagonal profile')}</h3>
      ${svgRadar(orgDims, 296)}
    </div>
  </div>

  ${sec(t.sTelemetry, t.sTelemetrySub, `<span class="slos-eyebrow"><i class="fas fa-satellite-dish"></i> ${esc(es ? 'Capa A' : 'Layer A')}</span>`)}
  <div class="slos-g slos-g3">
    ${BEHAVIOR_SIGNALS.map((b, i) => {
      const v = Math.round((org[b.key] || 0) * 100);
      const dim = SLS8.find(d => d.key === b.proxyFor);
      return `<div class="slos-card" data-rv data-d="${(i % 3) + 1}">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:10px;margin-bottom:9px">
          <h3><i class="fas ${b.icon}" style="color:var(--teal);margin-right:6px"></i>${esc(L(b))}</h3>
          <span class="slos-num" style="font-size:1.3rem;color:${v>=70?'var(--gold-hi)':v>=50?'var(--teal)':'var(--amber)'}" data-count="${v}">0</span>
        </div>
        <div class="slos-bar"><i data-w="${v}"></i></div>
        <p class="slos-note" style="margin-top:9px">${esc(S.lang === 'es' ? b.es_how : b.en_how)}</p>
        <div style="margin-top:9px"><span class="slos-pill gd">${esc(t.proxyFor)}: ${esc(L(dim))}</span></div>
      </div>`;
    }).join('')}
  </div>

  ${sec(t.sChain, t.sChainSub)}
  <div class="slos-g slos-g3">
    ${chain.length ? chain.map((c, i) => `
      <div class="slos-card ${i === 2 ? 'ai' : ''}" data-rv data-d="${i+1}">
        <span class="slos-eyebrow ${c.p === 'high' ? '' : 'teal'}"><i class="fas ${c.icon}"></i> ${['01 · SEÑAL','02 · HISTORIA','03 · ACCIÓN'][i] || '0' + (i+1)}</span>
        <h3 style="margin:12px 0 7px;font-size:14px">${esc(c.signal)}</h3>
        <p class="slos-note">${esc(c.story)}</p>
        <div style="margin-top:11px;padding-top:11px;border-top:1px solid var(--line)">
          <p style="font-size:11.5px;color:var(--ink-2)"><strong style="color:var(--gold-hi)">${esc(S.lang==='es'?'Acción:':'Action:')}</strong> ${esc(c.action)}</p>
          ${c.cta ? `<button class="slos-btn teal" style="margin-top:10px" data-act="${esc(c.cta)}"><i class="fas fa-play"></i> ${esc(t.start)}</button>` : ''}
          <div class="slos-note" style="margin-top:8px;opacity:.7">${esc(c.ref || '')}</div>
        </div>
      </div>`).join('') : `<div class="slos-card"><div class="slos-empty"><i class="fas fa-check"></i><h4>${esc(es?'Sin alertas activas':'No active alerts')}</h4></div></div>`}
  </div>

  ${sec(es ? 'De qué se compone el índice' : 'What the index is made of',
        esc(es ? 'Cada componente aporta su parte ponderada hasta el total. Los pesos son los del instrumento, no elegidos aquí.'
               : 'Each component contributes its weighted share up to the total. The weights come from the instrument, not chosen here.'))}
  <div class="slos-card" data-rv>
    ${(() => {
      const w = { delegation:.22, spotlight:.20, equity:.16, followthrough:.16, growthsurface:.14, resilience:.12 };
      const parts = BEHAVIOR_SIGNALS.filter(b => w[b.key] != null).map(b => ({
        label: L(b), short: L(b).split(/\s+/)[0], w: w[b.key], v: (org[b.key] || 0) * w[b.key] * 100
      }));
      return svgWaterfall(parts, Math.round(mean(P.map(p => p.bpi))));
    })()}
    <p class="slos-note" style="margin-top:var(--s2)">${esc(es
      ? 'Esta descomposición es la del índice conductual, el que se deriva de las tareas. El índice de percepción no se descompone así: sus ocho dimensiones se miden por separado y se ponderan por su carga factorial.'
      : 'This breakdown belongs to the behavioural index, the one derived from tasks. The perception index does not decompose this way: its eight dimensions are measured separately and weighted by factor loading.')}</p>
  </div>

  ${sec(t.sEvolution, t.sEvolutionSub)}
  <div class="slos-g slos-g-side">
    <div class="slos-card" data-rv>
      ${svgColumns(snaps.map(s => s.index), snaps.map(s => new Date(s.at).toLocaleDateString(S.lang === 'es' ? 'es-ES' : 'en-GB', { day:'2-digit', month:'short' })))}
    </div>
    <div class="slos-card" data-rv data-d="2">
      <h3 style="margin-bottom:var(--s2)">${esc(es ? 'Quién sube y quién baja' : 'Who rises and who falls')}</h3>
      ${svgSlope(S.snapshots[S.snapshots.length - 2], S.snapshots[S.snapshots.length - 1])}
    </div>
  </div>

  ${sec(t.sImpact, t.sImpactSub)}
  <div class="slos-g slos-g4">
    ${kpi(es ? 'Distribución del trabajo' : 'Work distribution', Math.round(org.delegation*100), esc(es?'Entropía normalizada':'Normalised entropy'), { icon:'fa-share-nodes', unit:'/100', d:1 })}
    ${kpi(es ? 'Riesgo de concentración' : 'Concentration risk', Math.round(org.busFactor*100), esc(es?'Carga en la persona top':'Load on top person'), { icon:'fa-cubes-stacked', unit:'%', cls: org.busFactor>.34?'slos-down':'slos-up', d:2 })}
    ${kpi(es ? 'Cumplimiento' : 'Completion', Math.round(org.completion*100), `${org.done} / ${org.totalTasks} ${esc(t.tasks)}`, { icon:'fa-circle-check', unit:'%', d:3 })}
    ${kpi(es ? 'Equidad de carga' : 'Load equity', Math.round((1-org.giniLoad)*100), `Gini ${round(org.giniLoad,2)}`, { icon:'fa-scale-balanced', unit:'/100', d:4 })}
  </div>`;
};

/* ---------- 13.2 · Organización ------------------------------------------ */
R.organization = () => {
  const t = T(), es = S.lang === 'es', P = S.filtered;
  if (!P.length) return emptyState();
  const projects = readProjects();

  const rows = projects.map(pr => {
    const tasks = Array.isArray(pr.tasks) ? pr.tasks : [];
    const who = {};
    tasks.forEach(x => { const a = String(x.assignee||'').trim(); if (a) who[a] = (who[a]||0)+1; });
    const counts = Object.values(who);
    const done = tasks.filter(x => /^(completed|completado|done)$/i.test(String(x.status||''))).length;
    const late = tasks.filter(x => /^(overdue|rezagado|retrasado)$/i.test(String(x.status||''))).length;
    const members = P.filter(p => p.projects.indexOf(pr.name) > -1);
    return {
      name: pr.name || '—',
      people: counts.length,
      tasks: tasks.length,
      delegation: Math.round(normEntropy(counts) * 100),
      equity: Math.round((1 - gini(counts)) * 100),
      followthrough: Math.round(((done + late) ? done / (done + late) : 0) * 100),
      autonomy: members.length ? Math.round(mean(members.map(m => m.autonomy))) : 0
    };
  }).sort((a,b) => b.tasks - a.tasks);

  const worst = rows.slice().sort((a,b) => (a.delegation+a.equity) - (b.delegation+b.equity))[0];
  const P3 = P.slice().sort((a,b) => a.index - b.index).slice(0,3);

  return `
  ${hero(`<i class="fas fa-sitemap"></i> ${esc(es?'Inteligencia organizativa':'Organisation intelligence')}`,
    es ? '¿Dónde prospera el liderazgo?' : 'Where leadership is thriving',
    null,
    esc(es ? 'Mapa de calor por proyecto real de tu sistema. Cada celda es un proxy conductual calculado sobre las tareas asignadas.'
           : 'Heatmap over your system\'s real projects. Each cell is a behavioural proxy computed on assigned tasks.'))}

  ${sec(t.sHeatmap, esc(es ? 'Verde ≥78 · Teal ≥62 · Ámbar ≥48 · Rojo <48' : 'Green ≥78 · Teal ≥62 · Amber ≥48 · Red <48'))}
  <div class="slos-card" data-rv>
    <div class="slos-tw">
      <div class="slos-heat" style="grid-template-columns:minmax(150px,1.6fr) repeat(5,minmax(74px,1fr))">
        <div class="hd">${esc(es?'Proyecto':'Project')}</div>
        <div class="hd">${esc(es?'Personas':'People')}</div>
        <div class="hd">${esc(es?'Delegación':'Delegation')}</div>
        <div class="hd">${esc(es?'Equidad':'Equity')}</div>
        <div class="hd">${esc(es?'Cumplim.':'Follow-thr.')}</div>
        <div class="hd">${esc(es?'Autonomía':'Autonomy')}</div>
        ${rows.map(r => `
          <div style="font-weight:600;font-size:11.5px">${esc(r.name)}<div class="slos-note">${r.tasks} ${esc(t.tasks)}</div></div>
          <div style="text-align:center;font-family:'JetBrains Mono',monospace">${r.people}</div>
          <div>${heatCell(r.delegation)}</div>
          <div>${heatCell(r.equity)}</div>
          <div>${heatCell(r.followthrough)}</div>
          <div>${heatCell(r.autonomy)}</div>`).join('')}
      </div>
    </div>
  </div>

  ${sec(es ? 'Reparto de la carga' : 'Load distribution',
        esc(es ? 'La curva se aleja de la diagonal exactamente lo que de desigual es el reparto'
               : 'The curve departs from the diagonal by exactly how unequal the split is'))}
  <div class="slos-g slos-g-side">
    <div class="slos-card" data-rv>
      ${svgLorenz(P.map(x => x.tasks), P.map(x => x.name))}me))}
    </div>
    <div class="slos-card" data-rv data-d="2">
      <h3 style="margin-bottom:var(--s2)">${esc(es ? 'Cómo leerla' : 'How to read it')}</h3>
      <p class="slos-note">${esc(es
        ? 'La diagonal es el reparto perfectamente igualitario: la mitad de las personas cargaría con la mitad del trabajo. La curva real siempre queda por debajo. El área entre las dos es el coeficiente de Gini, y es la parte del trabajo que descansa sobre quien no debería.'
        : 'The diagonal is a perfectly equal split: half the people would carry half the work. The real curve always sits below it. The area between the two is the Gini coefficient, and it is the share of work resting on people it should not.')}</p>
      <div style="margin-top:var(--s3)">
        ${svgBullet(Math.round((1 - S.org.giniLoad) * 100), 58, es ? 'Equidad de carga' : 'Load equity')}
      </div>
      <div style="margin-top:var(--s2)">
        ${svgBullet(Math.round(S.org.delegation * 100), 55, es ? 'Amplitud de delegación' : 'Delegation breadth')}
      </div>
    </div>
  </div>

  ${sec(t.sPriorities, esc(es?'Derivadas de las señales más débiles del sistema':'Derived from the system\'s weakest signals'))}
  <div class="slos-g slos-g3">
    ${worst ? `<div class="slos-card accent" data-rv>
      <span class="slos-eyebrow">${esc(es?'Prioridad 01':'Priority 01')}</span>
      <h3 style="margin:12px 0 7px">${esc(es?'Intervenir en':'Intervene in')} ${esc(worst.name)}</h3>
      <p class="slos-note">${esc(es
        ? `Delegación ${worst.delegation} y equidad ${worst.equity}. Es el proyecto donde el trabajo circula peor y la carga está peor repartida.`
        : `Delegation ${worst.delegation} and equity ${worst.equity}. This is where work circulates worst and load is worst distributed.`)}</p>
    </div>` : ''}
    ${P3[0] ? `<div class="slos-card" data-rv data-d="2">
      <span class="slos-eyebrow teal">${esc(es?'Prioridad 02':'Priority 02')}</span>
      <h3 style="margin:12px 0 7px">${esc(es?'Acompañar a':'Support')} ${esc(P3[0].name)}</h3>
      <p class="slos-note">${esc(es
        ? `Índice ${P3[0].index}/100, dimensión más débil: ${L(SLS8.find(d=>d.key===P3[0].weakest.key))}. Empezar por una conversación, no por un plan.`
        : `Index ${P3[0].index}/100, weakest dimension: ${L(SLS8.find(d=>d.key===P3[0].weakest.key))}. Start with a conversation, not a plan.`)}</p>
    </div>` : ''}
    <div class="slos-card" data-rv data-d="3">
      <span class="slos-eyebrow teal">${esc(es?'Prioridad 03':'Priority 03')}</span>
      <h3 style="margin:12px 0 7px">${esc(es?'Cerrar la brecha de evidencia':'Close the evidence gap')}</h3>
      <p class="slos-note">${esc(es
        ? 'Sin percepción 360° ninguna de estas prioridades es concluyente. Tres evaluadores por líder convierten indicios en base de decisión.'
        : 'Without 360° perception none of these priorities is conclusive. Three raters per leader turn hints into a decision basis.')}</p>
      <button class="slos-btn teal" style="margin-top:11px" data-act="assess"><i class="fas fa-clipboard-question"></i> ${esc(t.runAssessment)}</button>
    </div>
  </div>`;
};

/* ---------- 13.3 · Líderes ----------------------------------------------- */
R.leaders = () => {
  const t = T(), es = S.lang === 'es', P = S.filtered;
  if (!P.length) return emptyState();
  const sorted = P.slice().sort((a,b) => b.index - a.index);

  return `
  ${hero(`<i class="fas fa-user-tie"></i> ${esc(es?'Portafolio de liderazgo':'Leadership portfolio')}`,
    t.vLeaders, null,
    esc(es ? 'Cada línea combina evidencia conductual y, cuando existe, percepción 360°. La columna Evidencia te dice cuánto puedes fiarte de la fila.'
           : 'Each row combines behavioural evidence and, when available, 360° perception. The Evidence column tells you how much you can trust the row.'))}

  ${sec(t.sPortfolio, esc(es ? 'Clic en cualquier encabezado para reordenar' : 'Click any header to reorder'),
        `<span class="slos-eyebrow teal">${sorted.length} ${esc(t.leaders)}</span>`)}

  <div class="slos-card" data-rv>
    ${dataTable({
      id: 'leaders',
      unit: es ? 'líderes' : 'leaders',
      cols: [
        { key:'name', label:t.thLeader, fmt: r => `<span class="slos-who"><span class="slos-av">${esc(initials(r.name))}</span>
            <span><span class="nm">${esc(r.name)}</span><span class="mt" style="display:block">${r.p.projects.length} ${esc(t.projects)} · ${r.p.tasks} ${esc(t.tasks)}</span></span></span>` },
        { key:'archetype', label:t.thArchetype, fmt: r => `<span class="slos-pill"><i class="fas ${ARCHETYPES[r.p.archetype].icon}"></i> ${esc(L(ARCHETYPES[r.p.archetype]))}</span>` },
        { key:'index', label:t.thSLI, num:true, bar: r => r.index,
          fmt: r => `<span class="slos-num" style="color:${r.index>=79?'var(--gold-hi)':r.index>=63?'var(--teal)':r.index>=45?'var(--amber)':'var(--red)'}">${r.index}</span>${r.p.indexKind==='bpi'?'<span class="slos-note"> ~</span>':''}` },
        { key:'trust',  label:t.thTrust,  num:true, bar: r => r.trust },
        { key:'growth', label:t.thGrowth, num:true, bar: r => r.growth },
        { key:'dependency', label:t.thDependency, num:true,
          fmt: r => `<span class="slos-pill ${r.dependency>30?'r':r.dependency>18?'a':'g'}">${r.dependency}%</span>` },
        { key:'evidence', label:t.thEvidence, sortVal: r => r.p.externals, fmt: r => evidenceChip(r.p.conf) },
        { key:'actions', label:t.thActions, num:true, sortVal: r => r.name, fmt: r => `
            <button class="slos-btn icon" title="${esc(t.assess)}" aria-label="${esc(t.assess)} ${esc(r.name)}" data-act="assess:${esc(r.name)}"><i class="fas fa-clipboard-question"></i></button>
            <button class="slos-btn icon" title="${esc(t.schedule)}" aria-label="${esc(t.schedule)} ${esc(r.name)}" data-act="session:${esc(r.name)}"><i class="fas fa-calendar-plus"></i></button>
            <button class="slos-btn icon" title="${esc(t.profile)}" aria-label="${esc(t.profile)} ${esc(r.name)}" data-act="mirror:${esc(r.name)}"><i class="fas fa-circle-half-stroke"></i></button>` }
      ],
      rows: sorted.map(p => ({ p, name:p.name, archetype:L(ARCHETYPES[p.archetype]),
                               index:p.index, trust:p.trust, growth:p.growth,
                               dependency:p.dependency, evidence:T()[p.conf.label], actions:'' })),
      summary: { label: es ? 'Media' : 'Mean', cells: {
        index:  Math.round(mean(sorted.map(p => p.index))),
        trust:  Math.round(mean(sorted.map(p => p.trust))),
        growth: Math.round(mean(sorted.map(p => p.growth))),
        dependency: Math.round(mean(sorted.map(p => p.dependency))) + '%'
      } }
    })}
  </div>

  ${sec(es ? 'Los ocho perfiles, a la misma escala' : 'Eight profiles, same scale',
        esc(es ? 'Cada octógono es un líder. Contorno continuo cuando hay percepción medida, discontinuo cuando es proxy.'
               : 'Each octagon is one leader. Solid outline when perception is measured, dashed when it is a proxy.'))}
  <div class="slos-card" data-rv>
    ${svgSmallMultiples(sorted)}
  </div>

  ${sec(es?'Perfiles destacados':'Highlighted profiles', esc(es?'Los tres extremos del portafolio':'The three extremes of the portfolio'))}
  <div class="slos-g slos-g3">
    ${[sorted[0], sorted[Math.floor(sorted.length/2)], sorted[sorted.length-1]].filter(Boolean).map((p, i) => {
      const arc = ARCHETYPES[p.archetype];
      return `<div class="slos-card ${i===0?'accent':''}" data-rv data-d="${i+1}">
        <div style="display:flex;gap:11px;align-items:center;margin-bottom:12px">
          <span class="slos-av" style="width:38px;height:38px;border-radius:11px;font-size:12px">${esc(initials(p.name))}</span>
          <div><div style="font-weight:650">${esc(p.name)}</div>
          <div class="slos-note"><i class="fas ${arc.icon}"></i> ${esc(L(arc))} · ${esc(L(p.maturity))}</div></div>
        </div>
        ${SLS8.slice(0,4).map(d => dimBar(`<i class="fas ${d.icon}"></i>${esc(L(d))}`, p.dims[d.key].v, p.dims[d.key].real)).join('')}
        <div style="margin-top:12px;display:flex;gap:7px;flex-wrap:wrap">
          ${evidenceChip(p.conf)}
          <button class="slos-btn" style="font-size:11px;padding:6px 10px" data-act="mirror:${esc(p.name)}"><i class="fas fa-circle-half-stroke"></i> ${esc(t.profile)}</button>
        </div>
      </div>`;
    }).join('')}
  </div>`;
};

/* ---------- 13.4 · Espejo 360° ------------------------------------------- */
R.mirror = () => {
  const t = T(), es = S.lang === 'es', P = S.filtered;
  if (!P.length) return emptyState();
  const p = P.find(x => x.name === S.focus) || P.slice().sort((a,b) => b.externals - a.externals)[0];
  const arc = ARCHETYPES[p.archetype];

  const selector = `<select id="slos-mirror-sel" class="slos-in">${P.map(x =>
    `<option value="${esc(x.name)}" ${x.name===p.name?'selected':''}>${esc(x.name)}${x.externals?'':' ·  ~'}</option>`).join('')}</select>`;

  if (!p.ps) return `
    ${hero(`<i class="fas fa-circle-half-stroke"></i> ${esc(es?'Percepción 360°':'360° perception')}`, t.vMirror, null,
      esc(es?'Comparación entre autopercepción, equipo, pares y superior.':'Comparison between self, team, peers and manager.'),
      `<div>${selector}</div>`)}
    <div class="slos-card" data-rv style="margin-top:14px">
      <div class="slos-empty">
        <i class="fas fa-clipboard-question"></i>
        <h4>${esc(t.noPerception)} · ${esc(p.name)}</h4>
        <p>${esc(t.noPerceptionD)}</p>
        <button class="slos-btn gold" style="margin-top:15px" data-act="assess:${esc(p.name)}"><i class="fas fa-play"></i> ${esc(t.runAssessment)}</button>
      </div>
    </div>
    <div class="slos-card" data-rv data-d="2" style="margin-top:14px">
      <h3 style="margin-bottom:11px">${esc(es?'Mientras tanto: proxy conductual':'Meanwhile: behavioural proxy')}</h3>
      ${SLS8.map(d => dimBar(`<i class="fas ${d.icon}"></i>${esc(L(d))}`, p.dims[d.key].v, false)).join('')}
      <p class="slos-note" style="margin-top:12px">${esc(t.evNoneD)}</p>
    </div>`;

  const gaps = SLS8.map(d => ({ d, g: p.ps.dims[d.key].gap })).filter(x => x.g != null).sort((a,b) => b.g - a.g);
  const worst = gaps[0];

  return `
  ${hero(`<i class="fas fa-circle-half-stroke"></i> ${esc(es?'Percepción 360°':'360° perception')}`, p.name,
    null,
    `<span class="slos-pill"><i class="fas ${arc.icon}"></i> ${esc(L(arc))}</span>
     <span class="slos-pill t">${esc(L(p.maturity))}</span>
     ${evidenceChip(p.conf)}
     <span class="slos-pill">${p.ps.raters} ${esc(es?'evaluadores':'raters')}</span>
     <div style="margin-top:13px">${selector}</div>`,
    `<div>${svgRing(p.index, 'SLI', 156)}</div>`)}

  ${sec(t.sMirror, esc(es?'Escala 1-6 · brecha = auto − equipo':'1-6 scale · gap = self − team'))}
  <div class="slos-card" data-rv>
    ${svgDumbbell(p.ps)}
  </div>

  <div class="slos-card" data-rv data-d="2" style="margin-top:var(--s2)">
    ${(() => {
      const f = v => v == null ? '—' : round(v, 1);
      return dataTable({
        id: 'mirror',
        unit: es ? 'dimensiones' : 'dimensions',
        cols: [
          { key:'dim',  label:t.thDimension, fmt: r => `<i class="fas ${r.icon}" style="color:var(--ink-4);width:14px"></i> ${esc(r.dim)}` },
          { key:'self', label:t.thSelf,    num:true, fmt: r => f(r.self) },
          { key:'team', label:t.thTeam,    num:true, fmt: r => f(r.team) },
          { key:'peer', label:t.thPeers,   num:true, fmt: r => f(r.peer) },
          { key:'manager', label:t.thManager, num:true, fmt: r => f(r.manager) },
          { key:'gap',  label:t.thGap,     num:true, sortVal: r => (r.gap == null ? -99 : r.gap),
            fmt: r => r.gap == null ? '—' :
              `<strong class="${r.gap >= .9 ? 'slos-down' : r.gap <= -.5 ? 'slos-up' : 'slos-flat'}">${(r.gap > 0 ? '+' : '') + round(r.gap,1)}</strong>` }
        ],
        rows: SLS8.map(d => {
          const x = p.ps.dims[d.key];
          return { dim:L(d), icon:d.icon, self:x.self, team:x.team, peer:x.peer, manager:x.manager, gap:x.gap };
        }),
        summary: (() => {
          const gs = SLS8.map(d => p.ps.dims[d.key].gap).filter(g => g != null);
          const os = SLS8.map(d => p.ps.dims[d.key].others).filter(v => v != null);
          const ss = SLS8.map(d => p.ps.dims[d.key].self).filter(v => v != null);
          return { label: es ? 'Media' : 'Mean',
                   cells: { self: ss.length ? round(mean(ss),1) : '—',
                            team: os.length ? round(mean(os),1) : '—',
                            gap:  gs.length ? (mean(gs) > 0 ? '+' : '') + round(mean(gs),1) : '—' } };
        })()
      });
    })()}
  </div>

  <div class="slos-g slos-g2" style="margin-top:14px">
    <div class="slos-card" data-rv>
      <h3 style="margin-bottom:10px">${esc(es?'Perfil octogonal':'Octagonal profile')}</h3>
      ${svgRadar(p.dims, 292)}
    </div>
    ${worst && worst.g >= .5 ? `<div class="slos-card ai" data-rv data-d="2">
      <span class="slos-eyebrow teal"><i class="fas fa-eye-slash"></i> ${esc(t.blindSpot)}</span>
      <h3 style="margin:13px 0 8px;font-size:1.05rem">${esc(L(worst.d))}</h3>
      <p style="color:var(--ink-2);font-size:12.5px">${esc(es
        ? `Te evalúas ${round(worst.g,1)} puntos por encima de como te ve tu equipo en esta dimensión.`
        : `You rate yourself ${round(worst.g,1)} points above how your team sees you on this dimension.`)}</p>
      <p class="slos-note" style="margin-top:9px">${esc(t.blindSpotD)} ${esc(es
        ? 'La brecha auto-otros es el dato individual más accionable de una evaluación 360°: no requiere interpretación, requiere conversación.'
        : 'The self-other gap is the most actionable individual datum in a 360°: it needs no interpretation, it needs a conversation.')}</p>
      ${(() => {
        const ex = EXPERIMENT_LIBRARY.filter(e => e.dim === worst.d.key)[0] || EXPERIMENT_LIBRARY[0];
        return `<div style="margin-top:14px;padding-top:13px;border-top:1px solid var(--line)">
          <span class="slos-eyebrow">${esc(es?'Experimento recomendado':'Recommended experiment')}</span>
          <h3 style="margin:10px 0 6px">${esc(L(ex))}</h3>
          <p class="slos-note">${esc(S.lang==='es'?ex.es_d:ex.en_d)}</p>
          <button class="slos-btn gold" style="margin-top:11px" data-act="experiment:${ex.id}"><i class="fas fa-play"></i> ${esc(t.start)} · ${ex.days} ${esc(t.days)}</button>
        </div>`;
      })()}
    </div>` : `<div class="slos-card" data-rv data-d="2"><div class="slos-empty"><i class="fas fa-circle-check"></i><h4>${esc(es?'Sin puntos ciegos relevantes':'No relevant blind spots')}</h4><p>${esc(es?'La autopercepción está alineada con la del equipo en todas las dimensiones.':'Self-perception is aligned with the team across all dimensions.')}</p></div></div>`}
  </div>`;
};

/* ---------- 13.5 · Madurez ----------------------------------------------- */
R.maturity = () => {
  const t = T(), es = S.lang === 'es', P = S.filtered;
  if (!P.length) return emptyState();
  const dist = MATURITY.map(m => ({ m, n: P.filter(p => p.maturity.lvl === m.lvl).length }));

  return `
  ${hero(`<i class="fas fa-layer-group"></i> ${esc(es?'Modelo de madurez':'Maturity model')}`,
    es ? 'De hacer seguidores a hacer líderes' : 'From follower-maker to leader-maker',
    null,
    esc(es ? 'La madurez se basa en capacidad observable creada, no en popularidad ni en antigüedad.'
           : 'Maturity is based on observable capability created, not popularity or tenure.'))}

  <div class="slos-g slos-g6" style="margin-top:16px;grid-template-columns:repeat(5,minmax(0,1fr))">
    ${dist.map((x, i) => `<div class="slos-card ${x.n ? 'accent' : ''}" data-rv data-d="${i+1}" style="text-align:center">
      <i class="fas ${x.m.icon}" style="font-size:1.35rem;color:${x.n?'var(--gold)':'var(--ink-4)'};margin-bottom:9px"></i>
      <div class="slos-eyebrow" style="margin-bottom:8px">0${x.m.lvl}</div>
      <h3 style="margin-bottom:5px">${esc(L(x.m))}</h3>
      <div class="slos-num" style="font-size:1.6rem;color:${x.n?'var(--gold-hi)':'var(--ink-4)'}" data-count="${x.n}">0</div>
      <p class="slos-note" style="margin-top:7px">${esc(S.lang==='es'?x.m.es_d:x.m.en_d)}</p>
      <div class="slos-note" style="margin-top:7px;opacity:.6">${x.m.range[0]}–${x.m.range[1]}</div>
    </div>`).join('')}
  </div>

  ${sec(t.sMatrix, esc(es?'Dónde opera hoy cada capacidad':'Where each capability operates today'))}
  <div class="slos-card" data-rv>
    <div class="slos-tw"><table class="slos-t">
      <thead><tr><th>${esc(es?'Capacidad':'Capability')}</th><th>${esc(es?'Individuo':'Individual')}</th><th>${esc(es?'Equipo':'Team')}</th><th>${esc(es?'Organización':'Organisation')}</th><th>${esc(es?'Ecosistema':'Ecosystem')}</th></tr></thead>
      <tbody>${[
        ['humility',[1,0,0,0]],['authenticity',[1,1,0,0]],['empowerment',[0,1,1,0]],
        ['stewardship',[0,0,1,1]],['standing_back',[0,1,1,0]],['courage',[1,1,0,0]]
      ].map(r => {
        const d = SLS8.find(x => x.key === r[0]);
        const avg = Math.round(mean(P.map(p => p.dims[r[0]].v)));
        return `<tr><td><i class="fas ${d.icon}" style="color:var(--ink-4);width:14px"></i> ${esc(L(d))} <span class="slos-num" style="color:var(--ink-4);font-size:10px">${avg}</span></td>
        ${r[1].map(v => `<td style="font-size:15px;color:${v?'var(--gold)':'var(--ink-4)'}">${v?'●':'○'}</td>`).join('')}</tr>`;
      }).join('')}</tbody>
    </table></div>
    <p class="slos-note" style="margin-top:12px">${esc(es
      ? 'Lectura: una capacidad marcada solo a nivel individuo depende de la persona. Cuando llega a organización y ecosistema, sobrevive a su marcha. Ese es el test de Greenleaf.'
      : 'Reading: a capability marked only at individual level depends on the person. When it reaches organisation and ecosystem, it survives their departure. That is Greenleaf\'s test.')}</p>
  </div>

  ${sec(es?'Distribución del portafolio':'Portfolio distribution')}
  <div class="slos-card" data-rv>
    ${MATURITY.map(m => {
      const n = P.filter(p => p.maturity.lvl === m.lvl).length;
      const pct = P.length ? Math.round(n / P.length * 100) : 0;
      return dimBar(`<i class="fas ${m.icon}"></i>${esc(L(m))} <span class="slos-note">(${n})</span>`, pct, true);
    }).join('')}
  </div>`;
};

/* ---------- 13.6 · Voz del equipo ---------------------------------------- */
R.voice = () => {
  const t = T(), es = S.lang === 'es', P = S.filtered;
  if (!P.length) return emptyState();

  const allRaters = Object.keys(S.perception).reduce((a, k) => a + (S.perception[k] || []).length, 0);
  const withData = P.filter(p => p.externals > 0).length;
  const coverage = P.length ? Math.round(withData / P.length * 100) : 0;

  // Temas derivados de las dimensiones más débiles del agregado.
  const dimAvg = SLS8.map(d => ({ d, v: Math.round(mean(P.map(p => p.dims[d.key].v))) })).sort((a,b) => a.v - b.v);
  const THEMES = {
    empowerment:  { start:{es:'Dadnos más control sobre las decisiones locales.', en:'Give us more ownership over local decisions.'}, stop:{es:'Demasiadas aprobaciones para decisiones de bajo riesgo.', en:'Too many approvals for low-risk decisions.'} },
    standing_back:{ start:{es:'Que se reconozca a quien hizo el trabajo.', en:'Recognise whoever did the work.'}, stop:{es:'Que el mérito se quede arriba.', en:'Credit stopping at the top.'} },
    stewardship:  { start:{es:'Pensar en el equipo a doce meses vista, no a doce días.', en:'Think twelve months ahead for the team, not twelve days.'}, stop:{es:'Aceptar trabajo nuevo sin cerrar el anterior.', en:'Taking on new work without closing the previous.'} },
    humility:     { start:{es:'Preguntar antes de decidir por nosotros.', en:'Ask before deciding for us.'}, stop:{es:'Resolver inmediatamente sin escuchar.', en:'Solving immediately without listening.'} },
    authenticity: { start:{es:'Decirnos lo que realmente está pasando.', en:'Tell us what is really going on.'}, stop:{es:'Mensajes distintos según la audiencia.', en:'Different messages depending on the audience.'} },
    forgiveness:  { start:{es:'Poder equivocarse sin coste simbólico.', en:'Being able to fail without symbolic cost.'}, stop:{es:'Recordar los errores antiguos en cada revisión.', en:'Bringing up old mistakes in every review.'} },
    courage:      { start:{es:'Abordar antes las conversaciones difíciles.', en:'Address hard conversations sooner.'}, stop:{es:'Dejar los conflictos madurar solos.', en:'Letting conflicts mature on their own.'} },
    accountability:{ start:{es:'Estándares claros y aplicados por igual.', en:'Clear standards applied equally.'}, stop:{es:'Expectativas implícitas que nadie escribió.', en:'Implicit expectations nobody wrote down.'} }
  };
  const weakest = dimAvg[0], mid = dimAvg[1], strongest = dimAvg[dimAvg.length-1];

  return `
  ${hero(`<i class="fas fa-comment-dots"></i> ${esc(es?'Motor de voz':'Voice engine')}`,
    es ? 'Escuchar a escala' : 'Listen at scale', null,
    esc(es ? 'Pulso cuantitativo, voz cualitativa y seguimiento de la acción. Sin voz capturada, el sistema no inventa citas: te dice qué falta.'
           : 'Quantitative pulse, qualitative voice and action tracking. With no captured voice, the system invents no quotes: it tells you what is missing.'))}

  <div class="slos-g slos-g4" style="margin-top:16px">
    ${kpi(es?'Cobertura':'Coverage', coverage, `${withData} / ${P.length} ${esc(t.leaders)}`, { icon:'fa-users-viewfinder', unit:'%', hl:true, d:1 })}
    ${kpi(t.kResponses, allRaters, esc(t.kResponsess), { icon:'fa-clipboard-check', d:2 })}
    ${kpi(es?'Aceptación':'Acceptance', Math.round(mean(P.map(p=>p.dims.forgiveness.v))), esc(es?'Seguridad para el error':'Safety to fail'), { icon:'fa-shield-heart', unit:'/100', d:3 })}
    ${kpi(t.kAutonomy, Math.round(mean(P.map(p=>p.autonomy))), esc(t.kAutonomys), { icon:'fa-key', unit:'/100', d:4, vt:'autonomy' })}
  </div>

  ${sec(t.sVoice, esc(es ? 'Temas priorizados a partir de tus dimensiones más débiles' : 'Themes prioritised from your weakest dimensions'))}
  <div class="slos-g slos-g3">
    <div class="slos-card accent" data-rv>
      <span class="slos-eyebrow"><i class="fas fa-play"></i> ${esc(es?'Empezar':'Start')}</span>
      <blockquote style="margin:13px 0;padding:12px 14px;background:oklch(100% 0 0/.032);border-radius:10px;font-style:italic;color:var(--ink-2);border-left:2px solid var(--gold-dim)">“${esc(L(THEMES[weakest.d.key].start))}”</blockquote>
      <div class="slos-note"><i class="fas ${weakest.d.icon}"></i> ${esc(L(weakest.d))} · ${weakest.v}/100</div>
    </div>
    <div class="slos-card" data-rv data-d="2">
      <span class="slos-eyebrow teal"><i class="fas fa-arrow-right"></i> ${esc(es?'Continuar':'Continue')}</span>
      <blockquote style="margin:13px 0;padding:12px 14px;background:oklch(100% 0 0/.032);border-radius:10px;font-style:italic;color:var(--ink-2);border-left:2px solid var(--teal-dim)">“${esc(L(THEMES[strongest.d.key].start))}”</blockquote>
      <div class="slos-note"><i class="fas ${strongest.d.icon}"></i> ${esc(L(strongest.d))} · ${strongest.v}/100</div>
    </div>
    <div class="slos-card" data-rv data-d="3">
      <span class="slos-eyebrow teal"><i class="fas fa-stop"></i> ${esc(es?'Dejar de hacer':'Stop')}</span>
      <blockquote style="margin:13px 0;padding:12px 14px;background:oklch(100% 0 0/.032);border-radius:10px;font-style:italic;color:var(--ink-2);border-left:2px solid var(--red)">“${esc(L(THEMES[mid.d.key].stop))}”</blockquote>
      <div class="slos-note"><i class="fas ${mid.d.icon}"></i> ${esc(L(mid.d))} · ${mid.v}/100</div>
    </div>
  </div>

  <div class="slos-card" data-rv style="margin-top:14px">
    <p class="slos-note"><i class="fas fa-circle-info" style="color:var(--teal)"></i> ${esc(es
      ? 'Estos enunciados son formulaciones canónicas asociadas a cada dimensión del SLS-8, seleccionadas por tus datos. No son citas literales de tu equipo. Para obtener voz real, habilita la recogida de comentarios abiertos en la evaluación 360°.'
      : 'These statements are canonical formulations associated with each SLS-8 dimension, selected by your data. They are not literal quotes from your team. For real voice, enable open comments in the 360° assessment.')}</p>
  </div>`;
};

/* ---------- 13.7 · Crecimiento ------------------------------------------- */
R.growth = () => {
  const t = T(), es = S.lang === 'es', P = S.filtered;
  if (!P.length) return emptyState();
  const p = P.find(x => x.name === S.focus) || P.slice().sort((a,b) => b.index - a.index)[0];
  const developed = P.filter(x => x.name !== p.name && x.projects.some(pr => p.projects.indexOf(pr) > -1));
  const emerging = developed.filter(x => x.maturity.lvl >= 2);
  const successors = developed.filter(x => x.index >= 70);

  return `
  ${hero(`<i class="fas fa-arrow-trend-up"></i> ${esc(es?'Grafo de crecimiento':'Growth graph')}`,
    es ? '¿Quién se volvió más fuerte gracias a este líder?' : 'Who became stronger because of this leader?',
    null,
    esc(es ? 'La pregunta de Greenleaf en forma de métrica: capacidad humana creada, movilidad y sucesión.'
           : 'Greenleaf\'s question as a metric: human capability created, mobility and succession.'),
    `<select id="slos-growth-sel" class="slos-in">${P.map(x => `<option value="${esc(x.name)}" ${x.name===p.name?'selected':''}>${esc(x.name)}</option>`).join('')}</select>`)}

  <div class="slos-g slos-g4" style="margin-top:16px">
    ${kpi(es?'Personas en su órbita':'People in orbit', developed.length, esc(es?'Comparten proyecto':'Share a project'), { icon:'fa-users', hl:true, d:1 })}
    ${kpi(es?'Líderes emergentes':'Emerging leaders', emerging.length, esc(es?'Nivel 2 o superior':'Level 2 or above'), { icon:'fa-seedling', d:2 })}
    ${kpi(t.kSuccessors, successors.length, esc(es?'Índice ≥ 70':'Index ≥ 70'), { icon:'fa-diagram-successor', d:3 })}
    ${kpi(es?'Amplitud':'Breadth', Math.round(p.tel.growthsurface*100), esc(es?'Categorías tocadas':'Categories touched'), { icon:'fa-shapes', unit:'/100', d:4 })}
  </div>

  ${sec(t.sNetwork, esc(p.name))}
  <div class="slos-card" data-rv>
    <div style="display:grid;place-items:center;min-height:240px;padding:20px 0">
      <div style="text-align:center">
        <div class="slos-av" style="width:60px;height:60px;border-radius:18px;font-size:17px;margin:0 auto 12px">${esc(initials(p.name))}</div>
        <div style="font-weight:650;font-size:15px">${esc(p.name)}</div>
        <div class="slos-note" style="margin-bottom:16px"><i class="fas ${ARCHETYPES[p.archetype].icon}"></i> ${esc(L(ARCHETYPES[p.archetype]))} · ${esc(L(p.maturity))}</div>
        <div style="display:flex;gap:9px;flex-wrap:wrap;justify-content:center;max-width:640px">
          ${developed.length ? developed.map(x => `<button class="slos-pill ${x.index>=70?'gd':x.index>=50?'t':''}" style="cursor:pointer;border:0" data-act="growth:${esc(x.name)}">
            <i class="fas fa-user"></i> ${esc(x.name)} <span class="slos-num" style="opacity:.7">${x.index}</span></button>`).join('')
          : `<span class="slos-note">${esc(es?'Sin personas compartiendo proyecto todavía.':'No people sharing a project yet.')}</span>`}
        </div>
      </div>
    </div>
    <p class="slos-note" style="margin-top:6px"><i class="fas fa-triangle-exclamation" style="color:var(--amber)"></i> ${esc(es
      ? 'Compartir proyecto no demuestra que este líder haya desarrollado a esas personas. Es una relación de coincidencia, no de causalidad. Para atribución real hace falta registro explícito de mentoría y evaluación 360° del mentorizado.'
      : 'Sharing a project does not prove this leader developed those people. It is co-occurrence, not causality. Real attribution requires explicit mentoring records and 360° assessment of the mentee.')}</p>
  </div>

  ${sec(t.sJourney, esc(es?'Progresión estimada por nivel de madurez':'Progression estimated by maturity level'))}
  <div class="slos-card" data-rv>
    <div class="slos-tl">
      ${MATURITY.map(m => `<div class="slos-tl-i ${p.maturity.lvl >= m.lvl ? 'done' : ''}">
        <div class="slos-tl-d"></div><strong>${esc(L(m))}</strong><span>${m.range[0]}–${m.range[1]}</span>
      </div>`).join('')}
    </div>
    <p class="slos-note" style="margin-top:20px">${esc(es
      ? `${p.name} está en nivel ${p.maturity.lvl} (${L(p.maturity)}) con índice ${p.index}. El salto al siguiente nivel no se consigue con más responsabilidad operativa, sino desarrollando a alguien que a su vez desarrolle.`
      : `${p.name} is at level ${p.maturity.lvl} (${L(p.maturity)}) with index ${p.index}. The next level is not reached with more operational responsibility, but by developing someone who in turn develops others.`)}</p>
  </div>`;
};

/* ==========================================================================
 * 13.8 · GUION NARRATIVO Y LECTOR CON VOZ
 * --------------------------------------------------------------------------
 * Dos piezas independientes:
 *   buildScript()  convierte el estado del sistema en un guion de capítulos
 *                  con arco de tres actos.
 *   Narrator       lee ese guion con la Web Speech API del navegador.
 *
 * Regla que gobierna todo lo de abajo: cada cifra del texto sale de una
 * variable real. Cuando un dato no existe, el capítulo lo dice en lugar de
 * rellenarlo con una estimación redactada a mano.
 * ========================================================================== */

const THIN = '\u202F';                       // espacio fino antes de la unidad
const pc = n => Math.round(n) + THIN + '%';
const dd = n => String(n).padStart(2, '0');

function longDate(d) {
  return d.toLocaleDateString(S.lang === 'es' ? 'es-ES' : 'en-GB',
    { day: 'numeric', month: 'long', year: 'numeric' });
}

/**
 * Trocea un texto en frases. Es la función que garantiza que la locución no
 * se corte: Chrome interrumpe las utterances largas alrededor de los quince
 * segundos, así que nunca se le entrega un capítulo entero.
 *
 * Respeta decimales y abreviaturas, y parte por comas las frases que aun así
 * salgan demasiado largas. Determinista: el lector y el resaltado en pantalla
 * la invocan sobre el mismo texto y obtienen exactamente los mismos índices.
 */
function splitSentences(text, maxLen) {
  const max = maxLen || 170;
  let t = String(text == null ? '' : text).replace(/\s+/g, ' ').trim();
  if (!t) return [];

  // Protege los puntos que no terminan frase antes de trocear.
  const G = '\u0001';
  t = t.replace(/(\d)\.(\d)/g, '$1' + G + '$2');
  t = t.replace(/\b(Sr|Sra|Sres|Dr|Dra|Ud|Uds|etc|vs|p|ej|núm|pág|art|aprox|Mr|Mrs|Ms|Prof|Fig|St|Av)\./g, '$1' + G);

  const raw = [];
  let buf = '';
  for (let i = 0; i < t.length; i++) {
    const c = t[i];
    buf += c;
    if ('.?!;'.indexOf(c) > -1) {
      const next = t[i + 1];
      if (next === undefined || next === ' ') { raw.push(buf.trim()); buf = ''; }
    }
  }
  if (buf.trim()) raw.push(buf.trim());

  // Segunda pasada: parte por comas lo que siga siendo demasiado largo.
  const out = [];
  raw.forEach(s => {
    const clean = s.split(G).join('.');
    if (clean.length <= max) { out.push(clean); return; }
    let cur = '';
    clean.split(/,\s+/).forEach(part => {
      const joined = cur ? cur + ', ' + part : part;
      if (joined.length > max && cur) { out.push(cur); cur = part; }
      else cur = joined;
    });
    if (cur) out.push(cur);
  });
  return out.filter(Boolean);
}

/* ---------- Micrográficos de capítulo ------------------------------------
 * Se animan una sola vez, cuando el capítulo entra en foco, reutilizando el
 * IntersectionObserver que ya mueve los anillos y las barras del sistema.
 * ------------------------------------------------------------------------ */

function microBar(v, ref, label) {
  const W = 124, H = 30, y = 13, len = W;
  const off = len * (1 - clamp(v, 0, 100) / 100);
  const rx = round(clamp(ref, 0, 100) / 100 * W, 1);
  return `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${esc(label)}">
    <title>${esc(label)}</title>
    <line x1="0" y1="${y}" x2="${W}" y2="${y}" stroke="oklch(100% 0 0/.09)" stroke-width="6" stroke-linecap="round"/>
    <line class="slos-arc" x1="0" y1="${y}" x2="${W}" y2="${y}" stroke="var(--gold)" stroke-width="6" stroke-linecap="round"
      stroke-dasharray="${len}" stroke-dashoffset="${len}" data-off="${round(off, 1)}"/>
    <line x1="${rx}" y1="${y - 7}" x2="${rx}" y2="${y + 7}" stroke="var(--ink-2)" stroke-width="1.5"/>
    <text x="0" y="${H - 1}" font-size="7.5" fill="var(--ink-3)" font-family="JetBrains Mono,monospace">${Math.round(v)}</text>
    <text x="${W}" y="${H - 1}" text-anchor="end" font-size="7.5" fill="oklch(42% .016 254)" font-family="JetBrains Mono,monospace">${Math.round(ref)}</text>
  </svg>`;
}

function microDot(v, label) {
  const W = 124, H = 30, y = 13;
  const x = round(clamp(v, 0, 100) / 100 * (W - 8) + 4, 1);
  return `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${esc(label)}">
    <title>${esc(label)}</title>
    <line x1="4" y1="${y}" x2="${W - 4}" y2="${y}" stroke="oklch(100% 0 0/.09)" stroke-width="2" stroke-linecap="round"/>
    ${[0, 25, 50, 75, 100].map(g => {
      const gx = round(g / 100 * (W - 8) + 4, 1);
      return `<line x1="${gx}" y1="${y - 3}" x2="${gx}" y2="${y + 3}" stroke="oklch(100% 0 0/.13)" stroke-width="1"/>`;
    }).join('')}
    <circle cx="${x}" cy="${y}" r="4.5" fill="var(--teal)"/>
    <text x="4" y="${H - 1}" font-size="7.5" fill="oklch(42% .016 254)" font-family="JetBrains Mono,monospace">0</text>
    <text x="${W - 4}" y="${H - 1}" text-anchor="end" font-size="7.5" fill="oklch(42% .016 254)" font-family="JetBrains Mono,monospace">100</text>
  </svg>`;
}

function microSpark(series, label) {
  if (!series || series.length < 2) return microDot(series && series.length ? series[0] : 0, label);
  const W = 124, H = 30;
  const mn = Math.min.apply(null, series), mx = Math.max.apply(null, series), rg = (mx - mn) || 1;
  const pt = series.map((v, i) => [round(i / (series.length - 1) * (W - 6) + 3, 1),
                                   round(H - 6 - ((v - mn) / rg) * (H - 14), 1)]);
  const d = pt.map((p, i) => (i ? 'L' : 'M') + p[0] + ' ' + p[1]).join(' ');
  const last = pt[pt.length - 1];
  return `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${esc(label)}">
    <title>${esc(label)}</title>
    <path d="${d}" fill="none" stroke="var(--teal)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="${last[0]}" cy="${last[1]}" r="3" fill="var(--gold)"/>
    <text x="0" y="${H - 1}" font-size="7.5" fill="oklch(42% .016 254)" font-family="JetBrains Mono,monospace">${Math.round(series[0])}</text>
    <text x="${W}" y="${H - 1}" text-anchor="end" font-size="7.5" fill="var(--ink-3)" font-family="JetBrains Mono,monospace">${Math.round(series[series.length - 1])}</text>
  </svg>`;
}

/** Brecha auto–otros en miniatura. Escala Likert 1-6. */
function microGap(self, others, label) {
  const W = 124, H = 30, y = 13;
  const x = v => round((clamp(v, 1, 6) - 1) / 5 * (W - 12) + 6, 1);
  const a = x(self), b = x(others);
  return `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${esc(label)}">
    <title>${esc(label)}</title>
    <line x1="6" y1="${y}" x2="${W - 6}" y2="${y}" stroke="oklch(100% 0 0/.09)" stroke-width="1.5"/>
    <line x1="${Math.min(a, b)}" y1="${y}" x2="${Math.max(a, b)}" y2="${y}" stroke="var(--ink-3)" stroke-width="2.5"/>
    <circle cx="${b}" cy="${y}" r="4.5" fill="var(--teal)"/>
    <circle cx="${a}" cy="${y}" r="4.5" fill="none" stroke="var(--gold)" stroke-width="2"/>
    <text x="6" y="${H - 1}" font-size="7.5" fill="oklch(42% .016 254)" font-family="JetBrains Mono,monospace">1</text>
    <text x="${W - 6}" y="${H - 1}" text-anchor="end" font-size="7.5" fill="oklch(42% .016 254)" font-family="JetBrains Mono,monospace">6</text>
  </svg>`;
}

function microFigure(v) {
  if (!v) return '';
  if (v.t === 'bar')   return microBar(v.v, v.ref, v.label);
  if (v.t === 'dot')   return microDot(v.v, v.label);
  if (v.t === 'spark') return microSpark(v.series, v.label);
  if (v.t === 'gap')   return microGap(v.self, v.others, v.label);
  return '';
}

/* ---------- Motor del guion ---------------------------------------------- */

/** Elige la anomalía dominante del conjunto, normalizada contra su umbral. */
function dominantSignal(o) {
  const c = [
    { k: 'concentration', sev: (o.busFactor - 0.34) / 0.34 },
    { k: 'delegation',    sev: (0.55 - o.delegation) / 0.55 },
    { k: 'gini',          sev: (o.giniLoad - 0.42) / 0.42 },
    { k: 'completion',    sev: (0.50 - o.completion) / 0.50 }
  ];
  return c.sort((a, b) => b.sev - a.sev)[0];
}

/** Mayor brecha auto–otros del portafolio. Devuelve null si no hay 360°. */
function widestGap(P) {
  let best = null;
  P.forEach(p => {
    if (!p.ps) return;
    SLS8.forEach(d => {
      const g = p.ps.dims[d.key].gap;
      if (g != null && (!best || g > best.g)) best = { p, d, g, self: p.ps.dims[d.key].self, others: p.ps.dims[d.key].others };
    });
  });
  return best;
}

/**
 * Construye el guion. Devuelve entre 5 y 7 capítulos, más las historias
 * registradas a mano como capítulos finales.
 */
function buildScript() {
  const es = S.lang === 'es';
  const P = S.filtered, o = S.org;
  const ch = [];
  if (!P || !P.length || !o) return ch;

  const avg = Math.round(mean(P.map(p => p.index)));
  const anyReal = P.some(p => p.externals > 0);
  const externals = sum(P.map(p => p.externals));
  const conf = confidenceOf(Math.round(mean(P.map(p => p.externals))));
  const byLoad = P.slice().sort((a, b) => b.tasks - a.tasks);
  const heavy = byLoad[0], second = byLoad[1];
  const dimAvg = SLS8.map(d => ({ d, v: Math.round(mean(P.map(p => p.dims[d.key].v))) })).sort((a, b) => a.v - b.v);
  const weak = dimAvg[0];
  const snaps = S.snapshots.slice(-8).map(s => s.index);
  const sig = dominantSignal(o);
  const gap = widestGap(P);

  /* --- 1 · Apertura ------------------------------------------------------ */
  let c1 = es
    ? `Tienes ${o.people} personas repartidas en ${o.projects} proyectos. Entre todas sostienen ${o.totalTasks} tareas y han cerrado ${pc(o.completion * 100)} de ellas. El índice medio de liderazgo se queda en ${avg} sobre 100.`
    : `You have ${o.people} people across ${o.projects} projects. Between them they carry ${o.totalTasks} tasks and have closed ${pc(o.completion * 100)} of them. The mean leadership index sits at ${avg} out of 100.`;
  c1 += anyReal
    ? (es ? ` Detrás de ese número hay ${externals} evaluaciones externas, lo que sitúa la evidencia en nivel ${String(T()[conf.label]).toLowerCase()}.`
          : ` Behind that number sit ${externals} external assessments, which puts the evidence at ${String(T()[conf.label]).toLowerCase()}.`)
    : (es ? ` Ese número no mide liderazgo de servicio. Lo estima mirando cómo se reparte el trabajo, que es una cosa distinta. Sin respuestas de las personas que reciben ese liderazgo, es un indicio.`
          : ` That number does not measure servant leadership. It estimates it by looking at how work is distributed, which is a different thing. Without answers from the people receiving that leadership, it is a hint.`);
  c1 += es
    ? ` El retrato de conjunto se sostiene. Lo que no se sostiene aparece en cuanto se mira quién carga con qué.`
    : ` The group portrait holds. What does not hold shows up the moment you look at who carries what.`;

  ch.push({
    id: 'apertura', dimension: null,
    titulo: es ? 'Apertura' : 'Opening',
    texto: c1,
    dato: es ? `Índice medio ${avg} sobre 100` : `Mean index ${avg} out of 100`,
    visual: snaps.length >= 2
      ? { t: 'spark', series: snaps, label: es ? `Evolución del índice en las últimas ${snaps.length} instantáneas` : `Index across the last ${snaps.length} snapshots` }
      : { t: 'dot', v: avg, label: es ? `Índice medio ${avg} sobre 100` : `Mean index ${avg} out of 100` }
  });

  /* --- 2 · La señal ------------------------------------------------------ */
  let c2, dato2, vis2, dim2 = null;
  if (sig.k === 'concentration' && heavy) {
    dim2 = 'stewardship';
    c2 = es
      ? `Hay un nombre que aparece más que los demás. ${heavy.name} lleva ${heavy.tasks} de las ${o.totalTasks} tareas del sistema, ${pc(o.busFactor * 100)} del total.`
      : `One name shows up more than the rest. ${heavy.name} carries ${heavy.tasks} of the ${o.totalTasks} tasks in the system, ${pc(o.busFactor * 100)} of everything.`;
    if (second) c2 += es
      ? ` La siguiente persona con más carga, ${second.name}, se queda en ${second.tasks}.`
      : ` The next most loaded person, ${second.name}, stops at ${second.tasks}.`;
    c2 += es ? ` Un reparto así no ocurre por azar.` : ` A split like that does not happen by chance.`;
    dato2 = es ? `${pc(o.busFactor * 100)} de la carga en una persona` : `${pc(o.busFactor * 100)} of load on one person`;
    vis2 = { t: 'bar', v: o.busFactor * 100, ref: 34, label: es ? `Concentración ${pc(o.busFactor * 100)} frente al umbral de riesgo de 34` : `Concentration ${pc(o.busFactor * 100)} against the 34 risk threshold` };
  } else if (sig.k === 'delegation') {
    dim2 = 'empowerment';
    c2 = es
      ? `El trabajo apenas circula. La amplitud de delegación del conjunto está en ${Math.round(o.delegation * 100)} sobre 100, y eso significa que las tareas vuelven una y otra vez a las mismas manos.`
      : `Work barely circulates. Delegation breadth across the group sits at ${Math.round(o.delegation * 100)} out of 100, which means tasks keep returning to the same hands.`;
    if (heavy) c2 += es
      ? ` ${heavy.name} es quien más recibe, con ${heavy.tasks} tareas.`
      : ` ${heavy.name} receives the most, with ${heavy.tasks} tasks.`;
    c2 += es ? ` No es un problema de esfuerzo.` : ` This is not an effort problem.`;
    dato2 = es ? `Delegación ${Math.round(o.delegation * 100)} sobre 100` : `Delegation ${Math.round(o.delegation * 100)} out of 100`;
    vis2 = { t: 'bar', v: o.delegation * 100, ref: 55, label: es ? `Delegación ${Math.round(o.delegation * 100)} frente al umbral de 55` : `Delegation ${Math.round(o.delegation * 100)} against the 55 threshold` };
  } else if (sig.k === 'gini') {
    dim2 = 'stewardship';
    c2 = es
      ? `La carga está mal repartida. El coeficiente de Gini del reparto es ${round(o.giniLoad, 2)}, donde cero sería equidad perfecta y uno una sola persona sosteniéndolo todo.`
      : `Load is badly distributed. The Gini coefficient of the split is ${round(o.giniLoad, 2)}, where zero would be perfect equity and one a single person holding everything.`;
    if (heavy) c2 += es ? ` El extremo alto es ${heavy.name}, con ${heavy.tasks} tareas.` : ` The high end is ${heavy.name}, with ${heavy.tasks} tasks.`;
    c2 += es ? ` Los equipos que se sostienen así suelen avisar tarde.` : ` Teams held together like this tend to warn late.`;
    dato2 = es ? `Gini de carga ${round(o.giniLoad, 2)}` : `Load Gini ${round(o.giniLoad, 2)}`;
    vis2 = { t: 'bar', v: (1 - o.giniLoad) * 100, ref: 58, label: es ? `Equidad de carga ${Math.round((1 - o.giniLoad) * 100)} sobre 100` : `Load equity ${Math.round((1 - o.giniLoad) * 100)} out of 100` };
  } else {
    dim2 = 'accountability';
    c2 = es
      ? `De las ${o.totalTasks} tareas comprometidas se han cerrado ${o.done}. El resto sigue abierto o ya venció, y eso deja el cumplimiento en ${pc(o.completion * 100)}.`
      : `Of the ${o.totalTasks} tasks committed, ${o.done} are closed. The rest are still open or already overdue, leaving completion at ${pc(o.completion * 100)}.`;
    c2 += es ? ` Se ha prometido más de lo que cabe.` : ` More has been promised than fits.`;
    dato2 = es ? `Cumplimiento ${pc(o.completion * 100)}` : `Completion ${pc(o.completion * 100)}`;
    vis2 = { t: 'bar', v: o.completion * 100, ref: 50, label: es ? `Cumplimiento ${pc(o.completion * 100)} frente al umbral de 50` : `Completion ${pc(o.completion * 100)} against the 50 threshold` };
  }
  ch.push({ id: 'senal', titulo: es ? 'La señal' : 'The signal', texto: c2, dato: dato2, visual: vis2, dimension: dim2 });

  /* --- 3 · La historia detrás -------------------------------------------- */
  let c3;
  if (sig.k === 'concentration' || sig.k === 'gini') {
    c3 = es
      ? `Un reparto así casi nunca se decide en una reunión. Se acumula. Alguien resuelve rápido, se le asigna lo urgente, y lo urgente vuelve a esa persona porque ya tiene el contexto en la cabeza. El equipo aprende a preguntar antes que a decidir, y lo aprende bien, porque preguntar funciona. Desde fuera parece rendimiento. Por dentro es una organización que ha guardado su capacidad dentro de una sola cabeza, y las cabezas se van de vacaciones, cambian de puesto y a veces se marchan. Greenleaf planteaba la prueba al revés: no importa cuánto entrega quien dirige, importa qué son capaces de hacer los demás sin esa persona en la sala.`
      : `A split like this is almost never decided in a meeting. It accumulates. Someone solves things quickly, gets handed what is urgent, and what is urgent returns to them because the context already lives in their head. The team learns to ask rather than decide, and learns it well, because asking works. From the outside it looks like performance. From the inside it is an organisation that has stored its capability inside one head, and heads take holidays, change roles and sometimes leave. Greenleaf framed the test the other way round: what matters is not how much the leader delivers, it is what everyone else can do without that person in the room.`;
  } else if (sig.k === 'delegation') {
    c3 = es
      ? `Delegar no es repartir tareas. Es transferir el criterio con el que se deciden, y eso cuesta mucho más. Mientras el criterio no viaja, cada tarea entregada vuelve convertida en una pregunta, y quien dirige acaba trabajando de cuello de botella con la agenda llena de decisiones ajenas. La consecuencia medible es la autonomía percibida, que cae, y detrás de ella cae el compromiso. Es el mecanismo mediador mejor documentado de toda la literatura sobre liderazgo de servicio. La señal no dice que trabajéis poco. Dice que el trabajo no enseña.`
      : `Delegating is not handing out tasks. It is transferring the judgement used to decide them, and that costs far more. While the judgement does not travel, every task handed over comes back as a question, and the leader ends up working as a bottleneck with a calendar full of other people's decisions. The measurable consequence is perceived autonomy, which drops, and commitment drops behind it. This is the best-documented mediating mechanism in the whole servant leadership literature. The signal does not say you work too little. It says the work does not teach.`;
  } else {
    c3 = es
      ? `Comprometer más de lo que se puede entregar rompe algo distinto de un objetivo. Rompe la fiabilidad. Un equipo tolera un mal resultado bastante mejor de lo que tolera no saber si lo prometido va a llegar, porque lo segundo obliga a todo el mundo a construirse un plan de reserva en privado. Y la fiabilidad, una vez agrietada, no se repara con un plan nuevo. Se repara cerrando lo que está abierto antes de abrir nada más, que es la decisión menos vistosa y la única que funciona.`
      : `Committing to more than you can deliver breaks something other than a target. It breaks reliability. A team tolerates a bad result far better than it tolerates not knowing whether what was promised will arrive, because the second forces everyone to build a private fallback. And reliability, once cracked, is not repaired with a new plan. It is repaired by closing what is open before opening anything else, which is the least impressive decision and the only one that works.`;
  }
  ch.push({
    id: 'mecanismo', titulo: es ? 'La historia detrás' : 'The story behind',
    texto: c3,
    dato: es ? `Dimensión implicada: ${L(SLS8.find(d => d.key === dim2))}` : `Dimension involved: ${L(SLS8.find(d => d.key === dim2))}`,
    visual: { t: 'dot', v: Math.round(mean(P.map(p => p.dims[dim2].v))), label: es ? `${L(SLS8.find(d => d.key === dim2))} en el agregado` : `${L(SLS8.find(d => d.key === dim2))} across the group` },
    dimension: dim2
  });

  /* --- 4 · El contraste --------------------------------------------------- */
  const contrast = P.filter(x => !heavy || x.name !== heavy.name)
    .sort((a, b) => (b.tel.delegation + b.tel.spotlight) - (a.tel.delegation + a.tel.spotlight))[0];
  let c4, dato4, vis4, dim4 = null;
  if (contrast) {
    const sd = SLS8.find(d => d.key === contrast.strongest.key);
    const sv = contrast.dims[sd.key];
    dim4 = sd.key;
    c4 = es
      ? `${contrast.name} opera de otra manera. Toca ${contrast.projects.length} ${contrast.projects.length === 1 ? 'proyecto' : 'proyectos'} y no acapara ninguno: su cuota de tareas se queda en ${pc(contrast.dependency)} del total. Su dimensión más alta es «${L(sd)}», con ${sv.v} puntos${sv.real ? '' : ' estimados desde su conducta, no medidos'}. ${S.lang === 'es' ? sd.defEs : sd.defEn} Lo que hace distinto no es trabajar menos. Es devolver antes.`
      : `${contrast.name} operates differently. They touch ${contrast.projects.length} ${contrast.projects.length === 1 ? 'project' : 'projects'} and hoard none of them: their task share stops at ${pc(contrast.dependency)} of the total. Their highest dimension is "${L(sd)}", at ${sv.v} points${sv.real ? '' : ', estimated from behaviour rather than measured'}. ${S.lang === 'es' ? sd.defEs : sd.defEn} What they do differently is not working less. It is handing back sooner.`;
    dato4 = `${L(sd)} ${sv.v}${sv.real ? '' : ' ~'}`;
    vis4 = { t: 'bar', v: sv.v, ref: 63, label: `${L(sd)} · ${contrast.name} · ${sv.v}` };
  } else {
    c4 = es
      ? `Aquí no hay contraste que ofrecer. El sistema solo encuentra una persona con tareas asignadas, y una sola persona no forma un portafolio. Cualquier comparación que hiciera ahora estaría inventada, así que no la hago. En cuanto haya un segundo nombre con carga propia, este capítulo se llena solo.`
      : `There is no contrast to offer here. The system finds only one person with assigned tasks, and one person is not a portfolio. Any comparison I made now would be invented, so I am not making it. As soon as a second name carries its own load, this chapter fills itself.`;
    dato4 = es ? 'Sin comparación posible' : 'No comparison possible';
    vis4 = null;
  }
  ch.push({ id: 'contraste', titulo: es ? 'El contraste' : 'The contrast', texto: c4, dato: dato4, visual: vis4, dimension: dim4 });

  /* --- 5 · El punto ciego, o lo que todavía no se puede saber ------------- */
  let c5, dato5, vis5, dim5 = null;
  if (gap && gap.g >= 0.5) {
    dim5 = gap.d.key;
    c5 = es
      ? `${gap.p.name} se evalúa ${round(gap.g, 1)} puntos por encima de como le ve su equipo en «${L(gap.d)}». Sobre una escala de seis, esa distancia es mucha. La brecha entre cómo te ves y cómo te ven es el dato individual más accionable de una evaluación de trescientos sesenta grados, precisamente porque no necesita interpretación. Necesita una conversación. Y la conversación no la puede tener el sistema.`
      : `${gap.p.name} rates themselves ${round(gap.g, 1)} points above how their team sees them on "${L(gap.d)}". On a six-point scale that is a long way. The gap between how you see yourself and how you are seen is the most actionable individual figure in a three-hundred-and-sixty degree assessment, precisely because it needs no interpretation. It needs a conversation. And the system cannot have that conversation.`;
    dato5 = es ? `Brecha de ${round(gap.g, 1)} puntos` : `${round(gap.g, 1)} point gap`;
    vis5 = { t: 'gap', self: gap.self, others: gap.others, label: es ? `Auto ${round(gap.self, 1)} frente a equipo ${round(gap.others, 1)}` : `Self ${round(gap.self, 1)} against team ${round(gap.others, 1)}` };
  } else if (anyReal && gap) {
    c5 = es
      ? `No hay puntos ciegos grandes que señalar. Con las ${externals} evaluaciones externas registradas, las autopercepciones y las del equipo caen cerca en todas las dimensiones, y la mayor diferencia se queda en ${round(gap.g, 1)} puntos sobre seis. Eso no significa que todo esté bien. Significa que no hay sorpresas, que es una condición distinta y bastante más cómoda desde la que trabajar.`
      : `There are no large blind spots to point at. Across the ${externals} external assessments on file, self and team ratings land close on every dimension, and the widest difference stops at ${round(gap.g, 1)} points out of six. That does not mean everything is fine. It means there are no surprises, which is a different condition and a considerably more comfortable one to work from.`;
    dato5 = es ? `Mayor brecha ${round(gap.g, 1)} puntos` : `Widest gap ${round(gap.g, 1)} points`;
    vis5 = { t: 'gap', self: gap.self, others: gap.others, label: es ? `Auto ${round(gap.self, 1)} frente a equipo ${round(gap.others, 1)}` : `Self ${round(gap.self, 1)} against team ${round(gap.others, 1)}` };
  } else if (anyReal) {
    c5 = es
      ? `Falta una mitad de la comparación. Hay ${externals} evaluaciones externas registradas, pero ninguna autoevaluación con la que contrastarlas, y sin las dos no existe brecha que calcular. El dato que buscas aquí no es cuánto puntúa cada líder: es cuánto se desvía su propia lectura de la del equipo. Que cada persona evaluada responda el mismo cuestionario sobre sí misma convierte esta página en la más útil del sistema.`
      : `Half of the comparison is missing. There are ${externals} external assessments on file, but no self-assessment to contrast them against, and without both there is no gap to compute. What you are after here is not how each leader scores: it is how far their own reading drifts from the team's. Having every assessed person answer the same questionnaire about themselves turns this page into the most useful one in the system.`;
    dato5 = es ? 'Sin autoevaluación registrada' : 'No self-assessment on file';
    vis5 = { t: 'dot', v: 50, label: es ? 'Comparación incompleta' : 'Incomplete comparison' };
  } else {
    c5 = es
      ? `Aquí el guion se detiene, y conviene que se note. Nada de lo que has escuchado viene de tu equipo. Todo sale de tareas, fechas y asignaciones, que registran lo que se hace pero no lo que se siente al recibirlo. El liderazgo de servicio es un constructo de percepción: solo las personas servidas pueden medirlo. Sin sus respuestas no puedo decirte si alguien tiene un punto ciego, y el punto ciego es exactamente lo que un ejecutivo no puede ver por su cuenta. Tres evaluadores por líder cambian esta página entera.`
      : `The script stops here, and it should be obvious that it does. Nothing you have heard comes from your team. All of it comes from tasks, dates and assignments, which record what gets done but not what it feels like to receive it. Servant leadership is a perception construct: only the people served can measure it. Without their answers I cannot tell you whether anyone has a blind spot, and the blind spot is exactly what an executive cannot see alone. Three raters per leader change this entire page.`;
    dato5 = es ? 'Cero evaluaciones 360°' : 'Zero 360° assessments';
    vis5 = { t: 'dot', v: 0, label: es ? 'Cobertura de percepción 360°' : '360° perception coverage' };
  }
  ch.push({ id: 'ciego', titulo: es ? 'El punto ciego' : 'The blind spot', texto: c5, dato: dato5, visual: vis5, dimension: dim5 });

  /* --- 6 · La decisión ---------------------------------------------------- */
  const wantDim = dim5 || dim2 || weak.d.key;
  const lib = EXPERIMENT_LIBRARY.filter(e => e.dim === wantDim)[0]
           || EXPERIMENT_LIBRARY.filter(e => e.dim === weak.d.key)[0]
           || EXPERIMENT_LIBRARY[0];
  const owner = (gap && gap.g >= 0.5) ? gap.p.name : (heavy ? heavy.name : P[0].name);
  const due = longDate(new Date(Date.now() + lib.days * 864e5));
  const metric = S.lang === 'es' ? lib.es_m : lib.en_m;
  const c6 = es
    ? `El lunes por la mañana, una sola cosa. «${L(lib)}»: ${S.lang === 'es' ? lib.es_d : lib.en_d} El nombre que la sostiene es ${owner}. La fecha de cierre es el ${due}, dentro de ${lib.days} días. Se verifica con una única métrica, ${String(metric).toLowerCase().replace(/\.$/, '')}, medida antes de empezar y el día del cierre. Si al llegar esa fecha la métrica no se ha movido, el problema no era el que creías, y eso también es información que hoy no tienes.`
    : `Monday morning, one thing only. "${L(lib)}": ${S.lang === 'es' ? lib.es_d : lib.en_d} The name carrying it is ${owner}. The closing date is ${due}, ${lib.days} days out. It is verified with a single metric, ${String(metric).toLowerCase().replace(/\.$/, '')}, measured before you start and again on the closing day. If the metric has not moved by then, the problem was not the one you thought, and that is information you do not have today either.`;
  ch.push({
    id: 'decision', titulo: es ? 'La decisión' : 'The decision',
    texto: c6,
    dato: es ? `${lib.days} días · ${owner}` : `${lib.days} days · ${owner}`,
    visual: { t: 'bar', v: Math.round(mean(P.map(p => p.dims[lib.dim].v))), ref: 79, label: es ? `${L(SLS8.find(d => d.key === lib.dim))} hoy frente al umbral de 79` : `${L(SLS8.find(d => d.key === lib.dim))} today against the 79 threshold` },
    dimension: lib.dim
  });

  /* --- 7 · Cierre --------------------------------------------------------- */
  const c7 = es
    ? `Greenleaf dejó una sola prueba, y no se responde con un índice. Las personas a las que sirves, ¿están creciendo? ¿Se han vuelto más autónomas, más capaces, más propensas a servir ellas mismas? Con lo que hay registrado hoy la respuesta es parcial y se resume así: ${o.people} personas, una amplitud de delegación de ${Math.round(o.delegation * 100)} sobre 100 y ${pc(o.busFactor * 100)} de la carga sostenida por una sola de ellas. Eso no contesta la pregunta. La acota. La respuesta está en la próxima conversación que tengas, no en la próxima pantalla que abras.`
    : `Greenleaf left one test, and it is not answered with an index. The people you serve, are they growing? Have they become more autonomous, more capable, more likely to serve in turn? With what is recorded today the answer is partial and reads like this: ${o.people} people, a delegation breadth of ${Math.round(o.delegation * 100)} out of 100, and ${pc(o.busFactor * 100)} of the load carried by one of them. That does not answer the question. It narrows it. The answer sits in the next conversation you have, not in the next screen you open.`;
  ch.push({
    id: 'cierre', titulo: es ? 'Cierre' : 'Closing',
    texto: c7,
    dato: es ? `${o.people} personas · delegación ${Math.round(o.delegation * 100)}` : `${o.people} people · delegation ${Math.round(o.delegation * 100)}`,
    visual: { t: 'dot', v: Math.round(o.delegation * 100), label: es ? `Amplitud de delegación ${Math.round(o.delegation * 100)} sobre 100` : `Delegation breadth ${Math.round(o.delegation * 100)} out of 100` },
    dimension: 'empowerment'
  });

  /* --- Historias registradas a mano, como capítulos finales --------------- */
  (S.stories || []).slice().reverse().forEach(s => {
    const partes = [s.title, s.body].filter(Boolean);
    if (s.quote) partes.push(es ? `Cita literal: «${s.quote}»` : `Verbatim: "${s.quote}"`);
    ch.push({
      id: 'story-' + s.id,
      titulo: (s.leader ? s.leader + ' · ' : '') + (es ? 'historia registrada' : 'recorded story'),
      texto: partes.join('. ').replace(/\.\./g, '.'),
      dato: new Date(s.at).toLocaleDateString(S.lang === 'es' ? 'es-ES' : 'en-GB'),
      visual: null, dimension: null, manual: true
    });
  });

  return ch;
}

/** Guion en texto plano o Markdown, para descarga. */
function scriptAsText(chs, md) {
  const es = S.lang === 'es';
  const out = [];
  out.push((md ? '# ' : '') + (es ? 'Guion narrado · Servant Leadership OS' : 'Narrated script · Servant Leadership OS'));
  out.push((md ? '_' : '') + longDate(new Date()) + ' · SLS-8 · van Dierendonck & Nuijten (2011)' + (md ? '_' : ''));
  out.push('');
  chs.forEach((c, i) => {
    out.push((md ? '## ' : '') + dd(i + 1) + ' · ' + c.titulo);
    if (c.dato) out.push(md ? '`' + c.dato + '`' : '[' + c.dato + ']');
    out.push('');
    out.push(c.texto);
    out.push('');
  });
  out.push(md ? '---' : '—');
  out.push(T().nxDisclaimer);
  return out.join('\n');
}

function downloadText(name, text, mime) {
  try {
    const blob = new Blob([text], { type: mime || 'text/plain;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = name;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    toast(S.lang === 'es' ? 'Guion descargado' : 'Script downloaded', 'fa-download');
  } catch (e) {
    console.error('[SLOS] descarga', e);
    toast(S.lang === 'es' ? 'No se pudo descargar' : 'Could not download', 'fa-triangle-exclamation');
  }
}

/* ==========================================================================
 * NARRADOR · Web Speech API
 * --------------------------------------------------------------------------
 * Cuatro fallos conocidos del navegador, resueltos aquí y no en otro sitio:
 *   1 · getVoices() devuelve vacío en la primera llamada en Chrome.
 *       → waitForVoices() escucha onvoiceschanged con un tope de 3 segundos.
 *   2 · Chrome corta la locución alrededor de los 15 segundos.
 *       → una utterance por frase, encadenadas con onend, más el ciclo
 *         pause/resume que mantiene viva la cola.
 *   3 · speechSynthesis se corrompe si se llama a speak() con cola pendiente.
 *       → cancel() y un tick de espera antes del primer speak() de cada
 *         secuencia, con un número de secuencia que invalida los callbacks
 *         de la locución anterior.
 *   4 · La voz sigue sonando al cerrar o cambiar de vista.
 *       → stop() enganchado a go(), toggleLang(), closeApp() y beforeunload.
 * ========================================================================== */
const Narrator = (function () {
  const PROFILES = {
    ejecutivo: { rate: 0.88, pitch: 0.95 },
    narrador:  { rate: 1.00, pitch: 1.00 },
    briefing:  { rate: 1.18, pitch: 1.02 }
  };

  const st = {
    chapters: [], sentences: [], flat: [],
    chapter: 0, sentence: 0,
    playing: false, paused: false, muted: false,
    profile: 'narrador', rate: 1, voices: {}, ready: false,
    seq: 0, keepalive: null
  };

  const synth = () => (typeof window !== 'undefined' && window.speechSynthesis) ? window.speechSynthesis : null;
  const supported = () => !!synth() && typeof window.SpeechSynthesisUtterance === 'function';

  /** Espera a que el navegador publique su lista de voces. Tope de 3 s. */
  function waitForVoices() {
    return new Promise(resolve => {
      const s = synth();
      if (!s) { resolve([]); return; }
      const now = s.getVoices();
      if (now && now.length) { resolve(now); return; }
      let done = false;
      const finish = () => {
        if (done) return;
        done = true;
        try { s.onvoiceschanged = null; } catch (e) {}
        resolve(s.getVoices() || []);
      };
      try { s.onvoiceschanged = finish; } catch (e) {}
      setTimeout(finish, 3000);
    });
  }

  /** Las de red suelen sonar mejor; después las de los motores conocidos. */
  function rank(v) {
    let s = 0;
    if (v.localService === false) s += 100;
    if (/google|microsoft|natural|neural|premium|enhanced|siri/i.test(v.name || '')) s += 50;
    if (/compact|espeak/i.test(v.name || '')) s -= 40;
    return s;
  }

  /** Asigna las tres mejores voces del idioma a los tres perfiles. */
  function assignVoices(all) {
    const pref = S.lang === 'es' ? 'es' : 'en';
    let pool = (all || []).filter(v => String(v.lang || '').toLowerCase().indexOf(pref) === 0);
    if (!pool.length) pool = (all || []).slice();
    pool = pool.sort((a, b) => rank(b) - rank(a));
    const keys = ['ejecutivo', 'narrador', 'briefing'];
    st.voices = {};
    keys.forEach((k, i) => { st.voices[k] = pool.length ? (pool[i] || pool[0]) : null; });
    st.ready = true;
    return pool.length;
  }

  /* ---- Enganches de interfaz, inyectados por la vista ---- */
  let hooks = { onChapter: null, onSentence: null, onWord: null, onState: null };
  function emitState() { if (hooks.onState) hooks.onState(publicState()); }
  function publicState() {
    return {
      playing: st.playing, paused: st.paused, muted: st.muted,
      chapter: st.chapter, sentence: st.sentence,
      total: st.chapters.length, flat: st.flat.length,
      done: st.flat.length ? flatIndex(st.chapter, st.sentence) : 0,
      supported: supported(), ready: st.ready, profile: st.profile, rate: st.rate
    };
  }
  function flatIndex(c, s) {
    let n = 0;
    for (let i = 0; i < c && i < st.sentences.length; i++) n += st.sentences[i].length;
    return n + s;
  }

  function stopKeepalive() { if (st.keepalive) { clearInterval(st.keepalive); st.keepalive = null; } }
  function startKeepalive() {
    stopKeepalive();
    // Chrome deja de emitir si la cola pasa de ~15 s sin tocarse.
    st.keepalive = setInterval(() => {
      const s = synth();
      if (!s || !st.playing || st.paused) return;
      try { s.pause(); s.resume(); } catch (e) {}
    }, 9000);
  }

  /** Arranca una secuencia limpia desde un capítulo y una frase. */
  function run(cIdx, sIdx) {
    const s = synth();
    if (!s || st.muted) return;
    const mySeq = ++st.seq;
    try { s.cancel(); } catch (e) {}
    st.playing = true; st.paused = false;
    startKeepalive();
    // Un tick de margen: speak() inmediatamente después de cancel() deja la
    // cola en un estado del que Chrome no siempre sale.
    setTimeout(() => { if (mySeq === st.seq) step(mySeq, cIdx, sIdx || 0); }, 60);
  }

  function step(mySeq, c, i) {
    if (mySeq !== st.seq) return;
    const s = synth();
    if (!s) return;
    if (c >= st.chapters.length) { finish(); return; }
    const list = st.sentences[c] || [];
    if (i >= list.length) { step(mySeq, c + 1, 0); return; }

    if (c !== st.chapter) { st.chapter = c; if (hooks.onChapter) hooks.onChapter(c); }
    st.sentence = i;
    if (hooks.onSentence) hooks.onSentence(c, i);
    emitState();

    const u = new window.SpeechSynthesisUtterance(list[i]);
    u.lang = S.lang === 'es' ? 'es-ES' : 'en-GB';
    const prof = PROFILES[st.profile] || PROFILES.narrador;
    u.rate = clamp(prof.rate * st.rate, 0.5, 2);
    u.pitch = prof.pitch;
    const v = st.voices[st.profile];
    if (v) u.voice = v;

    u.onboundary = ev => {
      if (mySeq !== st.seq) return;
      if (ev && ev.name && ev.name !== 'word') return;
      if (hooks.onWord) hooks.onWord(c, i, ev ? ev.charIndex : 0, ev ? (ev.charLength || 0) : 0);
    };
    u.onend = () => { if (mySeq === st.seq) step(mySeq, c, i + 1); };
    // Un error en una frase no debe tumbar el capítulo entero.
    u.onerror = () => { if (mySeq === st.seq) step(mySeq, c, i + 1); };

    try { s.speak(u); } catch (e) { console.warn('[SLOS] voz', e); step(mySeq, c, i + 1); }
  }

  function finish() {
    st.playing = false; st.paused = false;
    stopKeepalive();
    emitState();
  }

  const api = {
    profiles: PROFILES,
    supported,
    state: publicState,
    on(h) { hooks = Object.assign(hooks, h || {}); },

    /** Carga el guion y prepara las voces. Idempotente. */
    async load(chapters) {
      api.stop();
      st.chapters = chapters || [];
      st.sentences = st.chapters.map(c => splitSentences(c.texto));
      st.flat = [];
      st.sentences.forEach(l => l.forEach(x => st.flat.push(x)));
      st.chapter = 0; st.sentence = 0;
      if (supported()) {
        const all = await waitForVoices();
        assignVoices(all);
      }
      emitState();
      return st.chapters.length;
    },

    play() {
      if (!supported() || st.muted) return;
      if (st.paused) { api.resume(); return; }
      run(st.chapter, st.sentence);
    },
    pause() {
      const s = synth();
      if (!s || !st.playing) return;
      try { s.pause(); } catch (e) {}
      st.paused = true;
      emitState();
    },
    resume() {
      const s = synth();
      if (!s) return;
      try { s.resume(); } catch (e) {}
      st.paused = false; st.playing = true;
      emitState();
    },
    stop() {
      st.seq++;                       // invalida los callbacks en vuelo
      const s = synth();
      if (s) { try { s.cancel(); } catch (e) {} }
      st.playing = false; st.paused = false;
      stopKeepalive();
      emitState();
    },
    next() { api.seek(Math.min(st.chapter + 1, Math.max(0, st.chapters.length - 1))); },
    prev() { api.seek(Math.max(st.chapter - 1, 0)); },

    /** Salta a un capítulo. Si estaba sonando, sigue sonando desde allí. */
    seek(c) {
      const was = st.playing && !st.paused;
      st.chapter = clamp(c, 0, Math.max(0, st.chapters.length - 1));
      st.sentence = 0;
      if (hooks.onChapter) hooks.onChapter(st.chapter);
      if (was) run(st.chapter, 0);
      else { api.stop(); emitState(); }
    },

    setVoice(id) {
      if (!PROFILES[id]) return;
      st.profile = id;
      const was = st.playing && !st.paused;
      if (was) run(st.chapter, st.sentence);
      else emitState();
    },
    setRate(n) {
      st.rate = clamp(Number(n) || 1, 0.6, 1.6);
      const was = st.playing && !st.paused;
      if (was) run(st.chapter, st.sentence);
      else emitState();
    },
    toggleMute() {
      st.muted = !st.muted;
      if (st.muted) api.stop();
      emitState();
      return st.muted;
    },
    sentencesOf(c) { return st.sentences[c] || []; }
  };
  return api;
})();

/* ---------- 13.8 · Vista · Historias de servicio -------------------------- */
R.stories = () => {
  const t = T(), es = S.lang === 'es', P = S.filtered;
  if (!P.length) return emptyState();

  const chs = buildScript();
  const hasVoice = Narrator.supported();

  const toc = chs.map((c, i) =>
    `<button data-act="nx-goto:${i}" data-nxtoc="${i}" class="${i === 0 ? 'on' : ''}">
      <b>${dd(i + 1)}</b><span>${esc(c.titulo)}</span>
    </button>`).join('');

  const doc = chs.map((c, i) => {
    const sents = splitSentences(c.texto);
    const body = sents.map((s, n) => `<span class="slos-nx-s" data-s="${n}">${esc(s)}</span>`).join(' ');
    return `<article class="slos-nx-ch ${i === 0 ? 'on' : ''}" id="slos-nx-ch-${i}" data-nxch="${i}" data-rv>
      <div class="slos-nx-ch-h">
        <h3><b>${dd(i + 1)}</b>${esc(c.titulo)}${c.manual ? ' · ' + esc(t.nxRecorded) : ''}</h3>
        ${c.visual ? `<div class="slos-nx-fig">${microFigure(c.visual)}</div>` : ''}
      </div>
      <p class="slos-nx-p" data-nxtext="${i}">${body}</p>
      ${c.dato ? `<div class="slos-note" style="margin-top:var(--s2)">${esc(c.dato)}</div>` : ''}
    </article>`;
  }).join('');

  return `
  ${hero(`<i class="fas fa-book-open"></i> ${esc(t.nxEyebrow)}`,
    t.nxTitle, null, esc(t.nxLead),
    `<div style="display:flex;flex-direction:column;gap:var(--s1);align-items:flex-end">
      <span class="slos-pill t">${chs.length} ${esc(t.nxChapters).toLowerCase()}</span>
      <button class="slos-btn" data-act="new-story"><i class="fas fa-plus"></i> ${esc(es ? 'Registrar historia' : 'Record story')}</button>
    </div>`)}

  <div class="slos-nx">
    <nav class="slos-nx-toc" aria-label="${esc(t.nxChapters)}">
      <span>${esc(t.nxChapters)}</span>${toc}
    </nav>

    <div>
      <div class="slos-nx-bar" role="group" aria-label="${esc(t.voice)}">
        <button class="slos-btn icon" data-act="nx-prev" title="${esc(t.nxPrev)}" aria-label="${esc(t.nxPrev)}"><i class="fas fa-backward-step"></i></button>
        <button class="slos-btn gold" id="slos-nx-play" data-act="nx-play" ${hasVoice ? '' : 'disabled'}>
          <i class="fas fa-play"></i> <span>${esc(t.nxPlay)}</span>
        </button>
        <button class="slos-btn icon" data-act="nx-next" title="${esc(t.nxNext)}" aria-label="${esc(t.nxNext)}"><i class="fas fa-forward-step"></i></button>
        <span class="slos-nx-count" id="slos-nx-count">${dd(1)} ${esc(t.nxOf)} ${dd(chs.length)}</span>
        <span class="sep"></span>
        <label for="slos-nx-profile">${esc(t.nxProfile)}</label>
        <select id="slos-nx-profile" class="slos-in" style="padding:var(--s0) var(--s1)">
          <option value="ejecutivo">${esc(t.nxExec)}</option>
          <option value="narrador" selected>${esc(t.nxNarr)}</option>
          <option value="briefing">${esc(t.nxBrief)}</option>
        </select>
        <label for="slos-nx-rate">${esc(t.nxSpeed)}</label>
        <input type="range" id="slos-nx-rate" min="0.7" max="1.4" step="0.02" value="1" aria-label="${esc(t.nxSpeed)}">
        <button class="slos-btn icon" id="slos-nx-mute" data-act="nx-mute" title="${esc(t.nxMute)}" aria-label="${esc(t.nxMute)}"><i class="fas fa-volume-high"></i></button>
      </div>
      <div class="slos-nx-prog" role="progressbar" aria-label="${esc(t.nxChapters)}"><i id="slos-nx-prog"></i></div>

      ${hasVoice ? '' : `<p class="slos-note" style="margin-bottom:var(--s3)"><i class="fas fa-circle-info"></i> ${esc(t.nxNoVoice)}</p>`}

      <div class="slos-nx-doc">${doc}</div>

      <div style="display:flex;gap:var(--s1);flex-wrap:wrap;margin-top:var(--s5)">
        <button class="slos-btn" data-act="nx-txt"><i class="fas fa-file-lines"></i> ${esc(t.nxDownTxt)}</button>
        <button class="slos-btn" data-act="nx-md"><i class="fas fa-file-code"></i> ${esc(t.nxDownMd)}</button>
      </div>
      <p class="slos-note" style="margin-top:var(--s3);max-width:68ch">${esc(t.nxDisclaimer)}</p>
    </div>
  </div>`;
};

/* ---------- Cableado del lector, tras cada render de la vista ------------- */
let NX = { chapters: [], texts: [] };

function bindNarrator() {
  const host = root();
  if (!host) return;
  const doc = $('.slos-nx-doc', host);
  if (!doc) return;

  NX.chapters = buildScript();
  NX.texts = NX.chapters.map(c => splitSentences(c.texto));

  const playBtn = $('#slos-nx-play', host);
  const countEl = $('#slos-nx-count', host);
  const progEl  = $('#slos-nx-prog', host);
  const muteBtn = $('#slos-nx-mute', host);
  const t = T();

  const chEls = $$('.slos-nx-ch', host);
  const tocEls = $$('.slos-nx-toc button', host);

  function markChapter(c) {
    chEls.forEach(el => el.classList.toggle('on', Number(el.dataset.nxch) === c));
    tocEls.forEach(el => el.classList.toggle('on', Number(el.dataset.nxtoc) === c));
    if (countEl) countEl.textContent = dd(c + 1) + ' ' + t.nxOf + ' ' + dd(NX.chapters.length);
  }

  /** Restaura una frase a texto plano y resalta la activa. */
  function paintSentence(c, i) {
    chEls.forEach(el => {
      const idx = Number(el.dataset.nxch);
      $$('.slos-nx-s', el).forEach((sp, n) => {
        const raw = (NX.texts[idx] || [])[n];
        if (raw !== undefined && sp.innerHTML.indexOf('<mark') > -1) sp.textContent = raw;
        sp.classList.toggle('on', idx === c && n === i);
      });
    });
    const el = chEls.filter(x => Number(x.dataset.nxch) === c)[0];
    const sp = el ? $$('.slos-nx-s', el)[i] : null;
    if (sp && typeof sp.scrollIntoView === 'function') {
      sp.scrollIntoView({ block: 'center', behavior: RM ? 'auto' : 'smooth' });
    }
  }

  /** Resalta la palabra en curso. Si onboundary no dispara, se queda la frase. */
  function paintWord(c, i, charIndex, charLength) {
    const el = chEls.filter(x => Number(x.dataset.nxch) === c)[0];
    if (!el) return;
    const sp = $$('.slos-nx-s', el)[i];
    const raw = (NX.texts[c] || [])[i];
    if (!sp || raw === undefined) return;
    let len = charLength;
    if (!len) {
      const rest = raw.slice(charIndex);
      const m = rest.match(/^\S+/);
      len = m ? m[0].length : 0;
    }
    if (!len) return;
    sp.innerHTML = esc(raw.slice(0, charIndex)) +
      '<mark>' + esc(raw.substr(charIndex, len)) + '</mark>' +
      esc(raw.slice(charIndex + len));
  }

  function paintState(s) {
    if (playBtn) {
      const on = s.playing && !s.paused;
      playBtn.innerHTML = `<i class="fas fa-${on ? 'pause' : 'play'}"></i> <span>${esc(on ? t.nxPause : (s.paused ? t.nxResume : t.nxPlay))}</span>`;
    }
    if (progEl && s.flat) progEl.style.width = clamp(s.done / s.flat * 100, 0, 100) + '%';
    if (muteBtn) {
      muteBtn.innerHTML = `<i class="fas fa-volume-${s.muted ? 'xmark' : 'high'}"></i>`;
      muteBtn.setAttribute('aria-label', s.muted ? t.nxUnmute : t.nxMute);
      muteBtn.title = s.muted ? t.nxUnmute : t.nxMute;
    }
  }

  Narrator.on({ onChapter: markChapter, onSentence: paintSentence, onWord: paintWord, onState: paintState });
  Narrator.load(NX.chapters);

  const sel = $('#slos-nx-profile', host);
  if (sel) sel.addEventListener('change', e => Narrator.setVoice(e.target.value));
  const rate = $('#slos-nx-rate', host);
  if (rate) rate.addEventListener('input', e => Narrator.setRate(e.target.value));

  // Índice sincronizado con el scroll mientras no se está leyendo en voz alta.
  if (typeof IntersectionObserver === 'function') {
    const spy = new IntersectionObserver(entries => {
      if (Narrator.state().playing) return;
      entries.forEach(e => { if (e.isIntersecting) markChapter(Number(e.target.dataset.nxch)); });
    }, { threshold: .35, root: $('.slos-main', host) });
    chEls.forEach(el => spy.observe(el));
  }
}

/* ---------- 13.9 · Experimentos ------------------------------------------ */
R.experiments = () => {
  const t = T(), es = S.lang === 'es';
  const active = S.experiments.filter(e => e.status === 'active');
  const done = S.experiments.filter(e => e.status === 'done');

  return `
  ${hero(`<i class="fas fa-flask"></i> ${esc(es?'Experimentos de liderazgo':'Leadership experiments')}`,
    es ? 'Convertir el insight en conducta' : 'Turn insight into behaviour', null,
    esc(es ? 'El liderazgo no cambia con informes: cambia con práctica deliberada, pequeña, observable y medida. Cada experimento es una hipótesis conductual con fecha de cierre.'
           : 'Leadership does not change with reports: it changes with deliberate practice — small, observable and measured. Each experiment is a behavioural hypothesis with a closing date.'),
    `<button class="slos-btn gold" data-act="new-experiment"><i class="fas fa-plus"></i> ${esc(t.newExperiment)}</button>`)}

  <div class="slos-g slos-g4" style="margin-top:16px">
    ${kpi(t.kExperiments, active.length, esc(t.kExperimentss), { icon:'fa-flask', hl:true, d:1 })}
    ${kpi(t.completed, done.length, esc(es?'Ciclos cerrados':'Closed cycles'), { icon:'fa-circle-check', d:2 })}
    ${kpi(es?'Biblioteca':'Library', EXPERIMENT_LIBRARY.length, esc(es?'Prácticas disponibles':'Available practices'), { icon:'fa-book', d:3 })}
    ${kpi(t.kSessions, S.sessions.length, esc(t.kSessionss), { icon:'fa-calendar-check', d:4 })}
  </div>

  ${active.length || done.length ? `${sec(es?'En curso':'In flight')}
  <div class="slos-card" data-rv>
    ${(active.concat(done)).map(e => {
      const lib = EXPERIMENT_LIBRARY.find(x => x.id === e.libId);
      const left = Math.max(0, Math.ceil((new Date(e.endsAt) - Date.now()) / 864e5));
      return `<div class="slos-exp">
        <div style="flex:1">
          <div class="ti">${esc(e.title)}</div>
          <div class="mt">${esc(e.leader || (es?'Equipo':'Team'))} · ${e.days} ${esc(t.days)} · ${e.status==='active' ? `${left} ${esc(es?'días restantes':'days remaining')}` : esc(t.completed)}</div>
          ${lib ? `<div class="slos-note" style="margin-top:5px"><i class="fas fa-ruler"></i> ${esc(S.lang==='es'?lib.es_m:lib.en_m)}</div>` : ''}
        </div>
        <div style="display:flex;gap:7px;align-items:center">
          <span class="slos-pill ${e.status==='active'?'t':'g'}">${esc(e.status==='active'?t.active:t.completed)}</span>
          ${e.status==='active' ? `<button class="slos-btn icon" title="${esc(t.completed)}" data-act="finish-exp:${e.id}"><i class="fas fa-check"></i></button>` : ''}
          <button class="slos-btn icon" title="${esc(es?'Eliminar':'Delete')}" data-act="del-exp:${e.id}"><i class="fas fa-trash"></i></button>
        </div>
      </div>`;
    }).join('')}
  </div>` : ''}

  ${sec(es?'Biblioteca de prácticas':'Practice library', esc(es?'Diseñadas por dimensión del SLS-8':'Designed by SLS-8 dimension'))}
  <div class="slos-g slos-g2">
    ${EXPERIMENT_LIBRARY.map((e, i) => {
      const d = SLS8.find(x => x.key === e.dim);
      return `<div class="slos-card" data-rv data-d="${(i%4)+1}">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:10px">
          <div style="flex:1">
            <span class="slos-eyebrow teal"><i class="fas ${d.icon}"></i> ${esc(L(d))}</span>
            <h3 style="margin:11px 0 6px">${esc(L(e))}</h3>
            <p class="slos-note">${esc(S.lang==='es'?e.es_d:e.en_d)}</p>
            <div class="slos-note" style="margin-top:8px"><i class="fas fa-ruler"></i> <strong>${esc(es?'Se mide con:':'Measured by:')}</strong> ${esc(S.lang==='es'?e.es_m:e.en_m)}</div>
          </div>
          <span class="slos-pill gd">${e.days}${esc(es?'d':'d')}</span>
        </div>
        <button class="slos-btn teal" style="margin-top:13px" data-act="experiment:${e.id}"><i class="fas fa-play"></i> ${esc(t.start)}</button>
      </div>`;
    }).join('')}
  </div>`;
};

/* ---------- 13.10 · Copiloto --------------------------------------------- */
R.coach = () => {
  const t = T(), es = S.lang === 'es', P = S.filtered;
  if (!P.length) return emptyState();
  const insights = generateInsights(P, S.org);
  const weak = SLS8.map(d => ({ d, v: Math.round(mean(P.map(p => p.dims[d.key].v))) })).sort((a,b) => a.v - b.v);
  const ex = EXPERIMENT_LIBRARY.filter(e => e.dim === weak[0].d.key)[0] || EXPERIMENT_LIBRARY[0];

  const QUESTIONS = {
    empowerment:  {es:'¿Qué decisión sientes que sigo tomando por ti y que podrías asumir tú?', en:'Which decision do you feel I still make for you that you could own?'},
    standing_back:{es:'¿En qué momento del último trimestre no se reconoció tu trabajo?', en:'When in the last quarter was your work not recognised?'},
    stewardship:  {es:'Si yo no estuviera tres semanas, ¿qué se rompería primero?', en:'If I were away for three weeks, what would break first?'},
    humility:     {es:'¿Qué es lo que yo no estoy viendo de este equipo?', en:'What am I not seeing about this team?'},
    authenticity: {es:'¿Hay algo que digo y que no se corresponde con lo que hago?', en:'Is there something I say that does not match what I do?'},
    forgiveness:  {es:'¿Qué error tuyo crees que aún te estoy cobrando?', en:'Which mistake of yours do you think I am still charging you for?'},
    courage:      {es:'¿Qué conversación llevamos meses evitando en este equipo?', en:'Which conversation have we been avoiding for months in this team?'},
    accountability:{es:'¿Qué expectativa mía nunca te expliqué del todo?', en:'Which expectation of mine did I never fully explain to you?'}
  };

  return `
  ${hero(`<i class="fas fa-wand-magic-sparkles"></i> ${esc(es?'Copiloto de liderazgo':'Leadership copilot')}`,
    t.coachTitle, null, esc(t.coachSub), null, 'ai')}

  <div class="slos-g slos-g2" style="margin-top:16px">
    <div class="slos-card ai" data-rv>
      <div style="display:flex;justify-content:space-between;align-items:center;gap:10px;margin-bottom:14px">
        <h3>${esc(t.cThings)}</h3><span class="slos-eyebrow teal">SIGNAL</span>
      </div>
      ${insights.slice(0,3).map((c, i) => `<div style="padding:11px 0;border-bottom:${i<2?'1px solid var(--line)':'0'}">
        <div style="display:flex;gap:10px"><strong class="slos-num" style="color:var(--gold);font-size:13px">0${i+1}</strong>
        <div><div style="font-weight:600;font-size:12.5px;margin-bottom:3px">${esc(c.signal)}</div>
        <p class="slos-note">${esc(c.story)}</p></div></div>
      </div>`).join('') || `<p class="slos-note">${esc(es?'Sin señales relevantes.':'No relevant signals.')}</p>`}
    </div>

    <div class="slos-g" style="gap:13px">
      <div class="slos-card accent" data-rv data-d="2">
        <span class="slos-eyebrow"><i class="fas fa-person-running"></i> ${esc(t.cBehavior)}</span>
        <h3 style="margin:12px 0 6px;font-size:1.02rem">${esc(L(ex))}</h3>
        <p class="slos-note">${esc(S.lang==='es'?ex.es_d:ex.en_d)}</p>
        <button class="slos-btn gold" style="margin-top:12px" data-act="experiment:${ex.id}"><i class="fas fa-play"></i> ${esc(t.start)} · ${ex.days} ${esc(t.days)}</button>
      </div>
      <div class="slos-card" data-rv data-d="3">
        <span class="slos-eyebrow teal"><i class="fas fa-comments"></i> ${esc(t.cConversation)}</span>
        <h3 style="margin:12px 0 6px;font-size:1.02rem">${esc(L(weak[0].d))}</h3>
        <p style="color:var(--ink-2);font-style:italic;font-size:12.5px">“${esc(L(QUESTIONS[weak[0].d.key]))}”</p>
      </div>
      <div class="slos-card" data-rv data-d="4">
        <span class="slos-eyebrow teal"><i class="fas fa-ban"></i> ${esc(t.cStop)}</span>
        <h3 style="margin:12px 0 6px;font-size:1.02rem">${esc(es?'Resolver de inmediato':'Solving immediately')}</h3>
        <p class="slos-note">${esc(es?'Cada vez que resuelves tú, el equipo pierde una repetición de entrenamiento. Deja espacio aunque sea más lento las primeras veces.':'Every time you solve it, the team loses a training repetition. Leave space even if it is slower at first.')}</p>
      </div>
    </div>
  </div>

  ${sec(t.guardrails, esc(es?'Cómo debe comportarse una capa de IA sobre datos de personas':'How an AI layer over people data must behave'))}
  <div class="slos-g slos-g4">
    ${[['gHuman','gHumanD','fa-user-shield'],['gPrivacy','gPrivacyD','fa-lock'],['gTrace','gTraceD','fa-link'],['gLimits','gLimitsD','fa-circle-half-stroke']].map((g, i) =>
      `<div class="slos-card" data-rv data-d="${i+1}">
        <i class="fas ${g[2]}" style="color:var(--teal);font-size:1.05rem;margin-bottom:10px;display:block"></i>
        <h3 style="margin-bottom:6px">${esc(t[g[0]])}</h3>
        <p class="slos-note">${esc(t[g[1]])}</p>
      </div>`).join('')}
  </div>

  <div class="slos-card" data-rv style="margin-top:14px">
    <p class="slos-note"><i class="fas fa-triangle-exclamation" style="color:var(--amber)"></i> ${esc(es
      ? 'Este copiloto no es un evaluador de personas. No produce rankings de despido, no infiere estados emocionales y no debe usarse como única base para decisiones de promoción o salida. Su función es preparar mejores conversaciones, no sustituirlas.'
      : 'This copilot is not a people evaluator. It produces no firing rankings, infers no emotional states and must not be the sole basis for promotion or exit decisions. Its function is to prepare better conversations, not replace them.')}</p>
  </div>`;
};

/* ---------- 13.11 · Metodología ------------------------------------------ */
R.method = () => {
  const t = T(), es = S.lang === 'es';
  return `
  ${hero(`<i class="fas fa-book-atlas"></i> ${esc(es?'Fundamento':'Foundation')}`,
    t.sMethod, null,
    esc(es ? 'Qué mide este sistema, con qué instrumento, y — sobre todo — qué NO mide. Si vas a presentar estos números a un consejo, esta es la página que tienes que dominar.'
           : 'What this system measures, with which instrument, and — above all — what it does NOT measure. If you are taking these numbers to a board, this is the page to master.'))}

  <div class="slos-g slos-g2" style="margin-top:16px">
    <div class="slos-card accent" data-rv>
      <span class="slos-eyebrow"><i class="fas fa-layer-group"></i> ${esc(es?'Capa A · Telemetría':'Layer A · Telemetry')}</span>
      <h3 style="margin:12px 0 8px">${esc(es?'Proxies conductuales':'Behavioural proxies')}</h3>
      <p class="slos-note">${esc(es
        ? 'Se derivan de tus proyectos y tareas. Son observables, objetivos y están siempre disponibles. Su límite es fundamental: describen cómo se reparte el trabajo, no cómo se siente servida una persona. Un líder puede puntuar alto aquí y ser percibido como distante.'
        : 'Derived from your projects and tasks. Observable, objective and always available. Their limit is fundamental: they describe how work is distributed, not how served a person feels. A leader can score high here and still be perceived as distant.')}</p>
      <div style="margin-top:12px">${BEHAVIOR_SIGNALS.map(b => `<span class="slos-pill" style="margin:3px 3px 0 0"><i class="fas ${b.icon}"></i> ${esc(L(b))}</span>`).join('')}</div>
    </div>
    <div class="slos-card" data-rv data-d="2">
      <span class="slos-eyebrow teal"><i class="fas fa-clipboard-check"></i> ${esc(es?'Capa B · Percepción':'Layer B · Perception')}</span>
      <h3 style="margin:12px 0 8px">SLS-8 · van Dierendonck &amp; Nuijten (2011)</h3>
      <p class="slos-note">${esc(es
        ? 'Ocho dimensiones y 30 ítems, construidos desde 99 ítems iniciales y validados en ocho muestras con 1.571 personas de Países Bajos y Reino Unido, con réplicas posteriores en alemán, italiano y en el África subsahariana. Es una medida del constructo, no un proxy.'
        : 'Eight dimensions and 30 items, built from 99 initial items and validated across eight samples with 1,571 people from the Netherlands and the UK, with later replications in German, Italian and sub-Saharan settings. This is a construct measure, not a proxy.')}</p>
      <div style="margin-top:12px">${SLS8.map(d => `<span class="slos-pill t" style="margin:3px 3px 0 0"><i class="fas ${d.icon}"></i> ${esc(L(d))}</span>`).join('')}</div>
    </div>
  </div>

  ${sec(es?'Las 8 dimensiones en detalle':'The 8 dimensions in detail', esc(es?'Peso en el índice y carga factorial original':'Index weight and original factor loading'))}
  <div class="slos-card" data-rv>
    <div class="slos-tw"><table class="slos-t">
      <thead><tr><th>${esc(t.thDimension)}</th><th>${esc(es?'Definición operativa':'Operational definition')}</th><th>${esc(es?'Peso':'Weight')}</th><th>${esc(es?'Carga λ':'Loading λ')}</th></tr></thead>
      <tbody>${SLS8.map(d => `<tr>
        <td style="white-space:nowrap"><i class="fas ${d.icon}" style="color:var(--gold);width:14px"></i> <strong>${esc(L(d))}</strong></td>
        <td style="max-width:460px"><span class="slos-note">${esc(S.lang==='es'?d.defEs:d.defEn)}</span></td>
        <td><span class="slos-num">${Math.round(d.weight*100)}%</span></td>
        <td><span class="slos-num" style="color:${d.load>=.8?'var(--green)':d.load>=.5?'var(--amber)':'var(--red)'}">${d.load.toFixed(2)}</span></td>
      </tr>`).join('')}</tbody>
    </table></div>
    <p class="slos-note" style="margin-top:12px">${esc(es
      ? 'λ es la carga de cada dimensión sobre el factor de segundo orden en la validación original. Accountability carga .17: la literatura la considera complementaria más que nuclear al servicio. El sistema la incluye con peso bajo y lo declara en lugar de esconderlo.'
      : 'λ is each dimension\'s loading on the second-order factor in the original validation. Accountability loads .17: the literature treats it as complementary rather than core to service. The system includes it with low weight and declares this rather than hiding it.')}</p>
  </div>

  ${sec(es?'Límites declarados':'Declared limits', esc(es?'Lo que este sistema no puede afirmar':'What this system cannot claim'))}
  <div class="slos-g slos-g3">
    ${[
      [es?'No mide causalidad':'No causality', es?'Las correlaciones entre índice y resultados de negocio son observadas, no causales. La evidencia experimental sobre efectos causales del liderazgo de servicio sigue siendo limitada.':'Correlations between index and business outcomes are observed, not causal. Experimental evidence on causal effects of servant leadership remains limited.'],
      [es?'No diagnostica personas':'No people diagnosis', es?'Un índice bajo señala una conversación pendiente, no una decisión de salida. Usarlo como criterio de despido es un uso indebido del instrumento.':'A low index signals a pending conversation, not an exit decision. Using it as a firing criterion misuses the instrument.'],
      [es?'La autoevaluación sesga':'Self-rating bias', es?'La autopercepción se infla sistemáticamente. Por eso el índice pondera "otros" por encima de "self" siempre que hay datos externos.':'Self-perception systematically inflates. That is why the index weights "others" above "self" whenever external data exists.'],
      [es?'Sesgo de deseabilidad':'Desirability bias', es?'Los ítems del SLS son transparentes: un evaluador puede adivinar la respuesta "correcta". Anonimato y agregación mínima de 3 respuestas mitigan, no eliminan.':'SLS items are transparent: a rater can guess the "right" answer. Anonymity and a minimum aggregation of 3 responses mitigate, but do not remove it.'],
      [es?'Contexto cultural':'Cultural context', es?'La validación original es neerlandesa y británica. En culturas de alta distancia de poder, la misma conducta puede percibirse de forma distinta.':'The original validation is Dutch and British. In high power-distance cultures the same behaviour may be perceived differently.'],
      [es?'La telemetría es parcial':'Telemetry is partial', es?'Solo ve lo que está registrado como tarea. El trabajo de servicio más valioso — escuchar, proteger, acompañar — rara vez tiene un ticket.':'It only sees what is recorded as a task. The most valuable serving work — listening, protecting, accompanying — rarely has a ticket.']
    ].map((x, i) => `<div class="slos-card" data-rv data-d="${(i%3)+1}">
      <h3 style="margin-bottom:7px"><i class="fas fa-circle-minus" style="color:var(--red);margin-right:6px"></i>${esc(x[0])}</h3>
      <p class="slos-note">${esc(x[1])}</p>
    </div>`).join('')}
  </div>

  ${sec(t.sLibrary, esc(es?'Fuentes primarias antes que divulgación':'Primary sources before popular writing'))}
  <div class="slos-g slos-g2">
    ${LIBRARY.map((b, i) => `<div class="slos-card" data-rv data-d="${(i%4)+1}">
      <div style="display:flex;justify-content:space-between;gap:10px;align-items:flex-start">
        <div style="flex:1">
          <span class="slos-eyebrow ${b.tier.indexOf('cadémic')>-1||b.tier==='Instrumento'||b.tier==='Meta-análisis'?'':'teal'}">${esc(b.tier)}</span>
          <h3 style="margin:11px 0 4px">${esc(b.t)}</h3>
          <div class="slos-note" style="margin-bottom:7px">${esc(b.a)} · ${b.y}</div>
          <p class="slos-note">${esc(S.lang==='es'?b.es:b.en)}</p>
        </div>
      </div>
    </div>`).join('')}
  </div>`;
};

/* ---------- Estado vacío -------------------------------------------------- */
function emptyState() {
  const t = T();
  return `<div class="slos-card" data-rv style="margin-top:30px">
    <div class="slos-empty">
      <i class="fas fa-users-slash"></i>
      <h4>${esc(t.noLeaders)}</h4>
      <p>${esc(t.noLeadersD)}</p>
      <button class="slos-btn gold" style="margin-top:16px" data-act="demo"><i class="fas fa-wand-sparkles"></i> ${esc(S.lang==='es'?'Cargar datos de demostración':'Load demonstration data')}</button>
    </div>
  </div>`;
}

/* ==========================================================================
 * 14 · CONTROLADOR
 * ========================================================================== */
function applyFilters() {
  const q = S.query.trim().toLowerCase();
  S.filtered = !q ? S.leaders.slice()
    : S.leaders.filter(p => p.name.toLowerCase().includes(q)
        || p.projects.some(x => String(x).toLowerCase().includes(q))
        || String(L(ARCHETYPES[p.archetype])).toLowerCase().includes(q));
}

function renderView() {
  const host = $('#slos-views', root());
  if (!host) return;
  const fn = R[S.view] || R.dashboard;
  let html = '';
  try { html = fn(); }
  catch (err) {
    console.error('[SLOS] render', S.view, err);
    html = `<div class="slos-card"><div class="slos-empty"><i class="fas fa-bug"></i><h4>Error</h4><p>${esc(err.message)}</p></div></div>`;
  }
  host.innerHTML = `<section class="slos-view on">${html}</section>`;

  const crumb = $('#slos-crumb', root());
  const v = VIEWS.find(x => x.id === S.view);
  if (crumb && v) crumb.textContent = T()[v.key];
  $$('.slos-nav button', root()).forEach(b => b.classList.toggle('on', b.dataset.view === S.view));

  observeReveals(host);
  bindSpotlight(host);
  if (S.view === 'stories') { try { bindNarrator(); } catch (e) { console.error('[SLOS] narrador', e); } }
  const main = $('#slos-main', root());
  if (main) { if (typeof main.scrollTo === 'function') main.scrollTo({ top: 0, behavior: RM ? 'auto' : 'smooth' }); else main.scrollTop = 0; }
}

/** Cambio de vista con View Transitions API cuando está disponible. */
function go(id) {
  if (!R[id]) id = 'dashboard';
  Narrator.stop();            // la voz nunca sobrevive a un cambio de vista
  S.view = id;
  if (!RM && document.startViewTransition) document.startViewTransition(() => renderView());
  else renderView();
}

function recompute() {
  const projects = readProjects();
  S.demo = !projects.length;
  const src = S.demo ? demoProjects() : projects;
  const leaders = extractLeaders(src);
  S.org = computeOrgTelemetry(leaders, src);
  S.leaders = buildProfiles(leaders, S.org);
  applyFilters();
  snapshot();
}

/** Registra una instantánea diaria del índice para la serie temporal. */
function snapshot() {
  if (!S.filtered.length) return;
  const idx = Math.round(mean(S.filtered.map(p => p.index)));
  const today = new Date().toISOString().slice(0, 10);
  const last = S.snapshots[S.snapshots.length - 1];
  // El índice por persona es lo que permite dibujar quién sube y quién baja.
  const byLeader = {};
  S.filtered.forEach(p => { byLeader[p.name] = p.index; });
  if (last && String(last.at).slice(0, 10) === today) { last.index = idx; last.byLeader = byLeader; }
  else { S.snapshots.push({ at: new Date().toISOString(), index: idx, people: S.filtered.length, byLeader: byLeader }); }
  if (S.snapshots.length > 40) S.snapshots = S.snapshots.slice(-40);
  store.set(CFG.STORAGE.SNAPSHOTS, S.snapshots);
}

/* ---------- Modal: evaluación 360° SLS-8 ---------------------------------- */
function openAssessment(name) {
  const es = S.lang === 'es', t = T();
  const opts = S.leaders.map(p => `<option value="${esc(p.name)}" ${p.name===name?'selected':''}>${esc(p.name)}</option>`).join('');
  modal(`
    <span class="slos-eyebrow"><i class="fas fa-clipboard-question"></i> SLS-8 · van Dierendonck &amp; Nuijten (2011)</span>
    <h2 style="margin-top:11px">${esc(es?'Evaluación 360° de liderazgo de servicio':'360° servant leadership assessment')}</h2>
    <p class="slos-note">${esc(es
      ? 'Escala 1 (nunca) a 6 (siempre). Responde pensando en conductas observadas, no en intenciones. Con 3 o más evaluadores externos el resultado deja de ser indicativo y pasa a ser base de decisión.'
      : 'Scale 1 (never) to 6 (always). Answer thinking of observed behaviours, not intentions. With 3 or more external raters the result stops being indicative and becomes a decision basis.')}</p>

    <label>${esc(t.thLeader)}</label>
    <select id="slos-as-leader" class="slos-in">${opts}</select>

    <label>${esc(es?'¿Quién responde?':'Who is answering?')}</label>
    <select id="slos-as-src" class="slos-in">
      <option value="team">${esc(es?'Miembro de su equipo':'Team member')}</option>
      <option value="peer">${esc(es?'Par / colega':'Peer / colleague')}</option>
      <option value="manager">${esc(es?'Su superior':'Their manager')}</option>
      <option value="self">${esc(es?'Autoevaluación (el propio líder)':'Self-assessment (the leader)')}</option>
    </select>

    <div style="margin-top:20px">
      ${SLS8.map(d => `
        <div style="padding:13px 0;border-bottom:1px solid var(--line)">
          <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap">
            <div style="flex:1;min-width:220px">
              <strong style="font-size:12.5px"><i class="fas ${d.icon}" style="color:var(--gold);width:15px"></i> ${esc(L(d))}</strong>
              <p class="slos-note" style="margin-top:4px">${esc(S.lang==='es'?d.items[0].es:d.items[0].en)}</p>
            </div>
            <div style="display:flex;gap:4px" data-dim="${d.key}">
              ${[1,2,3,4,5,6].map(n => `<button class="slos-btn slos-as-n" data-v="${n}" style="width:32px;height:32px;padding:0;justify-content:center;font-family:'JetBrains Mono',monospace">${n}</button>`).join('')}
            </div>
          </div>
        </div>`).join('')}
    </div>

    <div class="slos-acts">
      <button class="slos-btn" data-act="close-modal">${esc(t.cancel)}</button>
      <button class="slos-btn gold" id="slos-as-save"><i class="fas fa-save"></i> ${esc(t.save)}</button>
    </div>`);

  const ov = $('#slos-modal', root());
  $$('.slos-as-n', ov).forEach(b => b.addEventListener('click', () => {
    const g = b.parentElement;
    $$('.slos-as-n', g).forEach(x => { x.classList.remove('gold'); });
    b.classList.add('gold');
  }));

  $('#slos-as-save', ov).addEventListener('click', () => {
    const leader = $('#slos-as-leader', ov).value;
    const source = $('#slos-as-src', ov).value;
    const scores = {}; let n = 0;
    $$('[data-dim]', ov).forEach(g => {
      const sel = $('.slos-as-n.gold', g);
      if (sel) { scores[g.dataset.dim] = parseInt(sel.dataset.v, 10); n++; }
    });
    if (n < 4) { toast(S.lang==='es' ? 'Responde al menos 4 dimensiones' : 'Answer at least 4 dimensions', 'fa-triangle-exclamation'); return; }
    if (!S.perception[leader]) S.perception[leader] = [];
    S.perception[leader].push({ id: uid(), source, scores, at: new Date().toISOString() });
    savePerception(S.perception);
    closeModal();
    recompute();
    renderView();
    toast(S.lang==='es' ? `Evaluación registrada · ${leader}` : `Assessment recorded · ${leader}`, 'fa-circle-check');
  });
}

/* ---------- Modal: sesión de coaching (compatible v16.1) ------------------ */
function openSession(name) {
  const es = S.lang === 'es', t = T();
  modal(`
    <span class="slos-eyebrow"><i class="fas fa-calendar-plus"></i> ${esc(t.schedule)}</span>
    <h2 style="margin-top:11px">${esc(es?'Programar sesión':'Schedule session')}</h2>
    <label>${esc(t.thLeader)}</label>
    <select id="slos-se-leader" class="slos-in">${S.leaders.map(p => `<option ${p.name===name?'selected':''}>${esc(p.name)}</option>`).join('')}</select>
    <label>${esc(es?'Fecha y hora':'Date & time')}</label>
    <input type="datetime-local" id="slos-se-when" class="slos-in">
    <label>${esc(es?'Tipo':'Type')}</label>
    <select id="slos-se-type" class="slos-in">
      <option value="one-on-one">${esc(es?'1:1 ejecutivo':'Executive 1:1')}</option>
      <option value="360">${esc(es?'Devolución 360°':'360° debrief')}</option>
      <option value="team">${esc(es?'Coaching de equipo':'Team coaching')}</option>
      <option value="board">${esc(es?'Sesión de consejo':'Board session')}</option>
    </select>
    <label>${esc(es?'Notas':'Notes')}</label>
    <textarea id="slos-se-notes" class="slos-in" rows="3"></textarea>
    <div class="slos-acts">
      <button class="slos-btn" data-act="close-modal">${esc(t.cancel)}</button>
      <button class="slos-btn gold" id="slos-se-save"><i class="fas fa-save"></i> ${esc(t.save)}</button>
    </div>`);
  $('#slos-se-save', root()).addEventListener('click', () => {
    const ov = $('#slos-modal', root());
    const when = $('#slos-se-when', ov).value;
    if (!when) { toast(S.lang==='es'?'Indica fecha y hora':'Set a date and time', 'fa-triangle-exclamation'); return; }
    S.sessions.push({
      id: uid(), member: $('#slos-se-leader', ov).value, datetime: when,
      type: $('#slos-se-type', ov).value, notes: $('#slos-se-notes', ov).value, createdAt: new Date().toISOString()
    });
    store.set(CFG.STORAGE.SESSIONS, S.sessions);
    closeModal(); renderView();
    toast(S.lang==='es'?'Sesión programada':'Session scheduled', 'fa-calendar-check');
  });
}

/* ---------- Modal: experimento ------------------------------------------- */
function startExperiment(libId, leader) {
  const lib = EXPERIMENT_LIBRARY.find(e => e.id === libId);
  const es = S.lang === 'es', t = T();
  modal(`
    <span class="slos-eyebrow"><i class="fas fa-flask"></i> ${esc(es?'Experimento conductual':'Behavioural experiment')}</span>
    <h2 style="margin-top:11px">${esc(lib ? L(lib) : (es?'Nuevo experimento':'New experiment'))}</h2>
    ${lib ? `<p class="slos-note">${esc(S.lang==='es'?lib.es_d:lib.en_d)}</p>
    <div class="slos-note" style="margin-top:9px"><i class="fas fa-ruler"></i> <strong>${esc(es?'Se mide con:':'Measured by:')}</strong> ${esc(S.lang==='es'?lib.es_m:lib.en_m)}</div>` : ''}
    <label>${esc(es?'Nombre del experimento':'Experiment name')}</label>
    <input id="slos-ex-title" class="slos-in" value="${esc(lib ? L(lib) : '')}" placeholder="${esc(es?'p. ej. Preguntar antes de aconsejar':'e.g. Ask before advising')}">
    <label>${esc(es?'¿Quién lo practica?':'Who practises it?')}</label>
    <select id="slos-ex-leader" class="slos-in">
      <option value="">${esc(es?'Todo el equipo':'Whole team')}</option>
      ${S.leaders.map(p => `<option ${p.name===leader?'selected':''}>${esc(p.name)}</option>`).join('')}
    </select>
    <label>${esc(es?'Duración':'Duration')}</label>
    <select id="slos-ex-days" class="slos-in">
      ${[14,21,30,60].map(d => `<option value="${d}" ${lib && lib.days===d?'selected':''}>${d} ${esc(t.days)}</option>`).join('')}
    </select>
    <div class="slos-acts">
      <button class="slos-btn" data-act="close-modal">${esc(t.cancel)}</button>
      <button class="slos-btn gold" id="slos-ex-save"><i class="fas fa-play"></i> ${esc(t.start)}</button>
    </div>`);
  $('#slos-ex-save', root()).addEventListener('click', () => {
    const ov = $('#slos-modal', root());
    const title = $('#slos-ex-title', ov).value.trim();
    if (!title) { toast(S.lang==='es'?'Ponle un nombre':'Give it a name', 'fa-triangle-exclamation'); return; }
    const days = parseInt($('#slos-ex-days', ov).value, 10);
    S.experiments.push({
      id: uid(), libId: libId || null, title,
      leader: $('#slos-ex-leader', ov).value || null,
      days, status: 'active',
      startedAt: new Date().toISOString(),
      endsAt: new Date(Date.now() + days * 864e5).toISOString()
    });
    store.set(CFG.STORAGE.EXPERIMENTS, S.experiments);
    closeModal(); go('experiments');
    toast(S.lang==='es'?'Experimento iniciado':'Experiment started', 'fa-flask');
  });
}

/* ---------- Modal: historia ---------------------------------------------- */
function openStory() {
  const es = S.lang === 'es', t = T();
  modal(`
    <span class="slos-eyebrow"><i class="fas fa-feather"></i> ${esc(es?'Historia de servicio':'Story of service')}</span>
    <h2 style="margin-top:11px">${esc(es?'Registrar una historia':'Record a story')}</h2>
    <p class="slos-note">${esc(es?'Un hecho concreto, con nombre, fecha y consecuencia observable. Sin adjetivos.':'One concrete fact, with a name, a date and an observable consequence. No adjectives.')}</p>
    <label>${esc(es?'Título':'Title')}</label>
    <input id="slos-st-title" class="slos-in" placeholder="${esc(es?'La manager que quitó el muro':'The manager who removed the wall')}">
    <label>${esc(t.thLeader)}</label>
    <select id="slos-st-leader" class="slos-in"><option value="">—</option>${S.leaders.map(p => `<option>${esc(p.name)}</option>`).join('')}</select>
    <label>${esc(es?'Qué pasó':'What happened')}</label>
    <textarea id="slos-st-body" class="slos-in" rows="4"></textarea>
    <label>${esc(es?'Cita textual (opcional)':'Verbatim quote (optional)')}</label>
    <input id="slos-st-quote" class="slos-in">
    <label>${esc(es?'Etiquetas separadas por comas':'Comma-separated tags')}</label>
    <input id="slos-st-tags" class="slos-in" placeholder="${esc(es?'Escucha, Empoderamiento, −9 días de ciclo':'Listening, Empowerment, −9 days cycle')}">
    <div class="slos-acts">
      <button class="slos-btn" data-act="close-modal">${esc(t.cancel)}</button>
      <button class="slos-btn gold" id="slos-st-save"><i class="fas fa-save"></i> ${esc(t.save)}</button>
    </div>`);
  $('#slos-st-save', root()).addEventListener('click', () => {
    const ov = $('#slos-modal', root());
    const title = $('#slos-st-title', ov).value.trim();
    if (!title) { toast(S.lang==='es'?'Falta el título':'Title missing', 'fa-triangle-exclamation'); return; }
    S.stories.push({
      id: uid(), title, leader: $('#slos-st-leader', ov).value,
      body: $('#slos-st-body', ov).value, quote: $('#slos-st-quote', ov).value,
      tags: $('#slos-st-tags', ov).value.split(',').map(x => x.trim()).filter(Boolean),
      at: new Date().toISOString()
    });
    store.set(CFG.STORAGE.STORIES, S.stories);
    closeModal(); renderView();
    toast(S.lang==='es'?'Historia registrada':'Story recorded', 'fa-feather');
  });
}

/* ==========================================================================
 * 16 · INFORME EJECUTIVO
 *
 * Un solo modelo, tres salidas. `buildReport()` produce la estructura del
 * documento (portada, nueve capítulos numerados y anexo) sin decidir nada
 * sobre su presentación. A partir de ahí:
 *
 *   · openReport()        → lectura en pantalla, paginada, con índice lateral
 *   · exportReportHTML()  → archivo .html autocontenido, con @page A4
 *   · exportPDF()         → jsPDF con paginación real y figuras rasterizadas
 *
 * Regla que gobierna todo el capítulo: el documento tiene que poder leerse
 * impreso en blanco y negro. Ningún dato depende del color para entenderse.
 * Las series se distinguen por forma —relleno frente a contorno, continuo
 * frente a discontinuo— y toda cifra va acompañada de su referencia.
 * ========================================================================== */

/* ---------- Traducción a tinta -------------------------------------------
 * Los gráficos del sistema se dibujan para pantalla oscura. Sobre papel esa
 * paleta desaparece, así que aquí se traduce. Lo que era claro sobre fondo
 * oscuro pasa a ser oscuro sobre fondo blanco.
 * ------------------------------------------------------------------------ */
const PRINT_INK = {
  'var(--teal)':     '#1d5266', 'var(--teal-dim)': '#cfe0e6',
  'var(--gold)':     '#8a6a1e', 'var(--gold-hi)':  '#a4842f', 'var(--gold-dim)':'#eadfc4',
  'var(--green)':    '#2f5c3a', 'var(--amber)':    '#7d6216', 'var(--red)':     '#8f2f26',
  'var(--bg)':       '#ffffff', 'var(--bg-deep)':  '#ffffff',
  'var(--surface)':  '#f7f7f5', 'var(--surface-2)':'#f2f2ef',
  'var(--ink)':      '#14161c', 'var(--ink-2)':    '#33373f',
  'var(--ink-3)':    '#5a5f68', 'var(--ink-4)':    '#7b818b',
  'var(--line)':     '#dcdee3', 'var(--line-2)':   '#c6c9d0',
  'var(--band-1)':   '#f0f0ee', 'var(--band-2)':   '#e2e2df',
  'var(--band-3)':   '#d2d2ce', 'var(--band-4)':   '#c0c0bb'
};

/** Convierte el marcado de un gráfico a la paleta de impresión. */
function printSvg(markup) {
  let s = String(markup == null ? '' : markup);
  Object.keys(PRINT_INK).forEach(k => { s = s.split(k).join(PRINT_INK[k]); });
  // Cualquier oklch() suelto se traduce a gris invirtiendo la claridad.
  return s.replace(/oklch\(\s*([\d.]+)%[^)\/]*(?:\/\s*([\d.]+)\s*)?\)/g, (m, l, a) => {
    const g = Math.round(255 * clamp(1 - (0.35 + 0.6 * (parseFloat(l) / 100)), 0, 1));
    return a === undefined ? 'rgb(' + g + ',' + g + ',' + g + ')' : 'rgba(' + g + ',' + g + ',' + g + ',' + a + ')';
  });
}

/* ---------- Percepción agregada ------------------------------------------- */

/** Media del portafolio por dimensión, con la forma que espera svgDumbbell. */
function orgPerception(P) {
  const withPs = (P || []).filter(p => p.ps);
  if (!withPs.length) return null;
  const dims = {};
  let any = false;
  SLS8.forEach(d => {
    const self = withPs.map(p => p.ps.dims[d.key].self).filter(v => v != null);
    const oth  = withPs.map(p => p.ps.dims[d.key].others).filter(v => v != null);
    if (self.length || oth.length) any = true;
    dims[d.key] = {
      self:   self.length ? round(mean(self), 2) : null,
      others: oth.length  ? round(mean(oth), 2)  : null,
      gap: (self.length && oth.length) ? round(mean(self) - mean(oth), 2) : null
    };
  });
  if (!any) return null;
  return {
    dims, leaders: withPs.length,
    raters:    sum(withPs.map(p => p.ps.raters)),
    externals: sum(withPs.map(p => p.externals))
  };
}

/* ---------- El modelo del documento --------------------------------------- */

/**
 * Construye el informe entero. Devuelve datos, nunca marcado: quien lo pinta
 * decide el medio. Toda cifra procede de una variable del sistema.
 */
function buildReport() {
  const es = S.lang === 'es', t = T();
  const P = (S.filtered || []).slice(), o = S.org;
  const now = new Date();

  const meta = {
    title:    es ? 'Informe de liderazgo de servicio' : 'Servant leadership report',
    subtitle: es ? 'Lectura ejecutiva del portafolio' : 'Executive reading of the portfolio',
    date: longDate(now),
    iso: now.toISOString().slice(0, 10),
    version: 'Servant OS v' + CFG.VERSION + ' · ' + CFG.CODENAME,
    instrument: 'SLS-8 · van Dierendonck & Nuijten (2011)',
    confidential: t.rpConfidential,
    source: S.demo ? (es ? 'Datos de demostración' : 'Demonstration data') : (es ? 'Proyectos conectados' : 'Connected projects')
  };

  if (!P.length || !o) {
    return {
      meta, empty: true, chapters: [], glossary: [], refs: [],
      lead: es ? 'No hay personas con carga asignada en los proyectos conectados, de modo que no hay portafolio que describir.'
               : 'No people carry assigned load in the connected projects, so there is no portfolio to describe.'
    };
  }

  let nFig = 0, nTab = 0;
  const fig = (svg, caption, note) => ({ n: ++nFig, svg: svg, caption: caption, note: note || '' });
  const tab = (cols, rows, caption, note, summary) => ({
    n: ++nTab, cols: cols, rows: rows, caption: caption, note: note || '', summary: summary || null
  });

  /* --- Cifras compartidas por todo el documento --- */
  const avg       = Math.round(mean(P.map(p => p.index)));
  const anyReal   = P.some(p => p.externals > 0);
  const withReal  = P.filter(p => p.externals > 0);
  const ranked    = P.slice().sort((a, b) => b.index - a.index);
  const topLoad   = P.slice().sort((a, b) => b.tasks - a.tasks)[0];
  const orgBpi    = behaviouralIndex(o);
  const ins       = generateInsights(P, o);
  const op        = orgPerception(P);
  const snaps     = (S.snapshots || []).slice();
  const chapters  = [];

  const idxMark = p => p.index + (p.indexKind === 'sli' ? '' : THIN + '~');
  const nf = n => String(Math.round(n));
  // Coma decimal en español. Un informe con puntos decimales delata de dónde
  // salió el número, y aquí el número tiene que parecer escrito, no volcado.
  const dec = (v, d) => {
    const s = (Math.round(v * Math.pow(10, d)) / Math.pow(10, d)).toFixed(d);
    return es ? s.split('.').join(',') : s;
  };
  const plural = (n, uno, varios) => (n === 1 ? uno : varios);

  /* ======================================================================
   * 1 · Dónde está la organización
   * ==================================================================== */
  const byLvl = MATURITY.map(m => ({ m: m, n: P.filter(p => p.maturity.lvl === m.lvl).length })).filter(x => x.n);
  const matTxt = byLvl.map(x => x.n + ' ' + (es ? 'en nivel ' : 'at ') + L(x.m)).join(es ? '; ' : '; ');

  chapters.push({
    id: 'situacion', title: t.rpC1,
    thesis: es
      ? 'El índice medio del portafolio está en ' + avg + ' sobre 100, y lo que ese número significa depende por entero del tipo de evidencia que lo sostiene.'
      : 'The portfolio mean index stands at ' + avg + ' out of 100, and what that number means depends entirely on the kind of evidence behind it.',
    body: [
      es ? plural(o.people, 'Hay una sola persona con carga asignada', 'Hay ' + o.people + ' personas con carga asignada') + ', repartida en ' + o.projects + ' ' + plural(o.projects, 'proyecto', 'proyectos') + ' y ' + o.totalTasks + ' tareas registradas. De ellas, ' + o.done + ' figuran completadas y ' + o.late + ' están vencidas, lo que sitúa el cumplimiento agregado en ' + pc(o.completion * 100) + '.'
         : plural(o.people, 'There is one single person carrying assigned load', 'There are ' + o.people + ' people carrying assigned load') + ', spread across ' + o.projects + ' ' + plural(o.projects, 'project', 'projects') + ' and ' + o.totalTasks + ' recorded tasks. Of those, ' + o.done + ' are completed and ' + o.late + ' are overdue, placing aggregate completion at ' + pc(o.completion * 100) + '.',
      es ? 'Repartidos por el modelo de madurez, el portafolio queda así: ' + matTxt + '. El umbral de 63 puntos marca el paso a Constructor, el nivel en el que el equipo ya rinde sin su líder en la sala; el de 79 marca el paso a Multiplicador.'
         : 'Distributed across the maturity model, the portfolio breaks down as follows: ' + matTxt + '. The 63-point threshold marks the step into Builder, the level at which the team performs without its leader in the room; 79 marks the step into Multiplier.',
      anyReal
        ? (es ? 'De los ' + P.length + ' líderes, ' + withReal.length + ' cuentan con evaluación de percepción registrada. Sobre ellos el documento habla de SLI. Sobre el resto, de índice conductual, y lo marca con el símbolo ~ cada vez que aparece.'
              : 'Of the ' + P.length + ' leaders, ' + withReal.length + ' have recorded perception assessments. For those, this document refers to SLI. For the rest it refers to a behavioural index, marked with the ~ symbol wherever it appears.')
        : (es ? 'Ninguno de los ' + P.length + ' líderes cuenta con evaluación de percepción registrada, de modo que todas las cifras que siguen son proxies conductuales y aparecen marcadas con el símbolo ~. El capítulo siguiente explica qué se puede y qué no se puede concluir con ellas.'
              : 'None of the ' + P.length + ' leaders has a recorded perception assessment, so every figure that follows is a behavioural proxy and appears marked with the ~ symbol. The next chapter explains what can and cannot be concluded from them.')
    ],
    figures: [ fig(
      svgBullet(avg, 63, es ? 'Índice medio del portafolio' : 'Portfolio mean index'),
      es ? 'Índice medio frente al umbral de Constructor. Las bandas grises de fondo son los cuatro niveles del modelo de madurez, de Explorador a Legado; la línea vertical marca los 63 puntos.'
         : 'Mean index against the Builder threshold. The grey background bands are the four maturity levels, from Explorer to Legacy; the vertical line marks 63 points.',
      anyReal ? '' : (es ? 'Valor estimado: procede de telemetría, no de percepción.' : 'Estimated value: derived from telemetry, not perception.')
    ) ],
    tables: []
  });

  /* ======================================================================
   * 2 · Calidad de la evidencia
   * ==================================================================== */
  const evRows = ranked.map(p => [
    p.name, String(p.externals), t[p.conf.label], idxMark(p),
    p.indexKind === 'sli' ? 'SLI' : 'BPI'
  ]);

  chapters.push({
    id: 'evidencia', title: t.rpC2,
    thesis: anyReal
      ? (es ? withReal.length + ' de ' + P.length + ' líderes ' + plural(withReal.length, 'tiene', 'tienen') + ' percepción 360° registrada, y solo sobre ' + plural(withReal.length, 'él este documento emplea', 'ellos este documento emplea') + ' la palabra SLI.'
            : withReal.length + ' of ' + P.length + ' leaders ' + plural(withReal.length, 'has', 'have') + ' recorded 360° perception, and only for ' + plural(withReal.length, 'that one', 'those') + ' does this document use the word SLI.')
      : (es ? 'Ninguna cifra de este documento procede de una evaluación de percepción: todas son proxies conductuales derivados de la ejecución de tareas.'
            : 'No figure in this document comes from a perception assessment: all are behavioural proxies derived from task execution.'),
    body: [
      es ? 'El sistema trabaja con dos capas de evidencia que no se mezclan. La primera se deriva de las tareas: entropía de la distribución del trabajo, coeficiente de Gini de la carga, concentración en la persona más ocupada, cumplimiento frente a lo comprometido. Son señales conductuales, y el índice que producen se llama índice conductual, BPI.'
         : 'The system works with two layers of evidence that never merge. The first derives from tasks: entropy of work distribution, Gini coefficient of load, concentration in the busiest person, follow-through against commitments. These are behavioural signals, and the index they produce is the behavioural index, BPI.',
      es ? 'La segunda capa es la percepción de los seguidores, recogida con el instrumento SLS-8 de van Dierendonck y Nuijten en sus ocho dimensiones. El liderazgo de servicio es un constructo perceptual: mide cómo experimenta el equipo la conducta de quien lo dirige. Solo cuando esa capa existe puede hablarse de SLI.'
         : 'The second layer is follower perception, captured with the SLS-8 instrument of van Dierendonck and Nuijten across its eight dimensions. Servant leadership is a perceptual construct: it measures how a team experiences the conduct of whoever leads it. Only when that layer exists can one speak of SLI.',
      es ? 'La consecuencia práctica es sencilla. Una persona puede repartir el trabajo de forma impecable y aun así no ser vivida como alguien que escucha; y al revés, una carga concentrada puede convivir con un equipo que se siente sostenido. La telemetría orienta la conversación. No la cierra.'
         : 'The practical consequence is simple. A person can distribute work impeccably and still not be experienced as someone who listens; conversely, concentrated load can coexist with a team that feels supported. Telemetry orients the conversation. It does not close it.',
      anyReal
        ? (es ? 'Cuando llega percepción real, el peso de la telemetría en el índice compuesto baja: del 40 % con uno o dos evaluadores al 25 % con tres o cuatro, y al 15 % con cinco o más. La evidencia perceptual desplaza al proxy en lugar de sumarse a él.'
              : 'When real perception arrives, the weight of telemetry in the composite index drops: from 40 % with one or two raters to 25 % with three or four, and to 15 % with five or more. Perceptual evidence displaces the proxy rather than adding to it.')
        : (es ? 'Mientras no haya evaluadores, ninguna cifra de este informe debería sostener una decisión de promoción, de salida o de retribución. Sirven para decidir dónde mirar y qué conversación tener, que no es poco, pero no son una medida del constructo.'
              : 'Until raters exist, no figure in this report should support a promotion, exit or compensation decision. They serve to decide where to look and which conversation to hold, which is not trivial, but they are not a measure of the construct.')
    ],
    figures: [],
    tables: [ tab(
      [ { label: t.thLeader }, { label: es ? 'Evaluadores externos' : 'External raters', num: true },
        { label: t.thEvidence }, { label: es ? 'Índice' : 'Index', num: true }, { label: es ? 'Tipo' : 'Type' } ],
      evRows,
      es ? 'Evidencia disponible por líder, ordenada por índice. El símbolo ~ señala todo valor estimado a partir de telemetría.'
         : 'Available evidence by leader, ordered by index. The ~ symbol marks every value estimated from telemetry.',
      es ? 'Umbrales: evidencia baja desde 1 evaluador, media desde 3, alta desde 5.'
         : 'Thresholds: low evidence from 1 rater, medium from 3, high from 5.'
    ) ]
  });

  /* ======================================================================
   * 3 · El reparto de la carga
   * ==================================================================== */
  const loadRows = P.slice().sort((a, b) => b.tasks - a.tasks).map(p => [
    p.name, String(p.tasks),
    pc(o.totalTasks ? p.tasks / o.totalTasks * 100 : 0),
    String(p.completed), String(p.overdue)
  ]);

  chapters.push({
    id: 'carga', title: t.rpC3,
    thesis: es
      ? 'El coeficiente de Gini de la carga está en ' + dec(o.giniLoad, 2) + ' y la persona con más tareas concentra el ' + pc(o.busFactor * 100) + ' del total.'
      : 'The load Gini coefficient stands at ' + dec(o.giniLoad, 2) + ' and the busiest person concentrates ' + pc(o.busFactor * 100) + ' of the total.',
    body: [
      es ? 'La curva de la figura compara el reparto real con el reparto perfectamente igualitario, que sería la diagonal. Cuanto más se hunde la curva por debajo de esa diagonal, más se apoya la operación en pocas personas. El área encerrada entre ambas es exactamente lo que el coeficiente de Gini resume en un número.'
         : 'The curve in the figure compares the actual distribution with a perfectly equal one, which would be the diagonal. The further the curve sinks below that diagonal, the more the operation leans on few people. The area enclosed between the two is precisely what the Gini coefficient summarises in a single number.',
      es ? topLoad.name + ' lleva ' + topLoad.tasks + ' de las ' + o.totalTasks + ' tareas del sistema. Con ' + o.people + ' personas en el portafolio, un reparto plano daría a cada una alrededor de ' + nf(o.totalTasks / o.people) + '.'
         : topLoad.name + ' carries ' + topLoad.tasks + ' of the ' + o.totalTasks + ' tasks in the system. With ' + o.people + ' people in the portfolio, a flat distribution would give each around ' + nf(o.totalTasks / o.people) + '.',
      o.busFactor > 0.34
        ? (es ? 'Una concentración por encima de un tercio se lee habitualmente como alto rendimiento individual. Lo que describe en realidad es una capacidad que no está distribuida: la salida de esa persona detiene la operación, y el coste de esa fragilidad no aparece en ningún informe de entrega.'
              : 'Concentration above one third usually reads as high individual performance. What it actually describes is capability that is not distributed: that person leaving stops the operation, and the cost of that fragility appears in no delivery report.')
        : (es ? 'La concentración se mantiene por debajo del tercio de la carga total, que es el umbral a partir del cual el sistema la señala como riesgo estructural. El reparto no es el problema dominante de esta organización ahora mismo.'
              : 'Concentration stays below one third of total load, the threshold from which the system flags it as structural risk. Distribution is not this organisation’s dominant problem right now.')
    ],
    figures: [ fig(
      svgLorenz(P.map(p => p.tasks), P.map(p => p.name)),
      es ? 'Curva de Lorenz de la carga de tareas. La diagonal representa el reparto igualitario; el área sombreada entre ambas líneas es la desigualdad que resume el Gini.'
         : 'Lorenz curve of task load. The diagonal represents equal distribution; the shaded area between the two lines is the inequality the Gini summarises.',
      es ? 'Umbral de alerta del sistema: Gini por encima de 0,42.' : 'System alert threshold: Gini above 0.42.'
    ) ],
    tables: [ tab(
      [ { label: t.thLeader }, { label: es ? 'Tareas' : 'Tasks', num: true },
        { label: es ? 'Cuota' : 'Share', num: true }, { label: es ? 'Completadas' : 'Completed', num: true },
        { label: es ? 'Vencidas' : 'Overdue', num: true } ],
      loadRows,
      es ? 'Carga por persona, ordenada de mayor a menor. La cuota se calcula sobre el total de tareas del sistema.'
         : 'Load per person, ordered from highest to lowest. Share is computed over the total tasks in the system.',
      '',
      [ es ? 'Total' : 'Total', String(o.totalTasks), pc(100), String(o.done), String(o.late) ]
    ) ]
  });

  /* ======================================================================
   * 4 · Cómo se compone el índice conductual
   * ==================================================================== */
  const WBPI = { delegation:.22, spotlight:.20, equity:.16, followthrough:.16, growthsurface:.14, resilience:.12 };
  const parts = BEHAVIOR_SIGNALS.map(s => ({
    label: L(s), short: L(s).split(/\s+/)[0], key: s.key,
    w: WBPI[s.key], v: (o[s.key] || 0) * WBPI[s.key] * 100
  }));
  const topPart = parts.slice().sort((a, b) => b.v - a.v)[0];
  const lowPart = parts.slice().sort((a, b) => (a.v / a.w) - (b.v / b.w))[0];

  chapters.push({
    id: 'composicion', title: t.rpC4,
    thesis: es
      ? 'El índice conductual de la organización suma ' + orgBpi + ' puntos, y ' + topPart.label.toLowerCase() + ' aporta ' + dec(topPart.v, 1) + ' de ellos.'
      : 'The organisation’s behavioural index totals ' + orgBpi + ' points, and ' + topPart.label.toLowerCase() + ' contributes ' + dec(topPart.v, 1) + ' of them.',
    body: [
      es ? 'La figura descompone el índice en las seis señales que lo forman, cada una con el peso que le corresponde. La altura de cada barra es la contribución efectiva, no la puntuación bruta: una señal con peso alto y valor bajo aporta poco, y ahí es donde suele estar el margen.'
         : 'The figure breaks the index down into the six signals that form it, each with its corresponding weight. Each bar’s height is the effective contribution, not the raw score: a signal with high weight and low value contributes little, and that is usually where the margin sits.',
      es ? 'La señal con más recorrido es ' + lowPart.label.toLowerCase() + ': pesa un ' + Math.round(lowPart.w * 100) + ' % del índice y rinde ' + nf((lowPart.v / lowPart.w)) + ' sobre 100. Moverla es el camino más corto para mover el agregado.'
         : 'The signal with the most headroom is ' + lowPart.label.toLowerCase() + ': it carries ' + Math.round(lowPart.w * 100) + ' % of the index weight and scores ' + nf((lowPart.v / lowPart.w)) + ' out of 100. Moving it is the shortest path to moving the aggregate.',
      es ? 'Esta descomposición corresponde al índice conductual y solo a él. El SLI no se descompone así, porque no se calcula así: sale de las respuestas de los seguidores en las ocho dimensiones del SLS-8, cada una con su propio peso en el instrumento validado.'
         : 'This decomposition corresponds to the behavioural index and to it alone. SLI does not decompose this way, because it is not computed this way: it comes from follower responses across the eight SLS-8 dimensions, each with its own weight in the validated instrument.'
    ],
    figures: [ fig(
      svgWaterfall(parts, orgBpi, es ? 'el índice conductual' : 'the behavioural index'),
      es ? 'Contribución de cada señal conductual al índice de la organización. El porcentaje bajo cada etiqueta es el peso de esa señal en la fórmula.'
         : 'Contribution of each behavioural signal to the organisation index. The percentage under each label is that signal’s weight in the formula.',
      es ? 'Descomposición del índice conductual (BPI), no del SLI.' : 'Decomposition of the behavioural index (BPI), not of SLI.'
    ) ],
    tables: [ tab(
      [ { label: es ? 'Señal' : 'Signal' }, { label: es ? 'Proxy de' : 'Proxy for' },
        { label: es ? 'Valor' : 'Value', num: true }, { label: es ? 'Peso' : 'Weight', num: true },
        { label: es ? 'Aporte' : 'Contribution', num: true } ],
      BEHAVIOR_SIGNALS.map(s => {
        const dim = SLS8.filter(d => d.key === s.proxyFor)[0];
        return [ L(s), dim ? L(dim) : '—', nf((o[s.key] || 0) * 100),
                 Math.round(WBPI[s.key] * 100) + THIN + '%', dec((o[s.key] || 0) * WBPI[s.key] * 100, 1) ];
      }),
      es ? 'Las seis señales conductuales, su valor sobre 100, su peso en la fórmula y los puntos que aportan al índice.'
         : 'The six behavioural signals, their value out of 100, their weight in the formula and the points they contribute to the index.',
      es ? 'La columna «Proxy de» indica la dimensión del SLS-8 que cada señal intenta aproximar. Aproximar no es medir.'
         : 'The “Proxy for” column indicates the SLS-8 dimension each signal attempts to approximate. Approximating is not measuring.',
      [ es ? 'Índice conductual' : 'Behavioural index', '', '', pc(100), String(orgBpi) ]
    ) ]
  });

  /* ======================================================================
   * 5 · Lo que ve el equipo
   * ==================================================================== */
  if (op) {
    const gapRows = SLS8.map(d => {
      const x = op.dims[d.key];
      return {
        d: d,
        self: x.self, others: x.others, gap: x.gap,
        row: [ L(d),
               x.self   != null ? dec(x.self, 1)   : '—',
               x.others != null ? dec(x.others, 1) : '—',
               x.gap    != null ? (x.gap > 0 ? '+' : '') + dec(x.gap, 1) : '—' ]
      };
    });
    const graded = gapRows.filter(r => r.gap != null).sort((a, b) => b.gap - a.gap);
    const worst = graded[0], best = graded[graded.length - 1];
    const lowest = gapRows.filter(r => r.others != null).sort((a, b) => a.others - b.others)[0];

    chapters.push({
      id: 'percepcion', title: t.rpC5,
      thesis: worst
        ? (es ? 'La mayor diferencia entre cómo se ven los líderes y cómo los ve su equipo está en ' + L(worst.d).toLowerCase() + ', con ' + dec(worst.gap, 1) + ' puntos sobre una escala de seis.'
              : 'The widest difference between how leaders see themselves and how their team sees them sits in ' + L(worst.d).toLowerCase() + ', at ' + dec(worst.gap, 1) + ' points on a six-point scale.')
        : (es ? 'Hay percepción del equipo registrada, pero no autoevaluación con la que contrastarla, de modo que el documento puede describir el nivel y no la brecha.'
              : 'Team perception is recorded, but there is no self-assessment to contrast it with, so this document can describe the level and not the gap.'),
      body: [
        es ? 'La figura enfrenta las dos lecturas dimensión a dimensión. El punto relleno es la percepción del equipo; el punto hueco, la autoevaluación. La línea que los une es la distancia entre ambas, y esa distancia es el dato más accionable que produce una evaluación de 360 grados.'
           : 'The figure sets the two readings against each other dimension by dimension. The filled dot is team perception; the hollow dot, self-assessment. The line joining them is the distance between the two, and that distance is the most actionable datum a 360-degree assessment produces.',
        es ? 'Estas cifras agregan ' + op.raters + ' respuestas sobre ' + op.leaders + ' líderes, de las cuales ' + op.externals + ' provienen de personas distintas del propio evaluado. La escala va de 1, nunca, a 6, siempre.'
           : 'These figures aggregate ' + op.raters + ' responses across ' + op.leaders + ' leaders, of which ' + op.externals + ' come from people other than the person being assessed. The scale runs from 1, never, to 6, always.',
        worst && worst.gap >= 0.5
          ? (es ? 'Una brecha de medio punto o más señala una conducta que quien la ejerce da por hecha y quien la recibe no reconoce. No se corrige explicándola mejor: se corrige devolviendo el dato en un uno a uno, sin defenderlo, y eligiendo una práctica concreta de esa dimensión durante un ciclo.'
                : 'A gap of half a point or more marks a behaviour its author takes for granted and its recipients do not recognise. It is not corrected by explaining it better: it is corrected by returning the datum in a one-to-one, without defending it, and choosing one concrete practice from that dimension for a cycle.')
          : (es ? 'Ninguna brecha llega a medio punto sobre seis, que es el umbral a partir del cual el sistema la considera un punto ciego. La lectura propia y la del equipo están alineadas, y eso hace que las conversaciones de desarrollo partan de un terreno común.'
                : 'No gap reaches half a point out of six, the threshold from which the system considers it a blind spot. Self-reading and team reading are aligned, which lets development conversations start from common ground.'),
        lowest
          ? (es ? 'La dimensión que el equipo puntúa más baja es ' + L(lowest.d).toLowerCase() + ', con ' + dec(lowest.others, 1) + ' sobre 6. El instrumento la define así: ' + lowest.d.defEs
                : 'The dimension the team scores lowest is ' + L(lowest.d).toLowerCase() + ', at ' + dec(lowest.others, 1) + ' out of 6. The instrument defines it as follows: ' + lowest.d.defEn)
          : ''
      ].filter(Boolean),
      figures: [ fig(
        svgDumbbell(op),
        es ? 'Autopercepción frente a percepción del equipo en las ocho dimensiones del SLS-8, escala 1 a 6. Punto relleno: equipo. Punto hueco: autoevaluación.'
           : 'Self-perception against team perception across the eight SLS-8 dimensions, scale 1 to 6. Filled dot: team. Hollow dot: self-assessment.',
        es ? 'Brecha = autoevaluación menos equipo. Un valor positivo indica que el líder se puntúa por encima de como le ven.'
           : 'Gap = self-assessment minus team. A positive value means the leader scores above how they are seen.'
      ) ],
      tables: [ tab(
        [ { label: t.thDimension }, { label: t.thSelf, num: true }, { label: t.thTeam, num: true }, { label: t.thGap, num: true } ],
        gapRows.map(r => r.row),
        es ? 'Medias del portafolio por dimensión, en la escala original del instrumento.'
           : 'Portfolio means by dimension, on the instrument’s original scale.',
        es ? 'Rendición de cuentas carga .17 en el factor de segundo orden de la validación original: se interpreta como complemento del servicio, no como su núcleo.'
           : 'Accountability loads .17 on the second-order factor in the original validation: read it as a complement to service, not its core.'
      ) ]
    });
  } else {
    chapters.push({
      id: 'percepcion', title: t.rpC5,
      thesis: es
        ? 'Este capítulo no tiene datos que mostrar, y esa ausencia es en sí misma el hallazgo más relevante del informe.'
        : 'This chapter has no data to show, and that absence is itself the most relevant finding in the report.',
      body: [
        es ? 'El liderazgo de servicio no se observa desde fuera: se experimenta. Las ocho dimensiones del SLS-8 preguntan a quien recibe la conducta, no a quien la ejerce. Sin respuestas de seguidores no hay medida del constructo, por muy limpia que sea la telemetría de los capítulos anteriores.'
           : 'Servant leadership is not observed from outside: it is experienced. The eight SLS-8 dimensions ask whoever receives the conduct, not whoever performs it. Without follower responses there is no measure of the construct, however clean the telemetry in the preceding chapters.',
        es ? 'El instrumento son ocho dimensiones y alrededor de veinte enunciados, contestados en una escala de 1 a 6. Con tres evaluadores por líder la base ya sostiene planes de desarrollo individuales; con cinco o más sostiene decisiones de sucesión.'
           : 'The instrument is eight dimensions and around twenty statements, answered on a 1 to 6 scale. With three raters per leader the base already supports individual development plans; with five or more it supports succession decisions.',
        es ? 'Hasta que existan esas respuestas, la lectura correcta de este informe es la de un mapa de dónde mirar. Señala tensiones estructurales reales en el reparto del trabajo y en el cumplimiento, y no dice nada verificable sobre cómo se siente el equipo.'
           : 'Until those responses exist, the correct reading of this report is a map of where to look. It flags real structural tensions in work distribution and follow-through, and says nothing verifiable about how the team feels.'
      ],
      figures: [],
      tables: [ tab(
        [ { label: t.thDimension }, { label: es ? 'Qué pregunta' : 'What it asks' }, { label: es ? 'Peso' : 'Weight', num: true } ],
        SLS8.map(d => [ L(d), S.lang === 'es' ? d.defEs : d.defEn, round(d.weight * 100, 0) + THIN + '%' ]),
        es ? 'Las ocho dimensiones del instrumento pendiente de aplicar, con su peso en el índice.'
           : 'The eight dimensions of the instrument still to be applied, with their weight in the index.',
        'van Dierendonck & Nuijten (2011)'
      ) ]
    });
  }

  /* ======================================================================
   * 6 · El portafolio, líder a líder
   * ==================================================================== */
  const top = ranked[0], bottom = ranked[ranked.length - 1];
  const spread = top.index - bottom.index;
  const archCount = {};
  P.forEach(p => { archCount[p.archetype] = (archCount[p.archetype] || 0) + 1; });
  const archTop = Object.keys(archCount).sort((a, b) => archCount[b] - archCount[a])[0];

  chapters.push({
    id: 'portafolio', title: t.rpC6,
    thesis: P.length > 1
      ? (es ? 'El portafolio va de ' + top.name + ', en ' + idxMark(top) + ', a ' + bottom.name + ', en ' + idxMark(bottom) + ': ' + spread + ' puntos entre el primero y el último.'
            : 'The portfolio runs from ' + top.name + ', at ' + idxMark(top) + ', down to ' + bottom.name + ', at ' + idxMark(bottom) + ': ' + spread + ' points between first and last.')
      : (es ? 'El portafolio tiene una sola persona con carga asignada, ' + top.name + ', de modo que no hay dispersión que interpretar.'
            : 'The portfolio holds a single person with assigned load, ' + top.name + ', so there is no dispersion to interpret.'),
    body: [
      es ? 'La rejilla de la figura dibuja a cada líder en la misma escala, para que las formas se puedan comparar de un vistazo. El contorno continuo indica percepción medida; el discontinuo, proxy conductual. Una silueta amplia y regular describe un perfil equilibrado; una silueta con una punta larga describe una fortaleza concreta rodeada de terreno sin cubrir.'
         : 'The grid in the figure draws every leader on the same scale, so shapes can be compared at a glance. A continuous outline indicates measured perception; a dashed one, behavioural proxy. A wide, regular silhouette describes a balanced profile; a silhouette with one long spike describes a specific strength surrounded by uncovered ground.',
      es ? 'El arquetipo dominante del portafolio es ' + L(ARCHETYPES[archTop]) + ', con ' + archCount[archTop] + ' de ' + P.length + '. El arquetipo no es una etiqueta de valor: describe hacia dónde se inclina el perfil de señales de cada persona, y dos líderes con el mismo índice pueden tener arquetipos opuestos.'
         : 'The portfolio’s dominant archetype is ' + L(ARCHETYPES[archTop]) + ', with ' + archCount[archTop] + ' of ' + P.length + '. The archetype is not a value label: it describes where each person’s signal profile leans, and two leaders with the same index can hold opposite archetypes.',
      spread >= 25
        ? (es ? 'Una dispersión de ' + spread + ' puntos dentro del mismo portafolio suele indicar que las prácticas de liderazgo no están codificadas: cada persona resuelve por criterio propio. Es un problema de sistema antes que de personas, y se corrige haciendo explícito lo que hace quien está arriba.'
              : 'A ' + spread + '-point spread within the same portfolio usually indicates that leadership practices are not codified: each person solves by personal judgement. It is a systems problem before a people problem, and it is corrected by making explicit what those at the top actually do.')
        : (es ? 'La dispersión se mantiene en ' + spread + ' puntos, lo bastante estrecha como para que las conversaciones de desarrollo puedan ser comunes en lugar de individuales. Los programas transversales rinden más que los planes uno a uno cuando el portafolio está agrupado.'
              : 'Spread stays at ' + spread + ' points, narrow enough for development conversations to be shared rather than individual. Cross-cutting programmes outperform one-to-one plans when the portfolio is clustered.')
    ],
    figures: [ fig(
      svgSmallMultiples(P, 8),
      es ? 'Perfil de las ocho dimensiones por líder, todos a la misma escala. Contorno continuo: percepción medida. Contorno discontinuo: proxy conductual.'
         : 'Eight-dimension profile per leader, all at the same scale. Continuous outline: measured perception. Dashed outline: behavioural proxy.',
      P.length > 8 ? (es ? 'Se muestran los 8 primeros de ' + P.length + ' por índice.' : 'Showing the first 8 of ' + P.length + ' by index.') : ''
    ) ],
    tables: [ tab(
      [ { label: t.thLeader }, { label: t.thArchetype }, { label: es ? 'Índice' : 'Index', num: true },
        { label: t.thTrust, num: true }, { label: t.thGrowth, num: true },
        { label: t.thDependency, num: true }, { label: t.thEvidence } ],
      ranked.map(p => [ p.name, L(ARCHETYPES[p.archetype]), idxMark(p),
                        String(p.trust), String(p.growth), pc(p.dependency), t[p.conf.label] ]),
      es ? 'Portafolio completo ordenado por índice. Confianza combina aceptación interpersonal y autenticidad; crecimiento combina empoderamiento y humildad.'
         : 'Full portfolio ordered by index. Trust combines interpersonal acceptance and authenticity; growth combines empowerment and humility.',
      es ? 'Dependencia es la cuota de tareas de la persona sobre el total del sistema.'
         : 'Dependency is the person’s share of tasks over the system total.',
      [ es ? 'Media' : 'Mean', '', String(avg), String(Math.round(mean(P.map(p => p.trust)))),
        String(Math.round(mean(P.map(p => p.growth)))), pc(mean(P.map(p => p.dependency))), '' ]
    ) ]
  });

  /* ======================================================================
   * 7 · Trayectoria
   * ==================================================================== */
  const series = snaps.map(s => s.index);
  const labels = snaps.map(s => { const d = new Date(s.at); return dd(d.getDate()) + '/' + dd(d.getMonth() + 1); });
  const withLeaders = snaps.filter(s => s.byLeader && Object.keys(s.byLeader).length);
  const trFigs = [], trTabs = [];
  let trThesis, trBody;

  if (snaps.length < 2) {
    trThesis = es
      ? plural(snaps.length, 'El sistema tiene una sola instantánea registrada', 'El sistema no tiene ninguna instantánea registrada') + ', de modo que todavía no hay trayectoria: hay un punto de partida.'
      : plural(snaps.length, 'The system holds one single recorded snapshot', 'The system holds no recorded snapshot yet') + ', so there is no trajectory yet: there is a starting point.';
    trBody = [
      es ? 'Se registra una instantánea por día de uso, con el índice agregado y el índice de cada persona. A partir de la segunda, el documento puede mostrar quién sube y quién baja, que es una lectura distinta de la del nivel absoluto.'
         : 'One snapshot is recorded per day of use, holding the aggregate index and each person’s index. From the second onwards, the document can show who rises and who falls, which is a different reading from the absolute level.',
      es ? 'Sin serie, la comparación honesta es contra los umbrales del modelo de madurez, no contra un pasado que no está registrado. Los capítulos anteriores usan esos umbrales cada vez que sitúan una cifra.'
         : 'Without a series, the honest comparison is against the maturity model thresholds, not against a past that is not recorded. The preceding chapters use those thresholds every time they situate a figure.'
    ];
  } else {
    const first = series[0], last = series[series.length - 1], delta = last - first;
    trThesis = es
      ? 'A lo largo de ' + snaps.length + ' instantáneas el índice agregado ha pasado de ' + first + ' a ' + last + ', ' + (delta === 0 ? 'sin variación neta' : (delta > 0 ? 'con una subida de ' + delta + ' puntos' : 'con una caída de ' + Math.abs(delta) + ' puntos')) + '.'
      : 'Across ' + snaps.length + ' snapshots the aggregate index has moved from ' + first + ' to ' + last + ', ' + (delta === 0 ? 'with no net change' : (delta > 0 ? 'a rise of ' + delta + ' points' : 'a fall of ' + Math.abs(delta) + ' points')) + '.';
    trBody = [
      es ? 'La serie recoge el estado del sistema cada día que se abre, no cada día que pasa. Un salto brusco suele corresponder a un cambio en los datos de partida —proyectos que entran, personas que se incorporan— antes que a un cambio de conducta.'
         : 'The series records the system state on each day it is opened, not each day that passes. A sharp jump usually corresponds to a change in the underlying data, such as projects or people arriving, before it corresponds to a change in conduct.',
      es ? 'Con menos de seis instantáneas la tendencia no es interpretable como tal. Lo que sí es interpretable desde la segunda es la dirección relativa de cada persona dentro del conjunto.'
         : 'With fewer than six snapshots the trend is not interpretable as such. What is interpretable from the second onwards is each person’s relative direction within the group.'
    ];
    trFigs.push(fig(
      svgColumns(series, labels),
      es ? 'Índice agregado del portafolio en cada instantánea registrada, en orden cronológico.'
         : 'Aggregate portfolio index at each recorded snapshot, in chronological order.',
      es ? 'Una instantánea por día de uso del sistema.' : 'One snapshot per day the system is used.'
    ));
    if (withLeaders.length >= 2) {
      const a = withLeaders[0], b = withLeaders[withLeaders.length - 1];
      trFigs.push(fig(
        svgSlope(a, b),
        es ? 'Índice por persona entre la primera y la última instantánea con detalle individual. Cada línea es un líder.'
           : 'Index per person between the first and last snapshot holding individual detail. Each line is one leader.',
        es ? 'Comparación entre ' + longDate(new Date(a.at)) + ' y ' + longDate(new Date(b.at)) + '.'
           : 'Comparison between ' + longDate(new Date(a.at)) + ' and ' + longDate(new Date(b.at)) + '.'
      ));
    }
    trTabs.push(tab(
      [ { label: es ? 'Fecha' : 'Date' }, { label: es ? 'Índice' : 'Index', num: true }, { label: t.people, num: true } ],
      snaps.slice(-12).map(s => [ longDate(new Date(s.at)), String(s.index), String(s.people) ]),
      es ? 'Últimas instantáneas registradas, de la más antigua a la más reciente.'
         : 'Most recent snapshots recorded, oldest to newest.',
      snaps.length > 12 ? (es ? 'Se muestran las 12 últimas de ' + snaps.length + '.' : 'Showing the last 12 of ' + snaps.length + '.') : ''
    ));
  }

  chapters.push({ id: 'trayectoria', title: t.rpC7, thesis: trThesis, body: trBody, figures: trFigs, tables: trTabs });

  /* ======================================================================
   * 8 · Hallazgos prioritarios
   * ==================================================================== */
  const shown = ins.slice(0, 5);
  const highN = ins.filter(c => c.p === 'high').length;

  chapters.push({
    id: 'hallazgos', title: t.rpC8,
    thesis: ins.length
      ? (es ? plural(ins.length, 'Hay una sola señal por encima de su umbral', 'Hay ' + ins.length + ' señales por encima de su umbral') + ', y ' + plural(highN, 'una está clasificada', highN + ' están clasificadas') + ' como prioridad alta: son las que deberían ocupar la próxima reunión.'
            : plural(ins.length, 'One single signal sits above its threshold', ins.length + ' signals sit above their threshold') + ', and ' + plural(highN, 'one is', highN + ' are') + ' classified as high priority: those are the ones that should occupy the next meeting.')
      : (es ? 'Ninguna señal supera su umbral de alerta, lo que no equivale a ausencia de problemas: equivale a ausencia de problemas visibles en los datos registrados.'
            : 'No signal exceeds its alert threshold, which does not amount to an absence of problems: it amounts to an absence of problems visible in the recorded data.'),
    body: [
      es ? 'Cada hallazgo se presenta en tres partes. La señal es el dato observado con su umbral. La lectura explica por qué ese dato tiene consecuencias. La acción propone una intervención acotada en el tiempo, con una fecha de cierre, para que pueda evaluarse si funcionó.'
         : 'Each finding appears in three parts. The signal is the observed datum with its threshold. The reading explains why that datum has consequences. The action proposes a time-bounded intervention, with a closing date, so it can be evaluated afterwards.'
    ],
    findings: shown.map((c, i) => ({
      n: i + 1, priority: c.p,
      priorityLabel: c.p === 'high' ? (es ? 'Alta' : 'High') : c.p === 'medium' ? (es ? 'Media' : 'Medium') : (es ? 'Baja' : 'Low'),
      signal: c.signal, story: c.story, action: c.action, ref: c.ref || ''
    })),
    figures: [],
    tables: []
  });

  /* ======================================================================
   * 9 · Decisiones del próximo ciclo
   * ==================================================================== */
  const decisions = [];
  if (!anyReal) {
    decisions.push([
      es ? 'Aplicar el SLS-8 al portafolio completo' : 'Apply SLS-8 across the full portfolio',
      es ? 'Cero evaluaciones registradas' : 'Zero recorded assessments',
      es ? '30 días' : '30 days',
      es ? '3 evaluadores por líder como mínimo' : 'At least 3 raters per leader'
    ]);
  }
  ins.filter(c => c.cta && String(c.cta).indexOf('experiment:') === 0).slice(0, 3).forEach(c => {
    const lib = EXPERIMENT_LIBRARY.filter(x => x.id === String(c.cta).split(':')[1])[0];
    decisions.push([
      c.action, c.signal,
      (lib ? lib.days : 21) + ' ' + t.days,
      c.ref || (es ? 'Telemetría de tareas' : 'Task telemetry')
    ]);
  });
  const active = (S.experiments || []).filter(x => x.status === 'active');
  active.slice(0, 4).forEach(x => {
    decisions.push([
      (es ? 'Cerrar y evaluar: ' : 'Close and evaluate: ') + x.title,
      (es ? 'Experimento en curso' : 'Experiment under way') + (x.leader ? ' · ' + x.leader : ''),
      longDate(new Date(x.endsAt)),
      es ? 'Observación del equipo al cierre' : 'Team observation at closing'
    ]);
  });
  if (!decisions.length) {
    decisions.push([
      es ? 'Mantener la cadencia de medición' : 'Maintain the measurement cadence',
      es ? 'Ninguna señal por encima de umbral' : 'No signal above threshold',
      es ? '90 días' : '90 days',
      es ? 'Repetir el SLS-8 y comparar' : 'Repeat SLS-8 and compare'
    ]);
  }

  chapters.push({
    id: 'decisiones', title: t.rpC9,
    thesis: es
      ? plural(decisions.length, 'La decisión que sigue se deriva', 'Las ' + decisions.length + ' decisiones que siguen se derivan') + ' directamente de los capítulos anteriores, y cada una indica qué evidencia hará falta para saber si funcionó.'
      : plural(decisions.length, 'The decision that follows derives', 'The ' + decisions.length + ' decisions that follow derive') + ' directly from the preceding chapters, and each one states what evidence will be needed to know whether it worked.',
    body: [
      es ? 'Una intervención sin fecha de cierre no se puede evaluar, y una que no declara qué evidencia espera producir tampoco. Por eso cada fila lleva un horizonte y una condición de verificación en lugar de un responsable genérico.'
         : 'An intervention without a closing date cannot be evaluated, and neither can one that fails to state what evidence it expects to produce. That is why each row carries a horizon and a verification condition rather than a generic owner.',
      anyReal
        ? (es ? 'La secuencia importa: primero se devuelve el dato a quien lo protagoniza, después se elige una práctica, y solo al cierre del ciclo se vuelve a medir. Medir antes de haber cambiado nada produce ruido y desgasta la credibilidad del instrumento.'
              : 'Sequence matters: first the datum goes back to the person it concerns, then a practice is chosen, and only at the close of the cycle is it measured again. Measuring before anything has changed produces noise and erodes the instrument’s credibility.')
        : (es ? 'La primera fila condiciona a todas las demás. Sin evaluaciones de percepción, cualquier intervención que se lance ahora se evaluará contra proxies, y un proxy que mejora no demuestra que el equipo viva un liderazgo distinto.'
              : 'The first row conditions all the others. Without perception assessments, any intervention launched now will be evaluated against proxies, and an improving proxy does not demonstrate that the team experiences different leadership.'),
      es ? 'Ninguna de estas decisiones debería tomarse solo con este documento delante. El informe describe lo que está registrado; las personas que aparecen en él tienen contexto que el sistema no ve y que cambia la lectura.'
         : 'None of these decisions should be taken with this document alone. The report describes what is recorded; the people appearing in it hold context the system does not see, and that context changes the reading.'
    ],
    figures: [],
    tables: [ tab(
      [ { label: es ? 'Decisión' : 'Decision' }, { label: es ? 'Base' : 'Basis' },
        { label: es ? 'Horizonte' : 'Horizon' }, { label: es ? 'Evidencia necesaria' : 'Evidence required' } ],
      decisions,
      es ? 'Decisiones propuestas para el próximo ciclo, con su origen y la evidencia que permitirá cerrarlas.'
         : 'Proposed decisions for the next cycle, with their origin and the evidence that will allow closing them.',
      es ? 'Propuesta del sistema. La decisión sigue siendo de quien dirige.'
         : 'System proposal. The decision remains with whoever leads.'
    ) ]
  });

  /* ---------- Anexo ---------- */
  const glossary = es ? [
    { term: 'BPI · índice conductual', def: 'Índice 0–100 derivado de la ejecución de tareas: amplitud de delegación, cesión de protagonismo, equidad de carga, cumplimiento, superficie de crecimiento y resiliencia estructural, cada una con su peso. Es un proxy, no una medida del constructo.' },
    { term: 'SLI · índice de liderazgo de servicio', def: 'Índice 0–100 calculado sobre las respuestas de los seguidores en las ocho dimensiones del SLS-8. Solo existe cuando hay percepción registrada. Cuando la hay, el peso de la telemetría en el índice compuesto baja al 40, 25 o 15 % según el número de evaluadores.' },
    { term: 'SLS-8', def: 'Servant Leadership Survey de van Dierendonck y Nuijten (2011). Ocho dimensiones: empoderamiento, dar un paso atrás, administración responsable, humildad, autenticidad, aceptación interpersonal, coraje y rendición de cuentas.' },
    { term: 'Entropía de Shannon normalizada', def: 'Medida de cuán repartido está el trabajo entre personas. Vale 1 cuando todas cargan lo mismo y tiende a 0 cuando se concentra en una. En este sistema aproxima el empoderamiento.' },
    { term: 'Coeficiente de Gini', def: 'Resumen en un número de la desigualdad del reparto de carga. Cero es reparto perfectamente igual; uno es toda la carga en una persona. El sistema alerta por encima de 0,42.' },
    { term: 'Factor bus · concentración', def: 'Cuota de tareas que recae en la persona más cargada. Por encima de un tercio, la salida de esa persona detiene la operación.' },
    { term: 'Brecha auto–otros', def: 'Diferencia entre la autoevaluación de un líder y la puntuación de su equipo en la misma dimensión. Desde medio punto sobre seis, el sistema la trata como punto ciego.' },
    { term: 'Confianza de la evidencia', def: 'Nivel asignado según el número de evaluadores externos por líder: ninguna sin evaluadores, baja con 1–2, media con 3–4, alta con 5 o más.' },
    { term: 'Símbolo ~', def: 'Marca de valor estimado. Acompaña a toda cifra que procede de telemetría y no de percepción medida.' },
    { term: 'Arquetipo', def: 'Descripción cualitativa de hacia dónde se inclina el perfil de señales de una persona. No es un juicio de valor ni un nivel.' }
  ] : [
    { term: 'BPI · behavioural index', def: 'A 0–100 index derived from task execution: delegation breadth, spotlight yielding, load equity, follow-through, growth surface and structural resilience, each with its own weight. It is a proxy, not a measure of the construct.' },
    { term: 'SLI · servant leadership index', def: 'A 0–100 index computed from follower responses across the eight SLS-8 dimensions. It exists only when perception is recorded. When it exists, the weight of telemetry in the composite index drops to 40, 25 or 15 % depending on rater count.' },
    { term: 'SLS-8', def: 'Servant Leadership Survey by van Dierendonck and Nuijten (2011). Eight dimensions: empowerment, standing back, stewardship, humility, authenticity, interpersonal acceptance, courage and accountability.' },
    { term: 'Normalised Shannon entropy', def: 'A measure of how spread work is across people. It equals 1 when everyone carries the same and tends to 0 when it concentrates in one person. Here it approximates empowerment.' },
    { term: 'Gini coefficient', def: 'A single-number summary of load distribution inequality. Zero is perfectly equal; one is all load on one person. The system alerts above 0.42.' },
    { term: 'Bus factor · concentration', def: 'Share of tasks falling on the most loaded person. Above one third, that person leaving stops the operation.' },
    { term: 'Self–other gap', def: 'Difference between a leader’s self-assessment and their team’s score on the same dimension. From half a point out of six, the system treats it as a blind spot.' },
    { term: 'Evidence confidence', def: 'Level assigned by external rater count per leader: none without raters, low with 1–2, medium with 3–4, high with 5 or more.' },
    { term: '~ symbol', def: 'Estimated-value marker. It accompanies every figure derived from telemetry rather than measured perception.' },
    { term: 'Archetype', def: 'A qualitative description of where a person’s signal profile leans. It is neither a value judgement nor a level.' }
  ];

  const refs = [
    'van Dierendonck, D. & Nuijten, I. (2011). The Servant Leadership Survey. Journal of Business and Psychology, 26(3), 249–267.',
    'Liden, R. C., Wayne, S. J., Zhao, H. & Henderson, D. (2008). Servant leadership: development of a multidimensional measure. The Leadership Quarterly, 19(2), 161–177.',
    'Eva, N., Robin, M., Sendjaya, S., van Dierendonck, D. & Liden, R. C. (2019). Servant leadership: a systematic review and call for future research. The Leadership Quarterly, 30(1), 111–132.',
    'Lee, A., Lyubovnikova, J., Tian, A. W. & Knight, C. (2020). Servant leadership: a meta-analytic examination of incremental contribution. Journal of Occupational and Organizational Psychology, 93(1), 1–44.',
    'Spears, L. C. (1998). Insights on Leadership: Service, Stewardship, Spirit and Servant-Leadership. Wiley.'
  ];

  const method = es
    ? 'Los índices sin evaluación 360° son proxies conductuales derivados de la ejecución de tareas y no constituyen una medida validada del constructo de liderazgo de servicio. Los datos proceden de los proyectos conectados al sistema en el momento de generar el documento y describen únicamente el trabajo que está registrado: la parte del servicio que nadie anota queda fuera. Este informe no debe utilizarse como base única para decisiones de promoción, salida o retribución.'
    : 'Indices without a 360° assessment are behavioural proxies derived from task execution and do not constitute a validated measure of the servant leadership construct. Data come from the projects connected to the system at the moment the document was generated and describe only the work that is recorded: the part of service nobody logs stays outside. This report must not be the sole basis for promotion, exit or compensation decisions.';

  return { meta: meta, chapters: chapters, glossary: glossary, refs: refs, method: method, empty: false };
}

/* ==========================================================================
 * 16.1 · Marcado compartido por las tres salidas
 * ========================================================================== */

function reportTableHTML(tb) {
  const t = T();
  const head = tb.cols.map(c => `<th class="${c.num ? 'num' : ''}">${esc(c.label)}</th>`).join('');
  const body = tb.rows.map(r => `<tr>${r.map((cell, i) =>
    `<td class="${tb.cols[i] && tb.cols[i].num ? 'num' : ''}">${esc(cell)}</td>`).join('')}</tr>`).join('');
  const foot = tb.summary ? `<tfoot><tr>${tb.summary.map((cell, i) =>
    `<td class="${tb.cols[i] && tb.cols[i].num ? 'num' : ''}">${esc(cell)}</td>`).join('')}</tr></tfoot>` : '';
  return `<figure class="slos-rp-block">
    <figcaption><b>${esc(t.rpTable)} ${tb.n}.</b> ${esc(tb.caption)}${tb.note ? ` <span class="slos-rp-note">${esc(tb.note)}</span>` : ''}</figcaption>
    <div class="slos-rp-tw"><table class="slos-rp-t"><thead><tr>${head}</tr></thead><tbody>${body}</tbody>${foot}</table></div>
  </figure>`;
}

function reportFigureHTML(f, forPrint) {
  const t = T();
  return `<figure class="slos-rp-block">
    <div class="slos-rp-svg">${forPrint ? printSvg(f.svg) : f.svg}</div>
    <figcaption><b>${esc(t.rpFigure)} ${f.n}.</b> ${esc(f.caption)}${f.note ? ` <span class="slos-rp-note">${esc(f.note)}</span>` : ''}</figcaption>
  </figure>`;
}

function reportChapterHTML(ch, i, forPrint) {
  const t = T();
  const finds = (ch.findings || []).length ? `<ol class="slos-rp-find">${ch.findings.map(f => `
    <li>
      <div class="slos-rp-find-h"><span class="slos-rp-pr">${esc(t.priority)} ${esc(f.priorityLabel.toLowerCase())}</span><b>${esc(f.signal)}</b></div>
      <p>${esc(f.story)}</p>
      <p class="slos-rp-act"><span>${esc(t.rpAction)}</span> ${esc(f.action)}</p>
      ${f.ref ? `<p class="slos-rp-ref">${esc(f.ref)}</p>` : ''}
    </li>`).join('')}</ol>` : '';

  return `<section class="slos-rp-ch" id="slos-rp-${esc(ch.id)}" data-rp="${esc(ch.id)}">
    <header class="slos-rp-ch-h">
      <span class="slos-rp-num">${esc(t.rpChapter)} ${i}</span>
      <h2>${esc(ch.title)}</h2>
    </header>
    <p class="slos-rp-thesis">${esc(ch.thesis)}</p>
    ${(ch.body || []).map(p => `<p>${esc(p)}</p>`).join('')}
    ${finds}
    ${(ch.figures || []).map(f => reportFigureHTML(f, forPrint)).join('')}
    ${(ch.tables || []).map(tb => reportTableHTML(tb)).join('')}
  </section>`;
}

function reportCoverHTML(m) {
  const t = T();
  return `<section class="slos-rp-ch slos-rp-cover" id="slos-rp-portada" data-rp="portada">
    <span class="slos-rp-num">${esc(m.meta.version)}</span>
    <h1>${esc(m.meta.title)}</h1>
    <p class="slos-rp-sub">${esc(m.meta.subtitle)}</p>
    <dl class="slos-rp-meta">
      <dt>${esc(t.rpDate)}</dt><dd>${esc(m.meta.date)}</dd>
      <dt>${esc(t.rpInstrument)}</dt><dd>${esc(m.meta.instrument)}</dd>
      <dt>${esc(t.rpSource)}</dt><dd>${esc(m.meta.source)}</dd>
    </dl>
    <p class="slos-rp-conf">${esc(m.meta.confidential)}</p>
  </section>`;
}

function reportAnnexHTML(m) {
  const t = T();
  return `<section class="slos-rp-ch" id="slos-rp-anexo" data-rp="anexo">
    <header class="slos-rp-ch-h">
      <span class="slos-rp-num">${esc(t.rpAnnexN)}</span>
      <h2>${esc(t.rpAnnexT)}</h2>
    </header>
    <h3>${esc(t.rpGlossary)}</h3>
    <dl class="slos-rp-gl">${m.glossary.map(g => `<dt>${esc(g.term)}</dt><dd>${esc(g.def)}</dd>`).join('')}</dl>
    <h3>${esc(t.rpRefs)}</h3>
    <ol class="slos-rp-refs">${m.refs.map(r => `<li>${esc(r)}</li>`).join('')}</ol>
    <h3>${esc(t.rpMethod)}</h3>
    <p class="slos-rp-method">${esc(m.method)}</p>
  </section>`;
}

function reportBodyHTML(m, forPrint) {
  if (m.empty) {
    return reportCoverHTML(m) + `<section class="slos-rp-ch"><p class="slos-rp-thesis">${esc(m.lead)}</p></section>`;
  }
  return reportCoverHTML(m)
    + m.chapters.map((ch, i) => reportChapterHTML(ch, i + 1, forPrint)).join('')
    + reportAnnexHTML(m);
}

function reportIndexHTML(m) {
  const t = T();
  const item = (id, label, num) => `<button data-act="rp-goto:${esc(id)}" data-rpi="${esc(id)}">
    <span class="n">${esc(num)}</span><span class="l">${esc(label)}</span></button>`;
  return item('portada', t.rpCover, '—')
    + m.chapters.map((ch, i) => item(ch.id, ch.title, dd(i + 1))).join('')
    + (m.empty ? '' : item('anexo', t.rpAnnexT, t.rpAnnexN));
}

/* ==========================================================================
 * 16.2 · Salida 1 · lectura en pantalla
 * ========================================================================== */
let RP_OBS = null;

function openReport() {
  // Nadie quiere que el guion siga sonando mientras lee el informe.
  if (typeof Narrator !== 'undefined' && Narrator.stop) Narrator.stop();
  const t = T(), host = root();
  if (!host) return;
  const box = $('#slos-report', host);
  if (!box) return;
  const m = buildReport();

  $('#slos-rp-title', box).textContent = m.meta.title;
  $('#slos-rp-date', box).textContent = m.meta.date;
  $('#slos-rp-index', box).innerHTML = reportIndexHTML(m);
  const doc = $('#slos-rp-doc', box);
  doc.innerHTML = reportBodyHTML(m, false);
  doc.scrollTop = 0;

  box.classList.add('on');
  host.classList.add('rp-on');
  S.reportOpen = true;

  // Índice lateral sincronizado con la lectura.
  if (RP_OBS) { RP_OBS.disconnect(); RP_OBS = null; }
  const marks = $$('[data-rpi]', box);
  const setCurrent = id => marks.forEach(b => {
    const on = b.dataset.rpi === id;
    b.classList.toggle('on', on);
    if (on) b.setAttribute('aria-current', 'true'); else b.removeAttribute('aria-current');
  });
  setCurrent('portada');
  if (typeof IntersectionObserver === 'function') {
    RP_OBS = new IntersectionObserver(entries => {
      const vis = entries.filter(e => e.isIntersecting)
                         .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
      if (vis) setCurrent(vis.target.dataset.rp);
    }, { root: doc, rootMargin: '-12% 0px -70% 0px', threshold: 0 });
    $$('.slos-rp-ch', doc).forEach(s => RP_OBS.observe(s));
  }

  const c = $('#slos-rp-close', box);
  if (c) setTimeout(() => c.focus(), 60);
}

function closeReport() {
  const host = root();
  if (!host) return;
  const box = $('#slos-report', host);
  if (box) box.classList.remove('on');
  host.classList.remove('rp-on');
  S.reportOpen = false;
  if (RP_OBS) { RP_OBS.disconnect(); RP_OBS = null; }
  const b = $('#slos-brief', host);
  if (b) b.focus();
}

/** Compatibilidad: el botón de la barra superior y la paleta siguen llamando aquí. */
function openBrief() { openReport(); }

function scrollToChapter(id) {
  const box = $('#slos-report', root());
  if (!box) return;
  const target = $('#slos-rp-' + id, box);
  if (target) target.scrollIntoView({ behavior: RM ? 'auto' : 'smooth', block: 'start' });
}

/* ==========================================================================
 * 16.3 · Salida 2 · archivo HTML autocontenido
 * ========================================================================== */

/**
 * Hoja de estilo del documento impreso. Es distinta de la de pantalla a
 * propósito: aquí el soporte es papel blanco y una columna de lectura, no un
 * panel oscuro. El `@page` vive solo en este archivo, nunca en el documento
 * anfitrión.
 */
function reportDocCSS() {
  return `
:root{color-scheme:light}
*{box-sizing:border-box}
body{margin:0;background:#ececea;color:#14161c;
  font-family:'Inter Tight',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;
  font-size:10.5pt;line-height:1.6;font-variant-numeric:tabular-nums;-webkit-font-smoothing:antialiased}
.sheet{max-width:186mm;margin:10mm auto;padding:16mm 16mm 18mm;background:#fff;
  box-shadow:0 2px 18px rgba(0,0,0,.14)}
h1,h2,h3,p,dl,dd,dt,ol,ul,figure{margin:0}
h1{font-family:Georgia,'Times New Roman',serif;font-weight:400;font-size:26pt;line-height:1.12;
  letter-spacing:-.01em;text-wrap:balance;margin-bottom:6pt}
h2{font-family:Georgia,'Times New Roman',serif;font-weight:400;font-size:17pt;line-height:1.2;
  text-wrap:balance;margin-bottom:2pt}
h3{font-size:9pt;letter-spacing:.13em;text-transform:uppercase;color:#5a5f68;
  font-weight:700;margin:20pt 0 6pt}
p{text-wrap:pretty;margin-bottom:9pt;max-width:34em}
.slos-rp-ch{padding-top:14pt;break-before:page}
.slos-rp-ch:first-child{break-before:auto;padding-top:0}
.slos-rp-ch-h{margin-bottom:12pt;padding-bottom:8pt;border-bottom:1px solid #c6c9d0}
.slos-rp-num{display:block;font-size:8pt;letter-spacing:.16em;text-transform:uppercase;
  color:#8a6a1e;font-weight:700;margin-bottom:4pt}
.slos-rp-thesis{font-size:12.5pt;font-weight:600;line-height:1.45;color:#14161c;
  margin-bottom:11pt;text-wrap:pretty;max-width:32em}
.slos-rp-cover{min-height:150mm;display:flex;flex-direction:column;justify-content:center;border:0}
.slos-rp-cover h1{font-size:32pt;max-width:12em}
.slos-rp-sub{font-size:12pt;color:#5a5f68;margin-bottom:26pt}
.slos-rp-meta{display:grid;grid-template-columns:max-content 1fr;gap:5pt 18pt;
  border-top:1px solid #c6c9d0;padding-top:14pt;max-width:120mm}
.slos-rp-meta dt{font-size:8pt;letter-spacing:.12em;text-transform:uppercase;color:#7b818b;font-weight:700}
.slos-rp-meta dd{font-size:10pt}
.slos-rp-conf{margin-top:auto;padding-top:26pt;font-size:8.5pt;color:#7b818b;letter-spacing:.05em}
.slos-rp-block{margin:14pt 0 16pt;break-inside:avoid}
.slos-rp-svg{background:#fff;padding:6pt 0}
.slos-rp-svg svg{display:block;width:100%;height:auto;max-width:150mm;overflow:visible}
figcaption{font-size:8.5pt;line-height:1.5;color:#5a5f68;margin-top:5pt;max-width:36em}
figcaption b{color:#14161c}
.slos-rp-note{color:#7b818b}
.slos-rp-tw{overflow-x:auto}
.slos-rp-t{width:100%;border-collapse:collapse;font-size:8.5pt;margin-top:6pt}
.slos-rp-t th{text-align:left;padding:5pt 6pt;border-bottom:1.2pt solid #14161c;
  font-size:7.5pt;letter-spacing:.09em;text-transform:uppercase;color:#33373f;font-weight:700;white-space:nowrap}
.slos-rp-t td{padding:4.5pt 6pt;border-bottom:.5pt solid #dcdee3;vertical-align:top}
.slos-rp-t th.num,.slos-rp-t td.num{text-align:right;font-variant-numeric:tabular-nums;white-space:nowrap}
.slos-rp-t tbody tr:nth-child(even){background:#f8f8f6}
.slos-rp-t tfoot td{border-top:1.2pt solid #14161c;border-bottom:0;font-weight:700;
  background:#fff;padding-top:5pt}
.slos-rp-find{list-style:none;padding:0;margin:0 0 6pt;counter-reset:f}
.slos-rp-find li{counter-increment:f;padding:10pt 0 10pt 26pt;border-top:.5pt solid #dcdee3;
  position:relative;break-inside:avoid}
.slos-rp-find li::before{content:counter(f,decimal-leading-zero);position:absolute;left:0;top:11pt;
  font-size:8pt;font-weight:700;color:#8a6a1e;letter-spacing:.06em}
.slos-rp-find-h{margin-bottom:5pt}
.slos-rp-find-h b{font-size:11pt;display:block;line-height:1.35;text-wrap:pretty}
.slos-rp-pr{display:inline-block;font-size:7.5pt;letter-spacing:.11em;text-transform:uppercase;
  color:#5a5f68;font-weight:700;margin-bottom:3pt;border:.5pt solid #c6c9d0;padding:1pt 5pt;border-radius:2pt}
.slos-rp-act span{font-size:7.5pt;letter-spacing:.11em;text-transform:uppercase;color:#8a6a1e;font-weight:700}
.slos-rp-ref{font-size:8pt;color:#7b818b;margin-bottom:0}
.slos-rp-gl{margin-bottom:6pt}
.slos-rp-gl dt{font-weight:700;font-size:9.5pt;margin-top:9pt}
.slos-rp-gl dd{margin:2pt 0 0;font-size:9.5pt;color:#33373f;max-width:34em}
.slos-rp-refs{padding-left:16pt;font-size:9pt;color:#33373f}
.slos-rp-refs li{margin-bottom:5pt;max-width:34em}
.slos-rp-method{font-size:9pt;color:#33373f;border-left:2pt solid #8a6a1e;padding-left:10pt;max-width:34em}
.slos-empty,.slos-note{font-size:9pt;color:#5a5f68}
.slos-legend{display:flex;gap:14pt;flex-wrap:wrap;align-items:center;margin-top:6pt;
  padding-top:4pt;border-top:.5pt solid #dcdee3;font-size:8pt;color:#5a5f68}
.slos-legend span{display:inline-flex;align-items:center;gap:4pt}
.slos-legend i{width:8pt;height:8pt;flex:none;border-radius:50%;display:inline-block}
.slos-legend i.k-dot{background:#1d5266}
.slos-legend i.k-ring{background:transparent;border:2pt solid #8a6a1e}
.slos-legend i.k-solid{border-radius:1pt;background:#8a6a1e}
.slos-legend i.k-dash{border-radius:1pt;background:transparent;border:1pt dashed #1d5266}
@media print{
  @page{size:A4;margin:18mm 16mm 20mm}
  body{background:#fff}
  .sheet{max-width:none;margin:0;padding:0;box-shadow:none}
  .slos-rp-block,.slos-rp-find li,.slos-rp-t tr{break-inside:avoid}
  h2,h3{break-after:avoid}
  .slos-rp-thesis{break-after:avoid}
}`;
}

/** Documento independiente: se abre con doble clic y se imprime en A4. */
function reportStandaloneHTML(m) {
  const t = T();
  return '<!doctype html>\n<html lang="' + S.lang + '">\n<head>\n<meta charset="utf-8">\n'
    + '<meta name="viewport" content="width=device-width,initial-scale=1">\n'
    + '<title>' + esc(m.meta.title + ' · ' + m.meta.date) + '</title>\n'
    + '<style>' + reportDocCSS() + '</style>\n</head>\n<body>\n<div class="sheet">\n'
    + reportBodyHTML(m, true)
    + '\n</div>\n</body>\n</html>';
}

function exportReportHTML() {
  const m = buildReport();
  downloadText('informe-servant-os-' + m.meta.iso + '.html', reportStandaloneHTML(m), 'text/html;charset=utf-8');
  toast(S.lang === 'es' ? 'Informe descargado en HTML' : 'Report downloaded as HTML', 'fa-file-code');
}

/* ==========================================================================
 * 16.4 · Salida 3 · PDF
 * ========================================================================== */
function loadScript(src) {
  return new Promise((res, rej) => {
    if ($$('script').some(s => s.src === src)) return res();
    const s = document.createElement('script'); s.src = src; s.onload = res; s.onerror = rej;
    document.head.appendChild(s);
  });
}

/* Las fuentes estándar de jsPDF codifican en cp1252. Estos caracteres no
 * existen ahí y saldrían como basura, así que se sustituyen antes de escribir.
 * El espacio fino que usa pc() es el caso más frecuente. */
const PDF_SUB = {
  '\u202F': ' ', '\u2009': ' ', '\u00A0': ' ',   // espacios fino, delgado y duro
  '\u2212': '-', '\u2192': '->', '\u2265': '>=', '\u2264': '<=', '\u2248': '~'
};
const pdfSafe = s => String(s == null ? '' : s)
  .replace(/[\u202F\u2009\u00A0\u2212\u2192\u2265\u2264\u2248]/g, c => PDF_SUB[c]);

/**
 * Rasteriza un gráfico SVG para incrustarlo en el PDF. Devuelve una promesa
 * que se rechaza si el navegador contamina el lienzo; quien la llama degrada
 * a la tabla contigua en lugar de romper el documento.
 */
function rasterizeChart(markup, scale) {
  return new Promise((resolve, reject) => {
    const found = String(markup).match(/<svg[\s\S]*?<\/svg>/i);
    if (!found) { reject(new Error('sin figura')); return; }
    const vb = found[0].match(/viewBox="([-\d.\s]+)"/i);
    if (!vb) { reject(new Error('sin viewBox')); return; }
    const box = vb[1].trim().split(/\s+/).map(Number);
    const w = box[2], h = box[3];
    if (!w || !h) { reject(new Error('viewBox vacío')); return; }

    // width="100%" impide que el navegador rasterice: hay que fijar píxeles.
    let svg = printSvg(found[0]).replace(/<svg([^>]*)>/i, (all, attrs) => {
      let a = String(attrs).replace(/\s(width|height|style)="[^"]*"/gi, '');
      if (a.indexOf('xmlns=') === -1) a += ' xmlns="http://www.w3.org/2000/svg"';
      return '<svg' + a + ' width="' + w + '" height="' + h + '">';
    });
    svg = svg.replace(/<svg([^>]*)>/i, '<svg$1><rect width="100%" height="100%" fill="#ffffff"/>');

    const img = new Image();
    img.onload = () => {
      try {
        const k = scale || 2.4;
        const cv = document.createElement('canvas');
        cv.width = Math.round(w * k); cv.height = Math.round(h * k);
        const cx = cv.getContext('2d');
        cx.fillStyle = '#ffffff'; cx.fillRect(0, 0, cv.width, cv.height);
        cx.drawImage(img, 0, 0, cv.width, cv.height);
        resolve({ data: cv.toDataURL('image/png'), w: w, h: h });
      } catch (e) { reject(e); }
    };
    img.onerror = () => reject(new Error('el navegador no pudo cargar la figura'));
    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  });
}

async function exportPDF() {
  const es = S.lang === 'es', t = T();
  try {
    toast(t.rpGenerating, 'fa-spinner');
    await loadScript(CFG.CDN.JSPDF);
    await loadScript(CFG.CDN.AUTOT);
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit: 'pt', format: 'a4', compress: true });
    const m = buildReport();
    await paintReportPDF(doc, m);
    doc.save('informe-servant-os-' + m.meta.iso + '.pdf');
    toast(es ? 'PDF generado' : 'PDF generated', 'fa-file-pdf');
  } catch (e) {
    console.error('[SLOS] pdf', e);
    toast(es ? 'No se pudo generar el PDF' : 'Could not generate PDF', 'fa-triangle-exclamation');
  }
}

/** Compone el documento sobre un jsPDF ya creado. Paginación real al cierre. */
async function paintReportPDF(doc, m) {
  const es = S.lang === 'es', t = T();
  const PW = 595.28, PH = 841.89;
  const ML = 56, MR = 56, MT = 92, MB = 72;
  const CW = PW - ML - MR;
  const INK = [20, 22, 28], INK2 = [51, 55, 63], INK3 = [90, 95, 104], GOLD = [138, 106, 30];
  let y = MT;

  const bottom = () => PH - MB;
  const need = h => { if (y + h > bottom()) { doc.addPage(); y = MT; } };
  const setInk = c => doc.setTextColor(c[0], c[1], c[2]);

  function block(text, opt) {
    const o = opt || {};
    doc.setFont('helvetica', o.style || 'normal');
    doc.setFontSize(o.size || 9.5);
    setInk(o.color || INK2);
    const lines = doc.splitTextToSize(pdfSafe(text), o.width || CW);
    const lh = (o.size || 9.5) * (o.lead || 1.42);
    lines.forEach(ln => { need(lh); doc.text(ln, o.x || ML, y); y += lh; });
    y += (o.after === undefined ? 6 : o.after);
  }

  /* --- Portada --- */
  doc.setDrawColor(GOLD[0], GOLD[1], GOLD[2]); doc.setLineWidth(2);
  doc.line(ML, 150, ML + 64, 150);
  y = 196;
  doc.setFont('times', 'normal'); doc.setFontSize(30); setInk(INK);
  doc.splitTextToSize(pdfSafe(m.meta.title), CW - 60).forEach(ln => { doc.text(ln, ML, y); y += 34; });
  y += 6;
  doc.setFont('helvetica', 'normal'); doc.setFontSize(12); setInk(INK3);
  doc.text(pdfSafe(m.meta.subtitle), ML, y); y += 46;

  doc.setDrawColor(198, 201, 208); doc.setLineWidth(.5);
  doc.line(ML, y, ML + 300, y); y += 20;
  [[t.rpDate, m.meta.date], [t.rpInstrument, m.meta.instrument],
   [t.rpSource, m.meta.source], [t.rpVersion, m.meta.version]].forEach(pair => {
    doc.setFont('helvetica', 'bold'); doc.setFontSize(7.5); setInk([123, 129, 139]);
    doc.text(pdfSafe(String(pair[0]).toUpperCase()), ML, y);
    doc.setFont('helvetica', 'normal'); doc.setFontSize(10); setInk(INK2);
    doc.text(pdfSafe(pair[1]), ML + 116, y);
    y += 18;
  });
  doc.setFont('helvetica', 'normal'); doc.setFontSize(8.5); setInk([123, 129, 139]);
  doc.text(pdfSafe(m.meta.confidential), ML, PH - 96);

  if (m.empty) {
    doc.addPage(); y = MT;
    block(m.lead, { size: 12, style: 'bold', color: INK });
    stampPages();
    return;
  }

  /* --- Índice del documento --- */
  doc.addPage(); y = MT;
  doc.setFont('times', 'normal'); doc.setFontSize(17); setInk(INK);
  doc.text(pdfSafe(t.rpIndex), ML, y); y += 24;
  doc.setDrawColor(198, 201, 208); doc.setLineWidth(.5);
  doc.line(ML, y - 8, PW - MR, y - 8); y += 6;
  m.chapters.forEach((ch, i) => {
    need(20);
    doc.setFont('helvetica', 'bold'); doc.setFontSize(8); setInk(GOLD);
    doc.text(dd(i + 1), ML, y);
    doc.setFont('helvetica', 'normal'); doc.setFontSize(10.5); setInk(INK2);
    doc.text(pdfSafe(ch.title), ML + 26, y);
    y += 19;
  });
  need(20);
  doc.setFont('helvetica', 'bold'); doc.setFontSize(8); setInk(GOLD);
  doc.text(pdfSafe(t.rpAnnexN), ML, y);
  doc.setFont('helvetica', 'normal'); doc.setFontSize(10.5); setInk(INK2);
  doc.text(pdfSafe(t.rpAnnexT), ML + 26, y);

  /* --- Capítulos --- */
  for (let i = 0; i < m.chapters.length; i++) {
    const ch = m.chapters[i];
    doc.addPage(); y = MT;

    doc.setFont('helvetica', 'bold'); doc.setFontSize(7.5); setInk(GOLD);
    doc.text(pdfSafe((t.rpChapter + ' ' + (i + 1)).toUpperCase()), ML, y); y += 16;
    doc.setFont('times', 'normal'); doc.setFontSize(19); setInk(INK);
    doc.splitTextToSize(pdfSafe(ch.title), CW).forEach(ln => { doc.text(ln, ML, y); y += 23; });
    y += 2;
    doc.setDrawColor(198, 201, 208); doc.setLineWidth(.5);
    doc.line(ML, y, PW - MR, y); y += 20;

    block(ch.thesis, { size: 12, style: 'bold', color: INK, lead: 1.36, width: CW - 40, after: 12 });
    (ch.body || []).forEach(p => block(p, { after: 9 }));

    (ch.findings || []).forEach(f => {
      need(60);
      doc.setDrawColor(220, 222, 227); doc.setLineWidth(.5);
      doc.line(ML, y - 8, PW - MR, y - 8);
      doc.setFont('helvetica', 'bold'); doc.setFontSize(7.5); setInk(INK3);
      doc.text(pdfSafe((t.priority + ' ' + f.priorityLabel).toUpperCase()), ML, y); y += 13;
      block(dd(f.n) + '  ' + f.signal, { size: 11, style: 'bold', color: INK, after: 4 });
      block(f.story, { size: 9, after: 4 });
      block(t.rpAction.toUpperCase() + '  ' + f.action, { size: 9, style: 'bold', color: INK2, after: 4 });
      if (f.ref) block(f.ref, { size: 8, color: [123, 129, 139], after: 10 });
    });

    for (let k = 0; k < (ch.figures || []).length; k++) {
      const f = ch.figures[k];
      let placed = false;
      try {
        const png = await rasterizeChart(f.svg, 2.4);
        const dw = Math.min(CW, 430);
        const dh = png.h / png.w * dw;
        need(dh + 40);
        doc.addImage(png.data, 'PNG', ML, y, dw, dh, undefined, 'FAST');
        y += dh + 8;
        placed = true;
      } catch (e) {
        console.warn('[SLOS] figura no rasterizada', e);
      }
      if (!placed) { need(30); block(t.rpNoChart, { size: 8.5, style: 'italic', color: INK3, after: 4 }); }
      block(t.rpFigure + ' ' + f.n + '. ' + f.caption + (f.note ? ' ' + f.note : ''),
            { size: 8, color: INK3, lead: 1.4, width: CW - 30, after: 16 });
    }

    (ch.tables || []).forEach(tb => {
      need(70);
      block(t.rpTable + ' ' + tb.n + '. ' + tb.caption + (tb.note ? ' ' + tb.note : ''),
            { size: 8, color: INK3, lead: 1.4, width: CW - 30, after: 4 });
      const colStyles = {};
      tb.cols.forEach((c, ix) => { if (c.num) colStyles[ix] = { halign: 'right' }; });
      const body = tb.rows.map(r => r.map(pdfSafe));
      if (tb.summary) body.push(tb.summary.map(pdfSafe));
      doc.autoTable({
        startY: y,
        head: [tb.cols.map(c => pdfSafe(c.label))],
        body: body,
        margin: { left: ML, right: MR, top: MT, bottom: MB },
        theme: 'grid',
        styles: { font: 'helvetica', fontSize: 7.8, cellPadding: 4, textColor: INK2,
                  lineColor: [220, 222, 227], lineWidth: .4, overflow: 'linebreak' },
        headStyles: { fillColor: [242, 242, 239], textColor: INK, fontStyle: 'bold', fontSize: 7.2, lineWidth: .4 },
        alternateRowStyles: { fillColor: [250, 250, 248] },
        columnStyles: colStyles,
        didParseCell: d => {
          if (tb.summary && d.section === 'body' && d.row.index === body.length - 1) {
            d.cell.styles.fontStyle = 'bold';
            d.cell.styles.fillColor = [255, 255, 255];
            d.cell.styles.textColor = INK;
          }
        }
      });
      y = doc.lastAutoTable.finalY + 20;
    });
  }

  /* --- Anexo --- */
  doc.addPage(); y = MT;
  doc.setFont('helvetica', 'bold'); doc.setFontSize(7.5); setInk(GOLD);
  doc.text(pdfSafe(t.rpAnnexN.toUpperCase()), ML, y); y += 16;
  doc.setFont('times', 'normal'); doc.setFontSize(19); setInk(INK);
  doc.text(pdfSafe(t.rpAnnexT), ML, y); y += 12;
  doc.setDrawColor(198, 201, 208); doc.setLineWidth(.5);
  doc.line(ML, y, PW - MR, y); y += 22;

  block(t.rpGlossary.toUpperCase(), { size: 8, style: 'bold', color: INK3, after: 8 });
  m.glossary.forEach(g => {
    need(40);
    block(g.term, { size: 9.5, style: 'bold', color: INK, after: 1 });
    block(g.def, { size: 9, after: 9 });
  });
  need(40);
  block(t.rpRefs.toUpperCase(), { size: 8, style: 'bold', color: INK3, after: 8 });
  m.refs.forEach(r => block(r, { size: 8.5, after: 6 }));
  need(50);
  block(t.rpMethod.toUpperCase(), { size: 8, style: 'bold', color: INK3, after: 8 });
  block(m.method, { size: 8.5, after: 4 });

  stampPages();

  /** Cabecera, pie y "Página X de Y" sobre todas las páginas menos la portada. */
  function stampPages() {
    const total = doc.getNumberOfPages();
    for (let i = 2; i <= total; i++) {
      doc.setPage(i);
      doc.setDrawColor(220, 222, 227); doc.setLineWidth(.5);
      doc.line(ML, MT - 34, PW - MR, MT - 34);
      doc.setFont('helvetica', 'normal'); doc.setFontSize(7.5); setInk([123, 129, 139]);
      doc.text(pdfSafe(m.meta.title), ML, MT - 42);
      doc.text(pdfSafe(m.meta.date), PW - MR, MT - 42, { align: 'right' });
      doc.line(ML, PH - MB + 26, PW - MR, PH - MB + 26);
      doc.text(pdfSafe(m.meta.confidential), ML, PH - MB + 40);
      doc.text(pdfSafe(t.rpPage + ' ' + i + ' ' + t.rpOf + ' ' + total), PW - MR, PH - MB + 40, { align: 'right' });
    }
  }
}

/* ==========================================================================
 * 16.5 · Salida en texto plano · window.ServantOS.api.brief()
 * ========================================================================== */

/** Serialización en texto del mismo modelo. Se conserva porque la API la expone. */
function briefText() {
  const t = T(), m = buildReport();
  const out = [];
  out.push(m.meta.title.toUpperCase());
  out.push(m.meta.subtitle + ' · ' + m.meta.date);
  out.push(m.meta.version + ' · ' + m.meta.instrument);
  out.push('');
  if (m.empty) { out.push(m.lead); return out.join('\n'); }

  m.chapters.forEach((ch, i) => {
    out.push('');
    out.push((t.rpChapter + ' ' + dd(i + 1) + ' · ' + ch.title).toUpperCase());
    out.push('');
    out.push(ch.thesis);
    (ch.body || []).forEach(p => { out.push(''); out.push(p); });
    (ch.findings || []).forEach(f => {
      out.push('');
      out.push('  ' + dd(f.n) + ' · [' + f.priorityLabel + '] ' + f.signal);
      out.push('     ' + f.story);
      out.push('     ' + t.rpAction + ': ' + f.action);
    });
    (ch.tables || []).forEach(tb => {
      out.push('');
      out.push('  ' + t.rpTable + ' ' + tb.n + '. ' + tb.caption);
      out.push('  ' + tb.cols.map(c => c.label).join(' · '));
      tb.rows.forEach(r => out.push('  ' + r.join(' · ')));
      if (tb.summary) out.push('  ' + tb.summary.join(' · '));
    });
    (ch.figures || []).forEach(f => {
      out.push('');
      out.push('  [' + t.rpFigure + ' ' + f.n + '] ' + f.caption);
    });
  });

  out.push('');
  out.push(t.rpAnnexT.toUpperCase());
  out.push('');
  m.glossary.forEach(g => { out.push(g.term); out.push('  ' + g.def); });
  out.push('');
  out.push(t.rpRefs.toUpperCase());
  m.refs.forEach(r => out.push('· ' + r));
  out.push('');
  out.push(t.rpMethod.toUpperCase());
  out.push(m.method);
  return out.join('\n');
}

function exportJSON() {
  const data = {
    meta: { version: CFG.VERSION, at: new Date().toISOString(), instrument: 'SLS-8 van Dierendonck & Nuijten (2011)', demo: S.demo },
    org: S.org,
    leaders: S.filtered.map(p => ({
      name: p.name, index: p.index, kind: p.indexKind, archetype: p.archetype,
      maturity: p.maturity.lvl, evidence: p.conf.k, raters: p.externals,
      dims: p.dims, telemetry: p.tel, tasks: p.tasks, projects: p.projects
    })),
    snapshots: S.snapshots, experiments: S.experiments, sessions: S.sessions
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type:'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'servant-os-' + new Date().toISOString().slice(0,10) + '.json';
  a.click(); URL.revokeObjectURL(a.href);
  toast(S.lang==='es'?'Datos exportados':'Data exported', 'fa-file-code');
}

async function copyText(txt, msg) {
  try { await navigator.clipboard.writeText(txt); toast(msg, 'fa-copy'); }
  catch (e) {
    const ta = document.createElement('textarea'); ta.value = txt; document.body.appendChild(ta);
    ta.select(); try { document.execCommand('copy'); toast(msg, 'fa-copy'); } catch (_) {} ta.remove();
  }
}

/* ---------- Paleta de comandos -------------------------------------------- */
function cmdItems() {
  const t = T(), es = S.lang === 'es';
  const items = VIEWS.map(v => ({ icon: v.icon, label: t[v.key], k: es?'Ir a':'Go to', run: () => go(v.id) }));
  items.push(
    { icon:'fa-clipboard-question', label: t.runAssessment, k:'360°', run: () => openAssessment() },
    { icon:'fa-flask',       label: t.newExperiment, k:es?'Acción':'Action', run: () => startExperiment(null) },
    { icon:'fa-calendar-plus', label: t.schedule,    k:es?'Acción':'Action', run: () => openSession() },
    { icon:'fa-feather',     label: es?'Registrar historia':'Record story', k:es?'Acción':'Action', run: () => openStory() },
    { icon:'fa-volume-high', label: t.nxTitle,   k:es?'Voz':'Voice', run: () => { go('stories'); setTimeout(() => Narrator.play(), 400); } },
    { icon:'fa-volume-xmark',label: t.nxStop,    k:es?'Voz':'Voice', run: () => Narrator.stop() },
    { icon:'fa-download',    label: t.nxDownMd,  k:'Export', run: () => downloadText('guion-servant-os-' + new Date().toISOString().slice(0,10) + '.md', scriptAsText(buildScript(), true), 'text/markdown;charset=utf-8') },
    { icon:'fa-file-lines',  label: t.rpOpen,        k:'Export', run: () => openReport() },
    { icon:'fa-file-code',   label: t.rpHtml,        k:'Export', run: () => exportReportHTML() },
    { icon:'fa-file-pdf',    label: 'PDF',           k:'Export', run: () => exportPDF() },
    { icon:'fa-file-code',   label: t.exportJSON,    k:'Export', run: () => exportJSON() },
    { icon:'fa-language',    label: es?'Cambiar a inglés':'Switch to Spanish', k:'ES/EN', run: () => toggleLang() },
    { icon:'fa-rotate',      label: es?'Recargar datos':'Reload data', k:'Sync', run: () => { recompute(); renderView(); toast(es?'Datos actualizados':'Data refreshed','fa-rotate'); } },
    { icon:'fa-xmark',       label: t.close,         k:'Esc', run: () => closeApp() }
  );
  return items;
}

let CMD = { items: [], sel: 0 };
function openCmd() {
  const box = $('#slos-cmd', root());
  CMD.items = cmdItems(); CMD.sel = 0;
  renderCmd('');
  box.classList.add('on');
  const inp = $('#slos-cmd-in', root());
  inp.value = ''; setTimeout(() => inp.focus(), 50);
}
function closeCmd() { const b = $('#slos-cmd', root()); if (b) b.classList.remove('on'); }
function renderCmd(q) {
  const list = $('#slos-cmd-list', root());
  const f = q ? CMD.items.filter(i => (i.label + ' ' + i.k).toLowerCase().includes(q.toLowerCase())) : CMD.items;
  CMD.visible = f; CMD.sel = Math.min(CMD.sel, Math.max(0, f.length - 1));
  list.innerHTML = f.length ? f.map((i, n) =>
    `<button class="${n===CMD.sel?'sel':''}" data-n="${n}"><i class="fas ${i.icon}"></i><span>${esc(i.label)}</span><span class="k">${esc(i.k)}</span></button>`
  ).join('') : `<div class="slos-note" style="padding:16px;text-align:center">${esc(T().empty)}</div>`;
  $$('button', list).forEach(b => b.addEventListener('click', () => { closeCmd(); f[parseInt(b.dataset.n,10)].run(); }));
}

/* ---------- Idioma -------------------------------------------------------- */
function toggleLang() {
  Narrator.stop();            // el guion se regenera en el otro idioma
  // shellHTML() reconstruye la superposición del informe vacía, así que hay que
  // recordar si estaba abierta para volver a componerla en el otro idioma.
  const host = root();
  const reportOpen = !!$('#slos-report.on', host);
  if (RP_OBS) { RP_OBS.disconnect(); RP_OBS = null; }
  host.classList.remove('rp-on');

  S.lang = S.lang === 'es' ? 'en' : 'es';
  LS.set('preferredLanguage', S.lang);
  recompute();
  host.innerHTML = shellHTML();
  bindShell();
  renderView();
  if (reportOpen) openReport();
  toast(S.lang === 'es' ? 'Idioma: Español' : 'Language: English', 'fa-language');
}

/* ==========================================================================
 * 15 · EVENTOS
 * ========================================================================== */
function bindShell() {
  const host = root();

  $$('.slos-nav button', host).forEach(b => b.addEventListener('click', () => go(b.dataset.view)));

  const q = $('#slos-q', host);
  if (q) {
    let deb;
    q.addEventListener('input', e => {
      clearTimeout(deb);
      deb = setTimeout(() => { S.query = e.target.value; applyFilters(); renderView(); }, 200);
    });
  }

  const on = (sel, fn) => { const el = $(sel, host); if (el) el.addEventListener('click', fn); };
  on('#slos-close',   closeApp);
  on('#slos-lang',    toggleLang);
  on('#slos-brief',   openBrief);
  on('#slos-new-exp', () => startExperiment(null));
  on('#slos-cmd-btn', openCmd);

  // Ordenación y densidad de las tablas de datos
  host.addEventListener('click', e => {
    const th = e.target.closest('[data-sortk]');
    if (th) {
      const parts = th.dataset.sortk.split('|');
      const t = TABLES[parts[0]];
      if (t) {
        const same = t.sort && t.sort.key === parts[1];
        t.sort = { key: parts[1], dir: same && t.sort.dir === 'desc' ? 'asc' : 'desc' };
        refreshTable(parts[0]);
      }
      return;
    }
    const dn = e.target.closest('[data-density]');
    if (dn) {
      const t = TABLES[dn.dataset.density];
      if (t) { t.dense = !t.dense; refreshTable(dn.dataset.density); }
    }
  });

  // Delegación global de acciones data-act
  host.addEventListener('click', e => {
    const b = e.target.closest('[data-act]');
    if (!b) return;
    const [act, arg] = b.dataset.act.split(':');
    switch (act) {
      case 'close-modal':  closeModal(); break;
      case 'brief':        openBrief(); break;
      case 'assess':       openAssessment(arg); break;
      case 'session':      openSession(arg); break;
      case 'experiment':   startExperiment(arg, S.focus !== 'all' ? S.focus : null); break;
      case 'new-experiment': startExperiment(null); break;
      case 'new-story':    openStory(); break;
      case 'mirror':       S.focus = arg; go('mirror'); break;
      case 'growth':       S.focus = arg; go('growth'); break;
      // --- Lector narrativo ---
      case 'nx-play': {
        const s = Narrator.state();
        if (!s.supported) { toast(T().nxNoVoice, 'fa-triangle-exclamation'); break; }
        if (s.playing && !s.paused) Narrator.pause();
        else Narrator.play();
        break;
      }
      case 'nx-prev':  Narrator.prev(); break;
      case 'nx-next':  Narrator.next(); break;
      case 'nx-goto':  Narrator.seek(parseInt(arg, 10) || 0); break;
      case 'nx-mute':  Narrator.toggleMute(); break;
      case 'nx-txt':
        downloadText('guion-servant-os-' + new Date().toISOString().slice(0,10) + '.txt',
                     scriptAsText(buildScript(), false), 'text/plain;charset=utf-8');
        break;
      case 'nx-md':
        downloadText('guion-servant-os-' + new Date().toISOString().slice(0,10) + '.md',
                     scriptAsText(buildScript(), true), 'text/markdown;charset=utf-8');
        break;
      // --- Informe ejecutivo ---
      case 'rp-goto':    scrollToChapter(arg); break;
      case 'rp-close':   closeReport(); break;
      case 'rp-print':   window.print(); break;
      case 'rp-html':    exportReportHTML(); break;
      case 'rp-copy':
      case 'copy-brief': copyText(briefText(), S.lang==='es'?'Informe copiado':'Report copied'); break;
      case 'export-pdf':   exportPDF(); break;
      case 'export-json':  exportJSON(); break;
      case 'demo':         S.demo = true; window.projects = demoProjects(); recompute(); renderView(); toast(S.lang==='es'?'Datos de demostración cargados':'Demonstration data loaded','fa-wand-sparkles'); break;
      case 'finish-exp': {
        const ex = S.experiments.find(x => x.id === arg);
        if (ex) { ex.status = 'done'; ex.doneAt = new Date().toISOString(); store.set(CFG.STORAGE.EXPERIMENTS, S.experiments); renderView(); toast(S.lang==='es'?'Experimento cerrado':'Experiment closed','fa-circle-check'); }
        break;
      }
      case 'del-exp':
        S.experiments = S.experiments.filter(x => x.id !== arg);
        store.set(CFG.STORAGE.EXPERIMENTS, S.experiments); renderView();
        break;
    }
  });

  // Selectores contextuales dentro de las vistas
  host.addEventListener('change', e => {
    if (e.target.id === 'slos-mirror-sel') { S.focus = e.target.value; renderView(); }
    if (e.target.id === 'slos-growth-sel') { S.focus = e.target.value; renderView(); }
  });

  // Cierre de superposiciones
  const ov = $('#slos-modal', host);
  if (ov) ov.addEventListener('click', e => { if (e.target === ov) closeModal(); });
  const cm = $('#slos-cmd', host);
  if (cm) cm.addEventListener('click', e => { if (e.target === cm) closeCmd(); });

  const ci = $('#slos-cmd-in', host);
  if (ci) {
    ci.addEventListener('input', e => renderCmd(e.target.value));
    ci.addEventListener('keydown', e => {
      const list = CMD.visible || [];
      if (e.key === 'ArrowDown') { e.preventDefault(); CMD.sel = Math.min(CMD.sel + 1, list.length - 1); renderCmd(ci.value); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); CMD.sel = Math.max(CMD.sel - 1, 0); renderCmd(ci.value); }
      else if (e.key === 'Enter') { e.preventDefault(); const it = list[CMD.sel]; if (it) { closeCmd(); it.run(); } }
    });
  }
}

function onKey(e) {
  if (!S.mounted) return;
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); openCmd(); return; }
  if (e.key === 'Escape') {
    const cm = $('#slos-cmd', root()), md = $('#slos-modal', root()), rp = $('#slos-report', root());
    if (cm && cm.classList.contains('on')) { closeCmd(); return; }
    if (md && md.classList.contains('on')) { closeModal(); return; }
    if (rp && rp.classList.contains('on')) { closeReport(); return; }
    closeApp();
  }
}

function onStorage(e) {
  if (!S.mounted) return;
  if (e.key === 'preferredLanguage' && e.newValue && e.newValue !== S.lang) { S.lang = e.newValue.startsWith('en')?'en':'es'; toggleLang(); }
  if (e.key === 'projects') { recompute(); renderView(); }
}

/* ==========================================================================
 * 16 · CICLO DE VIDA
 * ========================================================================== */
async function ensureFontAwesome() {
  if (document.querySelector('link[href*="font-awesome"]')) return;
  const l = document.createElement('link'); l.rel = 'stylesheet'; l.href = CFG.CDN.FA;
  document.head.appendChild(l);
}

function loadPersisted() {
  S.sessions    = store.get(CFG.STORAGE.SESSIONS, []) || [];
  S.perception  = loadPerception();
  S.experiments = store.get(CFG.STORAGE.EXPERIMENTS, []) || [];
  S.snapshots   = store.get(CFG.STORAGE.SNAPSHOTS, []) || [];
  S.stories     = store.get(CFG.STORAGE.STORIES, []) || [];
  // Cierre automático de experimentos vencidos
  let changed = false;
  S.experiments.forEach(x => {
    if (x.status === 'active' && new Date(x.endsAt) < new Date()) { x.status = 'done'; x.doneAt = x.endsAt; changed = true; }
  });
  if (changed) store.set(CFG.STORAGE.EXPERIMENTS, S.experiments);
}

async function openApp(view) {
  try {
    if (S.mounted) { closeApp(); return; }

    await ensureFontAwesome();
    injectStyles();
    loadPersisted();
    recompute();

    // Oculta las vistas del sistema principal, igual que hacía v16.1
    document.querySelectorAll('.view-content').forEach(v => v.classList.remove('active'));

    const el = document.createElement('div');
    el.id = 'slos-root';
    el.className = 'view-content active';
    el.setAttribute('role', 'application');
    el.setAttribute('aria-label', 'Servant Leadership OS');
    document.body.appendChild(el);
    document.body.style.overflow = 'hidden';

    S.mounted = true;
    S.view = view && R[view] ? view : 'dashboard';
    el.innerHTML = shellHTML();
    bindShell();
    renderView();

    document.addEventListener('keydown', onKey);
    window.addEventListener('storage', onStorage);
    window.addEventListener('beforeunload', Narrator.stop);

    if (S.demo) toast(S.lang==='es' ? 'Sin proyectos en el sistema · mostrando demostración' : 'No projects in system · showing demonstration', 'fa-wand-sparkles');
    if (!LS.available) toast(S.lang==='es' ? 'Almacenamiento bloqueado · los datos no se guardarán' : 'Storage blocked · data will not be saved', 'fa-triangle-exclamation');
    console.log('[SLOS] listo ·', S.leaders.length, 'líderes ·', S.org.totalTasks, 'tareas');
  } catch (err) {
    console.error('[SLOS] fallo al abrir', err);
    if (typeof window.showNotification === 'function') window.showNotification('Error al abrir Servant OS: ' + err.message, 'error');
    else alert('Servant OS: ' + err.message);
  }
}

function closeApp() {
  const el = root();
  const finish = () => {
    if (el) el.remove();
    document.body.style.overflow = '';
    S.mounted = false;
    document.removeEventListener('keydown', onKey);
    window.removeEventListener('storage', onStorage);
    window.removeEventListener('beforeunload', Narrator.stop);
    Narrator.stop();
    if (RP_OBS) { RP_OBS.disconnect(); RP_OBS = null; }
    if (typeof window.showView === 'function') { try { window.showView('dashboard'); } catch (e) {} }
  };
  if (el && !RM) { el.style.transition = 'opacity 240ms ease, transform 240ms ease'; el.style.opacity = '0'; el.style.transform = 'scale(.99)'; setTimeout(finish, 240); }
  else finish();
}

/* ==========================================================================
 * 17 · API PÚBLICA
 * Compatible con v16.1 para no romper llamadas existentes.
 * ========================================================================== */
window.openServantOS               = openApp;
window.openHumanImpactLeadership   = openApp;   // alias heredado
window.closeServantOS              = closeApp;
window.closeHIL                    = closeApp;  // alias heredado

window.ServantOS = {
  version: CFG.VERSION,
  open: openApp, close: closeApp, go, refresh: () => { recompute(); if (S.mounted) renderView(); },
  state: S, config: CFG,
  model: { SLS8, SL7, SPEARS10, MATURITY, EXPERIMENT_LIBRARY, BEHAVIOR_SIGNALS, LIBRARY },
  api: {
    leaders: () => S.leaders,
    org:     () => S.org,
    brief:   () => briefText(),
    insights:() => generateInsights(S.filtered, S.org),
    report:     () => buildReport(),
    reportHTML: () => reportStandaloneHTML(buildReport()),
    exportPDF, exportJSON, exportReportHTML,
    assess: (name, source, scores) => {
      if (!S.perception[name]) S.perception[name] = [];
      S.perception[name].push({ id: uid(), source, scores, at: new Date().toISOString() });
      savePerception(S.perception); recompute(); if (S.mounted) renderView();
    }
  },
  // Compatibilidad: fórmula original de v16.1, conservada por si el sistema
  // principal la invoca en algún punto. No se usa internamente.
  legacy: {
    calculateSLI(member) {
      const cats = ['Leadership','Emotional Intelligence','Communication','Team Management'];
      let s = 0, n = 0;
      (member.skills || []).forEach(x => { if (cats.indexOf(x.category) > -1) { s += x.level; n++; } });
      const avg = n ? s / n : 2.5;
      const prog = member.tasks ? member.completed / member.tasks : 0;
      const wl = member.tasks > 10 ? Math.min(1, 10 / member.tasks) : 1;
      return clamp(avg * .4 + prog * .3 + wl * .15 + .5 * .15, 0, 5);
    }
  }
};

/* ==========================================================================
 * 18 · BOTÓN DE ACCESO EN EL SIDEBAR DEL SISTEMA PRINCIPAL
 * ========================================================================== */
function injectAccessButton(tries) {
  tries = tries || 0;
  if (document.getElementById('slos-sidebar-btn')) return;
  // Retira el botón de la versión anterior si sigue presente
  const old = document.getElementById('hil-sidebar-btn');
  if (old) old.remove();

  // Busca el sidebar del sistema principal, ignorando el <aside> de la propia
  // app: sin este filtro el módulo se inyectaría el botón dentro de sí mismo.
  const sidebar = Array.prototype.slice
    .call(document.querySelectorAll('aside, #sidebar, .sidebar, nav.sidebar'))
    .filter(function (el) { return !el.closest('#slos-root') && !el.classList.contains('slos-side'); })[0];
  if (!sidebar) { if (tries < 12) setTimeout(() => injectAccessButton(tries + 1), 900); return; }

  const wrap = document.createElement('div');
  wrap.id = 'slos-sidebar-btn';
  wrap.innerHTML = `
    <button type="button" style="
      width:calc(100% - 24px);margin:14px 12px;padding:13px 14px;border:0;cursor:pointer;text-align:left;
      border-radius:13px;display:flex;align-items:center;gap:11px;
      background:linear-gradient(135deg,#c9a227,#f3dfa2);color:#0d0d14;
      box-shadow:0 5px 18px rgba(201,162,39,.32);transition:transform .25s cubic-bezier(.16,1,.3,1),box-shadow .25s;">
      <span style="font-size:20px;line-height:1">◈</span>
      <span style="line-height:1.25">
        <strong style="font-size:13px;display:block;letter-spacing:.01em">Servant OS</strong>
        <small style="font-size:9px;opacity:.72">Leadership Intelligence</small>
      </span>
    </button>`;
  const btn = wrap.firstElementChild;
  btn.addEventListener('click', () => openApp());
  btn.addEventListener('mouseenter', () => { btn.style.transform = 'translateX(4px)'; btn.style.boxShadow = '0 9px 26px rgba(201,162,39,.48)'; });
  btn.addEventListener('mouseleave', () => { btn.style.transform = ''; btn.style.boxShadow = '0 5px 18px rgba(201,162,39,.32)'; });
  sidebar.appendChild(wrap);
  console.log('[SLOS] botón inyectado en el sidebar');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => setTimeout(() => injectAccessButton(), 1200));
} else {
  setTimeout(() => injectAccessButton(), 1200);
}

console.log('[SLOS] módulo listo · openServantOS() · ⌘K para comandos');

})();