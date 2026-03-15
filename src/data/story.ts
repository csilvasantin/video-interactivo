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
        { label: 'El vuelo de Japón', nextNodeId: 'japan', timeAppear: 3 },
        { label: 'El vuelo de Dubai', nextNodeId: 'dubai', timeAppear: 3 },
        { label: 'El vuelo de Londres', nextNodeId: 'london', timeAppear: 3 },
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
