export class SessionUtils {
  static setItem(key: string, item: any): void {
    sessionStorage.setItem(key, item);
  }
  static getItem(key: string): any {
    const value = sessionStorage.getItem(key) as any;
    try {
      return JSON.parse(value);
    } catch (error) {
      return value;
    }
  }
  static removeItem(key: string): void {
    sessionStorage.removeItem(key);
  }
  static clearItems(): void {
    sessionStorage.clear();
  }
}
