/**
 * @deprecated
 * Needs to be deleted with Database provider
 */
export class SqliteBooleanDeserializer {
    public fromDb(storedValue: string): boolean {
        return storedValue == 'true' ? true : false;
    }
}