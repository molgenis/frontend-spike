export default {
  selectedLanguage (languageOptions, selectedLangCode) {
    return languageOptions.find((language) => {
      return language.id === selectedLangCode
    })
  }
}
