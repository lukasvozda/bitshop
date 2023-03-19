export const blobFromFile = async () => {
  let input = <HTMLInputElement>document.getElementById("image");
  if (input && input.files && input.files[0]) {
    let ab = await input.files[0].arrayBuffer();
    return [[...new Uint8Array(ab)]];
  } else {
    return null;
  }
};
