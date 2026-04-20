import fs from "fs"
import path from "path"

const contentDir = path.join(process.cwd(), "content", "services")

const treatments = {
  "luz-pulsada-completa": `### 1. ¿Qué es la Luz Pulsada (IPL) Corporal?
A diferencia del láser convencional (que es una luz de un solo color y dirección), el IPL es una fuente lumínica de alta intensidad de "banda ancha". Imagínalo como una ráfaga de luz policromática que actúa sobre diferentes capas de la piel simultáneamente.

### 2. ¿Para qué sirve?
Su función principal es el fotorejuvenecimiento. Busca mejorar la calidad global de la piel mediante la estimulación de colágeno y la eliminación de pigmentos irregulares. Es el "borrador" ideal para el daño solar acumulado en el cuerpo.

### 3. ¿Qué patologías o afecciones mejora?
El IPL corporal es sumamente versátil. Es eficaz para:
- **Léntigos solares:** Manchas causadas por el sol (comunes en escote, manos y hombros).
- **Rosácea y cuperosis:** Reduce el enrojecimiento y las pequeñas venitas.
- **Poiquilodermia de Civatte:** Esa coloración rojiza-marrón que suele aparecer en los laterales del cuello.
- **Textura irregular:** Mejora los poros abiertos y aporta luminosidad global.

### 4. ¿Cómo es una sesión de IPL?
Para que sepas exactamente qué esperar, aquí el paso a paso:
1. **Preparación:** Se limpia la zona a tratar. Es indispensable el uso de gafas protectoras especiales tanto para vos como para el profesional.
2. **Gel conductor:** Se aplica un gel frío sobre la piel que ayuda a que la luz penetre mejor y protege la capa superficial del calor.
3. **El disparo:** Sentirás un ligero "latigazo" o sensación de calor súbito. Es molesto pero tolerable y muy rápido.
4. **Post-sesión:** Se retira el gel y se aplica una crema calmante y, por supuesto, protector solar.

### 5. Consideraciones Clave

| Aspecto | Detalle Importante |
| :--- | :--- |
| **Duración** | Entre 20 y 40 minutos, dependiendo de la extensión corporal. |
| **Recuperación** | Inmediata. Las manchas pueden oscurecerse unos días antes de descamarse. |
| **Restricción Solar** | Vital: Sin exposición solar directa 3-4 semanas antes ni después. |
| **Resultados** | Cambios visibles desde la primera sesión; se recomiendan 3 a 5 sesiones. |
`,

  "luz-pulsada-facial": `### 1. ¿Qué es la Luz Pulsada (IPL) Facial?
Es un tratamiento de fotorejuvenecimiento no invasivo que emplea luz policromática de alta intensidad. Actúa como un barrido inteligente sobre la piel del rostro para tratar múltiples imperfecciones al mismo tiempo, sin dañar la superficie cutánea.

### 2. ¿Para qué sirve?
Sirve para unificar el tono de la piel, devolverle la luminosidad perdida y atenuar tanto manchas como rojeces faciales. Al calentar las capas profundas, estimula también la producción de nuevo colágeno, logrando un efecto "borrador" de las huellas del sol y del paso del tiempo.

### 3. ¿Qué patologías o afecciones mejora?
- **Manchas solares y léntigos:** Elimina la pigmentación superficial acumulada.
- **Rosácea y telangiectasias:** Sella los vasitos dilatados que causan rojeces constantes en mejillas y nariz.
- **Fotoenvejecimiento:** Revitaliza la piel apagada y engrosada.
- **Poros dilatados y marcas de acné:** Suaviza la textura irregular del cutis.

### 4. ¿Cómo es una sesión de IPL Facial?
1. **Preparación:** Limpieza profunda del rostro y colocación de gafas protectoras.
2. **Protección térmica:** Aplicación de un gel frío para el confort y la transmisión de la luz.
3. **Aplicación:** El equipo emite pulsos de luz rápidos; sentirás pequeños destellos de calor similares a un leve latigazo.
4. **Finalización:** Limpieza del gel, aplicación de cremas descongestivas y pantalla solar.

### 5. Consideraciones Clave

| Aspecto | Detalle Importante |
| :--- | :--- |
| **Duración** | Aproximadamente 20 a 30 minutos. |
| **Recuperación** | Sin tiempo de inactividad. Es normal un leve enrojecimiento pasajero. |
| **Restricción Solar** | Cuidarse estrictamente del sol 3 a 4 semanas antes y después. |
| **Resultados** | Tez más clara y uniforme, con protocolos de 3 a 5 sesiones anuales. |
`,

  "luz-pulsada-manos": `### 1. ¿Qué es la Luz Pulsada (IPL) para Manos?
Es una tecnología lumínica de amplio espectro enfocada específicamente en la piel del dorso de las manos. Esta zona revela nuestra edad y daño solar tanto o más que el rostro, y el IPL es el tratamiento de elección para renovarla.

### 2. ¿Para qué sirve?
Sirve para eliminar las clásicas "manchas de la edad" o pecas solares en las manos, unificando su color y mejorando la calidad y densidad de la piel al promover la regeneración del colágeno.

### 3. ¿Qué patologías o afecciones mejora?
- **Léntigos seniles y solares:** Las típicas manchas marrones redondas en el dorso.
- **Piel afinada o "de pergamino":** Mejora sutilmente la textura al inducir nuevo colágeno.
- **Discromías:** Tono irregular o envejecimiento prematuro por exposición crónica.

### 4. ¿Cómo es una sesión de IPL en Manos?
1. **Limpieza:** Se higieniza el dorso de ambas manos y se colocan lentes de seguridad.
2. **Gel frío:** Se distribuye el gel conductor para maximizar la eficacia del disparo.
3. **El tratamiento:** Se aplican los pulsos de luz sobre cada mancha y zona afectada; la molestia es muy breve y perfectamente tolerable.
4. **Cierre:** Retiro del gel y aplicación de crema hidratante regeneradora y bloqueador solar.

### 5. Consideraciones Clave

| Aspecto | Detalle Importante |
| :--- | :--- |
| **Duración** | Muy rápida, entre 10 y 15 minutos. |
| **Recuperación** | Las manchas se vuelven más oscuras (como borra de café) y caen a los 7-10 días. |
| **Restricción Solar** | Evitar la exposición solar y usar protector solar diario en las manos. |
| **Resultados** | Generalmente en 2 a 3 sesiones se logra la limpieza total de las manchas. |
`,

  "botox": `### 1. ¿Qué es el Botox (Toxina Botulínica)?
Es un tratamiento médico estético, neuromodulador, que se infiltra en músculos faciales específicos. Funciona relajando temporalmente la contracción muscular responsable de las arrugas dinámicas (las que se forman al gesticular).

### 2. ¿Para qué sirve?
Sirve para suavizar y prevenir las arrugas de expresión, logrando un rostro descansado y rejuvenecido sin perder la naturalidad. No rellena, sino que relaja la musculatura, evitando que la piel se quiebre o marque de manera permanente.

### 3. ¿Qué patologías o afecciones mejora?
- **Arrugas del tercio superior:** Patas de gallo, líneas de la frente y el entrecejo.
- **Bruxismo (Hipertrofia maseterina):** Alivia la tensión mandibular y afina el rostro.
- **Sonrisa gingival:** Relaja el labio superior para que no muestre exceso de encía al sonreír.
- **Hiperhidrosis:** Frena el exceso de sudoración en axilas, manos o pies.

### 4. ¿Cómo es una sesión de Botox?
1. **Evaluación dinámica:** Se te pedirá que gesticules (fruncir el ceño, sonreír, levantar las cejas) para marcar los puntos anatómicos precisos.
2. **Microinyecciones:** Utilizando una aguja extremadamente fina, se aplican pequeñas dosis en los puntos marcados. 
3. **Cierre:** La sesión es rápida y prácticamente indolora; sólo sentirás un leve pinchacito.
4. **Post-sesión:** Podés continuar con tu día normalmente, siguiendo unas pocas reglas simples para las primeras horas.

### 5. Consideraciones Clave

| Aspecto | Detalle Importante |
| :--- | :--- |
| **Duración** | Sesión de 15 a 20 minutos. |
| **Recuperación** | Inmediata. No acostarse ni hacer ejercicio intenso en las siguientes 4 horas. |
| **Efecto** | Comienza a notarse al 3er o 4to día, y el resultado final se ve a los 15 días. |
| **Duración del resultado** | Generalmente entre 4 y 6 meses, dependiendo del metabolismo y fuerza muscular. |
`,

  "dermapen-medico": `### 1. ¿Qué es el Dermapen Médico (Microneedling)?
Es un dispositivo en forma de lápiz equipado con microagujas estériles y ultrafinas que penetran la piel a una profundidad controlada. Estas micropunciones generan un estímulo mecánico que "engaña" al cuerpo para que repare el tejido creando nuevo colágeno.

### 2. ¿Para qué sirve?
Se utiliza para la inducción percutánea de colágeno y para facilitar la penetración de principios activos (vitaminas, ácido hialurónico, péptidos). Renueva la piel desde adentro, mejorando su textura, firmeza y calidad general.

### 3. ¿Qué patologías o afecciones mejora?
- **Marcas y cicatrices de acné:** Promueve el relleno natural del tejido deprimido.
- **Arrugas finas y líneas de expresión:** Suaviza la textura al tensar la piel.
- **Poros dilatados:** Ayuda a refinar el relieve cutáneo.
- **Estrías y cicatrices corporales:** Fomenta la regeneración del tejido dañado.
- **Alopecia:** Estimula el folículo capilar cuando se usa con activos específicos.

### 4. ¿Cómo es una sesión de Dermapen?
1. **Preparación:** Limpieza profunda y aplicación de anestesia tópica si se requiere profundidad médica.
2. **Aplicación de activos:** Se coloca un cóctel de vitaminas o ácido hialurónico sobre la zona.
3. **Micropunción:** Se desliza el Dermapen por el rostro. Sentirás una vibración y un leve raspado, pero no dolor.
4. **Calma:** Al finalizar, se coloca una mascarilla calmante para bajar el eritema (enrojecimiento).

### 5. Consideraciones Clave

| Aspecto | Detalle Importante |
| :--- | :--- |
| **Duración** | Alrededor de 30 a 45 minutos. |
| **Recuperación** | El rostro queda enrojecido por 24-48 hs (efecto similar a quemadura solar leve). |
| **Cuidados post** | Evitar maquillaje por 24 hs, no sudar en exceso y usar fotoprotección estricta. |
| **Resultados** | La piel se nota más luminosa a los pocos días, pero el colágeno nuevo tarda 3-4 semanas. |
`,

  "electrocoagulacion": `### 1. ¿Qué es la Electrocoagulación?
Es un procedimiento dermatológico menor que utiliza una corriente eléctrica de alta frecuencia para calentar y destruir selectivamente pequeñas lesiones benignas de la piel, cauterizando el vaso sanguíneo al mismo tiempo.

### 2. ¿Para qué sirve?
Es una forma precisa, rápida y segura de remover de la superficie cutánea aquellas excrecencias, verruguitas o lesiones que resultan antiestéticas o que sufren roce constante con la ropa o collares.

### 3. ¿Qué patologías o afecciones mejora?
- **Acrocordones:** Los típicos "lunares de carne" o fibromas laxos en cuello, axilas y pliegues.
- **Puntos rubí (angiomas seniles):** Esos pequeños puntos rojos formados por vasos dilatados.
- **Queratosis seborreicas pequeñas:** Lesiones marrones sobreelevadas benignas.
- **Hiperplasias sebáceas:** Pequeños agrandamientos de las glándulas sebáceas en el rostro.

### 4. ¿Cómo es una sesión de Electrocoagulación?
1. **Limpieza y antisepsia:** Se desinfecta la zona a tratar cuidadosamente.
2. **Anestesia:** Dependiendo de la lesión, puede aplicarse crema anestésica o un pequeño pinchazo de anestesia local para que no sientas nada.
3. **El procedimiento:** Con un pequeño electrobisturí o punta fina se toca la lesión, que se seca o vaporiza instantáneamente.
4. **Cierre:** Queda una pequeña costra oscura en el lugar, sobre la cual se puede aplicar crema antibiótica o reparadora.

### 5. Consideraciones Clave

| Aspecto | Detalle Importante |
| :--- | :--- |
| **Duración** | Depende de la cantidad de lesiones, entre 15 y 30 minutos. |
| **Recuperación** | Se forman micro-costras que caen solas en 5 a 10 días. |
| **Cuidados post** | No arrancar la costra, mantenerla hidratada y protegerla del sol para evitar que quede mancha. |
| **Resultados** | Eliminación definitiva de las lesiones tratadas. |
`,

  "limpieza-de-cutis": `### 1. ¿Qué es la Limpieza de Cutis Profunda?
Es un tratamiento cosmiátrico clínico fundamental para mantener la higiene y salud de la piel. Va mucho más allá de una rutina en casa, ya que utiliza técnicas e insumos profesionales para extraer impurezas desde el interior del poro y barrer células muertas.

### 2. ¿Para qué sirve?
Sirve para desobstruir los folículos, purificar el tejido, equilibrar el exceso de sebo y preparar la piel para que absorba correctamente cualquier principio activo (ya sea de tus cremas de uso diario o de tratamientos estéticos posteriores).

### 3. ¿Qué patologías o afecciones mejora?
- **Comedones y puntos negros:** Extracción de la acumulación de sebo oxidado.
- **Acné leve y congestión:** Ayuda a prevenir brotes al mantener el poro limpio.
- **Piel opaca o asfixiada:** Devuelve la luminosidad y frescura al tejido.
- **Textura irregular:** Alisa la piel dejándola suave al tacto.

### 4. ¿Cómo es una sesión de Limpieza de Cutis?
1. **Higiene superficial:** Desmaquillado y limpieza con emulsiones específicas para tu tipo de piel.
2. **Exfoliación:** Uso de scrubs o peelings enzimáticos para remover la capa córnea engrosada.
3. **Ablandamiento y extracción:** Se aplica un producto ablandador (a veces con vapor u ozono) y el profesional realiza la extracción manual cuidadosa de puntos negros y quistes de milium.
4. **Alta frecuencia:** Se pasa un electrodo que oxigena, cierra el poro y tiene efecto antibacteriano.
5. **Mascarilla y finalización:** Mascarilla calmante/hidratante, sérum y fotoprotección.

### 5. Consideraciones Clave

| Aspecto | Detalle Importante |
| :--- | :--- |
| **Duración** | Aproximadamente 60 minutos. |
| **Recuperación** | Puede haber leve enrojecimiento por la extracción que desaparece en horas. |
| **Frecuencia ideal** | Una vez al mes o cada cambio de estación, según indicación profesional. |
| **Resultados** | Piel inmediatamente más limpia, receptiva, luminosa y suave. |
`,

  "laser-luma-skin-reset": `### 1. ¿Qué es el Láser Luma Skin Reset?
Es nuestro tratamiento estrella de rejuvenecimiento fraccionado intensivo. Emplea tecnología láser avanzada para crear microcolumnas térmicas en la dermis profunda, dejando tejido sano alrededor para acelerar la curación. Literalmente "resetea" la piel.

### 2. ¿Para qué sirve?
Es la herramienta más poderosa para la renovación cutánea profunda. Sirve para formar colágeno y elastina de máxima calidad, reestructurando la piel desde sus cimientos para combatir el envejecimiento moderado a severo.

### 3. ¿Qué patologías o afecciones mejora?
- **Arrugas marcadas:** Alisa las líneas peribucales (código de barras) y perioculares.
- **Cicatrices profundas:** Excelente para secuelas de acné severas (cicatrices atróficas o en picahielo).
- **Flacidez cutánea:** Logra un tensado y mejora la laxitud de párpados y óvalo facial.
- **Fotodaño severo:** Renueva la textura áspera y engrosada típica del daño solar de años.

### 4. ¿Cómo es una sesión de Skin Reset?
1. **Anestesia:** Por ser un tratamiento profundo, se aplica crema anestésica fuerte 30-45 minutos antes.
2. **El láser:** El profesional realiza pases precisos sobre las áreas pautadas. Se siente calor y una sensación de "micro-pinchazos" intensos.
3. **Enfriamiento:** Se puede utilizar un sistema de aire frío simultáneo para maximizar el confort.
4. **Cierre:** Al terminar, la piel estará muy roja y caliente. Se aplican ungüentos reparadores específicos y geles fríos.

### 5. Consideraciones Clave

| Aspecto | Detalle Importante |
| :--- | :--- |
| **Duración** | Entre anestesia y procedimiento, aproximadamente 1 a 1.5 horas. |
| **Recuperación** | Requiere "downtime". Habrá enrojecimiento, inflamación y luego descamación intensa por 5 a 7 días. |
| **Cuidados post** | Hidratación constante con vaselina/cremas reparadoras. Cero sol. No pellizcar las costras. |
| **Resultados** | El colágeno se regenera a lo largo de 3 a 6 meses, logrando cambios espectaculares en firmeza y textura. |
`,

  "laser-velo-de-novia": `### 1. ¿Qué es el Láser Velo de Novia (Hollywood Peel)?
También conocido como "Carbon Peel", es un tratamiento láser innovador e indoloro que combina una loción de carbón activo con la energía del láser Q-Switch. Es el secreto de las alfombras rojas para una piel radiante al instante.

### 2. ¿Para qué sirve?
Sirve como un "shock" de belleza inmediato. El láser interactúa con el carbón pulverizando sus partículas, lo que arrastra células muertas, sebo e impurezas de los poros. Simultáneamente, el efecto térmico da un suave estímulo de colágeno.

### 3. ¿Qué patologías o afecciones mejora?
- **Piel opaca y sin vida:** Otorga una luminosidad y brillo ("glow") inmediato.
- **Poros dilatados y obstruidos:** Limpia y minimiza el tamaño del poro visiblemente.
- **Exceso de sebo:** Reduce la oleosidad y ayuda en el control del acné leve.
- **Tono irregular:** Suaviza manchas superficiales y empareja el color.

### 4. ¿Cómo es una sesión de Velo de Novia?
1. **Mascarilla de carbón:** Se aplica una capa fina de carbón activo líquido y se deja secar unos minutos para que penetre en los poros.
2. **El láser:** Se pasa el láser sobre el rostro. Escucharás pequeños "chasquidos" (es el láser vaporizando el carbón).
3. **Sensación:** Solo sentirás un ligero y agradable hormigueo o calorcito, pero es totalmente indoloro.
4. **Finalización:** Limpieza de cualquier resto y aplicación de pantalla solar. Estás lista para seguir con tu día.

### 5. Consideraciones Clave

| Aspecto | Detalle Importante |
| :--- | :--- |
| **Duración** | Unos 30 minutos en total. |
| **Recuperación** | Cero downtime. Podés maquillarte e ir a un evento inmediatamente después. |
| **Frecuencia** | Ideal para hacer días previos a una fiesta, o como mantenimiento mensual de la piel. |
| **Resultados** | Piel ultra suave, luminosa y con "efecto porcelana" instantáneo. |
`,

  "plasma-rico-en-plaquetas-cara": `### 1. ¿Qué es el Plasma Rico en Plaquetas (PRP) Facial?
Es un tratamiento de medicina regenerativa autólogo, lo que significa que utiliza tus propias células. Mediante una extracción de sangre, se aíslan y concentran las plaquetas (ricas en factores de crecimiento) para reinyectarlas en la piel.

### 2. ¿Para qué sirve?
Sirve para "despertar" a los fibroblastos de la piel. Los factores de crecimiento de tus propias plaquetas actúan como mensajeros biológicos que ordenan la producción masiva de nuevo colágeno, elastina y ácido hialurónico natural.

### 3. ¿Qué patologías o afecciones mejora?
- **Envejecimiento cronológico:** Combate la flacidez y el afinamiento de la piel.
- **Falta de vitalidad:** Restaura el brillo, la tersura y el color saludable de la tez.
- **Cicatrices y secuelas:** Favorece la reparación de tejidos dañados por acné o traumatismos.
- **Ojeras oscuras:** Mejora la vascularización y el grosor de la piel del contorno de ojos.

### 4. ¿Cómo es una sesión de PRP Facial?
1. **Extracción:** Como en un análisis de laboratorio, se extrae una pequeña cantidad de tu sangre.
2. **Centrifugado:** La sangre se coloca en una centrifugadora especial durante unos 10 minutos para separar el plasma rico en plaquetas de los glóbulos rojos.
3. **Aplicación:** Tras limpiar el rostro y usar anestesia tópica, el médico infiltra el plasma mediante microinyecciones por toda la cara.
4. **Cierre:** Al ser tu propio material biológico, no hay riesgo de alergia ni rechazo.

### 5. Consideraciones Clave

| Aspecto | Detalle Importante |
| :--- | :--- |
| **Duración** | Aproximadamente 45 a 60 minutos (incluyendo el proceso de sangre). |
| **Recuperación** | Posibilidad de pequeños hematomas (moretones) o leve hinchazón que bajan en 24-48 hs. |
| **Cuidados post** | No lavar la cara por unas horas, no hacer ejercicio intenso el mismo día. |
| **Resultados** | La piel se vuelve más densa y luminosa progresivamente a partir de los 20-30 días. |
`
}

for (const [slug, content] of Object.entries(treatments)) {
  const filePath = path.join(contentDir, `${slug}.md`)
  fs.writeFileSync(filePath, content)
  console.log(`Generated ${filePath}`)
}
