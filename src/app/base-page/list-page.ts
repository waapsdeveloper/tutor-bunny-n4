import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Injector,
  OnInit,
  ViewChild,
} from '@angular/core';
import { BasePage } from './base-page';

export abstract class ListPage extends BasePage {

  search: string = ''; // Search query
  status: string = ''; // Optional filter for status
  page: number = 1; // Current page
  last_page: number = -1; // Last page
  list: any[] = []; // List of items
  loading: boolean = false; // Loading state
  infiniteScrollDisabled: boolean = false; // Disable infinite scroll when no more data

  constructor(protected injector: Injector) {
    super(injector);
  }

  /**
   * Abstract method for fetching the list from the API.
   * This should be implemented by derived classes.
   */
  abstract fetchList(page: number, search: string, status: string): Promise<any>;

  /**
   * Resets the list and fetches the first page.
   */
  resetAndFetch() {
    this.page = 1;
    this.last_page = -1;
    this.list = [];
    this.infiniteScrollDisabled = false;
    this.getList();
  }

  async getList(page: number = 1, search: string = this.search, status: string = this.status) {
    if (this.loading) return;

    this.loading = true;

    try {
      const res = await this.fetchList(page, search, status);

      console.log(res);

      const data = res;
      const list = data.list;

      // Update state
      this.list = page === 1 ? list : [...this.list, ...list];
      this.page = data.page;
      this.last_page = data.last_page;
      this.infiniteScrollDisabled = this.page >= this.last_page;
    } catch (error) {
      console.error('Error fetching list:', error);
    } finally {
      this.loading = false;
    }

    this.cdr.detectChanges();
  }

   /**
   * Handles the search functionality.
   */
   doSearch() {
    this.getList(1, this.search, this.status);
  }

  /**
   * Filters the list by status.
   */
  filterByStatus(status: string) {
    this.status = status;
    this.getList(1, this.search, this.status);
  }

  /**
   * Refreshes the list and resets pagination.
   */
  async handleRefresh(event: any) {
    this.resetAndFetch();
    event.target.complete();
  }

  /**
   * Handles infinite scroll.
   */
  async onIonInfinite(event: any) {
    if (this.loading || this.page >= this.last_page) {
      event.target.complete();
      return;
    }

    await this.getList(this.page + 1, this.search, this.status);
    event.target.complete();
  }


}
