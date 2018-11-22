let handleForm;

{"use strict";


if (
	!window.File || !window.FileReader ||
	!window.FileList || !window.Blob
	)
{
	throw new Error("File API not available");
}

handleForm = params => {

	let form;

	if (params.hasOwnProperty("formQuery"))
	{
		form = document.querySelector(params.formQuery);
	}
	else if (params.hasOwnProperty("formDOMElement"))
	{
		form = params.formDOMElement;
	}
	else
	{
		throw new Error(
			"Missing form element in params. " +
			"'formQuery' or 'formQuery' required"
		);
	}

	if (!params.hasOwnProperty("url"))
	{
		throw new Error("Missing url element in params");
	}

	const asyncReadBase64 = file => new Promise((resolve, reject) => {

		let reader = new FileReader();

		reader.addEventListener("load", event => {
			resolve(reader.result.substr(reader.result.indexOf(",") + 1));
		});

		reader.addEventListener("error", event => {
			reject(event.error);
		});

		reader.readAsDataURL(file);
	});

	const parseInputs = (inputs, callback) => {

		let data = {};

		const nextInput = inputInd => {

			if (inputInd === inputs.length)
			{
				return callback(data);
			}

			let input = inputs[inputInd];
			let name = input.name;

			if (name.length === 0)
			{
				return nextInput(inputInd + 1);
			}

			if (input.files === null)
			{
				data[name] = input.value;
				return nextInput(inputInd + 1);
			}

			let files = [];

			const onFilesDone = () => {

				if (files.length === 1)
				{
					data[name] = files.pop();
				}
				else if (files.length > 1)
				{
					data[name] = files;
				}

				nextInput(inputInd + 1);
			};

			const nextFile = fileInd => {

				if (fileInd === input.files.length)
				{
					return onFilesDone();
				}

				let file = input.files[fileInd];

				let result = asyncReadBase64(file);

				result.then(base64str => {

					files.push(base64str);
					nextFile(fileInd + 1);
				});

				result.catch(err => {

					if (typeof params.errorCallback === "function")
					{
						result.catch(params.errorCallback);
					}
					else
					{
						throw err;
					}
				});
			};

			nextFile(0);
		};

		nextInput(0);
	};

	const onParsedInputs = data => {

		let fetchSettings = { "body": JSON.stringify(data) };

		if (params.hasOwnProperty("method"))
		{
			fetchSettings.method = params.method;
		}

		if (params.hasOwnProperty("mode"))
		{
			fetchSettings.mode = params.mode;
		}

		if (params.hasOwnProperty("cache"))
		{
			fetchSettings.cache = params.cache;
		}

		if (params.hasOwnProperty("credentials"))
		{
			fetchSettings.credentials = params.credentials;
		}

		let result = fetch(params.url, fetchSettings);

		if (typeof params.successCallback === "function")
		{
			result.then(params.successCallback);
		}

		if (typeof params.errorCallback === "function")
		{
			result.catch(params.errorCallback);
		}
	}

	const submitEvent = event => {

		event.preventDefault();

		if (typeof params.validateCallback === "function")
		{
			if (params.validateCallback(form))
			{
				return;
			}
		}

		let inputs = Array.from(form.querySelectorAll("input"));

		parseInputs(inputs, onParsedInputs);
	};

	form.addEventListener("submit", submitEvent);
};


} /* END asyncFormHandler */
