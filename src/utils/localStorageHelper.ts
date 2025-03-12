class LocalStorageHelper {
    static set<T>(key: string, value: T): void {
      if (typeof window === 'undefined') return;
  
      try {
        const serializedValue = JSON.stringify(value);
        localStorage.setItem(key, serializedValue);
      } catch (error) {
        console.error(`Error saving key "${key}" to localStorage:`, error);
      }
    }
  
    static get<T>(key: string): T | null {
      if (typeof window === 'undefined') return null; // 確保只在瀏覽器執行
  
      try {
        const item = localStorage.getItem(key);
        if (item === null) return null;
  
        const parsedValue = LocalStorageHelper.safeJsonParse<T>(item);
        return parsedValue !== undefined ? parsedValue : (item as T);
      } catch (error) {
        console.error(`Error reading key "${key}" from localStorage:`, error);
        return null;
      }
    }
  
    static remove(key: string): void {
      if (typeof window === 'undefined') return;
  
      try {
        localStorage.removeItem(key);
      } catch (error) {
        console.error(`Error removing key "${key}" from localStorage:`, error);
      }
    }
  
    private static safeJsonParse<T>(value: string): T | undefined {
      try {
        const parsed = JSON.parse(value);
  
        // 如果是數字字串（例如 "123"），應該轉為數字
        if (typeof parsed === 'string' && !isNaN(Number(parsed))) {
          return Number(parsed) as T;
        }
  
        return parsed as T;
      } catch {
        return undefined; // 解析失敗時回傳 undefined
      }
    }
}
  
  
export default LocalStorageHelper;