interface AccessibilityControlsProps {
    isDark: boolean
    setIsDark: (value: boolean) => void
    fontSize: number
    setFontSize: (value: number) => void
    accessibleFont: boolean
    setAccessibleFont: (value: boolean) => void
    highContrast: boolean
    setHighContrast: (value: boolean) => void
}

export default function AccessibilityControls({
    isDark,
    setIsDark,
    fontSize,
    setFontSize,
    accessibleFont,
    setAccessibleFont,
    highContrast,
    setHighContrast
}: AccessibilityControlsProps) {
    const fontSizes = [100, 125, 150]

    const toggleTheme = () => {
        if (highContrast) {
            setHighContrast(false)
            setIsDark(false)
        } else if (isDark) {
            setHighContrast(true)
        } else {
            setIsDark(true)
        }
    }

    const getThemeIcon = () => {
        if (highContrast) return '🔆'
        return isDark ? '☀️' : '🌙'
    }

    return (
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }}>
                {fontSizes.map((size, index) => (
                    <button
                        key={size}
                        onClick={() => setFontSize(size)}
                        style={{
                            background: fontSize === size ? 'var(--accent)' : 'var(--bg-secondary)',
                            color: fontSize === size ? 'white' : 'var(--text-primary)',
                            border: `2px solid ${fontSize === size ? 'var(--accent)' : 'var(--border)'}`,
                            padding: '0.25rem 0.5rem',
                            borderRadius: '0.25rem',
                            cursor: 'pointer',
                            fontSize: `${0.7 + (index * 0.2)}rem`,
                            fontWeight: fontSize === size ? 'bold' : 'normal',
                            minWidth: '2rem',
                            height: '2rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.2s ease'
                        }}
                        aria-label={`Ustaw rozmiar czcionki na ${size} procent`}
                        title={`Ustaw rozmiar czcionki na ${size}%`}
                    >
                        A
                    </button>
                ))}
            </div>

            <button
                onClick={() => setAccessibleFont(!accessibleFont)}
                style={{
                    background: accessibleFont ? 'var(--accent)' : 'var(--bg-secondary)',
                    color: accessibleFont ? 'white' : 'var(--text-primary)',
                    border: `2px solid ${accessibleFont ? 'var(--accent)' : 'var(--border)'}`,
                    padding: '0.5rem',
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    fontSize: '0.9rem'
                }}
                aria-label="Przełącz czcionkę dla słabowidzących"
                title="Przełącz czcionkę dla słabowidzących"
            >
                👁️
            </button>

            <button
                onClick={toggleTheme}
                style={{
                    background: 'var(--accent)',
                    color: 'white',
                    border: '2px solid var(--accent)',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    fontSize: '0.9rem'
                }}
                aria-label={`Przełącz na ${highContrast ? 'tryb normalny' : isDark ? 'tryb wysoki kontrast' : 'tryb ciemny'}`}
                title={`Tryb: ${highContrast ? 'Wysoki kontrast' : isDark ? 'Ciemny' : 'Jasny'}`}
            >
                {getThemeIcon()}
            </button>
        </div>
    )
}