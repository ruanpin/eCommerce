export function getUnfilledFields<T extends Record<string, any>>(object: T, container: string[] = []): string[] {
    Object.entries(object).forEach(([key, value]) => {
      if (!value) {
        container.push(key);
      }
    });
    return container;
}