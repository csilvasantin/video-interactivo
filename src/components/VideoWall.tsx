interface Ad {
  emoji: string;
  title: string;
  subtitle: string;
  color: string;
}

interface CountryAds {
  country: string;
  ads: Ad[];
}

const countryAdsMap: Record<string, CountryAds> = {
  japan: {
    country: 'Japón',
    ads: [
      { emoji: '🗼', title: 'Visit Tokyo Tower', subtitle: 'Vistas de 360°', color: '#ff6b9d' },
      { emoji: '🍣', title: 'Tsukiji Market', subtitle: 'El mejor sushi del mundo', color: '#ff5252' },
      { emoji: '🚄', title: 'Japan Rail Pass', subtitle: 'Shinkansen ilimitado', color: '#2196f3' },
      { emoji: '🏯', title: 'Kyoto Tours', subtitle: 'Templos milenarios', color: '#4caf50' },
      { emoji: '🎌', title: 'Sakura Season', subtitle: 'Marzo - Abril 2026', color: '#e91e63' },
      { emoji: '♨️', title: 'Onsen Hakone', subtitle: 'Relax total', color: '#ff9800' },
    ],
  },
  dubai: {
    country: 'Dubai',
    ads: [
      { emoji: '🏗️', title: 'Burj Khalifa', subtitle: '828m de altura', color: '#ffd740' },
      { emoji: '🏜️', title: 'Desert Safari', subtitle: 'Aventura en 4x4', color: '#ff9800' },
      { emoji: '🛍️', title: 'Dubai Mall', subtitle: '1200+ tiendas', color: '#e040fb' },
      { emoji: '🌴', title: 'Palm Jumeirah', subtitle: 'La isla artificial', color: '#00e676' },
      { emoji: '⛵', title: 'Dubai Marina', subtitle: 'Crucero al atardecer', color: '#00bcd4' },
      { emoji: '🎢', title: 'IMG Worlds', subtitle: 'Parque temático indoor', color: '#f44336' },
    ],
  },
  london: {
    country: 'Londres',
    ads: [
      { emoji: '🎡', title: 'London Eye', subtitle: 'Vista panorámica', color: '#7c4dff' },
      { emoji: '👑', title: 'Buckingham Palace', subtitle: 'Cambio de guardia', color: '#ffd740' },
      { emoji: '🏰', title: 'Tower of London', subtitle: '1000 años de historia', color: '#795548' },
      { emoji: '☕', title: 'Afternoon Tea', subtitle: 'Tradición británica', color: '#ffab40' },
      { emoji: '🎭', title: 'West End Shows', subtitle: 'Musicales de clase mundial', color: '#e91e63' },
      { emoji: '🚇', title: 'Oyster Card', subtitle: 'Viaja por todo Londres', color: '#2196f3' },
    ],
  },
};

function getCountryFromNodeId(nodeId: string): string | null {
  if (nodeId.startsWith('japan')) return 'japan';
  if (nodeId.startsWith('dubai')) return 'dubai';
  if (nodeId.startsWith('london')) return 'london';
  return null;
}

interface VideoWallProps {
  currentNodeId: string;
}

export function VideoWall({ currentNodeId }: VideoWallProps) {
  const country = getCountryFromNodeId(currentNodeId);
  if (!country) return null;

  const data = countryAdsMap[country];
  if (!data) return null;

  return (
    <div className="videowall">
      <h3 className="videowall-title">📺 Publicidad de {data.country}</h3>
      <div className="videowall-grid">
        {data.ads.map((ad, i) => (
          <div
            key={i}
            className="videowall-card"
            style={{
              borderColor: ad.color + '40',
              animationDelay: `${i * 0.1}s`,
            }}
          >
            <div className="videowall-emoji" style={{ background: ad.color + '20' }}>
              {ad.emoji}
            </div>
            <div className="videowall-text">
              <span className="videowall-ad-title" style={{ color: ad.color }}>
                {ad.title}
              </span>
              <span className="videowall-subtitle">{ad.subtitle}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
