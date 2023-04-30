.PHONY: help setup build clean teardown test

export CHROME_EXTENSION_ID ?=

help:
	@cat $(firstword $(MAKEFILE_LIST))

setup: \
	.env

build: \
	dist

test:
	npx --no -- jest --config=jest.config.unit.js

e2e-test:
	npx --no -- jest --config=jest.config.e2e.js

teardown:
	rm -rf .env

clean:
	rm -rf dist

.env:
	echo CHROME_EXTENSION_ID=$(CHROME_EXTENSION_ID) >> $@

dist:
	npx --no -- vite build
