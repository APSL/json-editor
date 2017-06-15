JSONEditor.defaults.editors.upload = JSONEditor.AbstractEditor.extend({
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

      if(!this.jsoneditor.options.upload) throw "Upload handler required for upload editor";

      // File uploader
      this.uploader = this.theme.getFormInputField('file');
      
      this.uploader.addEventListener('change',function(e) {
        if(this.files && this.files.length) {
          var fr = new FileReader();
          fr.onload = function(evt) {
            self.onLoadFileReader(evt);
            fr = null;
          };
          fr.readAsDataURL(this.files[0]);
        } else {
          self.onLoadFileReader(e);
        }
      });
    }

    var description = this.schema.description;
    if (!description) description = '';

    this.preview = this.theme.getFileInputPreview();
    this.information = this.theme.getFormInputDescription(description);
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
    if(this.last_preview === this.preview_value) return;
    this.last_preview = this.preview_value;

    this.information.innerHTML = '';

    if (this.decorator) this.decorator.className = this.decorator.className.replace(/\s?active/g,'');
    if (!this.preview_value) {
        this.setPreview();
        return;
    }

    var self = this;

    var mime = this.preview_value.match(/^data:([^;,]+)[;,]/);
    if(mime) mime = mime[1];
    if(!mime) mime = 'unknown';

    var file = this.uploader.files[0];

    this.information.innerHTML = '<small class="previe-info"><strong>' + this.translate('type') +
    ':</strong> ' + mime + ', <strong>' + this.translate('size') + ':</strong> ' + file.size +
    ' bytes</small>';

    if(mime.substr(0,5)==="image") this.setPreview();

    this.information.innerHTML += '<br>';
    var upload_text = this.translate('button_upload');
    var uploadButton = this.getButton(upload_text, 'upload', upload_text);
    this.information.appendChild(uploadButton);
    uploadButton.addEventListener('click',function(event) {
      event.preventDefault();

      uploadButton.setAttribute("disabled", "disabled");
      self.theme.removeInputError(self.uploader);

      if (self.theme.getProgressBar) {
        self.progressBar = self.theme.getProgressBar();
        self.preview.appendChild(self.progressBar);
      }

      self.jsoneditor.options.upload(self.path, file, {
        success: function(url) {
          self.setValue(url);

          if(self.parent) self.parent.onChildEditorChange(self);
          else self.jsoneditor.onChange();

          if (self.progressBar) self.preview.removeChild(self.progressBar);
        },
        failure: function(error) {
          self.theme.addInputError(self.uploader, error);
          if (self.progressBar) self.preview.removeChild(self.progressBar);
        },
        updateProgress: function(progress) {
          if (self.progressBar) {
            if (progress) self.theme.updateProgressBar(self.progressBar, progress);
            else self.theme.updateProgressBarUnknown(self.progressBar);
          }
        }
      });
    });

    var clearUploadButton = this.getButton('', 'clean_upload');
    this.information.appendChild(clearUploadButton);
    clearUploadButton.addEventListener('click',function(event) {
      event.preventDefault();
      self.setValue('');
      self.uploader.value = '';
      self.uploader.dispatchEvent(new Event('change'));
    });
    if (this.decorator && this.decorator.className.indexOf('active') == -1) this.decorator.className += ' active';
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
    var changed = this.value !== val;
    this.value = val;
    this.input.value = this.value;
    if (this.decorator) {
      this.decorator.firstChild.value = val ? val.split('/').pop() : '';
    }

    if (this.value) {
        this.preview_value = this.value;
        this.setPreview();
    }

    if (changed) this.onChange();
  },
  destroy: function() {
    if(this.preview && this.preview.parentNode) this.preview.parentNode.removeChild(this.preview);
    if(this.title && this.title.parentNode) this.title.parentNode.removeChild(this.title);
    if(this.input && this.input.parentNode) this.input.parentNode.removeChild(this.input);
    if(this.uploader && this.uploader.parentNode) this.uploader.parentNode.removeChild(this.uploader);

    this._super();
  },
  onLoadFileReader: function(event) {
    this.preview_value = event.target.result;
    this.refreshPreview();
    this.onChange(true);
  },
  setPreview: function() {
    var img = this.preview.getElementsByTagName('img')[0];
    var preview = this.preview_value || '';
    img.setAttribute('src', preview);
    this.theme.setFileInputPreviewTooltip(img, preview);
  }
});
