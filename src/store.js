import { create } from "zustand";

export const useStore = create((set) => {
  return {
    loggedIn: false,
    user: null,
    isFirstVisit: true,
    setFirstVisit: (value) => set({ isFirstVisit: value }),
    setUser: (user) => {
      if (user) {
        set({ user, loggedIn: true });
      } else {
        set({ user: null, loggedIn: false });
      }
    },
    setSpecialities: (specialities) => set({ specialities }),
  };
});
