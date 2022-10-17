import { DBSchema, IDBPDatabase, openDB } from "idb";
import { v4 as uuidv4 } from 'uuid';

export type Block = {
  localId: string;
  body: string;
  createdAt: Date;
}

interface ListsDB extends DBSchema {
  blocks: {
    value: Block;
    key: string;
  }
}

let _db: Promise<IDBPDatabase<ListsDB>> | null = null;

export function getDb() {
  if (_db) {
    return _db;
  }

  _db = openDB<ListsDB>("lists-db", 1, {
    upgrade(db, oldVersion, newVersion) {
      if (oldVersion < 1) {
        db.createObjectStore("blocks", {
          keyPath: "localId",
        });
      }
    },
  });

  return _db;
}

export async function addBlock(value: Partial<Block>) {
  const db = await getDb();

  const localId = uuidv4();
  const date = new Date();
  const addedBlock = { ...value, localId, createdAt: date } as Block;
  await db.add("blocks", addedBlock);
  return addedBlock;
}

export async function getAllBlocks() {
  const db = await getDb();
  return db.getAll("blocks");
}