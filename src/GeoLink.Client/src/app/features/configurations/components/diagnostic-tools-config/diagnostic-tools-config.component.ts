import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngxs/store';
import { UpdateFormValue } from '@ngxs/form-plugin';
import { nameof } from '../../../../shared/helpers/name-of.helper';
import { DiagnosticToolsConfigFormGroup } from '../../models/forms/diagnostic-tools-config-form-group';
import { Load, Save } from '../../states/diagnostic-tools-config.action';
import { SaveDiagnosticToolsConfigCommand } from '../../models/commands/save-diagnostic-tools-config.command';
import { DiagnosticToolsConfigStateModel } from '../../states/diagnostic-tools-config.state.model';
import { DiagnosticToolsConfigState } from '../../states/diagnostic-tools-config.state';

@Component({
  selector: 'app-diagnostic-tools-config',
  templateUrl: './diagnostic-tools-config.component.html',
  styleUrls: ['./diagnostic-tools-config.component.scss'],
})
export class DiagnosticToolsConfigComponent implements OnInit, OnDestroy {
  config$ = this.store.select(DiagnosticToolsConfigState.getConfig);

  diagnosticForm: FormGroup<DiagnosticToolsConfigFormGroup>;
  subscriptions: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private store: Store
  ) {
    this.diagnosticForm = this.fb.group<DiagnosticToolsConfigFormGroup>({
      prtgUrl: new FormControl<string>('test url', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      consoleSshHostname: new FormControl<string>('hostname', {
        nonNullable: true,
        validators: [Validators.required],
      }),
    });
  }

  ngOnInit(): void {
    this.store.dispatch(new Load());

    this.subscriptions.add(
      this.config$.subscribe(diagnosticToolsConfig => {
        this.store.dispatch(
          new UpdateFormValue({
            path: `diagnosticToolsConfig.${nameof<DiagnosticToolsConfigStateModel>('configFormGroup')}`,
            value: {
              prtgUrl: diagnosticToolsConfig.prtgUrl,
              consoleSshHostname: diagnosticToolsConfig.consoleSshHostname,
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
    if (!this.diagnosticForm.valid) return;

    this.store.dispatch(new Save(this.diagnosticForm.value as SaveDiagnosticToolsConfigCommand));
  }
}
