import fs from "fs"
import path from "path"

const hubsDir = path.join(process.cwd(), "content", "hubs")

const esteticaMedica = {
  id: "estetica-medica",
  title: "Estética Médica",
  description: "Tratamientos orientados a realzar tu belleza natural, prevenir el envejecimiento prematuro y mejorar la calidad global de la piel, siempre bajo estricto criterio médico.",
  sections: [
    {
      anchor: "rejuvenecimiento-facial",
      title: "Rejuvenecimiento Facial",
      body: "Nuestro enfoque en rejuvenecimiento no busca transformar tus facciones, sino **refrescar tu expresión** y devolverle a la piel su vitalidad y firmeza natural.\n\n### ¿Qué tratamos?\n- Arrugas de expresión (frente, entrecejo, patas de gallo).\n- Pérdida de volumen y flacidez (surcos, ojeras).\n- Falta de luminosidad y piel opaca.\n\n### Nuestros procedimientos estrella\n- **Botox:** Para relajar y prevenir líneas dinámicas.\n- **Bioestimulación:** Inyectables que le 'enseñan' a tu piel a fabricar su propio colágeno nuevo.\n- **Plasma Rico en Plaquetas (PRP):** Aprovecha los factores de crecimiento de tu propia sangre para regenerar la dermis de adentro hacia afuera."
    },
    {
      anchor: "cosmiatria-y-acompanamiento",
      title: "Cosmiatría Clínica",
      body: "La base de cualquier piel sana comienza aquí. La cosmiatría clínica va más allá de un mimo: utiliza insumos y técnicas de grado médico para mantener los poros limpios y la piel receptiva.\n\n### ¿Qué tratamos?\n- Puntos negros, comedones y milium.\n- Piel asfixiada, seca o muy grasa.\n- Daño solar superficial.\n\n### Nuestros procedimientos estrella\n- **Limpieza de Cutis Profunda:** El paso número uno para cualquier piel. Extrae impurezas y purifica.\n- **Peelings Químicos (Retinoico, TCA, Mandélico):** Renovación celular forzada que elimina manchas, mejora el acné y da un brillo instantáneo.\n- **Luma Hydrojelly Mask:** Shock de hidratación sellado al vacío, ideal para pieles muy deshidratadas o post-láser."
    },
    {
      anchor: "tratamientos-capilares-no-quirurgicos",
      title: "Salud Capilar",
      body: "La pérdida de cabello o la pérdida de volumen requiere un abordaje médico para encontrar la causa subyacente y detener el proceso.\n\n### ¿Qué tratamos?\n- Alopecias (androgénica, areata, por estrés).\n- Debilitamiento y caída excesiva del cabello.\n- Pelo fino y frágil.\n\n### Nuestros procedimientos estrella\n- **Mesoterapia Capilar:** Microinyecciones de vitaminas, péptidos y medicación directo en la raíz del folículo.\n- **PRP Capilar:** Regeneración pura con tus propias células.\n- **Infiltración para Alopecia:** Para detener brotes específicos de caída."
    }
  ]
}

