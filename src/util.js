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

const createPriorityIcon = function (n) {
  const div = document.createElement("div");
  div.classList.add("priority-icon");
  div.classList.add(`priority-${n}`);
  for (let i = 0; i < -1 * (n - 4); i++) {
    const icon = createIcon("priority");
    div.appendChild(icon);
  }
  return div;
};

const createIconButton = function (iconName, className, callback) {
  const button = document.createElement("div");
  button.classList.add("icon-btn");
  button.classList.add(className);
  const icon = createIcon(iconName);
  button.appendChild(icon);
  button.addEventListener("click", callback);
  return button;
};

export { createPriorityIcon, createIconButton };
