import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { UpdateFormValue } from '@ngxs/form-plugin';
import { Subscription } from 'rxjs';
import { nameof } from '../../../../shared/helpers/name-of.helper';
import { LogsStorageConfigFormGroup } from '../../models/forms/logs-storage-config-form-group';
import { SaveLogsStorageConfigCommand } from '../../models/commands/save-logs-storage-config.command';
import { Load, Save } from '../../states/logs-storage-config.action';
import { LogsStorageConfigState } from '../../states/logs-storage-config.state';
import { LogsStorageConfigStateModel } from '../../states/logs-storage-config.state.model';

@Component({
  selector: 'app-logs-storage-config',
  templateUrl: './logs-storage-config.component.html',
  styleUrls: ['./logs-storage-config.component.scss'],
})
export class LogsStorageConfigComponent implements OnInit, OnDestroy {
  config$ = this.store.select(LogsStorageConfigState.getConfig);
  logsStoragePeriodConfigForm: FormGroup<LogsStorageConfigFormGroup>;
  subscriptions: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private store: Store
  ) {
    this.logsStoragePeriodConfigForm = this.fb.group<LogsStorageConfigFormGroup>({
      storagePeriod: new FormControl<number>(2, {
        nonNullable: true,
        validators: [Validators.required],
      }),
    });
  }

  ngOnInit(): void {
    this.store.dispatch(new Load());

    this.subscriptions.add(
      this.config$.subscribe(storageRetentionConfig => {
        this.store.dispatch(
          new UpdateFormValue({
            path: `logsStorageConfig.${nameof<LogsStorageConfigStateModel>('configFormGroup')}`,
            value: {
              storagePeriod: storageRetentionConfig.storagePeriod,
            },
          })
        );
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onSubmit() {
    if (!this.logsStoragePeriodConfigForm.valid) return;

    this.store.dispatch(new Save(this.logsStoragePeriodConfigForm.value as SaveLogsStorageConfigCommand));
  }
}
