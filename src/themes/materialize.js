JSONEditor.defaults.themes.materialize = JSONEditor.AbstractTheme.extend({
  getModal: function() {
    var el = document.createElement('div');
    el.className = 'card mze-modal';
    el.style.position = 'absolute';
    el.style.zIndex = '10';
    el.style.display = 'none';
    return el;
  },
  getModalList: function() {
    var el = document.createElement('div');
    el.style.maxHeight = '210px';
    el.style.overflow = 'auto';
    el.className = 'card-content mze-modal-content';
    return el;
  },
  getModalActionContent: function() {
    var el = document.createElement('div');
    el.className = 'card-action mze-modal-action-content';
    return el;
  },
  getRangeInput: function(min, max, step) {
    // TODO: use bootstrap slider
    return this._super(min, max, step);
  },
  getIndentedPanel: function() {
    var el = document.createElement('div');
    el.className = 'card mze-indented-panel';
    return el;
  },
  getGridContainer: function() {
    var el = this._super();
    el.className = 'card-content mze-grid-container';
    return el;
  },
  getGridRow: function() {
    var el = document.createElement('div');
    el.className = 'row mze-grid-row';
    return el;
  },
  disableLabel: function(label) {
    if (!label) return;
    label.className = '';
  },
  enableLabel: function(label) {
    if (!label) return;
    label.className = 'active';
  },
  getFormInputLabel: function(text) {
    return this._super(text);
  },
  getFileInputLabel: function(text) {
    var el = document.createElement('span');
    el.appendChild(document.createTextNode(text));
    return el;
  },
  getFileInputDecorator: function() {
    var el = document.createElement('div');
    el.className = 'file-path-wrapper';
    var input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.className = 'file-path validate';
    el.appendChild(input);
    return el;
  },
  getHeader: function(text) {
    var el = document.createElement('h4');
    el.className = 'row mze-header';
    if(typeof text === "string") {
      el.textContent = text;
    }
    else {
      text.className += ' col mze-header-text';
      el.appendChild(text);
    }

    return el;
  },
  setGridColumnSize: function(el,size) {
    el.className = ' mze-grid-column';
  },
  getSelectInput: function(options) {
    var el = this._super(options);
    el.className += ' mze-select-input';
    return el;
  },
  setSelectEvents: function(editor) {
    window.$(editor.input).material_select();
    window.$(editor.input).on('change',function(e) {
      e.preventDefault();
      e.stopPropagation();
      editor.onInputChange();
    });
  },
  getSwitcherContainer: function() {
    var el = document.createElement('div');
    el.className = 'mze-switcher-container';
    return el;
  },
  getSwitcher: function(options) {
    var switcher = this.getSelectInput(options);
    switcher.style.fontStyle = 'italic';
    switcher.className += ' mze-switcher';
    return switcher;
  },
  setSwitcherEvents: function(editor) {
    window.$(editor.switcher).material_select();
    window.$(editor.switcher).on('change',function(e) {
      e.preventDefault();
      e.stopPropagation();

      editor.switchEditor(editor.display_text.indexOf(this.value));
      editor.onChange(true);
    });
  },
  getCheckbox: function() {
    var el = this.getFormInputField('checkbox');
    el.className = 'validate mze-checkbox';
    return el;
  },
  getFormInputField: function(type) {
    var el = document.createElement('input');
    el.className = 'mze-input-field';
    el.setAttribute('type', type);
    return el;
  },
  afterInputReady: function(input) {
    if(input.controlgroup) return;
    input.controlgroup = this.closest(input,'.input-field');
  },
  getTextareaInput: function() {
    var el = document.createElement('textarea');
    el.className = 'materialize-textarea mze-textarea-input';
    return el;
  },
  getJsonEditorTextareaInput: function() {
    var el = this._super();
    el.className += ' mze-jeditor-textarea-input';
    el.style.overflow = 'auto';
    el.style.height = '210px';
    el.style.width = '100%';
    return el;
  },
  getFileInputWrapper: function() {
    var el = this._super();
    el.className = 'file-field input-field';
    return el;
  },    
  getDescription: function(text) {
    var el = document.createElement('p');
    el.className = 'light mze-description';
    el.style.margin = '-15px 0 15px 0';
    el.textContent = text;
    return el;
  },
  getFormControl: function(label, input, description) {
    var group = document.createElement('div');
    var label_for;

    if (label) {
        /* slugify text plus random number */
        label_for = label.innerText.toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '') + '-' +  Math.floor(Math.random() * 10000);
        label.setAttribute('for', label_for);
    }

    if (label_for) input.setAttribute('id', label_for);

    if(input.type === 'checkbox') {
      group = document.createElement('p');
      group.className += ' mze-checkbox-group';
      group.appendChild(input);
    }
    else {
      group.className += (input.type === 'file' ? ' btn' : ' input-field mze-group');
      group.appendChild(input);
    }

    if(label) group.appendChild(label);
    if(description) group.appendChild(description);

    return group;
  },
  getButtonHolder: function() {
    var el = document.createElement('div');
    el.className = 'col mze-button-holder';
    el.style.fontSize = '14px';
    return el;
  },
  getButton: function(text, icon, title) {
    var el =  this._super(text, icon, title);
    el.className += 'waves-effect waves-light btn mze-button';
    return el;
  },
  getTable: function() {
    var el = document.createElement('table');
    el.className = 'table bordered mze-table';
    el.style.padding = '5px';
    return el;
  },
  getTableControls: function() {
    var el = document.createElement('div');
    el.className = 'card-action mze-table-controls';
    return el;
  },
  setTableButtonStyle: function(button) {
    button.className += ' right mze-table-button-style';
  },
  addInputError: function(input,text) {
    if(!input.controlgroup) return;
    if (input.className.indexOf('invalid') < 0) {
      input.className += ' invalid mze-input-error';
    }
    input.controlgroup.children[1].dataset.error = text;
  },
  removeInputError: function(input) {
    if (input.controlgroup && input.controlgroup.children.length > 1) {
      delete input.controlgroup.children[1].dataset.error;
    }
    input.className = input.className.replace(/\s?invalid/g,'');
  },
  getTabHolder: function() {
    var el = document.createElement('div');
    el.className = 'row mze-tab-holder';
    el.innerHTML = "<div class='col s12'><ul class='tabs'></ul></div>";
    return el;
  },
  getTab: function(text) {
    var el = document.createElement('li');
    el.className = 'tab col s3 mze-tab';
    var a = document.createElement('a');
    a.setAttribute('href','#');
    a.appendChild(text);
    el.appendChild(a);
    return el;
  },
  getTabContentHolder: function(tab_holder) {
    return tab_holder.children[0];
  },
  getTabContent: function() {
    var el = document.createElement('div');
    el.className = 'col s12 mze-tab-content';
    return el;
  },
  markTabContentActive: function(container) {
    if (container.className.indexOf('active') < 0) {
      container.className += ' active';
    }
    container.style.display = '';
  },
  markTabContentInactive: function(container) {
    container.className = container.className.replace(/\s?active/g,'');
    container.style.display = 'none';
  },
  markTabActive: function(tab) {
    if (tab.className.indexOf('active') < 0) {
      tab.className += ' active';
    }
  },
  markTabInactive: function(tab) {
    tab.className = tab.className.replace(/\s?active/g,'');
  },
  addTab: function(holder, tab) {
    holder.children[0].children[0].appendChild(tab);
  },
  getProgressBar: function() {
    var container = document.createElement('div');
    container.className = 'progress mze-progress-bar';

    var bar = document.createElement('div');
    bar.className = 'determinate';
    bar.style.width = '0%';
    container.appendChild(bar);

    return container;
  },
  updateProgressBar: function(progressBar, progress) {
    if (!progressBar) return;

    progressBar.firstChild.className = 'determinate';
    progressBar.firstChild.style.width = progress + "%";
  },
  updateProgressBarUnknown: function(progressBar) {
    if (!progressBar) return;

    progressBar.firstChild.className = 'indeterminate';
    progressBar.firstChild.style = '';
  }
});