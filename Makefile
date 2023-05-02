.PHONY: help setup build clean teardown test

help:
	@cat $(firstword $(MAKEFILE_LIST))

setup: \
	.env

build:
	$(MAKE) -f build.mk $@

test: test/unit/jest.config.js
	npx --no -- jest --config=$<

e2e-test: test/e2e/jest.config.js
	npx --no -- jest --config=$<

teardown:
	rm -rf .env

clean:
	$(MAKE) -f build.mk $@

.env:
	touch $@
