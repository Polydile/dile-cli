import { html } from 'lit';
import { CrudConfigBuilder } from '@dile/crud/lib/CrudConfigBuilder';
import { ResponseApiAdapter } from '@dile/crud/lib/ResponseApiAdapter';
import '@dile/ui/components/pages/pages.js';
import '@dile/crud/components/action/crud-delete-action.js'

class UserResponseApiAdapter extends ResponseApiAdapter {
  getElementList() {
    return this.response.data.result.data;
  }
}

export const userConfig = new CrudConfigBuilder('http://url/api/user', {
  responseAdapter: new UserResponseApiAdapter(),
  templates: {
    item: (item) => html`<user-item .item=${item}></user-item>` ,
    insertForm: () => html`Insert form template`,
    updateForm: () => html`Update form template`,
    help: () => html`<p>User help.</p>`,
    detail: (item) => html`<user-detail .item=${item}></user-detail>` ,
    relations: null,
    formActions: (actionName, actionIds) => html`
        <dile-pages attrForSelected="action" selected="${actionName}">
            <dile-crud-delete-action action="DeleteAction"></dile-crud-delete-action>
        </dile-pages>
    `,
    formSingleActions: (actionName, item) => html`
        <dile-pages attrForSelected="action" selected="${actionName}">
            <dile-crud-delete-action action="DeleteAction"></dile-crud-delete-action>
        </dile-pages>
    `,
  },
  customization: {
    hideCountSummary: false,
    hideCheckboxSelection: true,
    disablePagination: false,
    disableHelp: true,
    disableKeywordSearch: false,
    disableSort: true,
    disableFilter: true,
  },
  sort: {
    options: [
      {
        name: 'created_at',
        label: 'Created',
        direction: 'desc'
      },
    ],
    initialSortField: 'created_at',
  },
  availableFilters: [
    {
      name: 'column',
      label: 'Column',
      active: false,
      value: false,
      type: 'boolean',
    },
    {
      name: 'column2',
      label: 'Column 2',
      active: false,
      value: false,
      type: 'select',
      options: [
        {
          value: '1',
          label: 'Value 1'
        },
        {
          value: '2',
          label: 'Value 2'
        },
      ]
    },
  ],
  actions: {
    list: [
      {
        label: 'Delete resorce',
        name: 'DeleteAction',
        destructive: true,
      },
    ],
    single: [
      {
        label: 'Delete resource',
        name: 'DeleteAction',
        destructive: true,
      },
    ],
  },
});