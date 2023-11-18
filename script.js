const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
const paymentForm = document.getElementById('paymentForm');
const sendButton = document.getElementById('liveAlertBtn');

const appendAlert = (message, type) => {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = [
    `<div class="alert alert-${type}" role="alert">`,
    `   <div>${message}</div>`,
    '</div>'
  ].join('');

  alertPlaceholder.innerHTML = ''; // Limpiar alertas anteriores
  alertPlaceholder.append(wrapper);
}

const hideAlert = () => {
  alertPlaceholder.innerHTML = '';
}

const validateForm = () => {
  let formIsValid = true;

  // Verificar campos de texto obligatorios
  const requiredFields = paymentForm.querySelectorAll('.required');
  requiredFields.forEach((field) => {
    if (!field.value.trim()) {
      formIsValid = false;
    }
  });

  // Verificar campos de radio obligatorios
  const radioGroup = paymentForm.querySelector('[name="radioTypeCard"]');
  const radioButtons = paymentForm.querySelectorAll('[name="radioTypeCard"]:checked');
  if (radioGroup && radioButtons.length === 0) {
    formIsValid = false;
  }

  return formIsValid;
}

sendButton.addEventListener('click', (event) => {
  if (!validateForm()) {
    // Campos obligatorios faltantes, mostrar alerta y evitar envío del formulario
    event.preventDefault();
    appendAlert('Some fields are missing.', 'danger');
  } else {
    // Todos los campos obligatorios están completos, ocultar la alerta
    hideAlert();
  }
});

