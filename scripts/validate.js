const popup = document

const showInputInvalid = (input) => {
  input.classList.add("popup__item_type_invalid");
}

const hideInputInvalid = (input) => {
  input.classList.remove("popup__item_type_invalid");
}


const showInputError = (errorTextElement, validationMessage, activeErrorClass) => {
    errorTextElement.textContent = validationMessage;
    errorTextElement.classList.add(activeErrorClass);
  };
  
  const hideInputError = (errorTextElement, activeErrorClass) => {
    errorTextElement.classList.remove(activeErrorClass);
    errorTextElement.textContent = '';
  };
  
  const disableButton = (submitButton, validSubmitButtonClass) => {
    submitButton.classList.remove(validSubmitButtonClass);
    submitButton.disabled = true;
  };
  
  const enableButton = (submitButton, validSubmitButtonClass) => {
    submitButton.classList.add(validSubmitButtonClass);
    submitButton.disabled = false;
  };
  
  const checkInputValidity = (input, errorClassTemplate, activeErrorClass) => {
    const errorTextElement = document.querySelector(`${errorClassTemplate}${input.name}`);
    if (!input.validity.valid) {
      showInputError(errorTextElement, input.validationMessage, activeErrorClass);
      showInputInvalid(input);
      
    } else {
      hideInputError(errorTextElement);
      hideInputInvalid(input);
      
    }
  };
  
  hasInvalidInput = inputList => {
    return Array.from(inputList).some(input => !input.validity.valid);
  };
  
  const toggleButtonState = (submitButton, validSubmitButtonClass, inputList) => {
    if (!hasInvalidInput(inputList)) {
      enableButton(submitButton, validSubmitButtonClass);
    } else {
      disableButton(submitButton, validSubmitButtonClass);
    }
  };
  
  const setEventListeners = (
    form,
    inputListSelector,
    errorClassTemplate,
    activeErrorClass,
    validSubmitButtonClass,
    submitButtonSelector,
    popupSelector
  ) => {
    form.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
  
    const inputList = form.querySelectorAll(inputListSelector);
    const submitButton = form.querySelector(submitButtonSelector);
    toggleButtonState(submitButton, validSubmitButtonClass, inputList); 
  
    inputList.forEach(input => {
      input.addEventListener('input', e => {
        checkInputValidity(e.target, errorClassTemplate, activeErrorClass);
        toggleButtonState(submitButton, validSubmitButtonClass, inputList);
      });
    });
  };
  
  const enumerationForm = () => {};
  
  const enableValidation = config => {
    const forms = Array.from(document.querySelectorAll(config.formSelector)); 
    forms.forEach(form => {
      setEventListeners(
        form,
        config.inputSelector,
        config.errorClassTemplate,
        config.activeErrorClass,
        config.validSubmitButtonClass,
        config.submitButtonSelector,
        config.popupSelector
      );
    });
  
  };
  
  enableValidation({
    formSelector: '.popup__container-input',
    inputSelector: '.popup__item',
    errorClassTemplate: '.popup__item-error_type_',
    activeErrorClass: 'popup__item-error',
    submitButtonSelector: '.popup__save',
    validSubmitButtonClass: 'popup__save_valid',
    popupSelector: '.popup'
  });
  