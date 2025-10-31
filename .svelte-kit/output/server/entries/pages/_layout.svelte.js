import { G as head, I as slot, F as pop, D as push } from "../../chunks/index.js";
import { e as escape_html } from "../../chunks/escaping.js";
function _layout($$payload, $$props) {
  push();
  let year = (/* @__PURE__ */ new Date()).getFullYear();
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>Jorge Astorga — CC IT&amp;Solutions - Servicios Informáticos, Ciberseguridad &amp; IA</title>`;
    $$payload2.out.push(`<meta name="description" content="Servicios profesionales de desarrollo web, ciberseguridad, automatización con IA y cloud en Chile. Consultoría, implementación y soporte con foco en resultados."/> <meta property="og:title" content="Jorge Astorga — Servicios Informáticos, Ciberseguridad &amp; IA"/> <meta property="og:description" content="Desarrollo web, ciberseguridad, automatización con IA y cloud para tu negocio."/> <meta property="og:type" content="website"/> <meta property="og:image" content="/og-image.jpg"/> <meta property="og:url" content="https://ccsolution.cl"/> <meta name="twitter:card" content="summary_large_image"/> <link rel="icon" href="/favicon.ico"/> <meta name="viewport" content="width=device-width, initial-scale=1"/>`);
  });
  $$payload.out.push(`<div class="bg-slate-950 text-slate-100 min-h-dvh"><header class="sticky top-0 z-40 bg-slate-950/70 glass"><div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div class="flex h-16 items-center justify-between"><a href="/#inicio" class="flex items-center gap-3 font-semibold tracking-tight"><div class="h-8 w-8 rounded-2xl bg-brand-500"></div> <span>Jorge Astorga - CC IT&amp;Solution</span></a> <nav class="hidden md:flex items-center gap-8 text-sm text-slate-300"><a href="/#servicios" class="hover:text-white">Servicios</a> <a href="/#casos" class="hover:text-white">Casos</a> <a href="/#proceso" class="hover:text-white">Proceso</a> <a href="/#testimonios" class="hover:text-white">Testimonios</a> <a href="/#contacto" class="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white shadow-soft">Agenda una llamada</a></nav> <button class="md:hidden inline-flex items-center justify-center rounded-xl p-2 hover:bg-white/5" aria-label="Abrir menú"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path fill-rule="evenodd" d="M3.75 6.75A.75.75 0 0 1 4.5 6h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75Zm0 5.25A.75.75 0 0 1 4.5 11h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75Zm0 5.25a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd"></path></svg></button></div></div> `);
  {
    $$payload.out.push("<!--[!-->");
  }
  $$payload.out.push(`<!--]--></header> <!---->`);
  slot($$payload, $$props, "default", {});
  $$payload.out.push(`<!----> <footer class="py-10 border-t border-white/10"><div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-400"><div>© ${escape_html(year)} Jorge Astorga - CC IT&amp;Solution. Todos los derechos reservados.</div> <div class="flex items-center gap-4"><a href="/terminos" class="hover:text-white">Términos</a> <a href="/privacidad" class="hover:text-white">Privacidad</a></div></div></footer></div>`);
  pop();
}
export {
  _layout as default
};
