import { atomWithStorage } from 'jotai/utils'


const languageAtom = atomWithStorage('language', 'en');

export { languageAtom }