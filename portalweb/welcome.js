function ExitPage() {
    window.close();
}

function changeLanguage(language) {
  let translations;
  fetch('translations/languages.json')
  .then(response => response.json())
  .then(data => translations = data)
  .catch(error => console.error('Erreur lors du chargement des traductions :', error));

  const elements = document.querySelectorAll('[data-translate]');
  elements.forEach(element => {
    const key = element.getAttribute('data-translate');
    element.textContent = translations[language][key];
  });
}

