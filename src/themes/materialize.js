JSONEditor.defaults.themes.materialize = JSONEditor.AbstractTheme.extend({
  getModal: function() {
    var el = document.createElement('div');
    el.className = 'card';
    el.style.position = 'absolute';
    el.style.zIndex = '10';
    el.style.display = 'none';
    return el;
  },
  getModalList: function() {
    var el = document.createElement('div');
    el.style.maxHeight = '210px';
    el.style.overflow = 'auto';
    el.className = 'card-content';
    return el;
  },
  getModalActionContent: function() {
    var el = document.createElement('div');
    el.className = 'card-action';
    return el;
  },
  getRangeInput: function(min, max, step) {
    // TODO: use bootstrap slider
    return this._super(min, max, step);
  },
  getIndentedPanel: function() {
    var el = document.createElement('div');
    el.className = 'card';
    return el;
  },
  getGridContainer: function() {
    var el = this._super();
    el.className = 'card-content';
    return el;
  },
  getGridRow: function() {
    var el = document.createElement('div');
    el.className = 'row';
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
  getHeader: function(text) {
    var el = document.createElement('h4');
    el.className = 'row';
    if(typeof text === "string") {
      el.textContent = text;
    }
    else {
      text.className += ' col left';
      el.appendChild(text);
    }

    return el;
  },
  setGridColumnSize: function(el,size) {
    el.className = 's'+size;
  },
  getSelectInput: function(options) {
    return this._super(options);
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
    el.className = 'switcher-container';
    return el;
  },
  getSwitcher: function(options) {
    var switcher = this.getSelectInput(options);
    switcher.style.fontStyle = 'italic';
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
    el.className += 'validate';
    return el;
  },
  getFormInputField: function(type) {
    var el = document.createElement('input');
    el.setAttribute('type', type);
    return el;
  },
  afterInputReady: function(input) {
    if(input.controlgroup) return;
    input.controlgroup = this.closest(input,'.input-field');
  },
  getTextareaInput: function() {
    var el = document.createElement('textarea');
    el.className = 'materialize-textarea';
    return el;
  },
  getJsonEditorTextareaInput: function() {
    var el = this._super();
    el.style.overflow = 'auto';
    el.style.height = '210px';
    el.style.width = '100%';
    return el;
  },
  getDescription: function(text) {
    var el = document.createElement('p');
    el.className = 'light';
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
      group.appendChild(input);
    }
    else {
      group.className += ' input-field';
      group.appendChild(input);
    }

    if(label) group.appendChild(label);
    if(description) group.appendChild(description);

    return group;
  },
  getButtonHolder: function() {
    var el = document.createElement('div');
    el.className = 'col left';
    el.style.fontSize = '14px';
    return el;
  },
  getButton: function(text, icon, title) {
    var el =  this._super(text, icon, title);
    el.className += 'waves-effect waves-light btn';
    el.style.margin = '0 5px 0 5px';
    return el;
  },
  getTable: function() {
    var el = document.createElement('table');
    el.className = 'table bordered';
    el.style.padding = '5px';
    return el;
  },
  getTableControls: function() {
    var el = document.createElement('div');
    el.className = 'card-action';
    return el;
  },
  setTableButtonStyle: function(button) {
    button.className += ' right';
  },
  addInputError: function(input,text) {
    if(!input.controlgroup) return;
    if (input.className.indexOf('invalid') < 0) {
      input.className += ' invalid';
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
    el.className = 'row';
    el.innerHTML = "<div class='col s12'><ul class='tabs'></ul></div>";
    return el;
  },
  getTab: function(text) {
    var el = document.createElement('li');
    el.className = 'tab col s3';
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
    el.className = 'col s12';
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
    container.className = 'progress';

    var bar = document.createElement('div');
    bar.className = 'determinate';
    bar.style.width = '0%';
    container.appendChild(bar);

    return container;
  },
  updateProgressBar: function(progressBar, progress) {
    if (!progressBar) return;

    progressBar.firstChild.style.width = progress + "%";
  },
  updateProgressBarUnknown: function(progressBar) {
    if (!progressBar) return;

    progressBar.className = 'indeterminate';
    progressBar.firstChild.style = '';
  }
});
