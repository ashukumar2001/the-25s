export const getNameInitials = (fullName: string) => {
  const nameArr = (fullName && fullName.split(" ")) || "";
  const nameArrLength = nameArr.length;
  return nameArrLength > 0
    ? `${nameArr[0].charAt(0)}${nameArrLength > 1 ? nameArr[1].charAt(0) : ""}`
    : "";
};
