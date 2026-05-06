import fs from "fs"
import path from "path"

const contentDir = path.join(process.cwd(), "content", "services")

const treatments = {
  "laser-erbium-glass": `### 1. ¿Qué es el Láser Erbium Glass?

Es un **láser fraccionado no ablativo**. La tecnología **Erbium Glass** genera **microcolumnas de estímulo** en la piel y **conserva tejido sano entre ellas**; así se **activan los mecanismos naturales de reparación**, con **renovación celular** y **mayor síntesis de colágeno**, **sin intervenir ni lesionar toda la superficie**.

**Fraccionado:** en lugar de tratar la piel “de una sola pieza”, el láser reparte la energía en **muchos puntos minúsculos** (microimpactos), como una rejilla. **Entre esos puntos queda piel sin disparar** en el mismo instante; ese tejido sano **ayuda a cicatrizar** y **la recuperación tras la sesión suele ser más llevadera** que si se irradiara toda la superficie por igual.

El resultado buscado es una piel **más firme, uniforme y luminosa**, con mejoría de la **textura**, los **poros** y las **cicatrices**, en especial las **post-acné**. Es un tratamiento **progresivo** (los cambios se consolidan entre sesiones), con **tiempos de recuperación cortos** en comparación con opciones más agresivas, indicado para quienes priorizan **mejorar la calidad de la piel** de forma **efectiva y segura**.

### 2. ¿Para qué sirve?
Sirve para estimular la formación de nuevo colágeno desde adentro hacia afuera, sin dañar la superficie cutánea. Mejora la calidad general de la piel, reduciendo signos de envejecimiento, cicatrices y estrías, con la gran ventaja de un tiempo de recuperación mínimo.

### 3. ¿Qué patologías o afecciones mejora?
- **Marcas de acné y cicatrices:** Promueve el rellenado de depresiones y cicatrices superficiales.
- **Estrías:** Es uno de los mejores tratamientos para atenuar estrías rojas y blancas.
- **Líneas finas y arrugas:** Redensifica la piel y suaviza marcas de expresión.
- **Piel opaca y textura irregular:** Homogeneiza el relieve cutáneo.

### 4. ¿Cómo es una sesión de Láser Erbium Glass?
1. **Preparación:** Limpieza de la piel y aplicación de gafas protectoras. En pieles sensibles puede colocarse anestesia tópica.
2. **Aplicación:** El cabezal del láser se desliza por la zona a tratar. Se perciben pequeños pinchazos o calor interno intenso.
3. **Post-tratamiento:** La piel queda sonrosada o levemente enrojecida. Se aplican productos calmantes.

### 5. Consideraciones Clave

| Aspecto | Detalle Importante |
| :--- | :--- |
| **Duración** | Aproximadamente 30 a 45 minutos. |
| **Recuperación** | El enrojecimiento dura 24 a 48 hs. No hay costras grandes, por lo que no impide la rutina diaria. |
| **Restricción Solar** | Alta. Debe usarse protector solar rigurosamente. |
| **Resultados** | La piel mejora progresivamente; se suelen requerir 1 sesión cada 3 semanas. |
`,

  "laser-vascupen": `### 1. ¿Qué es el Láser Vascupen?
Es un láser específico de uso vascular que se enfoca en la hemoglobina (el pigmento rojo de la sangre). Al disparar, su energía atraviesa la piel sin dañarla y es absorbida por el vaso sanguíneo dilatado, causando que este colapse y se cierre.

### 2. ¿Para qué sirve?
Sirve para eliminar "arañitas" (telangiectasias), pequeñas varices, puntos rubí y diversas lesiones de origen vascular, de manera rápida, segura y sumamente precisa, sin necesidad de agujas ni inyecciones.

### 3. ¿Qué patologías o afecciones mejora?
- **Telangiectasias faciales y corporales:** Las finas ramificaciones rojas o moradas.
- **Angiomas y puntos rubí:** Pequeñas formaciones rojizas elevadas o planas.
- **Rosácea (componente vascular):** Cierra los capilares dilatados responsables del eritema permanente.
- **Lagos venosos:** Pequeñas dilataciones oscuras, frecuentemente en los labios.

### 4. ¿Cómo es una sesión de Láser Vascupen?
1. **Preparación:** La piel debe estar limpia y libre de autobronceantes. Se colocan gafas protectoras.
2. **El disparo:** Se aplica el láser directamente siguiendo el trayecto del vaso sanguíneo. Sentirás un "pinchazo" cálido, similar al latigazo de una bandita elástica.
3. **Efecto visual:** Muchas veces, el vaso desaparece inmediatamente ante tus ojos ("efecto borrador") o cambia de color a un tono más oscuro.
4. **Cierre:** Se aplica un gel descongestivo.

### 5. Consideraciones Clave

| Aspecto | Detalle Importante |
| :--- | :--- |
| **Duración** | Sesiones muy cortas, entre 15 y 30 minutos. |
| **Recuperación** | Puede haber un leve enrojecimiento o pequeño moretón (púrpura) que se reabsorbe en días. |
| **Cuidados post** | Evitar el calor extremo, baños muy calientes o ejercicio intenso las primeras 48 hs. |
| **Resultados** | Muchos vasos desaparecen en 1 sesión; los más resistentes pueden requerir 2 o 3. |
`,

  "laser-q-switch-facial": `### 1. ¿Qué es el Láser Q-Switch Facial?
Es una tecnología láser que emite pulsos de energía altísima en fracciones de segundo (nanosegundos). Esta velocidad extrema crea un efecto fotoacústico: en lugar de "quemar" la mancha, la "estalla" en partículas minúsculas para que el propio cuerpo las elimine.

### 2. ¿Para qué sirve?
Es el estándar de oro médico para la eliminación de pigmentos. Sirve para limpiar el rostro de manchas rebeldes, homogeneizar el tono, tratar el melasma y estimular suavemente la textura sin el tiempo de baja (downtime) de los láseres ablativos.

### 3. ¿Qué patologías o afecciones mejora?
- **Melasma:** Manchas hormonales crónicas, ayudando a dispersar el pigmento profundo.
- **Léntigos solares (pecas de la edad):** Las difumina o elimina de manera precisa.
- **Hiperpigmentación post-inflamatoria:** Manchas oscuras que quedan luego del acné o cicatrices.
- **Tatuajes (técnica focalizada):** Rompe la tinta para su reabsorción.

### 4. ¿Cómo es una sesión de Q-Switch Facial?
1. **Limpieza:** Higiene profunda del rostro y colocación de gafas protectoras opacas.
2. **El láser:** Al pasar el cabezal, se escucha un sonido similar a pequeños "chasquidos". Sentirás un ligero picor o sensación de pequeñas chispitas tibias.
3. **Precisión:** El médico puede tratar todo el rostro con baja energía (toning) o hacer disparos focalizados en manchas puntuales.
4. **Post-sesión:** La piel puede verse sonrosada. Se coloca hidratación y fotoprotección estricta.

### 5. Consideraciones Clave

| Aspecto | Detalle Importante |
| :--- | :--- |
| **Duración** | Aproximadamente 20 a 30 minutos. |
| **Recuperación** | Inmediata (si es tratamiento global). Si es puntual, puede formarse una pequeña costra oscura. |
| **Restricción Solar** | Fundamental. Protección solar máxima antes, durante y después del tratamiento. |
| **Resultados** | Requiere constancia; en protocolos de melasma se hacen sesiones quincenales o mensuales. |
`,

  "peeling-retinoico": `### 1. ¿Qué es el Peeling Retinoico?
Es una técnica de exfoliación química que utiliza ácido retinoico (un derivado muy potente de la vitamina A) en concentraciones de uso exclusivamente médico. Provoca una descamación controlada para renovar las capas superficiales de la piel.

### 2. ¿Para qué sirve?
Sirve para forzar la renovación celular, "pelar" la piel dañada y obligarla a fabricar piel nueva, más sana, luminosa y con mejor distribución de la melanina (pigmento). Es uno de los peelings antienvejecimiento por excelencia.

### 3. ¿Qué patologías o afecciones mejora?
- **Fotoenvejecimiento:** Trata las arrugas finas, la piel engrosada y el tono cetrino.
- **Acné activo y secuelas:** Desobstruye los poros y afina el estrato córneo, mejorando brotes y marquitas.
- **Manchas superficiales:** Ayuda a unificar el tono y aporta mucha luminosidad.
- **Piel áspera:** Devuelve un tacto liso y suave.

### 4. ¿Cómo es una sesión de Peeling Retinoico?
1. **Preparación:** Limpieza profunda y desengrasado de la piel para asegurar la penetración del ácido.
2. **Aplicación:** Se pincela el ácido retinoico, que suele tener un color amarillento. No pica ni arde, al contrario que otros ácidos.
3. **El tiempo de pose:** Este peeling tiene la particularidad de que **no se retira en el consultorio**. Te irás a tu casa con el ácido puesto.
4. **En casa:** Deberás lavarte el rostro con agua a las 4, 6 u 8 horas (según indicación médica).

### 5. Consideraciones Clave

| Aspecto | Detalle Importante |
| :--- | :--- |
| **Duración** | En consultorio, unos 20 minutos (muy rápido). |
| **Recuperación** | La piel comenzará a descamarse visiblemente al 2do o 3er día y durará unos 3 a 5 días. |
| **Cuidados post** | Extrema hidratación, no tirar de las pielecitas y evitar el sol por completo. |
| **Resultados** | Piel nueva, fresca y súper luminosa a los 7-10 días. |
`,

  "infiltracion-cicatriz-alopecia": `### 1. ¿Qué es la Infiltración para Cicatrices o Alopecia?
Es un procedimiento médico en el que se inyectan sustancias activas (como corticoides, vitaminas, o medicamentos específicos) directamente en la dermis o en el folículo piloso, mediante agujas extrafinas.

### 2. ¿Para qué sirve?
Su función depende del objetivo:
- **En cicatrices (queloides o hipertróficas):** Sirve para reducir la inflamación crónica, aplanar la cicatriz, detener el picor y frenar su crecimiento.
- **En alopecia (ej. Areata o androgénica):** Sirve para frenar la caída localizada, desinflamar el folículo o inyectar nutrientes directamente en la raíz del pelo para forzar su crecimiento.

### 3. ¿Qué patologías o afecciones mejora?
- **Cicatrices Queloides:** Las reblandece, aplana y reduce la picazón o dolor.
- **Alopecia Areata:** Detiene la inflamación autoinmune que hace caer el pelo en "parches".
- **Acné quístico severo:** Puede infiltrarse un quiste puntual muy inflamado para que baje en 24 hs.

### 4. ¿Cómo es una sesión de Infiltración?
1. **Evaluación:** El médico revisa la cicatriz o el parche de alopecia para calcular la dosis exacta.
2. **Asepsia:** Limpieza y desinfección de la zona.
3. **Infiltración:** Con una jeringa de insulina (aguja muy cortita y fina) se introduce el medicamento directamente en la lesión.
4. **Sensación:** Se siente un leve pinchazo y a veces una sensación de presión. Es rápido y bien tolerado.

### 5. Consideraciones Clave

| Aspecto | Detalle Importante |
| :--- | :--- |
| **Duración** | Muy rápida, generalmente unos 15 minutos. |
| **Recuperación** | Inmediata. En cicatrices puede notarse que se hunden un poco con el paso de los días. |
| **Efecto** | Los corticoides infiltrados tardan unos días en hacer su máximo efecto desinflamatorio. |
| **Frecuencia** | Suelen indicarse sesiones cada 3 a 4 semanas hasta lograr el aplanamiento o el rebrote. |
`,

  "luma-hydrojelly-mask": `### 1. ¿Qué es la Luma Hydrojelly Mask?
Es una mascarilla hidroplástica premium, de textura gelatinosa o "jelly", formulada con alginatos refinados y electrolitos puros. Al aplicarse sobre la piel en forma líquida, se solidifica creando un sellado al vacío que empuja la hidratación hacia las capas profundas.

### 2. ¿Para qué sirve?
Sirve como un "shock" de hidratación y calma. Su función de sellado al vacío permite que los principios activos (ácido hialurónico, péptidos, extractos botánicos) penetren un 60% más que con mascarillas convencionales. Restaura la barrera cutánea de forma inmediata.

### 3. ¿Qué patologías o afecciones mejora?
- **Pieles deshidratadas y tirantes:** Repone el equilibrio hídrico (electrolitos) en minutos.
- **Enrojecimiento y congestión:** Su efecto frío baja la temperatura de la piel, ideal para rosácea o luego de tratamientos médicos (láser, peelings).
- **Fatiga cutánea:** Aporta luminosidad extrema y efecto "buena cara" antes de un evento.

### 4. ¿Cómo es una sesión de Hydrojelly Mask?
1. **Preparación:** Puede aplicarse sola tras una limpieza, o como finalización de un tratamiento más fuerte.
2. **Aplicación:** La cosmiatra prepara la mezcla y la aplica sobre el rostro (incluyendo ojos y boca si el paciente lo desea). Es fresca y relajante.
3. **Tiempo de pose:** Se deja solidificar durante unos 15-20 minutos, tiempo durante el cual crea su "sello de vacío".
4. **Retiro:** Se retira de una sola pieza, como si fuera una segunda piel, dejando el rostro profundamente fresco y nutrido.

### 5. Consideraciones Clave

| Aspecto | Detalle Importante |
| :--- | :--- |
| **Duración** | 20 a 30 minutos. |
| **Sensación** | Extremadamente relajante, fresca y descongestiva. |
| **Recuperación** | Ninguna. La piel queda perfecta, lista para lucir en un evento. |
| **Frecuencia** | Se puede realizar semanal o quincenalmente, o como complemento de otros procedimientos. |
`
}

for (const [slug, content] of Object.entries(treatments)) {
  const filePath = path.join(contentDir, `${slug}.md`)
  fs.writeFileSync(filePath, content)
  console.log(`Generated ${filePath}`)
}
