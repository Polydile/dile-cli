import '../css/styles.css';
import '@dile/ui/components/nav/nav.js';
import '@dile/ui/components/menu-hamburger/menu-hamburger.js';
import '@dile/ui/components/selector/selector.js';
import '@dile/ui/components/selector/selector-item.js'; 
import './prism.js'
import './icons.js'

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('[dile-cloak]').forEach(el => {
    el.removeAttribute('dile-cloak');
  });
})