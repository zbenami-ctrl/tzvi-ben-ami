const NBSP = " ";

// Line-break rules applied to every piece of site copy at render time, so the
// content files stay plain text:
// - a dash never opens a line: it is glued to the word before it;
// - a short parenthesised Latin phrase inside Hebrew, e.g. (Lucid Dreaming), never splits.
export function typeset(text: string) {
  return text
    .replace(/ +([—–])/g, `${NBSP}$1`)
    .replace(/\(([A-Za-z][A-Za-z'’ ]{0,40})\)/g, (match) => match.replace(/ /g, NBSP));
}
