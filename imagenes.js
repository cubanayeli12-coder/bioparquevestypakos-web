document.addEventListener('DOMContentLoaded', () => {
  
  const heroSection = document.querySelector('.hero');
  const fondosHero = ['jefesitos.jpg', 'losvoluntarios.jpg', 'biovoluntarios.jpg'];
  let indiceFondoActual = 0;
  const tiempoRotacion = 6000;

  if (heroSection && fondosHero.length > 0) {
    heroSection.style.backgroundImage = `url('${fondosHero[0]}')`;
    
    setInterval(() => {
      indiceFondoActual = (indiceFondoActual + 1) % fondosHero.length;
      heroSection.style.backgroundImage = `url('${fondosHero[indiceFondoActual]}')`;
    }, tiempoRotacion);
  }

  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('#nav');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', !isExpanded);
      navMenu.classList.toggle('open');
    });
  }

  const linkInicio = document.querySelector('#link-inicio');
  const linkNosotros = document.querySelector('#link-nosotros');
  const linkAnimales = document.querySelector('#link-animales');
  const linkBiografia = document.querySelector('#link-biografia');

  const seccionInicio = document.querySelector('#seccion-inicio');
  const seccionNosotros = document.querySelector('#seccion-nosotros');
  const seccionAnimales = document.querySelector('#seccion-animales');
  const seccionBiografia = document.querySelector('#seccion-biografia');

  const navLinks = document.querySelectorAll('.nav a');

  function cambiarPantalla(pantallaActiva, enlaceActivo) {
    if (seccionInicio) seccionInicio.style.display = 'none';
    if (seccionNosotros) seccionNosotros.style.display = 'none';
    if (seccionAnimales) seccionAnimales.style.display = 'none';
    if (seccionBiografia) seccionBiografia.style.display = 'none';
    
    if (pantallaActiva) pantallaActiva.style.display = 'block';

    navLinks.forEach(link => link.classList.remove('active'));
    if (enlaceActivo) enlaceActivo.classList.add('active');
    
    if (navMenu) navMenu.classList.remove('open');
    if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (linkInicio && seccionInicio) {
    linkInicio.addEventListener('click', (e) => {
      e.preventDefault();
      cambiarPantalla(seccionInicio, null);
    });
  }

  if (linkNosotros && seccionNosotros) {
    linkNosotros.addEventListener('click', (e) => {
      e.preventDefault();
      cambiarPantalla(seccionNosotros, linkNosotros);
    });
  }

  if (linkAnimales && seccionAnimales) {
    linkAnimales.addEventListener('click', (e) => {
      e.preventDefault();
      cambiarPantalla(seccionAnimales, linkAnimales);
    });
  }

  if (linkBiografia && seccionBiografia) {
    linkBiografia.addEventListener('click', (e) => {
      e.preventDefault();
      cambiarPantalla(seccionBiografia, document.querySelector('.dropdown-toggle'));
    });
  }

  document.querySelectorAll('.btn-ir-animales').forEach(btn => {
    btn.addEventListener('click', (e) => { e.preventDefault(); cambiarPantalla(seccionAnimales, linkAnimales); });
  });

  document.querySelectorAll('.btn-ir-nosotros').forEach(btn => {
    btn.addEventListener('click', (e) => { e.preventDefault(); cambiarPantalla(seccionNosotros, linkNosotros); });
  });

  document.querySelectorAll('.btn-volver-inicio').forEach(btn => {
    btn.addEventListener('click', (e) => { e.preventDefault(); cambiarPantalla(seccionInicio, null); });
  });
  const btnScrollTop = document.querySelector('#btn-scroll-top');
  if (btnScrollTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        btnScrollTop.classList.add('visible');
      } else {
        btnScrollTop.classList.remove('visible');
      }
    });

    btnScrollTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
  const form = document.querySelector('#contact-form');
  const modal = document.querySelector('#modal');
  const modalCloseBtn = document.querySelector('#modal-close');

  const setError = (input, message) => {
    input.classList.add('invalid');
    const errorContainer = input.nextElementSibling;
    if (errorContainer && errorContainer.classList.contains('error')) {
      errorContainer.textContent = message;
    }
  };

  const clearError = (input) => {
    input.classList.remove('invalid');
    const errorContainer = input.nextElementSibling;
    if (errorContainer && errorContainer.classList.contains('error')) {
      errorContainer.textContent = '';
    }
  };

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let isFormValid = true;

      const nombre = form.querySelector('#nombre');
      const correo = form.querySelector('#correo');
      const mensaje = form.querySelector('#mensaje');

      if (!nombre.value.trim()) { setError(nombre, 'Por favor, ingresa tu nombre.'); isFormValid = false; } else { clearError(nombre); }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.value.trim())) { setError(correo, 'Introduce un correo electrónico válido.'); isFormValid = false; } else { clearError(correo); }
      if (!mensaje.value.trim()) { setError(mensaje, 'Por favor, escribe tu mensaje.'); isFormValid = false; } else { clearError(mensaje); }
      if (isFormValid && modal) {
        modal.removeAttribute('hidden');
        document.body.style.overflow = 'hidden';
        form.reset();
      }
    });

    form.querySelectorAll('input, textarea').forEach(element => {
      element.addEventListener('input', () => clearError(element));
    });
  }

  if (modalCloseBtn && modal) {
    const hideModal = () => {
      modal.setAttribute('hidden', '');
      document.body.style.overflow = '';
    };
    modalCloseBtn.addEventListener('click', hideModal);
    modal.addEventListener('click', (e) => { if (e.target === modal) hideModal(); });
  }

});
