# Reto Técnico: Procesamiento de Transacciones Bancarias (CLI)

## Introducción
Este proyecto es una aplicación de línea de comandos (CLI) desarrollada en Node.js como parte de un reto para procesar transacciones bancarias desde un archivo CSV. El propósito es practicar lectura de archivos, manipulación de datos, cálculos simples y salida formateada en consola en Javascript(Node.js).

## Instrucciones de Ejecució
### Requisitos
- Node.js instalado
- Archivo CSV con estructura:
```csv
id,tipo,monto
1,Crédito,100.00
2,Débito,50.00
3,Crédito,200.00
4,Débito,75.00
5,Crédito,150.00
```

### Instalación

1. Clona o haz un fork del repositorio:
```bash
git clone https://github.com/KarinaMacedo13/interbank-academy-25.git
cd interbank-academy-25
```

### Ejecución

Para ejecutar se necesita insertar el csv en la carpeta y llamar a su nombre por ejemplo:

```bash
node app.js data.csv
```

## Enfoque y Solución
El programa lee un archivo CSV línea por línea utilizando `readline`, y va acumulando el balance neto según el tipo de transacción (Crédito o Débito). Se utiliza `parseFloat` para convertir los montos a números, y se almacena la transacción de mayor monto usando una comparación directa. El resultado se muestra en consola.

### Decisiones técnicas:
- Se usó `readline` para eficiencia y bajo consumo de memoria.
- Se ignoró la primera línea del CSV usando una bandera (`encabezadoCSV = true`).

## Estructura del Proyecto

| Archivo               | Propósito |
|----------------------|-----------|
| `app.js`             | Lógica principal del CLI que procesa el CSV |
| `transacciones.csv`  | Archivo de ejemplo con datos de prueba |
| `README.md`          | Documentación del proyecto |
