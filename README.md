# asyncFormHandler

## Example of usage:
```js

let params = {

/* ---- START REQUIRED PARAMS ---- */

	/* querySelector for form DOM-element
	 * (or formDOMElement)
	 */
	formQuery: ".my-form",

	/* raw form DOM-element
	 * (or formQuery)
	 */
	formDOMElement: document.querySelector(".my-form"),

	/* url to handle form */
	url: "http://localhost",

/* ---- END REQUIRED PARAMS ---- */


	/* request method */
	method: "POST",

	/* request cors
	 * default: 'same-origin'
	 * [ same-origin, no-cors, cors ]
	 * */
	mode: "cors",

	/* cache mode
	 * default: 'default'
	 * [ default, no-cache, reload, force-cache, only-if-cached ]
	 */
	cache: "default",

	/* credentials
	 * default: 'same-origin'
	 * [ same-origin, include, omit ]
	 */
	credentials: "same-origin",

	/* validate form before request
	 * return true if not valid
	 */
	validateCallback: function(form) {

		let loginInput = form.querySelector("input[name='loginInfo']");

		if (loginInput.value.length === 0)
		{
			return true;
		}

		return false;
	},

	/* async callback on success
	 * Fetch API response provided as first argument
	 */
	successCallback: function(response) {
		console.log("Success: " + response.text());
	},

	/* async callback on error
	 * can be either Fetch API or File API error
	 */
	errorCallback: function(what) {
		console.log("Error: " + what);
	},
};

handleForm(params);
```
## License

[MIT][mit-url]


[mit-url]: https://github.com/kerrytazi/asyncFormHandler/blob/master/LICENSE.md
