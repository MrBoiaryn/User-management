import { DialogModule } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-user-dialog',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    MatDialogModule,
    CommonModule,
    MatButton,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,
  ],
  templateUrl: './user-dialog.component.html',
  styleUrl: './user-dialog.component.scss',
})
export class UserDialogComponent implements OnInit, AfterViewInit {
  userForm!: FormGroup;
  isEditMode: boolean = false;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagsControl = new FormControl<string[]>([]);

  @ViewChild('tagInput') tagInput!: ElementRef<HTMLInputElement>;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.isEditMode = this.data?.index !== null;

    if (this.data?.user) {
      this.userForm.patchValue(this.data.user);
      this.tagsControl.setValue(this.data.user.tags || []);
    }
  }

  ngAfterViewInit(): void {
    this.tagInput.nativeElement.value = '';
  }

  private initForm(): void {
    this.userForm = this.formBuilder.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [
        null,
        [
          Validators.required,
          Validators.pattern(
            /^([a-zA-Z0-9_\.\-])+@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,6})$/
          ),
        ],
      ],
      tags: [[]],
      description: [null],
    });
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      const currentTags = this.tagsControl.value || [];
      this.tagsControl.setValue([...currentTags, value]);
    }

    event.chipInput!.clear();
  }

  remove(tag: string): void {
    const currentTags = this.tagsControl.value || [];
    this.tagsControl.setValue(currentTags.filter((t) => t !== tag));
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const currentTags = this.tagsControl.value || [];

    if (!currentTags.includes(event.option.value)) {
      currentTags.push(event.option.value);
      this.tagsControl.setValue(currentTags);
    }

    this.tagInput.nativeElement.value = '';
  }

  save(): void {
    if (this.userForm.invalid) return;

    const user = {
      ...this.userForm.value,
      tags: this.tagsControl.value || [],
    };

    this.dialogRef.close(user);
  }
}
