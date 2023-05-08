import { Dispatch, SetStateAction } from "react";

export const useSyncAndSet = <T>(name: string, setter: Dispatch<SetStateAction<T>>) => {
  return async (value: T) => {
    setter(value);
    await chrome.storage.sync.set({ [name]: value });
  };
};

export const getFromStorage = async <T>(name: string, defaultValue: T) => {
  return (await chrome.storage.sync.get({ [name]: defaultValue }))[name] as T;
}

