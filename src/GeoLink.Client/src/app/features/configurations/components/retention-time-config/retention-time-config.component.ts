import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { UpdateFormValue } from '@ngxs/form-plugin';
import { Subscription } from 'rxjs';
import { RetentionTimeConfigFormGroup } from '../../models/forms/retention-time-config-form-group';
import { Load, Save } from '../../states/retention-time-config.action';
import { SaveRetentionTimeConfigCommand } from '../../models/commands/save-retention-time-config.command';
import { nameof } from '../../../../shared/helpers/name-of.helper';
import { RetentionTimeConfigState } from '../../states/retention-time-config.state';
import { RetentionTimeConfigStateModel } from '../../states/retention-time-config.state.model';

@Component({
  selector: 'app-retention-time-config',
  templateUrl: './retention-time-config.component.html',
  styleUrls: ['./retention-time-config.component.scss'],
})
export class RetentionTimeConfigComponent implements OnInit, OnDestroy {
  config$ = this.store.select(RetentionTimeConfigState.getConfig);
  retentionTimeConfigForm: FormGroup<RetentionTimeConfigFormGroup>;
  subscriptions: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private store: Store
  ) {
    this.retentionTimeConfigForm = this.fb.group<RetentionTimeConfigFormGroup>({
      historicalDataStoragePeriod: new FormControl<number>(7, {
        nonNullable: true,
        validators: [Validators.required],
      }),
    });
  }

  ngOnInit(): void {
    this.store.dispatch(new Load());

    this.subscriptions.add(
      this.config$.subscribe(retentionTimeConfig => {
        this.store.dispatch(
          new UpdateFormValue({
            path: `retentionTimeConfig.${nameof<RetentionTimeConfigStateModel>('configFormGroup')}`,
            value: {
              historicalDataStoragePeriod: retentionTimeConfig.historicalDataStoragePeriod,
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
    if (!this.retentionTimeConfigForm.valid) return;

    this.store.dispatch(new Save(this.retentionTimeConfigForm.value as SaveRetentionTimeConfigCommand));
  }
}
