import { Store } from '@ngxs/store';
import {
  AttributeDialogInput,
  SimpleFormModel,
  SimpleInputDialogDataModel,
} from '../components/dialogs/simple-input-dialog/simple-input-dialog-data.model';
import { FilterAttributeModel } from '../models/filters/filter-attribute.model';
import { FormGroup } from '@angular/forms';
import { DictionaryState } from '../states/dictionary.state';

export function getInputDialogDataModelForFilterAttributes(
  store: Store,
  formTitle: string,
  action: (model: FilterAttributeModel[]) => void,
  searchFilterModels?: FilterAttributeModel[]
): SimpleInputDialogDataModel {
  const filterAttributeDefinitions = store.selectSnapshot(DictionaryState.getFilterAttributeDefinitions);

  const inputs: AttributeDialogInput[] = [];

  filterAttributeDefinitions.forEach(attribute => {
    inputs.push({
      controlName: attribute.name,
      label: attribute.description,
      type: 'text',
      initValue: searchFilterModels?.filter(x => x.name === attribute.name).map(x => x.value)[0],
      idAtrF: filterAttributeDefinitions.filter(x => x.name === attribute.name).map(x => x.idAtrF)[0],
      atrFType: filterAttributeDefinitions.filter(x => x.name === attribute.name).map(x => x.atrFType)[0],
    });
  });

  const dataModel: SimpleInputDialogDataModel = {
    title: formTitle,
    inputs: inputs,
    submitLabel: 'Szukaj',
    submitAction: (formValue: Partial<SimpleFormModel>) => {
      const filterModels: FilterAttributeModel[] = [];

      filterAttributeDefinitions.forEach(attribute => {
        filterModels.push({
          idAtrF: attribute.idAtrF,
          atrFType: attribute.atrFType,
          value: <string>formValue[attribute.name],
          name: attribute.name,
          beginsWith: false,
          endsWith: false,
        });
      });

      action(filterModels);
    },
    alternativeLabel: 'Wyczyść filtry',
    alternativeAction: (form: FormGroup<{}>) => {
      form.reset();
    },
  };

  return dataModel;
}
