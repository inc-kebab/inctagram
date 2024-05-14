const dbName = 'draft_post'
let request: IDBOpenDBRequest
let db: IDBDatabase
let version = 1

export enum Stores {
  DRAFT_POST = 'draft_post',
}

export const initDB = (): Promise<boolean> => {
  return new Promise(resolve => {
    // open the connection
    request = indexedDB.open(dbName)

    request.onupgradeneeded = () => {
      db = request.result

      // if the data object store doesn't exist, create it
      if (!db.objectStoreNames.contains(Stores.DRAFT_POST)) {
        console.log('Creating draft_post store')
        db.createObjectStore(Stores.DRAFT_POST, { keyPath: 'id' })
      }
      // no need to resolve here
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

export const createDraftPost = <T>(storeName: string, data: T): Promise<boolean> => {
  return new Promise(resolve => {
    request = indexedDB.open(dbName, version)

    request.onsuccess = () => {
      console.log('Success - createDraftPost', data)
      db = request.result
      const tx = db.transaction(storeName, 'readwrite')
      const store = tx.objectStore(storeName)

      store.add(data)
      resolve(true)
    }

    request.onerror = () => {
      resolve(false)
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

export const deleteDB = (): Promise<boolean> => {
  return new Promise(resolve => {
    // again open the connection
    request = indexedDB.deleteDatabase(dbName)

    request.onsuccess = () => {
      resolve(true)
    }
    request.onerror = () => {
      resolve(false)
    }
  })
}
