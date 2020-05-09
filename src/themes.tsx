import { createContext } from 'react'
export const themes = {
  light: {
    mood: 'light',
    foreground: '#000000',
    background: '#eeeeee',
  },
  dark: {
    mood: 'dark',
    foreground: '#ffffff',
    background: '#222222',
  },
}

export type Themes = ColorTypes

export type ColorTypes = {
  foreground: string
  background: string
}

export type Mood = 'dark' | 'light' // keyof typeof themes

export const ThemeContext = createContext<Themes>(themes.dark)
