/* ================================================================
   FREDDY ZAPATA — JavaScript del sitio web
   ================================================================
   
   FUNCIONES:
   1. Menú hamburguesa (móvil)
   2. Animaciones al hacer scroll (fade-in)
   3. Formulario de contacto → WhatsApp
   4. Resaltar enlace activo en navegación
   ================================================================ */

'use strict';
    const ham=document.getElementById('hamburger'),menu=document.getElementById('mobileMenu');
    ham.addEventListener('click',()=>{const o=menu.classList.toggle('open');ham.classList.toggle('open',o);ham.setAttribute('aria-expanded',o)});
    document.querySelectorAll('.mobile-link').forEach(l=>l.addEventListener('click',()=>{menu.classList.remove('open');ham.classList.remove('open');ham.setAttribute('aria-expanded','false')}));
    const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target)}}),{threshold:0.1,rootMargin:'0px 0px -35px 0px'});
    document.querySelectorAll('.fade-in').forEach((el,i)=>{el.style.transitionDelay=`${(i%4)*.08}s`;obs.observe(el)});
    document.getElementById('btnSend').addEventListener('click',()=>{
      const n=document.getElementById('nombre').value.trim();
      const e=document.getElementById('email').value.trim();
      const s=document.getElementById('servicio').value;
      const m=document.getElementById('mensaje').value.trim();
      if(!n||!e||!m){alert('Por favor completa nombre, correo y mensaje.');return}
      const t=`Hola Freddy Zapata 👋

*Nombre:* ${n}
*Email:* ${e}
*Servicio:* ${s||'No especificado'}

*Mensaje:*
${m}`;
      window.open(`https://wa.me/523337229584?text=${encodeURIComponent(t)}`,'_blank','noopener,noreferrer');
    });
