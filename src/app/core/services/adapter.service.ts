export abstract class AdapterService<F, T> {
  abstract adapt(items: F): T;
}
