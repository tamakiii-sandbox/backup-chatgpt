.PHONY: help build run

help:
	@cat $(firstword $(MAKEFILE_LIST))

build:
	npx --no -- nodemon --watch src --ext js,ts,html,css --exec 'make -f build.mk build'

run:
	npx --no -- web-ext run \
		--source-dir=. \
		--watch-file='dist/**/*' \
		--target=chromium \
		--browser-console \
		--chromium-profile=web-ext.backup-chatgpt \
		--profile-create-if-missing \
		--start-url=https://chat.openai.com/
