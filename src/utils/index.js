export const GetIntialNameofUser = (name) => {
  return name
    ?.split(" ")
    ?.map((word) => word[0])
    ?.join("");
};

export const getRandomColor = (name) => {
  const colors = [
    "#FF5733",

    "#33FF57",
    "#3357FF",
    "#F333FF",
    "#33FFF3",
    "#FF33E3",
    "#33FFC3",
    "#FFC333",
    "#33C3FF",
    "#C3FF33",
  ];

  let hash = 0;
  for (let i = 0; i < (name?.length || 0); i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  const index = Math.abs(hash) % colors.length;
  return colors[index];
};

export const getFormatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();

  const diffMs = now - date; // difference in milliseconds
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  if (diffSeconds < 60) return "just now";
  if (diffMinutes < 60)
    return `${diffMinutes} minute${diffMinutes > 1 ? "s" : ""} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  if (diffDays < 30) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  if (diffMonths < 12)
    return `${diffMonths} month${diffMonths > 1 ? "s" : ""} ago`;
  return `${diffYears} year${diffYears > 1 ? "s" : ""} ago`;
};
