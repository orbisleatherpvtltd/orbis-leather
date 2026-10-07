const photoIds = [
  "1531310197839-ccf54634509e",
  "1521572163474-6864f9cf17ab",
  "1551028719-00167b16eac5",
  "1553062407-98eeb64c6a62",
  "1520975916090-3105956dac38",
] as const;

export function dummyImage(index: number, width = 1200) {
  const id = photoIds[index % photoIds.length];
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=80`;
}

/** Editorial model/lifestyle photography (people wearing leather), for hero and lookbook-style sections. */
const lifestylePhotoIds = [
  "1778566055286-c05172755d21",
  "1771736822504-1c7130066984",
  "1786053309446-c77319070c89",
  "1647202197438-dec885ca64d3",
  "1511280303142-0051e93baeeb",
] as const;

export function lifestyleImage(index: number, width = 1600) {
  const id = lifestylePhotoIds[index % lifestylePhotoIds.length];
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=80`;
}
