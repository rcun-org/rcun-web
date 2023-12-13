export const CREATE_ROOM = "createRoom";
export const JOIN_ROOM = "joinRoom";
export const MY_ROOMS = "myRooms";

export const GLOBAL_SEARCH = "globalSearch";
export const LANGUAGE_SWITCH = "languageSwitch";
export const LOGOUT = "logout";

export const SECTIONS_LIST = [
  CREATE_ROOM,
  JOIN_ROOM,
  MY_ROOMS,
  GLOBAL_SEARCH,
  LANGUAGE_SWITCH,
  LOGOUT
];

export const allSections = {
  [CREATE_ROOM]: true,
  [JOIN_ROOM]: true,
  [MY_ROOMS]: true,
  [GLOBAL_SEARCH]: true,
  [LANGUAGE_SWITCH]: true,
  [LOGOUT]: true
};

export const getSections = (sectionsObj) => {
  let baseSections = allSections;

  if (
    sectionsObj &&
    !Array.isArray(sectionsObj) &&
    typeof sectionsObj === "object"
  ) {
    Object.entries(sectionsObj).forEach(([sectionKey, sectionValue]) => {
      if (SECTIONS_LIST.includes(sectionKey)) {
        baseSections = { ...baseSections, [sectionKey]: sectionValue };
      }
    });
  }

  return baseSections;
};
