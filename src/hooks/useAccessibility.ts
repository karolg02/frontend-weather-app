import { useState, useEffect } from 'react'

export const useAccessibility = () => {
    const [isDark, setIsDark] = useState(() => {
        const savedTheme = localStorage.getItem('theme')
        if (savedTheme) return savedTheme === 'dark'
        return window.matchMedia('(prefers-color-scheme: dark)').matches
    })

    const [fontSize, setFontSize] = useState(() => {
        const savedFontSize = localStorage.getItem('fontSize')
        return savedFontSize ? parseInt(savedFontSize) : 100
    })

    const [accessibleFont, setAccessibleFont] = useState(() => {
        return localStorage.getItem('accessibleFont') === 'true'
    })

    const [highContrast, setHighContrast] = useState(() => {
        return localStorage.getItem('highContrast') === 'true'
    })

    useEffect(() => {
        document.body.classList.remove('dark', 'high-contrast')

        if (highContrast) {
            document.body.classList.add('high-contrast')
        } else if (isDark) {
            document.body.classList.add('dark')
        }

        localStorage.setItem('theme', isDark ? 'dark' : 'light')
        localStorage.setItem('highContrast', highContrast.toString())
    }, [isDark, highContrast])

    useEffect(() => {
        document.documentElement.style.fontSize = `${fontSize}%`
        localStorage.setItem('fontSize', fontSize.toString())
    }, [fontSize])

    useEffect(() => {
        if (accessibleFont) {
            document.body.classList.add('accessible-font')
        } else {
            document.body.classList.remove('accessible-font')
        }
        localStorage.setItem('accessibleFont', accessibleFont.toString())
    }, [accessibleFont])

    return {
        isDark,
        setIsDark,
        fontSize,
        setFontSize,
        accessibleFont,
        setAccessibleFont,
        highContrast,
        setHighContrast
    }
}