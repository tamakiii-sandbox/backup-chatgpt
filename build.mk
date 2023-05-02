.PHONY: help build

help:
	@cat $(firstword $(MAKEFILE_LIST))

build: \
	dist/main.js \
	dist/background.js \
	dist/popup.js \
	dist/popup.css \
	dist/popup.html

dist/main.js: src/main.js src/content.ts
	npx --no -- esbuild --bundle $< --outfile=$@

dist/background.js: src/background.ts
	npx --no -- esbuild --bundle $< --outfile=$@

dist/popup.js: src/popup.ts
	npx --no -- esbuild --bundle $< --outfile=$@

dist/popup.css: src/popup.css
	npx --no -- esbuild --bundle $< --outfile=$@

dist/popup.html: src/popup.html
	cp $< $@

clean:
	rm -rf dist
