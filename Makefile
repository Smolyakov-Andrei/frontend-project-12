# Makefile

install:
	npm install

build:
	npm run build --prefix frontend

start:
	npx start-server -s ./frontend/dist

.PHONY: install build start
