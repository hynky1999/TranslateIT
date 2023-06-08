## TranslateIT chrome extension

This is a chrome extension that allows you to translate and text on any website. It uses the DeepL API to translate the text and Azure Cognitive Services to read text.

I made this so that I can learn new languages by reading articles in that language. I hope you find it useful too.

### How to use
Install the extension from [Google Store](https://chrome.google.com/webstore/detail/translateit/clbpcamdhbamnkdjlendehghgfjccfio)


### Building
Due to Vite not allowing for standalone builds of multiple targets, I had to write my own script.
You don't have to care, just run:
```bash
npm run build
```

I also use development mode for react styling, so you can run:
```bash
npm run dev
```

### Misc
Yes, I know it exposes both of my api keys. Frankly it's incredibly hard to hide them in chrome extension. One
way would be to put it in lamdba an call them from chrome extension, but guess what, I still need to provide
access from the extension to lambda. Since both keys are for free version, IDC.
