export function phoneMask(elem, startVaue = 7) {
  const input = elem;
  let maskOptions = {
    mask: `+{${String(startVaue)}} 000-000-00-00`,
    lazy: false,
  };

  return IMask(input, maskOptions);
}
