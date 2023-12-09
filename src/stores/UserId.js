import { create } from "zustand";

const useUserId = create((set) => ({
  userId: "",
  setUserId: (newUserId) => set(() => ({ userId: newUserId })),
}));

const element = 10;

export default useUserId;
