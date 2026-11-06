// Persistência local das imagens de artefato usando IndexedDB.
//
// As imagens são guardadas como Blobs no banco do próprio navegador (fica no
// disco), então sobrevivem a reload, queda de conexão e fechar/reabrir a aba.
// Nada é enviado a nenhum servidor — é 100% local e offline.
//
// Cada registro guarda o id do artefato e a lista ordenada de Blobs.

const DB_NAME = 'case-nova-home-artifacts';
const STORE_NAME = 'images';
const DB_VERSION = 1;

interface StoredRecord {
  artifactId: string;
  blobs: Blob[];
}

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'artifactId' });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function tx(db: IDBDatabase, mode: IDBTransactionMode): IDBObjectStore {
  return db.transaction(STORE_NAME, mode).objectStore(STORE_NAME);
}

// Salva (ou substitui) a lista de blobs de um artefato.
export async function saveArtifactBlobs(artifactId: string, blobs: Blob[]): Promise<void> {
  const db = await openDb();
  try {
    await new Promise<void>((resolve, reject) => {
      const store = tx(db, 'readwrite');
      const record: StoredRecord =
        blobs.length === 0 ? { artifactId, blobs: [] } : { artifactId, blobs };
      const request = blobs.length === 0 ? store.delete(artifactId) : store.put(record);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } finally {
    db.close();
  }
}

// Remove todos os blobs de um artefato.
export async function deleteArtifactBlobs(artifactId: string): Promise<void> {
  const db = await openDb();
  try {
    await new Promise<void>((resolve, reject) => {
      const request = tx(db, 'readwrite').delete(artifactId);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } finally {
    db.close();
  }
}

// Carrega todos os artefatos salvos e converte os blobs em object URLs utilizáveis.
export async function loadAllArtifactImageUrls(): Promise<Record<string, string[]>> {
  const db = await openDb();
  try {
    const records = await new Promise<StoredRecord[]>((resolve, reject) => {
      const request = tx(db, 'readonly').getAll();
      request.onsuccess = () => resolve(request.result as StoredRecord[]);
      request.onerror = () => reject(request.error);
    });

    const result: Record<string, string[]> = {};
    for (const record of records) {
      if (record.blobs && record.blobs.length > 0) {
        result[record.artifactId] = record.blobs.map((blob) => URL.createObjectURL(blob));
      }
    }
    return result;
  } finally {
    db.close();
  }
}
