// Contact form handler (if you have a backend)
const form   = document.getElementById('contactForm');
const status = document.getElementById('contactStatus');

if (form) {
  form.addEventListener('submit', async e => {
    e.preventDefault();
    status.textContent = 'Sending…';
    try {
      const res = await fetch('/contact', {
        method: 'POST',
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify({
          name:    form.name.value,
          email:   form.email.value,
          message: form.message.value
        })
      });
      const json = await res.json();
      status.textContent = json.success ? 'Message sent!' : 'Error sending.';
      if (json.success) form.reset();
    } catch {
      status.textContent = 'Network error.';
    }
  });
}
