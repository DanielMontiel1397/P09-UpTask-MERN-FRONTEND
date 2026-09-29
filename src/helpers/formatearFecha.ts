export function formatDate(dateString: string): string {
    const date = new Date(dateString);

    const day = new Intl.DateTimeFormat("es-MX", {
        day: "2-digit",
    }).format(date);

    const month = new Intl.DateTimeFormat("es-MX", {
        month: "long",
    }).format(date);

    const year = new Intl.DateTimeFormat("es-MX", {
        year: "numeric",
    }).format(date);

    const time = new Intl.DateTimeFormat("es-MX", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    }).format(date);

    return `${day} de ${month} del ${year} a las ${time}`;
}