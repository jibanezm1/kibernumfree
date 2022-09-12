import { RepositoryService } from './../../shared/repository.service';
import { ViewChild, AfterViewInit, Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Owner } from '../../_interface/owner.model';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { FormControl } from '@angular/forms';
import { FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
interface Category {
  value: string;
  viewValue: string;
}
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-owner-list',
  templateUrl: './owner-list.component.html',
  styleUrls: ['./owner-list.component.css']
})
export class OwnerListComponent implements OnInit, AfterViewInit {
  categoriesControl = new FormControl([]);
  categories: string[] = ['Laravel', 'Angular', 'NPM', 'Jquery', 'PHP'];
  selected = new FormControl('valid', [Validators.required, Validators.pattern('valid')]);

  selectFormControl = new FormControl('valid', [Validators.required, Validators.pattern('valid')]);

  nativeSelectFormControl = new FormControl('valid', [
    Validators.required,
    Validators.pattern('valid'),
  ]);


  public displayedColumns = ['name', 'status', 'nickname', 'details', 'update', 'delete'
  ];
  public doFilter = (value: any) => {

    const filterValue = (value.target as HTMLInputElement).value;

    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }
  public dataSource = new MatTableDataSource<Owner>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private repoService: RepositoryService) { }
  ngOnInit() {
    this.getAllOwners();
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

  }
  public getAllOwners = () => {
    this.repoService.getData('characters')
      .subscribe(res => {
        this.dataSource.data = res as Owner[];
      })
  }
  public redirectToDetails = (id: string) => {

  }
  public redirectToUpdate = (id: string) => {

  }
  onCatRemoved(cat: string) {
    const categories:any = this.categoriesControl.value as string[];
    this.removeFirst(categories, cat);
    this.categoriesControl.setValue(categories); // To trigger change detection
  }
  private removeFirst(array: any[], toRemove: any): void {

    const index = array.indexOf(toRemove);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }

  matcher = new MyErrorStateMatcher();

  public redirectToDelete = (id: string) => {

  }
}