const compareStrings = (str1, str2) => {
  const checkStr = (str) => (str && typeof str === "string" ? str : "");

  return checkStr(str1).toLowerCase().includes(checkStr(str2).toLowerCase());
};
export default compareStrings;
