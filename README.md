# asyncFormHandler

## Example of usage:
```js

let params = {

/* ---- START REQUIRED PARAMS ---- */

	/* querySelector for form DOM-element.
	 * (or formDOMElement)
	 */
	formQuery: ".my-form",

	/* Raw form DOM-element.
	 * (or formQuery)
	 */
	formDOMElement: document.querySelector(".my-form"),

	/* url to handle form */
	url: "http://localhost",

/* ---- END REQUIRED PARAMS ---- */


	/* Request method */
	method: "POST",

	/* Request cors.
	 * Default: 'same-origin'
	 * [ same-origin, no-cors, cors ]
	 * */
	mode: "cors",

	/* Cache mode.
	 * Default: 'default'
	 * [ default, no-cache, reload, force-cache, only-if-cached ]
	 */
	cache: "default",

	/* Credentials.
	 * Default: 'same-origin'
	 * [ same-origin, include, omit ]
	 */
	credentials: "same-origin",

	/* Validate form before request.
	 * Return true if not valid.
	 */
	validateCallback: function(form) {

		let loginInput = form.querySelector("input[name='loginInfo']");

		if (loginInput.value.length === 0)
		{
			return true;
		}

		return false;
	},

	/* Async callback on success.
	 * Fetch API response provided as first argument.
	 */
	successCallback: function(response) {
		console.log("Success: " + response.text());
	},

	/* Async callback on error.
	 * Can be either Fetch API or File API error.
	 */
	errorCallback: function(what) {
		console.log("Error: " + what);
	},
};

handleForm(params);
```
## Result
```js
/* It sends form data to server in json format.
 * Each key of json is 'name' property from inputs.
 * File transferred using base64 encoding.
 * Multiple files transferred in array of base64 strings
 * Example:
 */
{
	"login":"Peter",
	"pass":"superpassword",
	"avatarImage": "I2luY2x1ZGUgPGlvc3RyZWFtPg0KI2luY"
}
/* for */
```

```html
<form class="my-form">
	<input name="login"       type="text" />
	<input name="pass"        type="password" />
	<input name="avatarImage" type="file" />
</form>
```

## License

[MIT][mit-url]


[mit-url]: https://github.com/kerrytazi/asyncFormHandler/blob/master/LICENSE.md
