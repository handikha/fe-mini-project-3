export default function formatDate(date) {
    const dateObj = new Date(date);
    const options = { month: "long", day: "numeric", year: "numeric" };
    return dateObj.toLocaleString("en-US", options);
}
