JSONEditor.defaults.iconlibs.materialize = JSONEditor.AbstractIconLib.extend({
  mapping: {
    collapse: 'keyboard_arrow_up',
    expand: 'keyboard_arrow_down',
    delete: 'delete',
    edit: 'mode_edit',
    add: 'add',
    cancel: 'undo',
    save: 'save',
    moveup: 'arrow_upward',
    movedown: 'arrow_downward',
    upload: 'cloud_upload',
    clean_upload: 'highlight_off'
  },
  icon_prefix: '',
  getIcon: function(key) {
    var iconText = this.getIconClass(key);

    if(!iconText) return null;

    var i = document.createElement('i');
    i.className = 'material-icons left';
    var textNode = document.createTextNode(iconText);
    i.appendChild(textNode);
    return i;
  }
});
