const API_BASE = "http://127.0.0.1:5000";

export const getUserAggregate = async () => {
  const resp = await fetch(`${API_BASE}/aggregate/user`);
  if (!resp.ok) throw new Error("Failed to fetch user aggregate");
  return await resp.json();
};

export const getSessions = async () => {
  const resp = await fetch(`${API_BASE}/sessions`);
  if (!resp.ok) throw new Error("Failed to fetch sessions");
  return await resp.json();
};
