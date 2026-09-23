/**
 * CONFIG · ORFER MOBILITY HUB
 * Único archivo a editar para personalizar por cliente.
 */
window.ORFER_CONFIG = {
    clientId: 'orfer-mobility-hub',
    clientName: 'ORFER MOBILITY HUB',
    apiUrl: 'https://mi-sistema-proyectos-backend-4.onrender.com',
    useRealApi: false,
    fallbackToDemo: true,

        // Coordenadas directas (para que el dashboard las lea sin anidar)
    lat: 31.6872,
    lon: -106.4175,
    direccion: 'Av. Tecnológico 1860-sur, Villas del Granjero, 32574 Juárez, Chih., México',
    ciudad: 'Ciudad Juárez, Chihuahua, México',
    // Alias anidado (compatibilidad futura)
    location: {
        lat: 31.6872,
        lon: -106.4175,
        direccion: 'Av. Tecnológico 1860-sur, Villas del Granjero, 32574 Juárez, Chih., México',
        ciudad: 'Ciudad Juárez, Chihuahua, México'
    },

    proyecto: {
        cargadores: 2,
        potenciaPorCargador: 160,
        potenciaTotal: 320,
        horasOperacion: 10,
        sfvKwp: 195,
        transformadorKva: 750,
        carportM2: 1000,
        generacionAnualKwh: 329113,
        aprovechamientoDirecto: 279746,
        breakEven: 28.18,
        kwhMaxAnual: 1168000
    },

    economico: {
        capex: 14000000,
        iva: 0.08,
        precioVenta: 9.50,
        costoCFE: 2.50,
        omAnual: 350000
    },

    escenarios: {
        15:  { kwh: 175200,  ingresos: 1664400,  costoCFE: 0,      flujo: 1314400,  payback: 10.65, tir: 10.0 },
        25:  { kwh: 292000,  ingresos: 2774000,  costoCFE: 31000,  flujo: 2393000,  payback: 5.85,  tir: 15.0 },
        35:  { kwh: 408800,  ingresos: 3883600,  costoCFE: 323000, flujo: 3211000,  payback: 4.36,  tir: 19.9 },
        45:  { kwh: 525600,  ingresos: 4993200,  costoCFE: 615000, flujo: 4028000,  payback: 3.48,  tir: 27.9 },
        50:  { kwh: 584000,  ingresos: 5548000,  costoCFE: 761000, flujo: 4437000,  payback: 3.16,  tir: 33.0 },
        100: { kwh: 1168000, ingresos: 11096000, costoCFE: 584000, flujo: 10162000, payback: 1.38,  tir: 72.3 }
    },

    capexDesglose: [
        { nombre: 'SFV 195 kW',              monto: 2300205, color: '#34d399' },
        { nombre: 'Cargadores DC',           monto: 2000000, color: '#ef4444' },
        { nombre: 'Transformador',           monto: 845000,  color: '#fbbf24' },
        { nombre: 'Carport / estructura',    monto: 2850400, color: '#06b6d4' },
        { nombre: 'Obra civil',              monto: 2204395, color: '#a78bfa' },
        { nombre: 'Instalaciones eléctricas',monto: 2300000, color: '#f87171' },
        { nombre: 'Ingeniería / otros',      monto: 1500000, color: '#64748b' }
    ],

    contacto: {
        nombre: 'Ing. Oscar Eduardo Ruiz Montoya',
        cargo: 'CEO · Grupo Corsa del Norte',
        empresa: 'Grupo Corsa del Norte S de RL de CV',
        dro: 'DRO No. 1620-A',
        rfc: 'GCN 200812 520',
        telefono: '+52 656 744 2933',
        email: 'oscar.ruiz@corsaenergiasolar.com',
        web: 'www.corsaenergiasolar.com'
    }
};