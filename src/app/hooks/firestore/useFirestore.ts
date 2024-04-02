import { useCallback, useEffect, useRef } from "react";
import { GenericActions } from '../../store/genericSlice';
import { useAppDispatch } from "../../../app/store/store";
import { DocumentData, collection, deleteDoc, doc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { db } from '../../config/firebase';
import { toast } from "react-toastify";

type ListnerState = {
  name?: string;
  unsubscribe: () => void;
};

export const useFireStore = <T extends DocumentData>(path: string) => {
  const listnersRef = useRef<ListnerState[]>([]);

  useEffect(() => {
    let listnerRefValue: ListnerState[] | null = null;

    if (listnersRef.current) {
      listnerRefValue = listnersRef.current;
    }
    return () => {
      if (listnerRefValue) {
        listnerRefValue.forEach(listner => {
          listner.unsubscribe();
        });
      }
    };
  }, []);

  const dispatch = useAppDispatch();

  const loadCollection = useCallback((actions: GenericActions<T>) => {
    dispatch(actions.loading());

    const query = collection(db, path);

    const listener = onSnapshot(query, {
      next: querySnapshot => {
        const data: DocumentData[] = [];
        if (querySnapshot.empty) {
          dispatch(actions.success([] as unknown as T));
          return;
        }
        querySnapshot.forEach(doc => {
          data.push({ id: doc.id, ...doc.data() });
        });
        dispatch(actions.success(data as unknown as T));
      },
      error: error => {
        dispatch(actions.error(error.message));
        console.log('Collection error:', error.message);
      }
    });
    listnersRef.current.push({ name: path, unsubscribe: listener });

  }, [dispatch, path]);

  const loadDocument = useCallback((id: string, actions: GenericActions<T>) => {
    dispatch(actions.loading());
    const docRef = doc(db, path, id);

    const listener = onSnapshot(docRef, {
      next: doc => {
        if (!doc.exists) {
          dispatch(actions.error('Document does not exist'));
          return;
        }
        dispatch(actions.success({ id: doc.id, ...doc.data() } as unknown as T));
      },
    });
    listnersRef.current.push({ name: path + '/' + id, unsubscribe: listener });
  }, [dispatch, path]);

  const create = async (data: T) => {
    try {
      const ref = doc(collection(db, path));
      await setDoc(ref, data);
      return ref;
    } catch (err: any) {
      console.log(err);
      toast.error(err.message);
    }
  };

  const update = async (id: string, data: T) => {
    const docRef = doc(db, path, id);
    try {
      return await updateDoc(docRef, data);
    } catch (err: any) {
      console.log(err);
      toast.error(err.message);
    }
  };

  const remove = async (id: string) => {
    try {
      return await deleteDoc(doc(db, path, id));
    } catch (err: any) {
      console.log(err);
      toast.error(err.message);
    }
  };

  const set = async (id: string, data: any) => {
    try {
      return await setDoc(doc(db, path, id), data);
    } catch (err: any) {
      console.log(err);
      toast.error(err.message);
    }
  };
  return { loadCollection, loadDocument, create, update, remove, set };
};