// Daily rotating quotes for the #ABtalks card game landing page.
// Original writing in the introspective #ABtalks spirit — bilingual { en, ar }.
// A new one surfaces every 24h, chosen deterministically from the date so it
// stays the same all day and flips at midnight (UTC) — no backend required.

export const quotes = [
  { en: 'The bravest thing you’ll say today is the truth about yourself.', ar: 'أشجع ما ستقوله اليوم هو الحقيقة عن نفسك.' },
  { en: 'Behind every title is a person still learning to be one.', ar: 'خلف كل لقب إنسان لا يزال يتعلّم كيف يكون إنسانًا.' },
  { en: 'We don’t run out of time. We run out of honesty.', ar: 'لا ينفد منّا الوقت، بل تنفد منّا الصراحة.' },
  { en: 'The question you avoid is the one you need.', ar: 'السؤال الذي تتجنّبه هو السؤال الذي تحتاجه.' },
  { en: 'Vulnerability isn’t weakness; it’s the price of being known.', ar: 'الانكشاف ليس ضعفًا، بل هو ثمن أن تُعرَف على حقيقتك.' },
  { en: 'You cannot heal what you refuse to name.', ar: 'لا يمكنك أن تشفي ما ترفض أن تسمّيه.' },
  { en: 'Silence protects the wound and starves it at once.', ar: 'الصمت يحمي الجرح ويجوّعه في آنٍ واحد.' },
  { en: 'The strongest people are the ones who let you in.', ar: 'أقوى الناس هم من يسمحون لك بالدخول.' },
  { en: 'Every mask you drop makes the room lighter.', ar: 'كل قناع تُسقطه يجعل الغرفة أخفّ.' },
  { en: 'Ask deeper questions and people become oceans.', ar: 'اسأل أسئلة أعمق، يصبح الناس محيطات.' },
  { en: 'Your story is not too heavy to be heard.', ar: 'قصتك ليست أثقل من أن تُسمَع.' },
  { en: 'Growth begins the moment you stop performing.', ar: 'يبدأ النموّ في اللحظة التي تتوقّف فيها عن التمثيل.' },
  { en: 'The one who asks “how are you” twice is rare — be that one.', ar: 'من يسأل «كيف حالك» مرتين نادر — كن أنت ذلك.' },
  { en: 'What you hide runs you. What you share frees you.', ar: 'ما تخفيه يتحكّم بك، وما تشاركه يحرّرك.' },
]

// Whole-day index since the Unix epoch (UTC). Same value all day, +1 at midnight.
export function dayIndex(date = new Date()) {
  return Math.floor(date.getTime() / 86400000)
}

export function quoteOfDay(date = new Date()) {
  return quotes[dayIndex(date) % quotes.length]
}

// Milliseconds until the next UTC midnight — used to auto-advance a left-open tab.
export function msUntilTomorrow(date = new Date()) {
  return 86400000 - (date.getTime() % 86400000)
}
