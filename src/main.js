import { business } from './settings.js';
const form = document.querySelector('#booking-form');
const dialog = document.querySelector('#contact-dialog');
const track = (event, data = {}) => { window.dataLayer = window.dataLayer || []; window.dataLayer.push({ event, ...data }); };
function showDemo(message) { document.querySelector('#message-preview').value = message; document.querySelector('#copy-status').textContent = ''; dialog.showModal(); }
const validPhone = value => /^62\d{8,13}$/.test(value);
document.querySelectorAll('[data-book]').forEach(button => button.addEventListener('click', () => {
  if (button.dataset.service) form.elements.service.value = button.dataset.service;
  track('booking_start', { location: button.closest('section')?.id || 'navigation', service: form.elements.service.value });
  document.querySelector('#booking').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  form.elements.name.focus({ preventScroll: true });
}));
form.addEventListener('submit', event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const name = data.get('name').trim();
  if (!name) { form.elements.name.setCustomValidity('Isi nama panggilan Anda.'); form.elements.name.reportValidity(); return; }
  const message = `Halo Sejuk Rumah, saya ${name}.\nArea rumah: ${data.get('area')}\nLayanan: ${data.get('service')}\nKeluhan / jumlah AC: ${data.get('complaint').trim() || 'Ingin konsultasi dahulu'}\nBoleh minta estimasi biaya dan jadwal yang tersedia?`;
  if (!validPhone(business.whatsapp)) { track('demo_booking_prepared'); showDemo(message); return; }
  track('lead_form_submit', { service: data.get('service'), area: data.get('area') });
  track('whatsapp_click', { location: 'booking_form' });
  window.open(`https://wa.me/${business.whatsapp}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  document.querySelector('#form-status').textContent = 'Lanjutkan dengan mengirim pesan di WhatsApp. Jadwal menunggu konfirmasi tim.';
});
form.elements.name.addEventListener('input', () => form.elements.name.setCustomValidity(''));
document.querySelector('#call-button').addEventListener('click', () => {
  if (!validPhone(business.phone)) { showDemo('Saya ingin menghubungi tim Sejuk Rumah untuk konsultasi AC. Nomor telepon resmi belum tersedia dalam demo ini.'); return; }
  track('phone_click', { location: 'faq' }); window.location.href = `tel:+${business.phone}`;
});
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) { const r = dialog.getBoundingClientRect(); if(event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close(); } });
document.querySelector('#copy-message').addEventListener('click', async () => {
  const preview = document.querySelector('#message-preview');
  try { await navigator.clipboard.writeText(preview.value); document.querySelector('#copy-status').textContent = 'Pesan berhasil disalin. Belum ada pesan yang dikirim.'; }
  catch { preview.select(); document.querySelector('#copy-status').textContent = 'Pilih dan salin teks pesan secara manual.'; }
});
const menu = document.querySelector('.menu-toggle');
menu.addEventListener('click', () => { const open = document.querySelector('nav').classList.toggle('open'); menu.setAttribute('aria-expanded', String(open)); menu.setAttribute('aria-label', open ? 'Tutup navigasi' : 'Buka navigasi'); menu.textContent = open ? '×' : '☰'; });
document.querySelectorAll('nav a').forEach(link => link.addEventListener('click', () => { document.querySelector('nav').classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); menu.setAttribute('aria-label', 'Buka navigasi'); menu.textContent = '☰'; }));
