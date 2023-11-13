import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { StatusConfigModel } from '../../../../../shared/models/status-config.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { StatusConfigFormGroup } from '../../../models/forms/status-config-form-group';
import { DictionaryState } from '../../../../../shared/states/dictionary.state';
import { SaveStatusConfigCommand } from '../../../models/commands/save-status-config.command';
import { Save } from '../../../states/statuses-config.action';

@Component({
  selector: 'app-edit-status-config-dialog',
  templateUrl: './edit-status-config-dialog.component.html',
  styleUrls: ['./edit-status-config-dialog.component.scss'],
})
export class EditStatusConfigDialogComponent {
  form: FormGroup<StatusConfigFormGroup>;

  geoLinkStatuses = this.store.selectSnapshot(DictionaryState.getMapObjectStatusTypes);

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public dialogData: { sourceName: string; model: StatusConfigModel },
    private fb: FormBuilder,
    private store: Store
  ) {
    this.form = this.fb.group<StatusConfigFormGroup>({
      id: new FormControl<number>(dialogData.model.id, [Validators.required]),
      sourceStatus: new FormControl<string>(dialogData.model.srcStatus, [Validators.required]),
      description: new FormControl<string>(dialogData.model.srcStatusDescription),
      geoLinkStatus: new FormControl<number>(dialogData.model.idStatus, [Validators.required]),
    });
  }

  onSubmit() {
    const command: SaveStatusConfigCommand = {
      id: this.form.value.id!,
      sourceStatus: this.form.value.sourceStatus!,
      sourceStatusDescription: this.form.value.description!,
      geoLinkStatus: this.form.value.geoLinkStatus!,
    };

    this.store.dispatch(new Save(command));
  }
}
