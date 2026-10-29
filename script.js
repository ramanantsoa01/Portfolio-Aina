const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('#navLinks');
menuButton.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Fermer le menu' : 'Ouvrir le menu');
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));
document.querySelector('#year').textContent = new Date().getFullYear();

document.querySelector('#devis').addEventListener('submit', function(event) {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const name = document.querySelector('#name').value.trim();
  const email = document.querySelector('#email').value.trim();
  const service = document.querySelector('#service').value;
  const message = document.querySelector('#message').value.trim();
  const subject = encodeURIComponent('Demande de devis - JCM - ' + service);
  const body = encodeURIComponent(
    'Bonjour JCM,\\n\\nJe souhaite obtenir un devis.\\n\\nNom : ' + name +
    '\\nE-mail : ' + email + '\\nService concerné : ' + service +
    '\\n\\nMa demande :\\n' + message + '\\n\\nCordialement,\\n' + name
  );
  document.querySelector('#formFeedback').textContent = 'Votre application e-mail va s’ouvrir. Vérifiez puis envoyez le message.';
  window.location.href = 'mailto:contact@jcm.mg?subject=' + subject + '&body=' + body;
});
