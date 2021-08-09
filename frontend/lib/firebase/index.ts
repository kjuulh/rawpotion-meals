export const useIfFirebase = (func: () => void, elseDo?: () => void) =>
  process.env.NEXT_PUBLIC_USE_FIREBASE === "true" ? func() : elseDo();

export const usingFirebase = process.env.NEXT_PUBLIC_USE_FIREBASE === "true";
