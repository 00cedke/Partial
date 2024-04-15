function ExitPage() {
    window.close();
}

let translations;
fetch('translations.json')
  .then(response => response.json())
  .then(data => translations = data)
  .catch(error => console.error('Erreur lors du chargement des traductions :', error));

function changeLanguage(language) {
  const elements = document.querySelectorAll('[data-translate]');
  elements.forEach(element => {
    const key = element.getAttribute('data-translate');
    element.textContent = translations[language][key];
  });
}

