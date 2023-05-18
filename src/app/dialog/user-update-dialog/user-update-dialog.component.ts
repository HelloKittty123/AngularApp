import { Component, DoCheck, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from 'src/service/user/user.service';
import { Role, User } from 'src/app/type';

@Component({
  selector: 'app-user-update-dialog',
  templateUrl: './user-update-dialog.component.html',
  styleUrls: ['./user-update-dialog.component.scss'],
})
export class UserUpdateDialogComponent implements OnInit {
  updateUserForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    public dialogRef: MatDialogRef<UserUpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data?: User
  ) {}

  ngOnInit(): void {
    this.updateUserForm = this.fb.group({
      name: this.data ? this.data?.name : '',
      username: this.data ? this.data?.username : '',
      email: this.data ? this.data?.email : '',
      street: this.data ? this.data?.address.street : '',
      suite: this.data ? this.data?.address.suite : '',
      zipcode: this.data ? this.data?.address.zipcode : '',
      phone: this.data ? this.data?.phone : '',
      website: this.data ? this.data?.website : '',
      nameCompany: this.data ? this.data?.company.name : '',
      catchPhrase: this.data ? this.data?.company.catchPhrase : '',
      bs: this.data ? this.data?.company.bs : '',
    });
  }

  onSubmit(): void {
    this.dialogRef.close({
      id: this.data?.id,
      name: this.updateUserForm.value.name,
      username: this.updateUserForm.value.username,
      email: this.updateUserForm.value.email,
      address: {
        street: this.updateUserForm.value.street,
        suite: this.updateUserForm.value.suite,
        city: this.updateUserForm.value.city,
        zipcode: this.updateUserForm.value.zipcode,
        geo: {
          lat: this.data?.address.geo.lat
            ? this.data?.address.geo.lat
            : '105AT',
          lng: this.data?.address.geo.lng
            ? this.data?.address.geo.lng
            : '105NG',
        },
      },
      phone: this.updateUserForm.value.phone,
      website: this.updateUserForm.value.website,
      company: {
        name: this.updateUserForm.value.nameCompany,
        catchPhrase: this.updateUserForm.value.catchPhrase,
        bs: this.updateUserForm.value.bs,
      },
      isCreate: this.data ? false : true,
      role: Role.User,
    });
  }
}
