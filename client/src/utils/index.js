export const getInitials = (name) => {
  if (!name || typeof name !== "string") return "";

  const parts = name.split(" ");
  return parts.map((n)=> n[0]).join("").toUpperCase();
}

