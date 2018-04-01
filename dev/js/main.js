(() => {

	const app = {
		init() {
			this.render()
		},

		cacheDOM() {
			this.footer =  document.getElementById('footer')

			this.bindEvents()
		},

		bindEvents() {
			this.footerCopy()
		},

		footerCopy(){
			const url = 'https://jlozovei.github.io/'

			let date = new Date(),
				year = date.getFullYear()

			this.footer.innerHTML = `<p>With <span class="heart">&#x2764;</span> by <a href="${url}" target="_blank" rel="noopener">jlozovei</a> | &copy; ${year}</p>`

		},

		debounce(func, wait, immediate) {
			let timeout;
			return function() {
				let context = this, args = arguments;
				let later = function() {
					timeout = null;
					if (!immediate) func.apply(context, args);
				};
				let callNow = immediate && !timeout;
				clearTimeout(timeout);
				timeout = setTimeout(later, wait);
				if (callNow) func.apply(context, args);
			};
		},

		render() {
			this.cacheDOM()
		}
	}

	app.init()

})()