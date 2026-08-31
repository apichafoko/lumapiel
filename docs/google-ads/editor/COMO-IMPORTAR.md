# Cargar las campañas con Google Ads Editor

Cuenta destino: **242-411-7364 — Luma Piel** (urifrai@gmail.com)

> Los montos están en ARS calculados a **1 USD = 1530 ARS** (confirmado el 30/08/2026).
> Si el tipo de cambio se mueve mucho, avisá y regenero `1-campanas.csv` y `2-grupos.csv`.
> Los otros cuatro archivos no dependen del tipo de cambio.

## Preparación

1. Descargá Google Ads Editor: <https://ads.google.com/intl/es_ar/home/tools/ads-editor/>
2. Abrilo, **Iniciar sesión** con `urifrai@gmail.com`
3. Elegí la cuenta **242-411-7364 Luma Piel** y esperá a que descargue

## Importación

Para cada archivo, en este orden exacto:

> **Cuenta → Importar → Desde archivo…** → elegí el CSV → **Procesar** → revisá el resumen → **Finalizar y revisar cambios** → **Conservar**

| # | Archivo | Qué crea |
| --- | --- | --- |
| 1 | `1-campanas.csv` | Las 4 campañas, en pausa |
| 2 | `2-grupos.csv` | Los 12 grupos con su CPC máximo |
| 3 | `3-keywords.csv` | 123 keywords con su URL final |
| 4 | `4-negativos.csv` | 528 negativos (los 132 en cada campaña) |
| 5 | `5-anuncios.csv` | 12 anuncios adaptables |
| 6 | `6-ubicaciones.csv` | Barrios con ajuste de puja |

**El orden importa:** los grupos necesitan que la campaña exista, las keywords que el grupo exista, y así.

## Publicar

Cuando los seis estén importados, botón **Publicar** arriba a la derecha.
Las campañas suben **en pausa**: no gastan nada.

## Después de publicar — lo que Editor no hace

Estas cuatro cosas hay que tocarlas en la web (`ads.google.com`):

1. **Opciones de ubicación → "Presencia"**
   Configuración de cada campaña → Ubicaciones → Opciones de ubicación →
   *"Personas que se encuentran o visitan periódicamente tus ubicaciones"*.
   El valor por defecto de Google es *"presencia o interés"*, que muestra los
   anuncios a alguien en Bogotá googleando "láser para manchas Buenos Aires".
   **Es el ajuste que más plata salva de todos.**

2. **Socios de búsqueda → desactivado**
   Configuración de cada campaña → Redes.

3. **Ajustes de demografía**
   Mujer +15 %, Hombre −35 %, Desconocido 0 %.
   Edad: 18-24 −35 %, 35-44 +15 %, 45-54 +15 %, 65+ −40 %.
   **Excepción:** en AG7 (onicomicosis) y AG9 (hiperhidrosis, bruxismo) no bajes
   a los hombres — esas consultas se reparten parejo.

4. **Horario:** todos los días 08:00–22:00.

## Antes de despausar

- [ ] Los cuatro ajustes de arriba aplicados
- [ ] Verificar que las conversiones registran (ya probado en producción el 30/08)
- [ ] Cargar fondos (hasta que el saldo sea > 0, nada se sirve)

## Verificación

Cuando publiques, avisame y reviso desde el navegador que las 4 campañas hayan
quedado bien: negativos aplicados, URLs correctas, anuncios aprobados.
