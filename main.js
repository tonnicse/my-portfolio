// Simple contact form handler
const form   = document.getElementById('contactForm');
const status = document.getElementById('contactStatus');

if (form) {
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const data = {
      name:    form.name.value,
      email:   form.email.value,
      message: form.message.value
    };
    status.textContent = 'Sending…';
    try {
      let res = await fetch('/contact', {
        method: 'POST',
        headers:{ 'Content-Type':'application/json' },
        body: JSON.stringify(data)
      });
      let json = await res.json();
      if (json.success) {
        status.textContent = 'Message sent!';
        form.reset();
      } else {
        status.textContent = 'Error. Try again later.';
      }
    } catch {
      status.textContent = 'Network error.';
    }
  });
}
