document.addEventListener('DOMContentLoaded', function() {
  const observer = new IntersectionObserver(
    entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } }),
    { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
  );
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  const sectionIds = ['hero','about','services','tools','work','testimonials','contact'];
  const navLinks = document.querySelectorAll('.nav-links a:not(.nav-cta)');
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY + 130;
        let active = '';
        sectionIds.forEach(id => {
          const el = document.getElementById(id);
          if (el && el.offsetTop <= scrollY) active = id;
        });
        navLinks.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === '#' + active);
        });
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  var form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      var btn = form.querySelector('.form-submit');
      var text = form.querySelector('.form-submit-text');
      var loading = form.querySelector('.form-submit-loading');
      var success = form.querySelector('.form-success');
      var error = form.querySelector('.form-error');

      btn.disabled = true;
      text.style.display = 'none';
      loading.style.display = 'inline';
      error.style.display = 'none';

      var data = new FormData(form);
      fetch(form.action, { method: 'POST', body: data, headers: { 'Accept': 'application/json' } })
        .then(function(r) { return r.json(); })
        .then(function(res) {
          if (res.ok) {
            form.querySelectorAll('input, textarea').forEach(function(el) { el.value = ''; });
            form.querySelector('.form-group').style.display = 'none';
            form.querySelectorAll('.form-group').forEach(function(g) { g.style.display = 'none'; });
            btn.style.display = 'none';
            success.style.display = 'block';
          } else {
            throw new Error('Formspree error');
          }
        })
        .catch(function() {
          btn.disabled = false;
          text.style.display = 'inline';
          loading.style.display = 'none';
          error.style.display = 'block';
        });
    });
  }
});
