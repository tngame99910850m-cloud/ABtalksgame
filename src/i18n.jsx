import { createContext, useContext, useEffect, useState, useCallback } from 'react'

// ---- Language system (EN / AR) ---------------------------------------------
// Provides the active language, direction, a UI-string translator `t`, and a
// helper `tr` for picking the {en, ar} field off data objects. The choice is
// persisted, and <html> dir/lang are kept in sync so RTL just works.

const STORAGE_KEY = 'abtalks:lang'

const ui = {
  'nav.suffix': { en: 'the card game', ar: 'لعبة البطاقات' },
  'nav.decks': { en: 'Decks', ar: 'المجموعات' },
  'nav.changeDeck': { en: 'Change deck', ar: 'غيّر المجموعة' },

  'land.eyebrow': { en: 'The #ABtalks Card Game', ar: 'لعبة بطاقات #ABtalks' },
  'land.intro': {
    en: 'One card. One question. The kind you’d normally avoid. Pick a deck, gather your people, and discover the human behind the title.',
    ar: 'بطاقة واحدة. سؤال واحد. من النوع الذي تتجنّبه عادةً. اختر مجموعة، اجمع أحبّتك، واكتشف الإنسان خلف اللقب.',
  },
  'land.start': { en: 'Start', ar: 'ابدأ' },
  'land.cards': { en: 'cards', ar: 'بطاقة' },

  'game.decks': { en: 'Decks', ar: 'المجموعات' },
  'game.reveal': { en: 'Reveal', ar: 'اكشف' },
  'game.next': { en: 'Next card', ar: 'البطاقة التالية' },
  'game.restart': { en: 'Shuffle & restart', ar: 'اخلط وابدأ من جديد' },
  'game.tapReveal': { en: 'Tap to reveal', ar: 'انقر للكشف' },
  'game.answer': { en: 'Answer honestly', ar: 'أجب بصدق' },
  'game.hint': {
    en: 'Space / → to reveal & advance · Esc to leave',
    ar: 'مسافة للكشف والتقدّم · Esc للخروج',
  },
  'game.reply': { en: 'Write your reply', ar: 'اكتب إجابتك' },
  'game.hideReply': { en: 'Hide reply', ar: 'إخفاء الإجابة' },
  'game.replyPlaceholder': {
    en: 'Your answer stays on this device…',
    ar: 'تبقى إجابتك على هذا الجهاز…',
  },
  'game.saved': { en: 'Saved', ar: 'تم الحفظ' },

  'foot.text': {
    en: '— the card game. A design tribute. Discover the human behind the title.',
    ar: '— لعبة البطاقات. تكريم تصميمي. اكتشف الإنسان خلف اللقب.',
  },
  'foot.play': { en: 'Play honestly.', ar: 'العب بصدق.' },
}

const LangContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === 'ar' ? 'ar' : 'en'
    } catch {
      return 'en'
    }
  })

  const dir = lang === 'ar' ? 'rtl' : 'ltr'

  useEffect(() => {
    const root = document.documentElement
    root.lang = lang
    root.dir = dir
    try {
      localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      /* ignore */
    }
  }, [lang, dir])

  const t = useCallback((key) => ui[key]?.[lang] ?? ui[key]?.en ?? key, [lang])
  const tr = useCallback((obj) => (obj ? obj[lang] ?? obj.en : ''), [lang])
  const toggle = useCallback(() => setLang((l) => (l === 'ar' ? 'en' : 'ar')), [])

  return (
    <LangContext.Provider value={{ lang, dir, setLang, toggle, t, tr }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used within LanguageProvider')
  return ctx
}
