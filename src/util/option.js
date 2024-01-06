export const mdRehypeRewrite = (node) => {
  if (node.tagName === "h1") {
    node.properties.style =
      "font-size: 28px; font-weight: 700; border-bottom: none";
  }
  if (node.tagName === "h2") {
    node.properties.style =
      "font-size: 20px; font-weight: 700; border-bottom: none";
  }
  if (node.tagName === "h3") {
    node.properties.style =
      "font-size: 16px; font-weight: 700; border-bottom: none";
  }
  if (
    node.type === "text" &&
    typeof node.value === "string" &&
    node.value.slice(0, 3) === "&& "
  ) {
    node.value = node.value.slice(3);
    node.properties.style = "font-size: 12px; color: #858585";
  }
};
