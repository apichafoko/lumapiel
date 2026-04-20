import fs from "fs"
import path from "path"

const contentDir = path.join(process.cwd(), "content", "services")

const treatments = {
  "consulta-dermatologia-1-vez": `### 1. ¿Qué es la Consulta de Dermatología por 1° vez?
Es el primer acercamiento médico para evaluar la salud de tu piel, pelo o uñas. Consiste en una entrevista clínica y examen físico detallado realizado por un médico dermatólogo especialista, con el fin de llegar a un diagnóstico preciso.

### 2. ¿Para qué sirve?
Sirve para identificar la causa de cualquier síntoma o molestia cutánea, establecer un diagnóstico certero y diseñar un plan de tratamiento personalizado. Es el paso fundamental antes de iniciar cualquier procedimiento estético o médico.

### 3. ¿Qué patologías o afecciones mejora?
Al ser una consulta de evaluación, abarca absolutamente todo:
- Acné y rosácea.
- Control de lunares (prevención de cáncer de piel).
- Manchas y melasma.
- Caída de cabello (alopecias).
- Dermatitis, psoriasis, infecciones u hongos.
- Planificación de rutinas de skincare anti-age.

### 4. ¿Cómo es una Consulta de 1° vez?
1. **Historia clínica:** El médico te hará preguntas sobre tus antecedentes, estilo de vida, alergias y rutina actual.
2. **Examen físico:** Se examinará tu piel (o pelo/uñas) con luz adecuada. Si es un control de lunares, se usará un dermatoscopio (lupa médica especial).
3. **Diagnóstico y explicación:** El médico te explicará qué tenés y por qué ocurre.
4. **Plan de acción:** Te llevarás una receta con tu tratamiento o rutina indicada, y los pasos a seguir.

### 5. Consideraciones Clave

| Aspecto | Detalle Importante |
| :--- | :--- |
| **Duración** | Aproximadamente 20 a 30 minutos. |
| **Preparación** | Vení preferentemente sin maquillaje o con la posibilidad de retirarlo acá. |
| **Qué traer** | Si tenés estudios previos recientes o los productos que usás actualmente, traelos. |
| **Seguimiento** | Se indicará cuándo debés volver para evaluar la respuesta al tratamiento. |
`,

  "consulta-dermatologia-seguimiento": `### 1. ¿Qué es la Consulta de Seguimiento?
Es una visita médica de control programada, posterior a una consulta de primera vez. Se realiza para evaluar cómo está respondiendo tu piel al tratamiento indicado previamente.

### 2. ¿Para qué sirve?
Sirve para monitorear el progreso, ajustar dosis de medicamentos, cambiar cremas si es necesario, y asegurar que el plan de tratamiento está funcionando correctamente y de manera segura.

### 3. ¿Qué patologías o afecciones mejora?
Es el seguimiento de la patología ya diagnosticada:
- Controles de acné durante el uso de antibióticos o isotretinoína.
- Evaluación de manchas tras el uso de despigmentantes.
- Seguimiento de alopecias para ver si hay recrecimiento de pelo.
- Control de tratamientos crónicos como rosácea o psoriasis.

### 4. ¿Cómo es una Consulta de Seguimiento?
1. **Evaluación de resultados:** El médico preguntará cómo toleraste el tratamiento y si notaste mejorías.
2. **Examen físico:** Se re-evalúa la piel comparándola con la primera visita.
3. **Ajuste:** Se mantienen, suspenden o modifican las indicaciones médicas según la evolución.

### 5. Consideraciones Clave

| Aspecto | Detalle Importante |
| :--- | :--- |
| **Duración** | Alrededor de 15 a 20 minutos (más corta que la 1° vez). |
| **Adherencia** | Sé sincero con el médico si olvidaste usar las cremas o tomar la medicación. |
| **Frecuencia** | Depende de la patología; puede ser a los 15 días, al mes o a los 3 meses. |
`,

  "consulta-dermatologia-online": `### 1. ¿Qué es la Consulta de Dermatología Online?
Es una evaluación médica realizada a través de una videollamada, donde el dermatólogo diagnostica e indica tratamientos a distancia (teledermatología).

### 2. ¿Para qué sirve?
Sirve para resolver problemas dermatológicos, diseñar rutinas de skincare, o hacer controles de seguimiento desde la comodidad de tu casa, sin necesidad de trasladarte al consultorio.

### 3. ¿Qué patologías o afecciones mejora?
Es ideal para patologías visualmente claras y conocidas:
- Acné leve a moderado.
- Diseño de rutinas anti-age o de rosácea.
- Seguimiento de tratamientos ya instaurados.
- Dermatitis, alergias leves o caspa.
*(Atención: No sirve para control de lunares, ya que requiere dermatoscopía presencial).*

### 4. ¿Cómo es una Consulta Online?
1. **Conexión:** Te conectarás mediante un link (Zoom, Meet o WhatsApp video) en el horario pautado.
2. **Entrevista:** El médico hará la historia clínica exactamente igual que en formato presencial.
3. **Examen visual:** Te pedirá que acerques la cámara a las lesiones (o que envíes fotos previas de buena calidad y buena luz).
4. **Indicaciones:** Recibirás tu receta digital y las indicaciones por mail o WhatsApp.

### 5. Consideraciones Clave

| Aspecto | Detalle Importante |
| :--- | :--- |
| **Duración** | Aproximadamente 20 minutos. |
| **Requisitos** | Buena conexión a internet y, muy importante, **buena iluminación natural**. |
| **Limitaciones** | Si el médico determina que la lesión requiere palpación o biopsia, indicará consulta presencial. |
| **Recetas** | Son válidas y se envían en formato digital. |
`,

  "peeling-tca-facial": `### 1. ¿Qué es el Peeling de TCA Facial?
Es un peeling químico de profundidad media que utiliza Ácido Tricloroacético (TCA). Actúa coagulando las proteínas de la piel, lo que provoca una renovación celular intensa y el recambio de las capas superficiales dañadas.

### 2. ¿Para qué sirve?
Sirve para realizar una renovación cutánea significativa. Es un tratamiento "médico" más potente que los peelings cosméticos, diseñado para forzar a la piel a desprenderse de su capa envejecida y fabricar colágeno nuevo.

### 3. ¿Qué patologías o afecciones mejora?
- **Marcas y cicatrices superficiales:** Alisa el relieve de la piel (ideal para secuelas de acné).
- **Manchas solares y lentigos:** Barre la pigmentación superficial.
- **Arrugas finas:** Tensa la piel al inducir la formación de nuevo colágeno.
- **Poros y textura:** Refina drásticamente los poros dilatados y la piel áspera.

### 4. ¿Cómo es una sesión de Peeling TCA Facial?
1. **Preparación:** Desengrasado profundo de la piel.
2. **Pincelado:** Se aplica el ácido con un hisopo o pincel. Sentirás ardor, calor y picor intenso.
3. **"Frosting":** La piel se pone blanca (escarchada) en ciertas zonas; es el signo clínico de que el ácido actuó.
4. **Calma:** Se aplica frío o mascarillas descongestivas para calmar el ardor, que desaparece en pocos minutos.

### 5. Consideraciones Clave

| Aspecto | Detalle Importante |
| :--- | :--- |
| **Duración** | Unos 20 minutos. |
| **Recuperación** | Implica "downtime" (tiempo de baja). La piel se pondrá marrón/tensa y se pelará notablemente entre el día 3 y el día 7. |
| **Cuidados post** | **Prohibido** tirar de la piel que se descama (puede dejar cicatriz). Mucha hidratación y protección solar estricta. |
| **Resultados** | Piel "nueva", tensa y sin manchas a los 10 días. |
`
}

for (const [slug, content] of Object.entries(treatments)) {
  const filePath = path.join(contentDir, `${slug}.md`)
  fs.writeFileSync(filePath, content)
  console.log(`Generated ${filePath}`)
}
