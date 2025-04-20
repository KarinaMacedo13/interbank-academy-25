// Se importa los módulos necesarios
const fs = require('fs'); // Módulo para leer archivos del sistema
const readline = require('readline'); // Módulo para leer el archivo línea por línea
const path = require('path'); // Módulo para manejar las rutas de los archivos

// Función que procesará el archivo
function procesarTransacciones(CSVArchivo) {
  //Se declara la ruta del archivo para evaluar
  const ruta = path.resolve(__dirname,CSVArchivo); //_dirname, variable de node que contiene la ruta absoluta del archivo actual

  // Se declara la interfaz para leer el archivo linea por linea
  const lector = readline.createInterface({
    input: fs.createReadStream(ruta),
    crlfDelay: Infinity // Compatibilidad para los saltos de línea en cualquier sistema
  });

  // Se declara las variables para el programa
  let balance = 0;
  let conteoTransacciones = { 'Crédito': 0, 'Débito': 0 };
  let transaccionMayorMonto = { id: null, monto: 0 };
  let encabezadoCSV = true;

  // Evento que salta el encabezado del CSV
  lector.on('line', (linea) => {
    if (encabezadoCSV) {
      encabezadoCSV = false;
      return;
    }

    // Se divide las columnas
    const [id, tipo, montoString] = linea.split(',');
    const monto = parseFloat(montoString); // Se convierte el texto a número

    // Se cuenta la transacción según el tipo ya sea Crédito o Débito
    conteoTransacciones[tipo] = (conteoTransacciones[tipo] || 0) + 1;

    // Se calcula el balance según el tipo de transacción donde se (+=) Crédito (-=) Débito
    if (tipo === 'Crédito') balance += monto;
    if (tipo === 'Débito') balance -= monto;

    // Se verifica si esta es la transacción de mayor monto hasta el momento
    if (monto > transaccionMayorMonto.monto) {
      transaccionMayorMonto = { id, monto };
    }
  });

  // Evento que se dispara cuando se termina de leer el archivo
  lector.on('close', () => {
    console.log('\n========================================');
    console.log('Reporte de Transacciones');
    console.log('----------------------------------------');
    console.log(`Balance Final: ${balance.toFixed(2)}`);
    console.log(`Transacción de Mayor Monto: ID ${transaccionMayorMonto.id} - ${transaccionMayorMonto.monto.toFixed(2)}`);
    console.log(`Conteo de Transacciones: \n -Crédito: ${conteoTransacciones['Crédito']} \n -Débito: ${conteoTransacciones['Débito']}`);
    console.log('========================================');
  });
}

// Entrada para la línea de comandos
if (process.argv.length < 3) {
  // Si no se pasa archivo como argumento, mostrar uso correcto
  console.log('Porfavor, indiue el nombre del archivo de la siguiente manera: node app.js <ejemplo_transacciones.csv>');
} else {
  // Ejecutar la función con el archivo especificado
  procesarTransacciones(process.argv[2]);
}