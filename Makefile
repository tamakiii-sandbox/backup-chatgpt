.PHONY: help setup test

export CHROME_EXTENSION_ID ?=

help:
	@cat $(firstword $(MAKEFILE_LIST))

setup: \
	.env

test:
	npx --no -- jest

.env:
	echo CHROME_EXTENSION_ID=$(CHROME_EXTENSION_ID) >> $@
