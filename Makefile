.PHONY: help setup build clean teardown test

export CHROME_EXTENSION_ID ?=

help:
	@cat $(firstword $(MAKEFILE_LIST))

setup: \
	.env

build: \
	dist

test: test/unit/jest.config.js
	npx --no -- jest --config=$<

e2e-test: test/e2e/jest.config.js
	npx --no -- jest --config=$<

teardown:
	rm -rf .env

clean:
	rm -rf dist

.env:
	echo CHROME_EXTENSION_ID=$(CHROME_EXTENSION_ID) >> $@

dist:
	node build.js
