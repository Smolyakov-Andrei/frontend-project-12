# Makefile

install:
	npm install

build:
	npm run build --prefix frontend

start:
	npm start

.PHONY: install build start
