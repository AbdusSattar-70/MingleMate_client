import { Users } from "./types";

export const exportToCSV = (userData: Users[]) => {
  // Header row for the CSV file
  const header = Object.keys(userData[0]).join(",");

  // Content rows for the CSV file
  const rows = userData.map((user) => Object.values(user).join(","));

  // Combine header and rows
  const csvData = `${header}\n${rows.join("\n")}`;

  // Create a Blob from the CSV data
  const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });

  // Create a download link and trigger the download
  const link = document.createElement("a");
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "userData.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
