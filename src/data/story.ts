import type { StoryGraph } from '../types';

// Historia: "Aeropuerto Internacional"
export const demoStory: StoryGraph = {
  startNodeId: 'airport',
  nodes: {
    airport: {
      id: 'airport',
      videoSrc: 'airport',
      title: 'Aeropuerto Internacional',
      decisions: [
        { label: '🏖️ Playa de Palma', nextNodeId: 'mall_playa', timeAppear: 1 },
        { label: '⛪ Catedral La Seu', nextNodeId: 'mall_catedral', timeAppear: 1 },
        { label: '🏰 Castillo Bellver', nextNodeId: 'mall_bellver', timeAppear: 1 },
        { label: '🚂 Tren de Sóller', nextNodeId: 'mall_soller', timeAppear: 1 },
        { label: '🌊 Cala Mondragó', nextNodeId: 'mall_mondrago', timeAppear: 1 },
        { label: '🧀 Mercat de l\'Olivar', nextNodeId: 'mall_mercat', timeAppear: 1 },
        { label: '⛰️ Serra Tramuntana', nextNodeId: 'mall_serra', timeAppear: 1 },
        { label: '🛥️ Excursión Cabrera', nextNodeId: 'mall_cabrera', timeAppear: 1 },
        { label: '🍷 Bodega Binissalem', nextNodeId: 'mall_bodega', timeAppear: 1 },
        { label: '🏊 Cala Varques', nextNodeId: 'mall_varques', timeAppear: 1 },
        { label: '🎨 Fundación Miró', nextNodeId: 'mall_miro', timeAppear: 1 },
        { label: '🚴 Ruta Cap Formentor', nextNodeId: 'mall_formentor', timeAppear: 1 },
        { label: '🦎 Cuevas del Drach', nextNodeId: 'mall_drach', timeAppear: 1 },
        { label: '🍊 Valldemossa', nextNodeId: 'mall_valldemossa', timeAppear: 1 },
        { label: '⛵ Puerto Portals', nextNodeId: 'mall_portals', timeAppear: 1 },
        { label: '🏝️ Es Trenc', nextNodeId: 'mall_trenc', timeAppear: 1 },
        { label: '🎵 Jazz Voyeur Club', nextNodeId: 'mall_jazz', timeAppear: 1 },
        { label: '🐟 Lonja de Palma', nextNodeId: 'mall_lonja', timeAppear: 1 },
      ],
    },
    japan: {
      id: 'japan',
      videoSrc: 'japan',
      title: 'Vuelo desde Tokio',
      decisions: [
        { label: '🍣 Ir a comer sushi', nextNodeId: 'japan_sushi', timeAppear: 3 },
        { label: '🏯 Visitar el templo', nextNodeId: 'japan_temple', timeAppear: 3 },
      ],
    },
    dubai: {
      id: 'dubai',
      videoSrc: 'dubai',
      title: 'Vuelo desde Dubai',
      decisions: [
        { label: '🏜️ Safari en el desierto', nextNodeId: 'dubai_desert', timeAppear: 3 },
        { label: '🏗️ Subir al Burj Khalifa', nextNodeId: 'dubai_burj', timeAppear: 3 },
      ],
    },
    london: {
      id: 'london',
      videoSrc: 'london',
      title: 'Vuelo desde Londres',
      decisions: [
        { label: '☕ Tea time en Buckingham', nextNodeId: 'london_tea', timeAppear: 3 },
        { label: '🎡 Paseo por el London Eye', nextNodeId: 'london_eye', timeAppear: 3 },
      ],
    },
    japan_sushi: {
      id: 'japan_sushi',
      videoSrc: 'japan_sushi',
      title: 'Sushi Master',
    },
    japan_temple: {
      id: 'japan_temple',
      videoSrc: 'japan_temple',
      title: 'Templo Ancestral',
    },
    dubai_desert: {
      id: 'dubai_desert',
      videoSrc: 'dubai_desert',
      title: 'Safari en el Desierto',
    },
    dubai_burj: {
      id: 'dubai_burj',
      videoSrc: 'dubai_burj',
      title: 'Cima del Burj Khalifa',
    },
    london_tea: {
      id: 'london_tea',
      videoSrc: 'london_tea',
      title: 'Tea Time Real',
    },
    london_eye: {
      id: 'london_eye',
      videoSrc: 'london_eye',
      title: 'Vista desde el London Eye',
    },
    mall_playa: { id: 'mall_playa', videoSrc: 'mall_playa', title: 'Playa de Palma' },
    mall_catedral: { id: 'mall_catedral', videoSrc: 'mall_catedral', title: 'Catedral La Seu' },
    mall_bellver: { id: 'mall_bellver', videoSrc: 'mall_bellver', title: 'Castillo Bellver' },
    mall_soller: { id: 'mall_soller', videoSrc: 'mall_soller', title: 'Tren de Sóller' },
    mall_mondrago: { id: 'mall_mondrago', videoSrc: 'mall_mondrago', title: 'Cala Mondragó' },
    mall_mercat: { id: 'mall_mercat', videoSrc: 'mall_mercat', title: 'Mercat de l\'Olivar' },
    mall_serra: { id: 'mall_serra', videoSrc: 'mall_serra', title: 'Serra Tramuntana' },
    mall_cabrera: { id: 'mall_cabrera', videoSrc: 'mall_cabrera', title: 'Excursión Cabrera' },
    mall_bodega: { id: 'mall_bodega', videoSrc: 'mall_bodega', title: 'Bodega Binissalem' },
    mall_varques: { id: 'mall_varques', videoSrc: 'mall_varques', title: 'Cala Varques' },
    mall_miro: { id: 'mall_miro', videoSrc: 'mall_miro', title: 'Fundación Miró' },
    mall_formentor: { id: 'mall_formentor', videoSrc: 'mall_formentor', title: 'Ruta Cap Formentor' },
    mall_drach: { id: 'mall_drach', videoSrc: 'mall_drach', title: 'Cuevas del Drach' },
    mall_valldemossa: { id: 'mall_valldemossa', videoSrc: 'mall_valldemossa', title: 'Valldemossa' },
    mall_portals: { id: 'mall_portals', videoSrc: 'mall_portals', title: 'Puerto Portals' },
    mall_trenc: { id: 'mall_trenc', videoSrc: 'mall_trenc', title: 'Es Trenc' },
    mall_jazz: { id: 'mall_jazz', videoSrc: 'mall_jazz', title: 'Jazz Voyeur Club' },
    mall_lonja: { id: 'mall_lonja', videoSrc: 'mall_lonja', title: 'Lonja de Palma' },
  },
};

