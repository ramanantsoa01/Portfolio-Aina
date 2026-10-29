/**
 * JCM - Cabinet Juridique
 * Interactions & UX JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Menu Mobile Moderne & Accessible
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');
  const navBackdrop = document.getElementById('navBackdrop');

  function setMenuState(open) {
    if (!mainNav || !menuToggle) return;
    const shouldOpen = open !== undefined ? open : !mainNav.classList.contains('open');

    mainNav.classList.toggle('open', shouldOpen);
    menuToggle.classList.toggle('active', shouldOpen);
    if (navBackdrop) navBackdrop.classList.toggle('active', shouldOpen);

    menuToggle.setAttribute('aria-expanded', String(shouldOpen));
    menuToggle.setAttribute('aria-label', shouldOpen ? 'Fermer le menu' : 'Ouvrir le menu');
    document.body.style.overflow = shouldOpen ? 'hidden' : '';
  }

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => setMenuState());

    if (navBackdrop) {
      navBackdrop.addEventListener('click', () => setMenuState(false));
    }

    // Fermer le menu lors du clic sur un lien de navigation
    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => setMenuState(false));
    });

    // Fermer avec la touche Échap
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mainNav.classList.contains('open')) {
        setMenuState(false);
      }
    });
  }

  // 2. Header avec effet de flou et ombre au scroll
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  // 3. Année courante dans le footer
  const yearSpan = document.getElementById('currentYear');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // 4. Accordéon FAQ Interactif
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Optionnel : fermer les autres accordéons
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
          }
        });

        // Basculer l'élément sélectionné
        item.classList.toggle('active', !isActive);
      });
    }
  });

  // 5. Gestionnaire du Formulaire de Devis
  const quoteForm = document.getElementById('quoteForm');
  const formStatus = document.getElementById('formStatus');

  if (quoteForm) {
    quoteForm.addEventListener('submit', (event) => {
      event.preventDefault();

      if (!quoteForm.reportValidity()) return;

      const name = document.getElementById('name').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const email = document.getElementById('email').value.trim();
      const service = document.getElementById('service').value;
      const message = document.getElementById('message').value.trim();

      const subject = encodeURIComponent(`Demande de devis - ${service} - ${name}`);
      const body = encodeURIComponent(
        `Bonjour Cabinet JCM,\n\n` +
        `Je souhaite solliciter vos services juridiques :\n\n` +
        `• Nom & Prénom : ${name}\n` +
        `• Téléphone / WhatsApp : ${phone}\n` +
        `• E-mail : ${email}\n` +
        `• Domaine concerné : ${service}\n\n` +
        `Détails de ma demande :\n` +
        `${message}\n\n` +
        `Dans l'attente de votre retour,\n` +
        `Cordialement,\n${name}`
      );

      if (formStatus) {
        formStatus.textContent = 'Votre application de messagerie va s\'ouvrir avec votre demande préremplie. Vous pouvez également nous contacter directement via WhatsApp au 034 93 058 61.';
        formStatus.className = 'form-status success';
      }

      // Déclencher l'ouverture du client de messagerie
      setTimeout(() => {
        window.location.href = `mailto:contact@jcm.mg?subject=${subject}&body=${body}`;
      }, 500);
    });
  }
});
