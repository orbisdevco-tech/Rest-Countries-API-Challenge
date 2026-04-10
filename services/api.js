const cache = new Map();

export const API = {
  getCountries: async () => {
    if (cache.has("countries")) return cache.get("countries");
    const res = await fetch("/data.json");
    const text = await res.text();
    return JSON.parse(text);
  },
};
