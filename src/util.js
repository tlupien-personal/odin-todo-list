import allIcons from "./icons.json" assert { type: "json" };

const XMLNS = "http://www.w3.org/2000/svg";

const createIcon = function (iconName) {
  const iconData = allIcons[iconName];

  const icon = document.createElementNS(XMLNS, "svg");
  icon.setAttribute("xmlns", XMLNS);
  icon.setAttribute("viewBox", iconData.viewBox);

  const titleElement = document.createElementNS(XMLNS, "title");
  titleElement.innerText = iconData.title;

  const pathElement = document.createElementNS(XMLNS, "path");
  pathElement.setAttribute("d", iconData.path);

  icon.appendChild(titleElement);
  icon.appendChild(pathElement);
  return icon;
};

export { createIcon };
