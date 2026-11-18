import { getBatch } from './batch-data.js';

const key = 'upbeat.workspace.v1';
const initial = () => ({
  requests: [],
  profile: { displayName: '', contact: 'No preference', learning: 'No preference' },
});

// Staff-managed records can be supplied by an approved backend.
export const academicRecords = {
  confirmedBatchIds: [],
  attendance: [],
  notes: [],
  invoices: [],
  payments: [],
};

export function readWorkspace() {
  try {
    const stored = JSON.parse(localStorage.getItem(key));
    const data = initial();
    if (!stored || typeof stored !== 'object') return data;
    if (Array.isArray(stored.requests)) {
      data.requests = [
        ...new Map(
          stored.requests
            .filter(
              (record) => record && getBatch(record.batchId) && typeof record.createdAt === 'string',
            )
            .map((record) => [record.batchId, record]),
        ).values(),
      ];
    }
    for (const [field, fallback] of Object.entries(data.profile)) {
      const value = stored.profile?.[field];
      data.profile[field] = typeof value === 'string' ? value.slice(0, 80) : fallback;
    }
    return data;
  } catch {
    return initial();
  }
}

function mutateWorkspace(update) {
  if (navigator.locks) return navigator.locks.request(key, update);
  return Promise.resolve().then(update);
}

export function saveRequest(batchId) {
  return mutateWorkspace(() => {
    if (!getBatch(batchId)) return 'invalid';
    const data = readWorkspace();
    if (
      data.requests.some((request) => request.batchId === batchId) ||
      academicRecords.confirmedBatchIds.includes(batchId)
    )
      return 'duplicate';
    data.requests.push({ batchId, createdAt: new Date().toISOString() });
    localStorage.setItem(key, JSON.stringify(data));
    return 'saved';
  });
}

export function saveProfile(profile) {
  return mutateWorkspace(() =>
    localStorage.setItem(key, JSON.stringify({ ...readWorkspace(), profile })),
  );
}

export function resetWorkspace() {
  return mutateWorkspace(() => localStorage.removeItem(key));
}

export function studentBatches(data) {
  const records = new Map(data.requests.map((request) => [request.batchId, 'Request saved locally']));
  for (const id of academicRecords.confirmedBatchIds) records.set(id, 'Confirmed');
  return [...records]
    .filter(([id]) => getBatch(id))
    .map(([id, status]) => ({ batch: getBatch(id), status }));
}
