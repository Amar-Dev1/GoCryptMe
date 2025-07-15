export const isNew = () => {
  // const vault = JSON.parse(localStorage.getItem("vault")!);
  // return !!vault;
  return !localStorage.getItem("masterKeyCheck")
};
