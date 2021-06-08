import { Component, Inject, Input } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Institution } from 'src/app/shared/common/models';
import { uiroutes } from 'src/app/shared/common/ui-routes';
import { DeleteInstitutionAction } from 'src/app/shared/state/institutions/institution.actions';
@Component({
  selector: 'app-institution-modal',
  templateUrl: './institution-modal.component.html',
  styleUrls: ['./institution-modal.component.scss'],
})
export class InstitutionModalComponent {
  profileData: Institution;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<InstitutionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store
  ) {
    this.profileData = data;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
  onClickInstitutionName() {
    this.closeDialog();
    const id = this.profileData.id;
    this.router.navigate([uiroutes.INSTITUTION_PROFILE_ROUTE], {
      queryParams: { id },
      queryParamsHandling: 'merge',
      skipLocationChange: false,
    });
  }
  editInstitution() {
    this.closeDialog();
    const id = this.profileData.id;
    this.router.navigate([uiroutes.INSTITUTION_FORM_ROUTE], {
      relativeTo: this.route,
      queryParams: { id },
      queryParamsHandling: 'merge',
      skipLocationChange: false,
    });
  }

  deleteConfirmation() {
    const dialogRef = this.dialog.open(
      InstitutionDeleteConfirmationDialogModal,
      {
        data: this.profileData,
      }
    );

    dialogRef.afterClosed().subscribe((result) => {
      if (result == true) {
        this.deleteInstitution();
      }
    });
  }
  deleteInstitution() {
    this.store.dispatch(
      new DeleteInstitutionAction({ id: this.profileData.id })
    );
    this.closeDialog();
  }
}

@Component({
  selector: 'institution-delete-confirmation-dialog-modal',
  templateUrl: 'delete-confirmation-dialog.html',
})
export class InstitutionDeleteConfirmationDialogModal {
  constructor(
    public dialogRef: MatDialogRef<InstitutionDeleteConfirmationDialogModal>,
    @Inject(MAT_DIALOG_DATA) public data: Institution
  ) {}
}