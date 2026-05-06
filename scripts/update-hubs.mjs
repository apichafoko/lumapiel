import fs from "fs"
import path from "path"

const hubsDir = path.join(process.cwd(), "content", "hubs")

const esteticaMedica = {
  id: "estetica-medica",
  title: "Estética médica",
  description:
    "Trabajamos la estética desde la **dermatología** con procedimientos que respetan tu expresión natural, con planes claros y criterio profesional. El **acompañamiento de cosmiatría** (limpiezas, peelings, hidratación, mascarillas) tiene su **[página propia de Cosmiatría](/especialidades/cosmiatria)**.",
  sections: [
    {
      anchor: "rejuvenecimiento-facial",
      title: "Expresión, volumen y bioestimulación",
      body: "El rejuvenecimiento médico no busca **cambiar quién sos**, sino devolver armonía a la expresión y a la calidad de la piel. Trabajamos con herramientas que actúan de forma selectiva —relajación de líneas dinámicas, apoyo al colágeno, regeneración con recursos propios del cuerpo— siempre según lo que indique la evaluación y tus expectativas realistas.\n\nCada decisión se toma con **seguridad, dosis y timing** pensados para vos. Los protocolos concretos, marcas comerciales y tiempos de sesión están desarrollados en el área de **Tratamientos**."
    },
    {
      anchor: "tratamientos-capilares-no-quirurgicos",
      title: "Medicina capilar sin cirugía",
      body: "Cuando el foco es el **cuero cabelludo y el folículo**, el abordaje sigue siendo médico: entender el contexto, descartar causas que no correspondan y definir si suman infiltraciones, nutrición local, factores de crecimiento u otras herramientas no quirúrgicas.\n\nEl objetivo es **ordenar el proceso** y acompañarte con seguimiento."
    },
    {
      anchor: "protocolos-en-detalle",
      title: "Resumiendo",
      body: "Esta página resume el **marco** de estética médica en Luma Piel. Para fichas por procedimiento, entrá a **[Tratamientos](/tratamientos)**. Para cosmiatría clínica (limpiezas, peelings, mascarillas), **[Cosmiatría](/especialidades/cosmiatria)**. Si necesitás ordenar por dónde empezar, **[Consultas](/consultas)**."
    }
  ]
}

const cosmiatria = {
  id: "cosmiatria",
  title: "Cosmiatría",
  description:
    "La cosmiatría clínica es el **cuidado médico de la superficie**: higiene profunda, renovación controlada e hidratación con protocolos y productos alineados a lo que tu piel necesita y a lo que acordamos en consulta.",
  sections: [
    {
      anchor: "marco",
      title: "Enfoque en Luma Piel",
      body: "El foco está en **preparar la piel**, mantener resultados y acompañar procesos más amplios (incluida la recuperación después de otros procedimientos). No es un spa genérico: es trabajo técnico con **mirada dermatológica**, coordinado con el plan global que definimos para vos.\n\nLos protocolos concretos, tiempos y combinaciones posibles están desarrollados en el área de **Tratamientos**."
    },
    {
      anchor: "protocolos-en-detalle",
      title: "Resumiendo",
      body: "Para fichas por servicio (limpiezas, peelings, mascarillas clínicas y más), entrá a **[Tratamientos](/tratamientos)**. Para ordenar prioridades, **[Consultas](/consultas)**. Si tu camino incluye también rejuvenecimiento médico o bioestimulación, revisá **[Estética médica](/especialidades/estetica-medica)**."
    }
  ]
}

