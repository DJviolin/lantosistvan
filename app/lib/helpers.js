const i18n = require('i18n');

// register hbs helpers in res.locals' context which provides this.locale
/*exports.__ = function () {
  return i18n.__.apply(this, arguments);
};
exports.__n = function () {
  return i18n.__n.apply(this, arguments);
};*/
/*exports.__ = (...args) => i18n.__.apply(this, args);
exports.__n = (...args) => i18n.__n.apply(this, args);*/
exports.i18nApi = (...args) => i18n.i18nApi.apply(this, args);
exports.i18nApiN = (...args) => i18n.i18nApiN.apply(this, args);

// tube helpers
exports.subString = (url) => {
  const myString = url.toString();
  return myString.substring(0, myString.lastIndexOf('/'));
};
exports.hyphenToSpace = (url) => {
  const myString = url.toString();
  return myString.replace(/-/ig, ' ');
};
exports.firstLetterUppercase = (url) => {
  const myString = url.toString();
  return myString.charAt(0).toUpperCase() + myString.slice(1);
};
exports.removeNumbers = (url) => {
  const myString = url.toString();
  return myString.replace(/\d/ig, '');
};
exports.removeLastSpace = (url) => {
  const myString = url.toString();
  return myString.replace(/\s(?=\S*$)$/igm, '');
};
exports.oneToThreeCharWords = (url) => {
  const myString = url.toString();
  if (myString.match(/^\S{1,3}$/igm)) {
    return myString.toUpperCase();
  }
  return myString;
};
exports.unwanted = (url) => {
  const myString = url.toString();
  if (myString.match(/^.*?\b(gay)\b.*$/igm)) {
    return null;
  }
  return myString;
};