// Color themes for each node's generated video
export const nodeColors: Record<string, { bg: string; accent: string }> = {
  airport: { bg: '#1a1a2e', accent: '#4fc3f7' },
  japan: { bg: '#1a0a2e', accent: '#ff6b9d' },
  dubai: { bg: '#2e1a0a', accent: '#ffd740' },
  london: { bg: '#0a1a2e', accent: '#90caf9' },
  japan_sushi: { bg: '#2e0a1a', accent: '#ff5252' },
  japan_temple: { bg: '#1a2e0a', accent: '#76ff03' },
  dubai_desert: { bg: '#3e2723', accent: '#ff9800' },
  dubai_burj: { bg: '#0a2e2e', accent: '#00e5ff' },
  london_tea: { bg: '#2e2e0a', accent: '#ffab40' },
  london_eye: { bg: '#0a0a3e', accent: '#7c4dff' },
};

export const nodeDescriptions: Record<string, string> = {
  airport: 'Un avión está aterrizando... ¿de dónde viene?',
  japan: '¡El vuelo JL045 desde Tokio Narita ha llegado!',
  dubai: '¡El vuelo EK077 desde Dubai ha aterrizado!',
  london: '¡El vuelo BA456 desde Heathrow ha llegado!',
  japan_sushi: '¡El mejor omakase de tu vida en Tsukiji!',
  japan_temple: '¡Paz y serenidad en el templo Senso-ji!',
  dubai_desert: '¡Atardecer épico sobre las dunas doradas!',
  dubai_burj: '¡828 metros de altura, el mundo a tus pies!',
  london_tea: '¡Scones, clotted cream y la Reina al lado!',
  london_eye: '¡Todo Londres se ve desde aquí arriba!',
};
