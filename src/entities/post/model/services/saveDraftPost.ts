export enum Stores {
  DRAFT_POST = 'draft_post',
}

const dbName = Stores.DRAFT_POST
let request: IDBOpenDBRequest
let db: IDBDatabase
let version = 1

export const initDB = (): Promise<boolean> => {
  return new Promise(resolve => {
    request = indexedDB.open(dbName)

    request.onupgradeneeded = () => {
      db = request.result

      if (!db.objectStoreNames.contains(Stores.DRAFT_POST)) {
        console.log('Creating draft_post store')
        db.createObjectStore(Stores.DRAFT_POST, { keyPath: 'id' })
      }
    }

    request.onsuccess = () => {
      console.log(`Success - initDB v${version}`)
      db = request.result
      version = db.version
      resolve(true)
    }

    request.onerror = () => {
      resolve(false)
    }
  })
}

export const clearDB = (storeName: Stores): Promise<boolean> => {
  return new Promise(resolve => {
    request = indexedDB.open(dbName)

    request.onsuccess = () => {
      console.log('Success - clearDB')
      db = request.result
      const tx = db.transaction(storeName, 'readwrite')
      const store = tx.objectStore(storeName)

      store.delete(storeName)
      resolve(true)
    }
    request.onerror = () => {
      resolve(false)
    }
  })
}

export const getStoreData = <T>(storeName: Stores): Promise<T[]> => {
  return new Promise(resolve => {
    request = indexedDB.open(dbName)

    request.onsuccess = () => {
      console.log('Success - getStoreData')
      db = request.result
      const tx = db.transaction(storeName, 'readonly')
      const store = tx.objectStore(storeName)
      const res = store.getAll()

      res.onsuccess = () => {
        resolve(res.result)
      }
    }
  })
}

export const updateDraftPost = <T>(storeName: string, data: T): Promise<boolean> => {
  return new Promise(resolve => {
    request = indexedDB.open(dbName, version)

    request.onsuccess = () => {
      console.log('Success - updateDraftPost', data)
      db = request.result
      const tx = db.transaction(storeName, 'readwrite')
      const store = tx.objectStore(storeName)

      store.put(data)
      resolve(true)
    }

    request.onerror = () => {
      resolve(false)
    }
  })
}
