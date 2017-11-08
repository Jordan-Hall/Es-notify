class ESNotify {
    constructor() {
      this.container = document.querySelector('#esnotify-view');
      if (this.container === null) {
        this.container = document.createElement('div');
        this.container.id = 'esnotify-view';
        this.container.classList.add('esnotify-view');
        document.body.appendChild(this.container);
      }
  
      this.view = document.createElement('div');
      this.hideTimeout = 0;
      this.animateOutTimer = 0;
      this.hideBound = this.remove.bind(this);
      this.animateOutBind = this.animateOut.bind(this);
  
      this.stopTimersBind = this.stopTimers.bind(this);
      this.startTimersBind = this.startTimers.bind(this);
      this.onclickHideBind = this.onclickHide.bind(this);
    }
  
    defaultOptions(options) {
      if (options == null ) {
        options = {};
      }
  
      if (options.closeOnClickOnly == null) {
        options.closeOnClickOnly = false;
      }
  
      if (options.closeOnButtonOnly == null) {
        options.closeOnButtonOnly = false;
      }
  
      if (options.holdOnMouseOver == null) {
        options.holdOnMouseOver = true;
      }
  
      // Note this does make sensse as closeImg could be undefined.
      if (options.closeIcon == null) {
        options.closeIcon = null;
      }
  
      if (options.toastClasses == null) {
        options.toastClasses = [];
      }
  
      if (options.buttonClasses == null) {
        options.buttonClasses = [];
      }
  
      if (options.messageClasses == null) {
        options.messageClasses = [];
      }
  
      if (options.imageClasses == null) {
        options.imageClasses = [];
      }
  
      if (options.acknowledgeButtonText == null ) {
        options.acknowledgeButtonText = 'Acknowledge';
      }
      return options;
    }
    info(message, time, options = null) {
      this.toast(message, time, 'esnotify-info', options);
    }
    warning(message, time, options = null) {
      this.toast(message, time, 'esnotify-warning', options);
    }
    error(message, time, options = null) {
      this.toast(message, time, 'esnotify-error', options);
    }
    toast(message, time, toastType = 'esnotify-info', options = null) {
  
      options = this.defaultOptions(options);
  
      if (!options.closeOnClickOnly && !options.closeOnButtonOnly || ( options.closeOnClickOnly === false && options.closeOnButtonOnly === false && options.holdOnMouseOver)) {
        this.view.addEventListener('mouseover', () => { this.stopTimersBind(time); });
        this.view.addEventListener('mouseleave', () => { this.startTimersBind(time); });
      }
  
      this.view.classList.add('esnotify-toast');
      this.view.classList.add('esnotify-toast-animateIn');
  
  
      for (let i = 0; i < options.toastClasses.length; i++) {
        this.view.classList.add(options.toastClasses[i]);
      }
  
      if (!options.closeOnButtonOnly) {
        this.view.onclick = this.hideBound;
      }
  
  
      if (typeof toastType == 'string' || toastType instanceof String) {
        this.view.classList.add(toastType);
      }
      this.view.style.animationDuration = `${(time/100) * 10}ms`;
  
      if (options.closeIcon !== null && !options.closeOnButtonOnly) {
        const closeImg = document.createElement('div');
        closeImg.classList.add('esnotify-closeIcon');
        closeImg.innerHTML = options.closeIcon;
  
        for (let i = 0; i < options.imageClasses.length; i++) {
          closeImg.classList.add(options.imageClasses[i]);
        }
  
        this.view.appendChild(closeImg);
  
  
      }
  
      const messageDiv = document.createElement('div');
  
      for (let i = 0; i < options.messageClasses.length; i++) {
        messageDiv.classList.add(options.messageClasses[i]);
      }
  
      messageDiv.classList.add('esnotify-message');
      messageDiv.appendChild(document.createTextNode(message));
      this.view.appendChild(messageDiv);
      this.container.appendChild(this.view);
  
  
      if (options.closeOnButtonOnly) {
        const buttonDiv = document.createElement('div');
  
        for (let i = 0; i < options.buttonClasses.length; i++) {
          buttonDiv.classList.add(options.buttonClasses[i]);
        }
  
        const button = document.createElement('button');
        button.classList.add('esnotify-button');
  
        const buttonText = document.createTextNode(options.acknowledgeButtonText)
        button.appendChild(buttonText);
  
        button.onclick = this.hideBound;
        buttonText.onclick = this.hideBound;
        buttonDiv.appendChild(button);
        this.view.appendChild(buttonDiv);
      }
  
      if (!options.closeOnClickOnly && !options.closeOnButtonOnly) {
        clearTimeout(this.hideTimeout);
        clearTimeout(this.animateOutTimer);
        this.hideTimeout = setTimeout(this.hideBound, time);
        this.animateOutTimer = setTimeout(this.animateOutBind, time - ((time/100) * 10));
      }
    }
    onclickHide() {
      this.style.display = 'none';
    }
    animateOut() {
      this.view.classList.remove('esnotify-toast-animateIn');
      this.view.classList.add('esnotify-toast-animateOut');
    }
    remove() {
      this.view.parentNode.removeChild(this.view);
      clearTimeout(this.hideTimeout);
      clearTimeout(this.animateOutTimer);
      this.view.removeEventListener('mouseover',() => { this.stopTimersBind(); });
      this.view.removeEventListener('mouseleave', () => { this.startTimersBind(); });
    }
  
    stopTimers(time) {
      clearTimeout(this.hideTimeout);
      clearTimeout(this.animateOutTimer);
    }
  
    startTimers(time) {
      this.hideTimeout = setTimeout(this.hideBound, time);
      this.animateOutTimer = setTimeout(this.animateOutBind, time - ((time/100) * 10));
    }
  }
  
  export { ESNotify };
  