const tratamientosLaser = {
  id: "tratamientos-laser",
  title: "Tecnología Láser",
  description: "Contamos con una plataforma láser de última generación (Láser Q-Switch, Erbium Glass, Luz Pulsada) para resolver problemas de la piel de forma no invasiva, segura y muy precisa.",
  sections: [
    {
      anchor: "manchas-y-melasma",
      title: "Manchas y Melasma",
      body: "El sol, las hormonas y la edad dejan marcas. Nuestros láseres actúan como un borrador inteligente que 'estalla' o barre el pigmento sin dañar la piel sana que lo rodea.\n\n### ¿Qué tratamos?\n- Léntigos (pecas solares) en rostro, escote y manos.\n- Melasma (manchas del embarazo o por pastillas anticonceptivas).\n- Hiperpigmentación post-inflamatoria (marcas oscuras que deja el acné).\n\n### ¿Cómo lo logramos?\nDependiendo de la profundidad de la mancha, utilizamos **Láser Q-Switch** o **Luz Pulsada (IPL)**. Las sesiones son rápidas y en muchos casos las manchas desaparecen tras unas pocas sesiones."
    },
    {
      anchor: "rejuvenecimiento-y-textura",
      title: "Textura y Renovación Profunda",
      body: "Para combatir cicatrices, estrías o arrugas más marcadas, necesitamos reestructurar la piel desde adentro. El láser penetra creando micro-zonas térmicas que obligan a tu cuerpo a formar colágeno joven.\n\n### ¿Qué tratamos?\n- Cicatrices o secuelas de acné (pozos).\n- Poros muy dilatados.\n- Estrías recientes o antiguas.\n- Envejecimiento severo.\n\n### ¿Cómo lo logramos?\nCon tecnologías como el **Láser Erbium Glass** o nuestro programa intensivo **Luma Skin Reset**. Si buscás un shock de luz sin tiempo de inactividad, el **Velo de Novia (Hollywood Peel)** es ideal."
    },
    {
      anchor: "rojeces-y-vascular",
      title: "Lesiones Vasculares y Rojeces",
      body: "Cuando las venitas se dilatan y no vuelven a su tamaño normal, generan un enrojecimiento constante o 'arañitas' visibles.\n\n### ¿Qué tratamos?\n- Rosácea.\n- Telangiectasias (arañitas) en la nariz o las mejillas.\n- Puntos Rubí (pequeños puntos rojos elevados).\n\n### ¿Cómo lo logramos?\nUtilizamos **Láser Vascupen** o **Luz Pulsada** para sellar los vasitos mediante calor. El cuerpo luego los reabsorbe de manera natural, mejorando drásticamente el enrojecimiento facial."
    },
    {
      anchor: "onicomicosis-y-unas",
      title: "Hongos en las Uñas (Onicomicosis)",
      body: "Las infecciones por hongos en las uñas son muy rebeldes a cremas y pastillas. El láser ofrece una solución física.\n\n### ¿Cómo funciona?\nEl láser emite una luz que atraviesa la uña y calienta el lecho ungueal, destruyendo el hongo por efecto térmico, sin necesidad de tomar medicación por meses y sin dañar la uña sana."
    }
  ]
}

const consultaDermatologica = {
  id: "consulta-dermatologica",
  title: "Consulta Dermatológica",
  description: "Todo buen tratamiento comienza con un diagnóstico médico preciso. En Luma Piel evaluamos la salud de tu piel, pelo y uñas desde una perspectiva médica, funcional e integral.",
  sections: [
    {
      anchor: "primera-consulta-vs-seguimiento",
      title: "Diagnóstico y Seguimiento",
      body: "La piel es el órgano más grande del cuerpo y puede reflejar problemas internos. En Luma Piel no 'recetamos por recetar': primero diagnosticamos.\n\n### ¿Cómo funciona?\n1. **Consulta de Primera Vez:** Durante 30 minutos, la Dra. Gandolfo revisa tus antecedentes, tu rutina actual y examina tu piel de cerca (con dermatoscopio si es necesario). Te vas con un plan de acción claro.\n2. **Seguimiento:** Una visita más corta programada para monitorear el éxito del tratamiento, ajustar dosis o cambiar cremas. Es clave para el éxito en problemas como el acné, la caída de pelo o el control de lunares."
    },
    {
      anchor: "consulta-online",
      title: "Teledermatología (Online)",
      body: "Para problemas muy visuales o para el diseño de rutinas de cuidado (skincare), podés atenderte con nuestro equipo sin moverte de tu casa.\n\n### ¿Cuándo es ideal la consulta online?\n- Para diseñar una rutina de limpieza y anti-age personalizada.\n- Para controles de acné en tratamiento.\n- Para evaluar una irritación repentina, dermatitis o alergia leve.\n\n*Nota: La consulta online NO sirve para realizar un chequeo de lunares, ya que eso requiere visualización microscópica presencial.*"
    }
  ]
}

fs.writeFileSync(path.join(hubsDir, "estetica-medica.es.json"), JSON.stringify(esteticaMedica, null, 2))
fs.writeFileSync(path.join(hubsDir, "tratamientos-laser.es.json"), JSON.stringify(tratamientosLaser, null, 2))
fs.writeFileSync(path.join(hubsDir, "consulta-dermatologica.es.json"), JSON.stringify(consultaDermatologica, null, 2))

console.log("Updated hubs JSON files")
