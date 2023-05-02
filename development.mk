.PHONY: help build

help:
	@cat $(firstword $(MAKEFILE_LIST))

build:
	npx --yes -- nodemon --watch src --ext js,ts,html,css --exec 'make -f build.mk build'
