import { useAccessibility } from './hooks/useAccessibility'
import AccessibilityControls from './components/accessibility/AccessibilityControls'
import { getWeatherIcon } from './utils/weatherIcons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
function App() {
  const accessibility = useAccessibility()

  return (
    <div className="app">
      <header className="header">
        <h1>Weather App</h1>
        <AccessibilityControls {...accessibility} />
      </header>

      <main className="main">
        <FontAwesomeIcon icon={getWeatherIcon(0)} title="Słońce" /><br />
        <FontAwesomeIcon icon={getWeatherIcon(3)} title="Chmury" /><br />
        <FontAwesomeIcon icon={getWeatherIcon(61)} title="Deszcz" /><br />
        <FontAwesomeIcon icon={getWeatherIcon(95)} title="Burza" />
      </main>
    </div>
  )
}

export default App