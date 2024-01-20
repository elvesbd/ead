export class UrlValidator {
  public static isValid(value: string) {
    try {
      const url = new URL(value);
      return url.protocol !== 'about:';
    } catch (error) {
      return false;
    }
  }
}
