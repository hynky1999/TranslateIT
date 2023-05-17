## TranslateIT chrome extension

This is a chrome extension that allows you to translate and text on any website. It uses the DeepL API to translate the text and Azure Cognitive Services to read text.

I made this so that I can learn new languages by reading articles in that language. I hope you find it useful too.

### How to use
The app is currently being reviewed by Google. Once it is approved, you can install it from the Chrome Web Store.


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