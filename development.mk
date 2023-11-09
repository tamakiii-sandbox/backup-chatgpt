.PHONY: help setup build run

help:
	@cat $(firstword $(MAKEFILE_LIST))

setup: \
	data/profile

build:
	npx --no -- nodemon --watch src --ext js,ts,html,css --exec 'make -f build.mk build'

run:
	npx --no -- web-ext run \
		--source-dir=. \
		--watch-file='dist/**/*' \
		--target=chromium \
		--browser-console \
		--devtools \
		--chromium-profile=data/profile \
		--profile-create-if-missing \
		--keep-profile-changes \
		--start-url=https://chat.openai.com/

teardown:
	rm -rf data/profile

data/profile: data
	mkdir $@

data:
	mkdir $@
