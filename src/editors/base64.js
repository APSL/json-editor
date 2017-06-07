JSONEditor.defaults.editors.base64 = JSONEditor.AbstractEditor.extend({
  getNumColumns: function() {
    return 4;
  },
  build: function() {    
    var self = this;
    this.wrapper = this.theme.getFileInputWrapper();
    this.title = this.header = this.label = this.theme.getFileInputLabel(this.getTitle());

    // Input that holds the base64 string
    this.input = this.theme.getFormInputField('hidden');
    this.container.appendChild(this.input);
    
    // Don't show uploader if this is readonly
    if(!this.schema.readOnly && !this.schema.readonly) {
      if(!window.FileReader) throw "FileReader required for base64 editor";
      
      // File uploader
      this.uploader = this.theme.getFormInputField('file');

      this.uploader.addEventListener('change',function(e) {
        if (self.theme.getProgressBar) {
          self.progressBar = self.theme.getProgressBar();
          self.wrapper.appendChild(self.progressBar);
        }

        if(this.files && this.files.length) {
          var fr = new FileReader();
          fr.onloadstart = function(evt) {
            self.updateProgress();
          };
          fr.onload = function(evt) {
            self.onLoadFileReader(evt);
            fr = null;
          };
          fr.onloadend = function(evt) {
            self.updateProgress(100);
            setTimeout(function() {self.progressBar.remove();}, 200);
          };
          fr.readAsDataURL(this.files[0]);
        }
      });
    }

    this.preview = this.theme.getFileInputPreview();
    this.information = this.theme.getFormInputDescription(this.schema.description);
    this.control = this.theme.getFormControl(this.label, this.uploader||this.input, this.preview);
    this.decorator = this.theme.getFileInputDecorator();

    this.wrapper.appendChild(this.control);
    if (this.decorator) {
        this.decorator.appendChild(this.preview);
        this.wrapper.appendChild(this.decorator);
    }
    if (this.information) this.wrapper.appendChild(this.information);

    this.container.appendChild(this.wrapper);
  },
  refreshPreview: function() {
    if(this.last_preview === this.value) return;
    this.last_preview = this.value;
    
    this.information.innerHTML = '';
    
    if(!this.value) return;
    
    var mime = this.value.match(/^data:([^;,]+)[;,]/);
    if(mime) mime = mime[1];
    
    if(!mime) {
      this.information.innerHTML = '<em>' + this.translate('invalid_uri') + '</em>';
    }
    else {
      this.information.innerHTML = '<small class="previe-info"><strong>' + this.translate('type') +
    ':</strong> ' + mime + ', <strong>' + this.translate('size') + ':</strong> ' +
      Math.floor((this.value.length-this.value.split(',')[0].length-1)/1.33333) + ' bytes';

      if(mime.substr(0,5)==="image") {
        var img = this.preview.getElementsByTagName('img')[0];
        img.setAttribute('src', this.value);
      }
    }
  },
  enable: function() {
    if(this.uploader) this.uploader.disabled = false;
    this._super();
  },
  disable: function() {
    if(this.uploader) this.uploader.disabled = true;
    this._super();
  },
  setValue: function(val) {
    if(this.value !== val) {
      this.value = val;
      this.input.value = this.value;
      this.refreshPreview();
      this.onChange();
    }
  },
  destroy: function() {
    if(this.preview && this.preview.parentNode) this.preview.parentNode.removeChild(this.preview);
    if(this.title && this.title.parentNode) this.title.parentNode.removeChild(this.title);
    if(this.input && this.input.parentNode) this.input.parentNode.removeChild(this.input);
    if(this.uploader && this.uploader.parentNode) this.uploader.parentNode.removeChild(this.uploader);

    this._super();
  },
  onLoadFileReader: function(event) {
    this.setValue(event.target.result);
    this.refreshPreview();
    this.onChange(true);
  },
  updateProgress: function(progress) {
    if (this.progressBar) {
      if (progress) this.theme.updateProgressBar(this.progressBar, progress);
      else this.theme.updateProgressBarUnknown(this.progressBar);
    }
  }
});
