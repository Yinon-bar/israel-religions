const STORAGE_KEY = "hebrew-return-poll";

export function readPoll() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return { votes: { sheela: 0, teshuva: 0 }, myVote: null };
  try {
    return JSON.parse(raw);
  } catch {
    return { votes: { sheela: 0, teshuva: 0 }, myVote: null };
  }
}

export function writePoll(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}
