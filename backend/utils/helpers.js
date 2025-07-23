// Funções utilitárias para tratar dados do Excel
export function excelDateToJSDate(serial) {
  if (!serial || isNaN(serial)) return null; //evita erros
  const utcDays = Math.floor(serial - 25569); // Ajusta calendário Excel
  const utcValue = utcDays * 86400; // Converte para segundos
  const dateInfo = new Date(utcValue * 1000);
  const day = String(dateInfo.getDate()).padStart(2, "0");
  const month = String(dateInfo.getMonth() + 1).padStart(2, "0");
  const year = dateInfo.getFullYear();
  return `${day}-${month}-${year}`; // Retorna data como string "DD-MM-YYYY"
}

export function excelTimeToHHMMSS(value) {
  if (!value || isNaN(value)) return null;
  const totalSeconds = Math.floor(value * 24 * 60 * 60);
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(
    2,
    "0"
  );
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`; // Retorna no formato "HH:MM:SS"
}
