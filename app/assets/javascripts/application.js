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

	// For form actions and a hrefs, change '#pageUrl#' to the current page URL minus any query strings or hashes
	const pageUrl = window.location.href.split(/[?#]/)[0]
	const formActions = document.querySelectorAll('form[action*="#pageUrl#"]')
	const hrefs = document.querySelectorAll('a[href*="#pageUrl#"]')

	formActions.forEach((formAction) => {
		formAction.setAttribute(
			'action',
			formAction.getAttribute('action').replace(/#pageUrl#/g, pageUrl)
		)
	})

	hrefs.forEach((href) => {
		href.setAttribute(
			'href',
			href.getAttribute('href').replace(/#pageUrl#/g, pageUrl)
		)
	})
})
