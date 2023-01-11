import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { UpdateFormValue } from '@ngxs/form-plugin';
import { Subscription } from 'rxjs';
import { HysteresisConfigFormGroup } from '../../models/forms/hysteresis-config-form-group';
import { SaveHysteresisConfigCommand } from '../../models/commands/save-hysteresis-config.command';
import { Load, Save } from '../../states/hysteresis-config.action';
import { HysteresisConfigState } from '../../states/hysteresis-config.state';
import { HysteresisConfigStateModel } from '../../states/hysteresis-config.state.model';
import { nameof } from '../../../../shared/helpers/name-of.helper';

@Component({
  selector: 'app-hysteresis-config',
  templateUrl: './hysteresis-config.component.html',
  styleUrls: ['./hysteresis-config.component.scss'],
})
export class HysteresisConfigComponent implements OnInit, OnDestroy {
  config$ = this.store.select(HysteresisConfigState.getConfig);

  hysteresisForm: FormGroup<HysteresisConfigFormGroup>;
  subscriptions: Subscription = new Subscription();

  constructor(private fb: FormBuilder, private store: Store) {
    this.hysteresisForm = fb.group<HysteresisConfigFormGroup>({
      availabilityThresholdPercentage: new FormControl<number>(0, {
        nonNullable: true,
        validators: [Validators.required, Validators.min(0), Validators.max(100)],
      }),
      sensitivenessPercentage: new FormControl<number>(0, {
        nonNullable: true,
        validators: [Validators.required, Validators.min(0), Validators.max(100)],
      }),
    });
  }

  ngOnInit(): void {
    this.store.dispatch(new Load());

    this.subscriptions.add(
      this.config$.subscribe(hysteresisConfig => {
        this.store.dispatch(
          new UpdateFormValue({
            path: `hysteresisConfig.${nameof<HysteresisConfigStateModel>('configFormGroup')}`,
            value: {
              availabilityThresholdPercentage: hysteresisConfig.availabilityThresholdPercentage,
              sensitivenessPercentage: hysteresisConfig.sensitivenessPercentage,
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
    if (!this.hysteresisForm.valid) return;

    this.store.dispatch(new Save(this.hysteresisForm.value as SaveHysteresisConfigCommand));
  }
}
