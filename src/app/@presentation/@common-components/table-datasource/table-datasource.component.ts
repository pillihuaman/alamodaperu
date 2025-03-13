import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbIconModule, NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder, NbTreeGridModule } from '@nebular/theme';
import { GeneralConstans } from '../../../utils/generalConstant';
import { NebularSharedModule } from '../../../@domain/nebular-shared.module';
import { AppTableDatasourceCustomComponent } from '../app-table-datasource-custom/app-table-datasource-custom.component';
import { TableDatasourceCustomComponent } from '../table-datasource-custom/table-datasource-custom.component';

interface TreeNode<T> {
  data: T;
  children?: TreeNode<T>[];
  expanded?: boolean;
}

interface FSEntry {
  name: string;
  size: string;
  kind: string;
  items?: number;
}

@Component({
  selector: 'app-table-datasource',
  standalone: true,
  imports: [CommonModule, NebularSharedModule, NbTreeGridModule,NbIconModule,TableDatasourceCustomComponent],
  templateUrl: './table-datasource.component.html',
  styleUrls: ['./table-datasource.component.scss']
})
export class TableDatasourceComponent implements OnInit, OnChanges {
  @Input() defaultColumns: any[] = [];
  @Input() datas: any;
  @Input() typeOfSearch?: string;
  @Input() isdelelete: any;
  @Input() hasMorePages: boolean = true;
  @Output() pageChange = new EventEmitter<number>();
  @Output() pageSizeChange = new EventEmitter<number>();
  @Output() dataChange = new EventEmitter<TreeNode<any>[]>();
  @Output() deleteAction = new EventEmitter<TreeNode<any>>();
  @Output() editAction = new EventEmitter<TreeNode<any>>();

  allColumns = ['acciones', ...this.defaultColumns];
  dataSource: NbTreeGridDataSource<any>;
  filteredDataSource: any[] = [];
  sortColumn?: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;

  pageSize = GeneralConstans.pageSizeTable;
  currentPage = GeneralConstans.currentPageTable;
  paginator = 1;
  paginatedData: TreeNode<any>[] = [];
  initialData: any[] = [];
  additionalData: any[] = [];
  showTable = false;
  showTableCustom = false;
  defaultColumnsBySearchType: any = [];
  datasBySearchType: any;
  searchTerm: string = '';

  constructor(private dataSourceBuilder: NbTreeGridDataSourceBuilder<any>) {
    this.datas = [...this.initialData, ...this.additionalData];
    this.dataSource = this.dataSourceBuilder.create(this.datas);
    this.filteredDataSource = this.datas;
  }

  ngOnInit(): void {
    this.buildTable();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['defaultColumns'] || changes['datas']) {
      this.allColumns = [...this.defaultColumns];

      if (!changes['datas'].isFirstChange()) {
        if (changes['datas'].currentValue?.length > 0) {
          if (this.typeOfSearch === GeneralConstans.typeSearchEspecific) {
            this.showTableCustom = true;
            this.showTable = false;
            this.additionalData = [];
            this.defaultColumnsBySearchType = this.defaultColumns;
            this.datasBySearchType = this.datas;
          } else {
            this.showTableCustom = false;
            this.showTable = true;
            if (this.isdelelete?.data === undefined) {
              this.additionalData = [...changes['datas'].currentValue];
            } else {
              this.additionalData = [...this.additionalData, ...changes['datas'].currentValue];
            }
            this.datas = [...this.initialData, ...this.additionalData];
            this.dataSource = this.dataSourceBuilder.create(this.datas);
            this.buildTable();
          }
        } else {
          if (this.typeOfSearch === GeneralConstans.typeSearchDefault) {
            this.showTableCustom = false;
            this.showTable = true;
            this.additionalData = [...this.additionalData, ...changes['datas'].currentValue];
            this.datas = [...this.initialData, ...this.additionalData];
            this.dataSource = this.dataSourceBuilder.create(this.datas);
            this.buildTable();
            this.hasMorePages = false;
          } else {
            this.defaultColumnsBySearchType = this.defaultColumns;
            this.datasBySearchType = this.datas;
            this.resetTable();
          }
        }
      }
    }

    if (this.isdelelete?.data?.ID !== undefined) {
      this.deleteItem();
    }
  }

  deleteItem(): void {
    const id: string = this.isdelelete.data.ID;
    this.datas = this.datas.filter((dataItem: { data: { ID: any } }) => dataItem.data.ID !== id);
    this.dataChange.emit(this.datas);
    this.dataSource = this.dataSourceBuilder.create(this.datas);
    this.buildTable();
  }

  resetTable(): void {
    this.initialData = [];
    this.additionalData = [];
    this.dataSource = this.dataSourceBuilder.create(this.datas);
    this.buildTable();
  }

  updateSort(sortRequest: NbSortRequest): void {
    this.sortColumn = sortRequest.column;
    this.sortDirection = sortRequest.direction;
  }

  getSortDirection(column: string): NbSortDirection {
    return this.sortColumn === column ? this.sortDirection : NbSortDirection.NONE;
  }

  onEdit(row: TreeNode<any>): void {
    this.editAction.emit(row);
  }

  buildTable(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedData = this.datas.slice(startIndex, endIndex);
    this.dataSource = this.dataSourceBuilder.create(this.paginatedData);
  }

  onPageChange(page: number): void {
    if (this.hasMorePages) {
      this.currentPage = page;
      this.buildTable();
    } else {
      this.paginator++;
      this.pageChange.emit(this.paginator);
      this.currentPage = page;
    }
  }

  onDelete(row: TreeNode<FSEntry>): void {
    this.deleteAction.emit(row);
  }

  getHeaderColumns(): string[] {
    return [...this.defaultColumns, 'acciones'];
  }

  getRowColumns(): string[] {
    return [...this.defaultColumns, 'acciones'];
  }

  handleDeleteAction(row: TreeNode<FSEntry>): void {
    this.deleteAction.emit(row);
  }

  onItemDeleted(item: TreeNode<any>): void {
    this.datas = this.datas.filter((dataItem: { data: { ID: any } }) => dataItem.data.ID !== item.data.ID);
    this.buildTable();
  }

  getShowOn(index: number): number {
    const minWidthForMultipleColumns = 400;
    const nextColumnStep = 100;
    return minWidthForMultipleColumns + nextColumnStep * index;
  }
  onPageChangeBack(page: number): void {
    this.hasMorePages = true;
    this.currentPage = page;
    this.buildTable();


  }
}
