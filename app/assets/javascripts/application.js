//
// For guidance on how to add JavaScript see:
// https://prototype-kit.service.gov.uk/docs/adding-css-javascript-and-images
//

window.GOVUKPrototypeKit.documentReady(() => {
	// Add JavaScript here

	function setFormAction(form, action) {
		form.setAttribute('method', 'post')
		form.setAttribute('action', action)
	}

	function setFormActionFromRadio(radio) {
		const form = radio.closest('form')
		const action = radio.dataset.next
		setFormAction(form, action)
	}

	const radios = document.querySelectorAll('input[type="radio"][data-next]')

	radios.forEach((radio) => {
		if (radio.checked) {
			setFormActionFromRadio(radio)
		}
		radio.addEventListener('change', (event) => {
			if (event.target.checked) {
				setFormActionFromRadio(event.target)
			}
		})
	})
})
