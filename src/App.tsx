import { useState } from 'react';
import { IntroVideo } from './components/IntroVideo';
import { StoryFlow } from './components/StoryFlow';
import { demoStory } from './data/story';
import './styles/app.css';

function App() {
  const [introFinished, setIntroFinished] = useState(false);

  if (!introFinished) {
    return (
      <div className="app">
        <IntroVideo onFinished={() => setIntroFinished(true)} />
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>✈️ Aeropuerto Interactivo</h1>
        <p className="subtitle">¿Qué avión ha llegado?</p>
        <button className="replay-intro-btn" onClick={() => setIntroFinished(false)}>
          🎬 Ver intro
        </button>
      </header>
      <main>
        <StoryFlow story={demoStory} />
      </main>
    </div>
  );
}

export default App;