const tratamientosLaser = {
  id: "tratamientos-laser",
  title: "Tecnología Láser",
  description:
    "Contamos con la multiplataforma [**Alma Harmony®**](https://www.almalasersmedica.es/productos/alma-harmony/). Incluye distintas opciones de tratamiento: láser Q-Switch, Erbium Glass, Erbium YAG, luz pulsada, Dye VL y VascuPen. Estas herramientas permiten abordar problemas de la piel de forma no invasiva, segura y muy precisa.",
  procedureBlocks: [
    {
      style: "nested",
      title: "LUZ PULSADA",
      items: [
        { label: "FACIAL", slug_es: "luz-pulsada-facial" },
        { label: "COMPLETA (FACIAL, CUELLO Y ESCOTE)", slug_es: "luz-pulsada-completa" },
        { label: "MANOS", slug_es: "luz-pulsada-manos" },
      ],
    },
    { style: "single", title: "IRIS DYE VL", slug_es: "laser-vascupen" },
    { style: "single", title: "LÁSER ERBIUM CAPILAR", slug_es: "laser-erbium-capilar" },
    {
      style: "nested",
      title: "LÁSER Q SWITCH",
      items: [
        { label: "FACIAL", slug_es: "laser-q-switch-facial" },
        { label: "OJERAS", slug_es: "laser-q-switch-ojeras" },
        { label: "ESTRÍAS", slug_es: "laser-q-switch-estrias" },
        { label: "COMPLETO (CARA, CUELLO, ESCOTE)", slug_es: "laser-q-switch-completo" },
      ],
    },
    { style: "single", title: "LÁSER Q SWITCH MELASMA", slug_es: "laser-q-switch-melasma" },
    { style: "single", title: "LÁSER ONICOMICOSIS", slug_es: "laser-q-switch-onicomicosis" },
    { style: "single", title: "LÁSER ERBIUM GLASS", slug_es: "laser-erbium-glass" },
    { style: "single", title: "VELO DE NOVIA", slug_es: "laser-velo-de-novia" },
    { style: "single", title: "LÁSER LUMA SKIN RESET", slug_es: "laser-luma-skin-reset" },
  ],
  sections: [
    {
      anchor: "manchas-y-melasma",
      title: "Tono, pigmento y luminosidad",
      body: "En consulta vemos con frecuencia inquietudes ligadas a la **uniformidad del color**, la claridad y la forma en que la piel refleja la luz. La multiplataforma permite trabajar con energía calibrada —luz pulsada, Q-Switch u otros modos según lo que indique el caso— siempre integrada en un **plan médico** y no como un recurso suelto.\n\nElegimos la **vía adecuada** según tu fototipo, la zona a tratar y los objetivos que definimos juntos. Los protocolos concretos, tiempos y combinaciones posibles se desarrollan en el área de **Tratamientos** del sitio, donde cada ficha profundiza en un procedimiento."
    },
    {
      anchor: "rejuvenecimiento-y-textura",
      title: "Textura, firmeza y renovación",
      body: "La piel gana calidad cuando recupera **orden, densidad y elasticidad**. Para eso existe un espectro de tecnologías —desde estímulo profundo suave hasta opciones más intensivas cuando el diagnóstico lo amerita— que se combinan con criterio y respeto por los tiempos de recuperación.\n\nEn Luma Piel el láser **acompaña** un objetivo claro: no es un accesorio de moda, sino una herramienta que encaja en un proceso. El detalle de cada propuesta (nombres de protocolo, sesiones, expectativas) lo vas a encontrar en **Tratamientos**."
    },
    {
      anchor: "rojeces-y-vascular",
      title: "Rojeces y componente vascular",
      body: "Cuando predomina el **mapa vascular** o la piel se ve permanentemente alterada en el tono, hace falta precisión y control térmico. La plataforma integra aplicadores pensados para trabajar sobre vasos y rojeces."
    },
    {
      anchor: "capilar-laser",
      title: "Cuero cabelludo y folículo",
      body: "Se utiliza el láser Erbium como parte del tratamiento para estimular el crecimiento del folículo piloso sin dolor. como apoyo dentro de planes médicos de bioestimulación capilar, coordinado con hábitos, medicación u otros procedimientos que tu caso requiera."
    },
    {
      anchor: "protocolos-en-detalle",
      title: "Resumiendo",
      body: "Esta especialidad resume **cómo pensamos el láser** en Luma Piel: con criterio dermatológico, tecnología de referencia y lenguaje claro para quien se atiende con nosotros.\n\nPara nombres de protocolo, duraciones, combinaciones y qué esperar en cada sesión, el contenido detallado está en **[Tratamientos](/tratamientos)**. Si todavía no sabés por dónde empezar, podés entrar desde **[Consultas](/consultas)** y armamos el camino en conjunto."
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
      title: "Primera consulta y seguimiento",
      body: "En Luma Piel no trabajamos a ciegas: el diagnóstico y el plan nacen de escucharte, conocerte y evaluarte en detalle.\n\n### Primera consulta\nEs el **primer acercamiento**: nos conocemos, me contás tus antecedentes personales y familiares, qué te pasa con la piel y en qué contexto vivís el problema. Te examino, armamos juntos una **rutina de skincare** adecuada, definimos un **plan de tratamiento** y, si hace falta, **indicación de estudios complementarios**.\nDura más porque es la primera vez que nos vemos: hace falta tiempo para recoger tu historia, entender el cuadro y dejarte con un camino claro y ordenado.\n\n### Consultas de seguimiento\nSon **más breves** porque el objetivo es otro: ver **cómo te fue** con lo que acordamos, evaluar la respuesta y decidir **ajustes** o sumar lo que haga falta. Sirven para afinar el tratamiento en el tiempo, sin perder de vista el objetivo."
    },
    {
      anchor: "consulta-online",
      title: "Teledermatología (Online)",
      body: "La **teleconsulta** es una opción para quienes **viven lejos** o, por distintas razones, **no pueden concurrir** al consultorio. Se utiliza tanto para **primera consulta** como para **seguimiento** de tratamientos ya iniciados, siempre que el abordaje a distancia sea apropiado para lo que necesitás en ese momento.\n\n*Nota: el control presencial y con apoyo instrumental sigue siendo necesario en situaciones en las que hace falta un examen detallado in situ; por ejemplo, el **chequeo de lunares** requiere evaluación y visualización adecuada en persona, no reemplazable por la pantalla.*"
    }
  ]
}

fs.writeFileSync(path.join(hubsDir, "estetica-medica.es.json"), JSON.stringify(esteticaMedica, null, 2))
fs.writeFileSync(path.join(hubsDir, "cosmiatria.es.json"), JSON.stringify(cosmiatria, null, 2))
fs.writeFileSync(path.join(hubsDir, "tratamientos-laser.es.json"), JSON.stringify(tratamientosLaser, null, 2))
fs.writeFileSync(path.join(hubsDir, "consulta-dermatologica.es.json"), JSON.stringify(consultaDermatologica, null, 2))

console.log("Updated hubs JSON files")
