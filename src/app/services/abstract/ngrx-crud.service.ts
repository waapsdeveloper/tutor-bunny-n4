import {
  NgSimpleStateBaseRxjsStore,
  NgSimpleStateStoreConfig,
} from 'ng-simple-state'; // Adjust imports as needed

export interface BasePaginationModel<T> {
  page: number;
  last_page: number;
  list: T[];
  total: number;
}
export abstract class NgrxCrudService<T> extends NgSimpleStateBaseRxjsStore<BasePaginationModel<T>> {

  abstract ngrxModelName: string;

  storeConfig(): NgSimpleStateStoreConfig {
    return {
      storeName: this.ngrxModelName,
    };
  }

  initialState(): BasePaginationModel<T> {
    return {
      page: 1,
      last_page: -1,
      list: [],
      total: 0,
    };
  }

  getList() {
    return this.selectState((state) => state.list);
  }

  getListPromise(): Promise<T[]> {
    return new Promise((resolve) => {
      this.selectState((state) => state.list).subscribe((list) => {
        resolve(list);
      });
    });
  }

  getItem(id: number | string) {
    return this.selectState((state) =>
      state.list.find((x: any) => x.id == id)
    );
  }

  getItemPromise(id: number | string): Promise<T | undefined> {
    return new Promise((resolve) => {
      this.selectState((state) =>
        state.list.find((x: any) => x.id == id)
      ).subscribe((data) => {
        resolve(data);
      });
    });
  }

  getCount() {
    return this.selectState((state) => state.list.length);
  }

  getCountPromise(): Promise<number> {
    return new Promise((resolve) => {
      this.selectState((state) => state.list.length).subscribe((res) => {
        resolve(res);
      });
    });
  }

  getStatPromise() {
    return new Promise((resolve) => {
      this.selectState((state) => state).subscribe((res) => {
        let obj = {
          page: res.page,
          last_page: res.last_page,
          total: res.total
        }
        resolve(obj);
      });
    });
  }

  setItem(obj: T) {
    this.setState((state) => {
      const exists = state.list.some((item: any) => item['id'] === obj['id']);
      if (exists) {
        return {
          ...state,
          list: state.list.map((item: any) =>
            item['id'] === obj['id'] ? obj : item
          ),
        };
      } else {
        return {
          ...state,
          list: [obj, ...state.list],
        };
      }
    });
  }

  setPage(page: number){
    this.setState((state) => {
      return {
        ...state,
        page: page,
      };
    });
  }

  setLastPage(lastPage: number){
    this.setState((state) => {
      return {
        ...state,
        last_page: lastPage,
      };
    });
  }

  setTotal(total: number){
    this.setState((state) => {
      return {
        ...state,
        total: total,
      };
    });
  }

  setList(list: T[], page: number, lastPage: number, total: number) {
    this.setState((state) => ({
      ...state,
      page,
      last_page: lastPage,
      total,
      list: page === 1 ? list : [...state.list, ...list], // Append or replace list based on the page
    }));
  }

  removeItem(id: number | string) {
    this.setState((state) => {
      return {
        ...state,
        list: state.list.filter((x: any) => x.id != id),
      };
    });

  }

  isItemExist(key, value){
    return this.selectState(
      (state) => state.list.filter((item: any) => item[key] === value).length
    );
  }
}
